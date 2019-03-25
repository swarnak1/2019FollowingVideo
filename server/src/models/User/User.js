import Sequelize from 'sequelize'
import sequelize from '../sequelize'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Promise from 'bluebird'
import config from '../../config'
const bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
const bcryptHash = Promise.promisify(bcrypt.hash)
const bcryptCompare = Promise.promisify(bcrypt.compare)

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true 
    },
    email: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    weight: {
        type: Sequelize.FLOAT(),
        allowNull: true
    },
    height: {
        type: Sequelize.FLOAT(),
        allowNull: true
    },
    // isAdmin: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false
    // },
 })

 // Sequelize instance level methods

 User.isValidEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }
  User.prototype.generatePassword = function (length = 10) {
    return Math.random().toString(36).substr(2, length)
  }
  User.prototype.toJSON = function () {
      /**
       * Returns User data without password 
       * this.get({plain:true} In order to hide additional User instance stuff, result JSON
       * http://docs.sequelizejs.com/manual/instances.html#values-of-an-instance
       * @returns { object }
       **/
    return _.omit(this.get({plain:true}), ['password'])
  }
  User.prototype.getIdentity = function (params) {
    const object = _.pick(this.get({plain:true}), ['_id', 'username', 'name', 'avatar', 'role'])
    if (!params) return object
    return Object.assign(object, params)
  }
  User.prototype.generateAuthToken = function (params) {
    return jwt.sign(this.getIdentity(params), config.jwt.secret)
  }
  User.prototype.verifyPassword = async function (password) {
      /**
       * Compares request password with db data
       * @returns { boolean }
       */
    return await bcryptCompare(password, this.password)
  }
  const SALT_WORK_FACTOR = 10
  User.beforeCreate(async (user) => {
      /**
       * Sets hook to hash password before saving in db
       */
      let salt = await bcryptGenSalt(SALT_WORK_FACTOR)
      let hash = await bcryptHash(user.password, salt)
      user.password = hash
    return sequelize.Promise.resolve(user)
  })
  
  export default User