import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [
    {
      provide: 'GATEWAY',
      useClass: EventsGateway,
    },
  ],
})

export class EventsModule{}