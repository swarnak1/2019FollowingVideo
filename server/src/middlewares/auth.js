import jwt from 'express-jwt'
import { User } from '../models'

export function canonize(str) {
  return str.toLowerCase().trim()
}

export default (ctx) => {

  const authMiddleware = {}

  authMiddleware.validate = async function (req) {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('No such user')
    return {
      __pack: 1,
      jwt: req.user,
      user: user,
    }
  }

  authMiddleware.getUserFields = function (req, res) {
    const params = req.body
    if (params.username) {
      params.username = canonize(params.username)
      return {
        ...params
      }
    } 
  }
  authMiddleware.signup = async function (req, res) {
    const userFields = authMiddleware.getUserFields(req, res)
    if (!userFields) {
      res.status(400).send('please fill username, password and email fields')} else {
    try {
      const existUser = await User.findOne({ where: { username : userFields.username } })
      if (existUser) return res.status(400).send('User exists')
      if (!User.isValidEmail(req.body.email)) return res.status(400).send('Please enter valid email')
      const user = await User.build(userFields)

      user.save().then(() => {})
      .catch(
        (e) => {
        console.log(e.message)
        })
      return res.json({
        signup: true,
        user,
        token: user.generateAuthToken(),
      })

    } catch(err) {
      console.log(err);
      return res.status(500).json(err)
    }
  }
  }

  authMiddleware.login = async function (req, res) {
    const params = authMiddleware.getUserFields(req, res)
    if (!params.password) return res.status(400).send('No password sent')

    const user = await User.findOne({ where: { username : params.username }, attributes: { exclude: ['createdAt', 'updatedAt'] } })

    if (!user) return res.status(404).send('No such user')

    if (!await user.verifyPassword(params.password)) {
      return res.status(400).send('Wrong password')
    }

    return res.json({
      user,
      token: user.generateAuthToken(),
    })
  }

  authMiddleware.getToken = function (req) {
    if (req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer') {
      return req.headers.authorization.split( ' ' )[ 1 ]
    } else if (req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    } else if ( req.query && req.query.token ) {
      return req.query.token
    } else if ( req.cookies && req.cookies.token  ) {
      return req.cookies.token
    }

    if (ctx.config && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken
    return null;
  }

  authMiddleware.parseToken = function (req, res, next) {
    const token = authMiddleware.getToken(req)
    req.token = token
    next()
  }

  authMiddleware.parseUser = function (req, res, next) {
    const options = {
      secret: ctx.config && ctx.config.jwt.secret || 'SECRET',
      getToken: req => req.token,
    }
    jwt(options)(req, res, (err) => {
      if (err) req._errJwt = err
      next()
    })
  }

  authMiddleware.isAuth = function (req, res, next) {
    if (req._errJwt) return next(req._errJwt)
    if (!req.user || !req.user._id) return res.status(401).send('!req.user')
    next()
  }

  return authMiddleware 
}