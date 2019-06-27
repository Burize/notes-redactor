export default function isNetworkError(error: Error) {
  return String(error) === 'TypeError: Failed to fetch';
}
