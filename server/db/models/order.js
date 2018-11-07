const Sequelize = require('sequelize')
const db = require('../db')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
if (process.env.NODE_ENV !== 'production') require('../../../secrets')
const options = {
  auth: {
    api_user: 'lgrees',
    api_key: process.env.SEND_GRID_API_KEY
  }
}
let transporter = nodemailer.createTransport(sgTransport(options))

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
    from: 'panda-express@foo.com',
    to: order.email,
    subject: `🐼 You got panda'd`,
    text: 'Congrats on your new panda!',
    html: `<p>Congrats on your new panda!</p><p>Shipping Address: ${
      order.shippingAddress
    }</p><p>Order Status: ${order.status}</p>
    `
  }
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Message sent: ' + info.response)
    }
  })
})

module.exports = Order
