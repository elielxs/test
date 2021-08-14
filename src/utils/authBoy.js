export const TOKEN_KEY = "token";
export const LOGIN_KEY = "login";
export const isLoggedIn = () => sessionStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => sessionStorage.getItem(TOKEN_KEY)
export const setToken = token => {
  sessionStorage.setItem(TOKEN_KEY, token)
}
export const getLogin = () => sessionStorage.getItem(LOGIN_KEY)
export const setLogin = login => {
  sessionStorage.setItem(LOGIN_KEY, login)
}
export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(LOGIN_KEY);
};
