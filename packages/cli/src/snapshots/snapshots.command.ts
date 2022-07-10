import { Command, CommandRunner, Option } from 'nest-commander';
import { ConfigService } from '@nestjs/config';
import Parser, { Game } from '@kaiseratlas/parser';
import { Listr } from 'listr2';

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
    ]);

    try {
      await tasks.run();
    } catch (e) {
      console.error(e);
    }
  }
}
