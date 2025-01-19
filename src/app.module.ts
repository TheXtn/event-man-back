import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { EventService } from './events/event.service';
import { EventController } from './events/event.controller';

@Module({
  controllers: [AppController, EventController],
  providers: [AppService, PrismaService, EventService],
})
export class AppModule {}
