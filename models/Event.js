module.exports = (sequelize, type) => {
    return sequelize.define('event', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            field: 'name'
        },
        type: {
            type: type.STRING,
            field: 'type'
        },
        start_time: {
            type: type.STRING,
            field: 'start'
        },
        end_time: {
            type: type.STRING,
            field: 'end'
        },
    });
}