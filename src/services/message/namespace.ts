import { MessageType, Message } from 'shared/types/message';

export type MessageHandlerByType = Record<MessageType, MessageHandler>;

export type MessageHandler = (messagePayload: Message['payload']) => void;
