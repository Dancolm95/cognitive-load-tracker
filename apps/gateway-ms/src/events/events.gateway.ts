import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway({ namespace: '/events'})
@Injectable()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  private logger = new Logger('EventsGateway');

  constructor() {
  this.logger.log('🔧 Constructor ejecutado (Gateway instanciado)');
  }

  onModuleInit() {
  this.logger.log('🚨 WebSocket Gateway cargado en /events');
  }

  handleConnection(client: Socket) {
      this.logger.log(`Cliente conectado: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
      this.logger.log(`cliente desconectado ${client.id}`)
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any): string {
    this.logger.debug(`Recibido ping: ${JSON.stringify(data)}`)
    return 'pong';
  }
}