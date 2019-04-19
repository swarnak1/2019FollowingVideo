import _ from 'lodash'
import fs from 'fs'
import sequelize from './sequelize'
import Exercise from './Exercise'
import User from './User'
import Workout from './Workout'

Workout.belongsTo(User, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
})

Workout.belongsTo(Exercise, {
  onUpdate: 'cascade',
  onDelete: 'cascade'
})

function sync(...args) {
  return sequelize.sync(...args)
}

// seed

async function seedDb () {
        const photoData = fs.readFileSync('./src/static/user.png')
        const user = await User.build({
            username: 'john',
            password: '123',
            email: 'sample@email.com',
            photo: photoData
        })
        user.save().then(async () => {
          const john = await User.findOne({
            where: { username: 'John Doe' },
          })
          const johnId = _.pick(john.get({plain:true}), ['id'])
          console.log(johnId)

        const exercise = await Exercise.build({
          name: 'abs',
          description: 'abdominal muscles',
          goal: 'fit',
      })
          exercise.save().then(() => {}).catch((e) => {console.log(e.message)})
    }

export default { sync }
export { Exercise, User, Workout, seedDb}