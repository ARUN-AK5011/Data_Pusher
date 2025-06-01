const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './DB/database.sqlite',
  logging: false,
   dialectOptions: {
    foreignKeys: {
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => `acc_${Math.random().toString(36).substr(2, 9)}`
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true, 
      isEmail: true
    }
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  app_secret_token: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => `sec_${Math.random().toString(36).substr(2, 16)}`
  },
  website: DataTypes.STRING
});

const Destination = sequelize.define('Destination', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => `dest_${Math.random().toString(36).substr(2, 9)}`
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  http_method: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['GET', 'POST', 'PUT', 'DELETE', 'PATCH']]
    }
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  }
});

Account.hasMany(Destination, { onDelete: 'CASCADE' });
Destination.belongsTo(Account);

async function initializeDatabase() {
await sequelize.sync(); 
  console.log('Database initialized');
}

module.exports = {
  sequelize,
  Account,
  Destination,
  initializeDatabase
};