require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'desafiotec',
      user: 'root',
      password: '123'
    },
    migrations: {
      directory: './migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'desafiotec',
      user: 'root',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'desafiotec',
      user: 'root',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    }
  }

};

