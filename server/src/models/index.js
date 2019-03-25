import sequelize from './sequelize'
import Exercise from './Exercise'
import User from './User'
import Workout from './Workout'

// Exercise.belongsTo(User, {
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

function sync(...args) {
  return sequelize.sync(...args)
}

export default { sync }
export { Exercise, User, Workout}