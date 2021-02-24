const bcrypt = require("bcryptjs");
const connectToDatabase = require('./connection')

module.exports.registerNewUser = async(props) => {

    try {
        const { User } = await connectToDatabase()
        props.passwordHash = await bcrypt.hash(props.password, 8); // hash the pass
        delete props.password;
        const user = await User.create(props)
        return user
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.updateUser = async(props) => {

    try {
        const { User } = await connectToDatabase()

        var values = {
            first_name: props.first_name,
            last_name: props.last_name,
        }
        var selector = {
            where: { id: props.id }
        }

        const response = await User.update(values, selector)
        return response
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.removeUser = async(props) => {

    try {
        const { User } = await connectToDatabase()
        const rowDeleted = await User.destroy({
            where: {
                id: props.id
            }
        })
        return rowDeleted
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.getUserByEmail = async email => {

    try {
        const { User, Timeline } = await connectToDatabase()
        let user = await User.findOne({
            where: {
                email: email
            },
            include: [{
                model: Timeline,
                as: 'timelines',
                required: false,
                attributes: { exclude: ['description', 'createdAt', 'updatedAt', 'userId'] }
            }]
        })
        return user
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewTimeline = async(props) => {

    try {
        const { Timeline } = await connectToDatabase()
        const timeline = await Timeline.create(props)
        return timeline
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewGroup = async(props) => {

    try {
        const { Group } = await connectToDatabase()
        const group = await Group.create(props)
        return group
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};

module.exports.createNewEvent = async(props) => {

    try {
        const { Event } = await connectToDatabase()
        const event = await Event.create(props)
        return event
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};


module.exports.getTimeline = async timelineId => {

    try {
        const { Timeline, Group, Event } = await connectToDatabase()
        let timeline = await Timeline.findOne({
            where: {
                id: timelineId
            },
            include: [{
                model: Group,
                as: 'groups',
                required: false,
                include: [{
                    model: Event,
                    as: 'events',
                    required: false
                }]
            }],
        })
        return timeline
    } catch (err) {
        console.log("ERROR: " + err)
        return err;
    }
};