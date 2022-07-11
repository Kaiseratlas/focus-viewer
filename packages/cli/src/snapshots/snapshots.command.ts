import { Command, CommandRunner, Option } from 'nest-commander';
import { ConfigService } from '@nestjs/config';
import Parser, { Game, FocusTree } from '@kaiseratlas/parser';
import { Listr } from 'listr2';
import * as fs from 'fs';

@Command({ name: 'snapshots' })
export class SnapshotsCommand implements CommandRunner {
  constructor(private configService: ConfigService) {}

  async run(passedParam: string[]): Promise<void> {
    const gamePath = this.configService.get<string>('GAME_PATH');
    const modPath = this.configService.get<string>('MOD_PATH');

    const hoi4 = Game.fromPath(gamePath, {
      modPath,
    });
    let kr: Parser;
    let trees: FocusTree[];
    const treesJSON = [];
    let processed = 0;

    const tasks = new Listr([
      {
        title: 'Initializing parser...',
        task: async (): Promise<void> => {
          kr = await Parser.initialize(hoi4);
        },
      },
      {
        title: 'Preloading assets...',
        task: (ctx, task): Listr =>
          task.newListr(
            [
              {
                title: 'Loading translations...',
                task: async (): Promise<void> => {
                  await kr.i18n.load();
                },
              },
              {
                title: 'Loading sprites...',
                task: async (): Promise<void> => {
                  await kr.interface.sprites.load();
                },
              },
            ],
            { concurrent: true },
          ),
      },
      {
        // skip: () => true,
        title: 'Generating focus trees snapshot...',
        task: (ctx, task) =>
          task.newListr([
            {
              title: 'Loading focus trees...',
              task: async (): Promise<void> => {
                trees = await kr.common.focuses.trees.load();
              },
            },
            // {
            //   title: 'Processing focus trees...',
            //   task: (ctx, task): Listr =>
            //     task.newListr(
            //       trees.map((tree) => ({
            //         task: async (): Promise<void> => {
            //           task.output = tree.id;
            //           const name = (await tree.getName())?.value ?? null;
            //           treesJSON.push({
            //             id: tree.id,
            //             name,
            //           });
            //         },
            //       })),
            //       { concurrent: 10 },
            //     ),
            // },
            // {
            //   title: 'Writing focus trees JSON to file...',
            //   task: async (): Promise<void> => {
            //     await fs.promises.writeFile(
            //       '../website/public/assets/0.20.1/trees.json',
            //       JSON.stringify(treesJSON),
            //     );
            //   },
            // },
          ]),
      },
      {
        // skip: () => true,
        title: 'Generating focus snapshots...',
        task: async (ctx, task) => {
          for (const tree of trees) {
            const focusesJSON = await Promise.all(
              tree.focuses.map(async (focus) => {
                const {
                  id,
                  x,
                  y,
                  cost,
                  cancelIfInvalid,
                  continueIfInvalid,
                  availableIfCapitulated,
                } = focus;

                const [name, description, icon] = await Promise.all([
                  focus.getName(),
                  focus.getDescription(),
                  focus.getIcon(),
                ]);

                if (!icon) {
                  throw Error(`no icon, focus: ${focus.id}`);
                }

                if (
                  !!icon?.id &&
                  !fs.existsSync(`../website/public/assets/0.20.1/icons/${icon.id}.png`)
                ) {
                  await fs.promises.writeFile(
                    `../website/public/assets/0.20.1/icons/${icon.id}.png`,
                    await icon.png.toBuffer(),
                  );
                }

                return {
                  id,
                  icon: focus['icon'],
                  prerequisiteFocusIds: focus['prerequisiteFocusIds'],
                  relativePositionId: focus['relativePositionId'],
                  mutuallyExclusive: focus['mutuallyExclusive'],
                  willLeadToWarWith: focus['willLeadToWarWith'],
                  x,
                  y,
                  cost,
                  cancelIfInvalid,
                  continueIfInvalid,
                  availableIfCapitulated,
                  name: name?.value ?? id,
                  description: description?.value ?? id,
                };
              }),
            );
            await fs.promises.writeFile(
              `../website/public/assets/0.20.1/trees/${tree.id}.json`,
              JSON.stringify(focusesJSON),
            );
            processed++;
            task.output = `Generating focus snapshots for tree: ${tree.id} (${processed} / ${trees.length}) ...`;
          }
        }
      },
    ]);

    try {
      await tasks.run();
    } catch (e) {
      console.error(e);
    }
  }
}