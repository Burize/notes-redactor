import { MessageService } from 'services/message';
import { History } from 'history';

import configureStore from './configureStore';
import createMessageHandlers from './configureMessageHandlers';

export default function configureApp(history: History) {
  const messageHandlers = createMessageHandlers(history);
  MessageService.init(messageHandlers);

  const { store } = configureStore();
  return { store };
}
