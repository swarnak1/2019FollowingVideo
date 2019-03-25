"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var config = {
  name: 'steelon.ru',
  db: {
    url: 'postgres://dev:dev@127.0.0.1/dev'
  }
};
var sequelize = new _sequelize.default(config.db.url, {
  define: {
    freezeTableName: true
  }
});
var Exercise = sequelize.define('exercise', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.default.STRING(255),
    allowNull: false
  },
  goal: {
    type: _sequelize.default.STRING()
  },
  description: {
    type: _sequelize.default.TEXT(),
    allowNull: true
  }
});
var Workout = sequelize.define('workout', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // name: {
  //     type: Sequelize.STRING(255), 
  //     allowNull: false
  // },
  start_time: {
    type: _sequelize.default.TIME(),
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  end_time: {
    type: _sequelize.default.TIME(),
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  calories_burnt: {
    type: _sequelize.default.STRING()
  },
  trainer: {
    type: _sequelize.default.STRING()
  },
  description: {
    type: _sequelize.default.TEXT(),
    allowNull: true
  }
});
Workout.belongsTo(User);
Workout.belongsTo(Exercise);
var User = sequelize.define('user', {
  id: {
    type: _sequelize.default.UUID,
    defaultValue: _sequelize.default.UUIDV4,
    primaryKey: true
  },
  username: {
    type: _sequelize.default.STRING(),
    allowNull: false,
    unique: true
  },
  email: {
    type: _sequelize.default.STRING(),
    allowNull: false,
    unique: true
  },
  password: {
    type: _sequelize.default.STRING(255),
    allowNull: false
  },
  gender: {
    type: _sequelize.default.STRING(),
    allowNull: true
  },
  weight: {
    type: _sequelize.default.FLOAT(),
    allowNull: true
  },
  height: {
    type: _sequelize.default.FLOAT(),
    allowNull: true
  }
});

function sync() {
  return sequelize.sync.apply(sequelize, arguments);
}

User.sync({}).then(
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var user;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.build({
            username: 'John Doe',
            password: '123',
            email: 'sample@email.com'
          });

        case 2:
          user = _context.sent;
          user.save().then(function () {}).catch(function (e) {
            console.log(e.message);
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
Exercise.sync({}).then(
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee2() {
  var exercise;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Exercise.build({
            name: 'abs',
            description: 'some',
            goal: 'fit'
          });

        case 2:
          exercise = _context2.sent;
          exercise.save().then(function () {}).catch(function (e) {
            console.log(e.message);
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
Workout.sync({}).then(
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee3() {
  var workout;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Workout.build({
            start_time: '2019-03-22 22:25:51.650000 +00:00',
            end_time: '2019-03-22 23:25:51.650000 +00:00',
            calories_burnt: '1',
            trainer: 'self',
            description: 'something',
            exerciseId: '1',
            userId: 'ee1b248a-a7db-4b92-bc9c-34bb92d0be02'
          });

        case 2:
          workout = _context3.sent;
          workout.save().then(function () {}).catch(function (e) {
            console.log(e.message);
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));