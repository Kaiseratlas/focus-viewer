import { Command, CommandRunner, Option } from 'nest-commander';
import { ConfigService } from '@nestjs/config';
import Parser, { Game, FocusTree } from '@kaiseratlas/parser';
import { Listr } from 'listr2';
import * as fs from 'fs';
import * as path from 'path';
import { FocusFilter } from '@kaiseratlas/parser1/dist/common/goals/classes/focus-filter.class';

@Command({ name: 'snapshots' })
export class SnapshotsCommand implements CommandRunner {
  constructor(private configService: ConfigService) {}

  async run(): Promise<void> {
    const gamePath = this.configService.get<string>('GAME_PATH');
    const modPath = this.configService.get<string>('MOD_PATH');
    const version = '0.23';

    const hoi4 = Game.fromPath(gamePath, {
      modPath,
    });
    let kr: Parser;
    let trees: FocusTree[];
    const treesJSON = [];
    const filtersJSON = [];
    let processed = 0;
    const filtersMap = new Map<FocusFilter['id'], FocusFilter>();

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
              {
                title: 'Loading shared focuses...',
                task: async (): Promise<void> => {
                  await kr.common.focuses.shared.load();
                },
              },
            ],
            { concurrent: true },
          ),
      },
      {
        title: 'Generating focus trees snapshot...',
        task: (ctx, task) =>
          task.newListr([
            {
              title: 'Loading focus trees...',
              task: async (): Promise<void> => {
                trees = await kr.common.focuses.trees.load();
              },
            },
            {
              title: 'Processing focus trees...',
              task: (ctx, task): Listr =>
                task.newListr(
                  trees.map((tree) => ({
                    task: async (): Promise<void> => {
                      task.output = tree.id;
                      const name = (await tree.getName())?.value ?? null;
                      treesJSON.push({
                        id: tree.id,
                        name,
                        focusCount: tree.focuses.length,
                        sharedFocusIds: tree['sharedFocusIds'],
                      });
                    },
                  })),
                  { concurrent: 10 },
                ),
            },
            {
              //skip: () => true,
              title: 'Writing shared focuses JSON to file...',
              task: async (): Promise<void> => {
                const sharedFocuses = await kr.common.focuses.shared.load();
                const sharedFocusesJSON = await Promise.all(
                  sharedFocuses.map(async (focus) => {
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

                    const filename = `../website/public/assets/${version}/icons/${icon.id}.png`;
                    const dir = path.dirname(filename);

                    if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir, { recursive: true });
                    }

                    if (!!icon?.id && !fs.existsSync(filename)) {
                      await fs.promises.writeFile(
                        filename,
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
                      searchFilters: focus['searchFiltersId'],
                      x,
                      y,
                      cost,
                      cancelIfInvalid,
                      continueIfInvalid,
                      availableIfCapitulated,
                      name: name?.value ?? id,
                      description: description?.value ?? id,
                      isHidden: focus.isHidden,
                    };
                  }),
                );

                const filename = `../website/public/assets/${version}/shared_focuses.json`;
                const dir = path.dirname(filename);

                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }

                await fs.promises.writeFile(
                  filename,
                  JSON.stringify(sharedFocusesJSON),
                );
              },
            },
            {
              title: 'Writing focus trees JSON to file...',
              task: async (): Promise<void> => {
                const filename = `../website/public/assets/${version}/trees.json`;
                const dir = path.dirname(filename);

                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                await fs.promises.writeFile(
                  filename,
                  JSON.stringify(treesJSON),
                );
              },
            },
          ]),
      },
      {
        //skip: () => true,
        title: 'Generating focus filters snapshot...',
        task: (ctx, task) =>
          task.newListr([
            {
              title: 'Loading focus filters...',
              task: async (): Promise<void> => {
                const allFocuses = trees.flatMap((tree) => tree.focuses);
                allFocuses.forEach((focus) => {
                  focus.searchFilters.forEach((focusFilter) => {
                    if (filtersMap.has(focusFilter.id)) {
                      return;
                    }
                    filtersMap.set(focusFilter.id, focusFilter);
                  });
                });
              },
            },
            {
              title: 'Processing focus filters...',
              task: (ctx, task): Listr =>
                task.newListr(
                  [...filtersMap.values()].map((focusFilter) => ({
                    task: async (): Promise<void> => {
                      task.output = focusFilter.id;
                      const name = (await focusFilter.getName())?.value ?? null;
                      filtersJSON.push({
                        id: focusFilter.id,
                        icon: `GFX_${focusFilter.id}`,
                        name,
                      });
                    },
                  })),
                  { concurrent: 10 },
                ),
            },
            {
              title: 'Processing focus filters icons...',
              task: (ctx, task): Listr =>
                task.newListr(
                  [...filtersMap.values()].map((focusFilter) => ({
                    task: async (): Promise<void> => {
                      const filterIcon = await focusFilter.getIcon();
                      const filename = `../website/public/assets/${version}/icons/filters/GFX_${focusFilter.id}.png`;

                      const dir = path.dirname(filename);

                      if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                      }

                      if (filterIcon && !fs.existsSync(filename)) {
                        await fs.promises.writeFile(
                          filename,
                          await filterIcon.png.toBuffer(),
                        );
                      }
                    },
                  })),
                  { concurrent: 10 },
                ),
            },
            {
              title: 'Writing focus filters JSON to file...',
              task: async (): Promise<void> => {
                const filename = `../website/public/assets/${version}/filters.json`;
                const dir = path.dirname(filename);

                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                await fs.promises.writeFile(
                  filename,
                  JSON.stringify(filtersJSON),
                );
              },
            },
          ]),
      },
      {
        //skip: () => true,
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
                  //throw Error(`no icon, focus: ${focus.id}`);
                  console.error(icon);

                } else {
                  const filename = `../website/public/assets/${version}/icons/${icon.id}.png`;

                  const dir = path.dirname(filename);

                  if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                  }

                  if (!!icon?.id && !fs.existsSync(filename)) {
                    await fs.promises.writeFile(
                      filename,
                      await icon.png.toBuffer(),
                    );
                  }
                }

                return {
                  id,
                  icon: focus['icon'],
                  prerequisiteFocusIds: focus['prerequisiteFocusIds'],
                  relativePositionId: focus['relativePositionId'],
                  mutuallyExclusive: focus['mutuallyExclusive'],
                  willLeadToWarWith: focus['willLeadToWarWith'],
                  searchFilters: focus['searchFiltersId'],
                  x,
                  y,
                  cost,
                  cancelIfInvalid,
                  continueIfInvalid,
                  availableIfCapitulated,
                  name: name?.value ?? id,
                  description: description?.value ?? id,
                  isHidden: focus.isHidden,
                };
              }),
            );

            const filename = `../website/public/assets/${version}/trees/${tree.id}.json`;
            const dir = path.dirname(filename);

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }

            await fs.promises.writeFile(filename, JSON.stringify(focusesJSON));
            processed++;
            task.output = `Generating focus snapshots for tree: ${tree.id} (${processed} / ${trees.length}) ...`;
          }
        },
      },
    ]);

    try {
      await tasks.run();
    } catch (e) {
      console.error(e);
    }
  }
}
