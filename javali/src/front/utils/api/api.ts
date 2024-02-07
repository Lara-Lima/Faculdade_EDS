export const api = (endpoint: string, init?: RequestInit | undefined) => {
  return fetch(`http://localhost:8080${endpoint}`, init);
};
