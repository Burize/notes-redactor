import { History } from 'history';

import { MessageHandlerByType } from 'services/message/namespace';
import { ChangeNoteId } from 'shared/types/message';
import { routes } from 'modules/routes';

export default function createMessageHandlers(history: History): MessageHandlerByType {

  const onChangeNoteId = (message: ChangeNoteId['payload']) => {
    history.push(routes.redactor.make(message.noteId));
  };

  return {
    changeNoteId: onChangeNoteId,
  };
}
