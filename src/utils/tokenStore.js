let memoryToken = null;

export function setToken(token) {
  memoryToken = token;
}

export function getToken() {
  return memoryToken;
}

export function clearToken() {
  memoryToken = null;
}