

export function getToken (cookies: any, headers: any): string {
  return cookies['auth-token'] || headers['auth-token'] || null
}