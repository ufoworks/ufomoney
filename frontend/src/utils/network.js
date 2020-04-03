import { BACKEND_URL } from '../Config'

export function getBackendURL (tail) {
  return `${BACKEND_URL}/${tail}`
}
