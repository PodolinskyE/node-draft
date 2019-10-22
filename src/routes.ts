import { server } from './server'


export function init (): void {
  server.use('/', (req, res) => { res.send('ok')})
}