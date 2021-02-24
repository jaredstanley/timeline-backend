module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            field: 'username'
        },
        first_name: {
            type: type.STRING,
            field: 'first_name'
        },
        last_name: {
            type: type.STRING,
            field: 'last_name'
        },
        email: {
            type: type.STRING,
            field: 'email'
        },
        role: {
            type: type.STRING,
            field: 'role'
        },
        passwordHash: {
            type: type.STRING,
            field: 'passwordHash'
        }
    });
}