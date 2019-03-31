import Sequelize from 'sequelize'

const config = {
    name: 'fittrack',
    db: {
      url: 'postgres://dev:dev@127.0.0.1/dev',
    },
  };

  const sequelize = new Sequelize(config.db.url, {
    define: {
      freezeTableName: true,
    },
  });

const Exercise = sequelize.define('exercise', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255), 
        allowNull: false
    },
    goal: {
        type: Sequelize.STRING()
    },
    description: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
})

const Workout = sequelize.define('workout', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // name: {
    //     type: Sequelize.STRING(255), 
    //     allowNull: false
    // },
    start_time: {
        type: Sequelize.TIME(),
        allowNull: true,
        validate: { isDate: true }
    },
    end_time: {
        type: Sequelize.TIME(),
        allowNull: true,
        validate: { isDate: true }
    },
    calories_burnt: {
        type: Sequelize.STRING()
    },
    trainer: {
        type: Sequelize.STRING()
    },
    description: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
})

Workout.belongsTo(User)
Workout.belongsTo(Exercise)

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
 })

function sync(...args) {
  return sequelize.sync(...args)
}

User.sync({}).then(async () => {
        const user = await User.build({
            username: 'John Doe',
            password: '123',
            email: 'sample@email.com'
        })
        user.save().then(() => {}).catch((e) => {console.log(e.message)})
    })

Exercise.sync({}).then(async () => {
    const exercise = await Exercise.build({
        name: 'abs',
        description: 'some',
        goal: 'fit',
    })
        exercise.save().then(() => {}).catch((e) => {console.log(e.message)})
    })

Workout.sync({}).then(async () => {
    const workout = await Workout.build({
        start_time: '2019-03-22 22:25:51.650000 +00:00',
        end_time: '2019-03-22 23:25:51.650000 +00:00',
        calories_burnt: '1',
        trainer: 'self',
        description: 'something',
        exerciseId : '1',
        userId: 'ee1b248a-a7db-4b92-bc9c-34bb92d0be02'
    })
        workout.save().then(() => {}).catch((e) => {console.log(e.message)})
    })