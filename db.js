const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');

const options = {
    pool: {
        max: 120,
        min: 10,
        idle: 10000,
    },
    logging: false,
};

module.exports = new Sequelize(DATABASE_URL, options);

require('./app/models');
