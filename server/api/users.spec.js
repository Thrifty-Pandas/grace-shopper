/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        userName: 'codythepug',
        password: '203498109tj',
        firstName: 'cody',
        lastName: 'thepug',
        billingAddress: '123 bakewell street',
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users/:id', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
