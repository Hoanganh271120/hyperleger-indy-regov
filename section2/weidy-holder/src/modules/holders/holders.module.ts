import { Module } from '@nestjs/common';
import { HoldersService } from './holders.service';
import { HoldersController } from './holders.controller';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  controllers: [HoldersController],
  providers: [HoldersService],
})
export class HoldersModule {}
