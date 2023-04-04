import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/handle-error';
import { SessionsModule } from "./modules/sessions/sessions.module";
import { CompententersModule } from './modules/compententers/compententers.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.local.env',
  }), SessionsModule, CompententersModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }
  
  ],
})
export class AppModule {}
