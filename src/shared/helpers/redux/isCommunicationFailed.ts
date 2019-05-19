import { ICommunication } from 'shared/types/redux';

export default function isCommunicationFailed<T>(prev: ICommunication<T>, next: ICommunication<T>): boolean {
  return prev.isRequesting && !next.isRequesting && Boolean(next.error);
}
