import Sequelize from 'sequelize'
import config from '../config'

const Op = Sequelize.Op

const sequelize = new Sequelize(config.db.url, {
  define: {
    freezeTableName: true,
  },
  operatorsAliases: Op,
})

export default sequelize