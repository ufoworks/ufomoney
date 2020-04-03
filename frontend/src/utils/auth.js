import { TOKEN_NAME, LOGO_URL } from '../Config'
import axios from 'axios'

export function setToken (token) {
  localStorage.setItem(TOKEN_NAME, token)
}

export function getToken () {
  return localStorage.getItem(TOKEN_NAME)
}

export function cleanToken () {
  localStorage.removeItem(TOKEN_NAME)
}

export function setUserLogo (url) {
  localStorage.setItem(LOGO_URL, url)
}

export function getUserLogo () {
  return localStorage.getItem(LOGO_URL)
}

export const axiosJWT = axios.create({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
