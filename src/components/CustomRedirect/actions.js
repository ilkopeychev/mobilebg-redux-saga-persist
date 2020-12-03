import { REDIRECT } from './types';


export function redirect(destination, body) {
  return {
      type: REDIRECT,
      payload: {
          destination,
          body
      }
  }
}
