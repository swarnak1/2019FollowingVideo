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
        const photoData = fs.readFileSync('./src/static/eva.jpg')
        const user = await User.build({
            username: 'eva',
            password: '123',
            email: 'sample@email.com',
            photo: photoData
        })
        try { await user.save() }
        catch (err) {
          console.log(err)
        }

        const eva = await User.findOne({
          where: { username: 'eva' },
        })
        const evaId = _.pick(await eva.get({plain:true}), ['id'])


        const exercise = await Exercise.build({
          id: 1,
          name: 'abs',
          description: 'abdominal muscles',
          goal: 'fit',
      })
        try { await exercise.save() }
        catch (err) {
          console.log(err)
        }

        const workout = await Workout.build({
          id: 1,
          start_time: '2019-04-04 10:08:50 +00:00',
          end_time: '2019-04-04 10:18:50 +00:00',
          calories_burnt: '100',
          trainer: 'self',
          description: 'side plank',
          exerciseId : '1',
          userId: evaId.id
      })
        try { await workout.save() }
        catch (err) {
          console.log(err)
        }
        const workout2 = await Workout.build({
          id: 2,
          start_time: '2019-04-04 11:08:50 +00:00',
          end_time: '2019-04-04 11:10:50 +00:00',
          calories_burnt: '100',
          trainer: 'self',
          description: 'plank',
          exerciseId : '1',
          userId: evaId.id
      })
        try { await workout2.save() }
        catch (err) {
          console.log(err)
        }
    }

export default { sync }
export { Exercise, User, Workout, seedDb}