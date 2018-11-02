'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  ProductCategory,
  Order,
  Review,
  Cart,
  CartProduct
} = require('../server/db/models')

const products = [
  {
    name: 'Panda mug',
    description: 'a mug with cute panda on it',
    imageUrl: '/images/mug.jpeg',
    stock: 15,
    price: 5
  },
  {
    name: 'Panda at the back',
    description: 'backpack',
    imageUrl: '/images/bag.jpg',
    stock: 10,
    price: 35
  },
  {
    name: 'Panda family',
    description: 'pandy family toys',
    imageUrl: '/images/toys.jpg',
    stock: 5,
    price: 15
  },
  {
    name: 'Cute Keychain',
    description: 'keychain',
    imageUrl: '/images/keychain.jpg',
    stock: 4,
    price: 9
  },
  {
    name: 'Panda on my phone',
    description: 'phonecase',
    imageUrl: '/images/phonecase.jpg',
    stock: 8,
    price: 16
  },
  {
    name: 'Panda umbrella',
    description: 'umbrella',
    imageUrl: '/images/umbrella.jpg',
    stock: 1,
    price: 14
  },
  {
    name: 'Comfy panda',
    description: 'pillow',
    imageUrl: '/images/pillow.jpg',
    stock: 6,
    price: 20
  }
]

const categories = [
  {
    name: 'home'
  },
  {
    name: 'accesories'
  },
  {
    name: 'kitchen'
  },
  {
    name: 'toys'
  }
]

const users = [
  {
    isAdmin: true,
    email: 'cody@email.com',
    userName: 'codythedog',
    password: 12345,
    firstName: 'Cody',
    lastName: 'Dog',
    billingAddress: '100 Superior st, Chicago, IL'
  },
  {
    email: 'meow@amail.com',
    userName: 'meowthecat',
    password: 'abcde',
    firstName: 'Meow',
    lastName: 'Cat',
    billingAddress: '200 Super st, Chicago, IL'
  }
]

const productCategories = [
  {productId: 1, categoryId: 3},
  {productId: 2, categoryId: 2},
  {productId: 3, categoryId: 4},
  {productId: 4, categoryId: 2},
  {productId: 5, categoryId: 2},
  {productId: 6, categoryId: 1},
  {productId: 6, categoryId: 2},
  {productId: 7, categoryId: 1}
]

const reviews = [
  {
    text: 'Love this mug!',
    stars: 5,
    productId: 1,
    userId: 1
  },
  {
    text: 'Good mug. Has yet to break',
    stars: 4,
    productId: 1,
    userId: 1
  },
  {
    text: 'I did not get wet in the rain after using this umbrella',
    stars: 5,
    productId: 6,
    userId: 1
  },
  {
    text: 'Not nearly as comfortable as advertised. DO NOT BUY!!!',
    stars: 1,
    productId: 1,
    userId: 1
  },
  {
    text:
      'Every time I reach into my pocket I am greeted with a lovely panda. A+',
    stars: 5,
    productId: 5,
    userId: 1
  },
  {
    text: 'This family has a good group dynamic',
    stars: 3,
    productId: 1,
    userId: 1
  },
  {
    text: 'This product did NOT solve our plumbing problem',
    stars: 2,
    productId: 4,
    userId: 1
  },
  {
    text: 'Very cute!!',
    stars: 5,
    productId: 4,
    userId: 1
  }
]
const orders = [
  {
    shippingAddress: '123 Hello World Ln.',
    email: 'cody@email.com',
    price: 44,
    temporaryUserId: 'uirh1ohfor',
    status: 'pending'
  },
  {
    shippingAddress: '234 Fullstack Rd.',
    email: 'ben@email.com',
    price: 42,
    temporaryUserId: 'fdsf',
    status: 'confirmed'
  }
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'shipped'
  // },
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'delivered'
  // },
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'pending'
  // },
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'pending'
  // },
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'pending'
  // },
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'pending'
  // },
  // {
  //   shippingAddress: 'fdsaf',
  //   email: '',
  //   price: 44,
  //   temporaryUserId: 'fdsf',
  //   status: 'pending'
  // }
]
// const carts = []
// const cartProduct = []

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Product.bulkCreate(products)
  await Category.bulkCreate(categories)
  await User.bulkCreate(users)
  await Review.bulkCreate(reviews)
  await Order.bulkCreate(orders)
  await ProductCategory.bulkCreate(productCategories)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
