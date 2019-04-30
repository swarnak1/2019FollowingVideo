import express from 'express'
import models, { Seed, seedDb } from './models'
import getApi from './api'
import getMiddlewares from './middlewares'


export default class App {
  constructor(params = {}) {
    Object.assign(this, params)
    this.init()
  }

  getMiddlewares(){
    return getMiddlewares(this)
  }

  init() {
    this.app = express()
    this.middlewares = this.getMiddlewares()
    this.useMiddlewares()
    this.useRoutes()
    this.useDefaultRoute()
  }

  useRoutes() {
    const api = getApi(this)
    this.app.use('/api/v1', api)
  }

  useMiddlewares(){
    this.app.use(this.middlewares.Auth.parseToken)
    this.app.use(this.middlewares.Auth.parseUser)
    this.app.use(this.middlewares.reqParser)
  }

  useDefaultRoute() {
    // this.app.use(express.static(path.join(__dirname, 'static')))
    this.app.use((req, res, next) => {
      res.status(200).send({
        message: 'API location /api/v1' })
    })
  }

  run(){
    models.sync({force: true}).catch(err => console.error(err.stack)).then(() => {
      seedDb()
      this.app.listen(this.config.port, () => {
      console.log(`${this.config.name} application listening on port ${this.config.port}`)
    })
  })
  }
}

