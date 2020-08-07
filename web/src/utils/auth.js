import Cookies from 'js-cookie'

const TokenKey = 'authorization'

export function getToken() {
  return localStorage.getItem('authorization');
  //return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
