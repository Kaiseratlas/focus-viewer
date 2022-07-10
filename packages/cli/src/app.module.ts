import { Module } from '@nestjs/common';
import { SnapshotsModule } from './snapshots/snapshots.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SnapshotsModule],
})
export class AppModule {}
