const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [10, 500]
    }
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  }
})

module.exports = Reviews
