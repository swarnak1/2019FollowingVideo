import Sequelize from 'sequelize'
import sequelize from '../sequelize'
import User from '../User'
import Exercise from '../Exercise'
// import { isDate } from 'util';

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
    },
    end_time: {
        type: Sequelize.TIME(),
        allowNull: true,
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
    steps_taken: {
        type: Sequelize.INTEGER()
    },
    photo: {
        type: Sequelize.BLOB()
    }
})


export default Workout