import { BindAll } from 'lodash-decorators';

import { IMessageEvent } from 'shared/types/message';

import { MessageHandlerByType } from './namespace';

@BindAll()
export class MessageService {
  private messageHandlers: MessageHandlerByType | null = null;

  public init(handlers: MessageHandlerByType) {
    this.messageHandlers = { ...handlers };
    navigator.serviceWorker.addEventListener('message', this.receiveMessage);
  }

  private receiveMessage(event: IMessageEvent) {
    const eventType = event.data.type;
    if (!this.messageHandlers || !this.messageHandlers[eventType]) {
      return;
    }

    const handlerByMessageType = this.messageHandlers[eventType];
    handlerByMessageType(event.data.payload);
  }
}

export default new MessageService();
