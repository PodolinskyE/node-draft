import { Request, Response } from 'express'
import uuid from 'uuid/v1'


export class Logger {
  correlationId: string
  protocol: string
  method: string
  url: string

  constructor (req: Request | string, res?: Response) {
    let correlationId = uuid()
    if (typeof req !== 'string') {
      const { 'x-correlation-id': xcId } = req.headers
      correlationId = Array.isArray(xcId) ? xcId[0] : xcId || correlationId
      res.setHeader('x-correlation-id', correlationId)
      this.protocol = req.protocol.padStart(5)
      this.method = req.method.padStart(7)
      this.url = req.url
    } else {
      this.protocol = '--'.padStart(5)
      this.method = '--'.padStart(7)
      this.url = req
    }
    this.correlationId = correlationId
  }

  private prefix (): string {
    return `[ ${new Date().toISOString()} ] [${this.correlationId}]  ${this.protocol} : ${this.method} | ${this.url}  |  `
  }

  info = (msg: string): void => {
    console.info(this.prefix() + msg)
  }

  warn = (msg: string): void => {
    console.warn(this.prefix() + msg)
  }

  error = (msg: string): void => {
    console.error(this.prefix() + msg)
  }
}

export const logger = new Logger('system')
