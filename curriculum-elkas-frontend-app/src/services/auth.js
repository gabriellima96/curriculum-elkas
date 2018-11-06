export const TOKEN_KEY = '@curriculumelkasapp-Token';
export const USERNAME_ID = '@curriculumelkasapp-Username';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem(USERNAME_ID) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_ID);
};
export const username = (usernameObj) => {
  localStorage.setItem(USERNAME_ID, usernameObj);
};
export const getUsername = () => localStorage.getItem(USERNAME_ID);
