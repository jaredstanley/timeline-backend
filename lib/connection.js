const Sequelize = require('sequelize')
const UserModel = require('./../models/User')
const TimelineModel = require('./../models/Timeline')
const GroupModel = require('./../models/Group')
const EventModel = require('./../models/Event')
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USERNAME,
    process.env.PASSWORD, {
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
)
const User = UserModel(sequelize, Sequelize)
const Timeline = TimelineModel(sequelize, Sequelize)
const Group = GroupModel(sequelize, Sequelize)
const Event = EventModel(sequelize, Sequelize)

User.hasMany(Timeline, { as: 'timelines' })
Timeline.hasMany(Group, { as: 'groups' })
Group.hasMany(Event, { as: 'events' })

const Models = { User, Timeline, Group, Event }
const connection = {}

module.exports = async() => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.')
        return Models
    }

    await sequelize.sync()
    await sequelize.authenticate()
    connection.isConnected = true
    console.log('=> Created a new connection.')
    return Models
}