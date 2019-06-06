import { ICommunication } from 'shared/types/redux';

export default function isCommunicationComplete<T>(prev: ICommunication<T>, next: ICommunication<T>): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}
