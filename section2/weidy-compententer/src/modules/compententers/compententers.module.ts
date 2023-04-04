import { Module } from '@nestjs/common';
import { SessionsModule } from '../sessions/sessions.module';
import { CompententersController } from './compententers.controller';
import { CompententersService } from './compententers.service';

@Module({
  imports: [SessionsModule],
  controllers: [CompententersController],
  providers: [CompententersService]
})
export class CompententersModule {}
