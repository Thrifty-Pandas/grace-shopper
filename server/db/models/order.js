const Sequelize = require('sequelize')
const db = require('../db')
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport(
  'smtps://user%40gmail.com:pass@smtp.gmail.com'
)

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {isNumeric: true, min: 0}
  },
  temporaryUserId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  }
})

Order.afterCreate(order => {
  const message = {
    from: 'sender@server.com',
    to: order.email,
    subject: `🐼 You got panda'd`,
    text: 'Congrats on your new panda!',
    html: '<p>Congrats on your new panda!</p>'
  }
  transporter.sendMail(message)
})

module.exports = Order
