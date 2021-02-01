import Cookies from 'js-cookie'

export function getToken(key) {
  return Cookies.get(key)
}

export function setToken(key, token) {
  return Cookies.set(key, token, { expires: 7 })
  // alert(Cookies.set(key, token, { expires: 7 }))
}

export function removeToken(key) {
  return Cookies.remove(key)
}
