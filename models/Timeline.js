module.exports = (sequelize, type) => {
    return sequelize.define('timeline', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            field: 'name'
        },
        description: {
            type: type.STRING,
            field: 'description'
        }
    });
}