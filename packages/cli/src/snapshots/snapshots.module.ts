import { Module } from '@nestjs/common';
import { SnapshotsCommand } from './snapshots.command';

@Module({
  providers: [SnapshotsCommand],
})
export class SnapshotsModule {}
