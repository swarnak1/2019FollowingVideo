import Sequelize from 'sequelize'
import sequelize from '../sequelize'


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

export default Exercise