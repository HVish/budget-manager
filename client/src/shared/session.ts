export function setSession(token: string) {
  window.localStorage.setItem('token', token);
}

export function getSession() {
  return window.localStorage.getItem('token');
}

export function clearSession() {
  window.localStorage.clear();
}
