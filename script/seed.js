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
  CartProduct,
  OrderProduct
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
  },
  {
    name: 'Panda beanie',
    description: 'A warm and fuzzy panda beanie',
    imageUrl: '/images/beanie.jpg',
    stock: 8,
    price: 25
  },
  {
    name: 'Panda bowl',
    description: 'Great for cereal!',
    imageUrl: '/images/bowl.jpg',
    stock: 25,
    price: 10
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
    password: '12345',
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
  {productId: 7, categoryId: 1},
  {productId: 8, categoryId: 2},
  {productId: 9, categoryId: 3}
]

const reviews = [
  {
    title: 'Good product',
    text: 'Love this mug!',
    rating: 5,
    productId: 1,
    userId: 1
  },
  {
    title: 'Cool mug!',
    text: 'Good mug. Has yet to break',
    rating: 4,
    productId: 1,
    userId: 1
  },
  {
    title: 'My fav umbrella!',
    text: 'I did not get wet in the rain after using this umbrella',
    rating: 5,
    productId: 6,
    userId: 1
  },
  {
    title: 'Beanie is very itchy!!',
    text: 'Not nearly as comfortable as advertised. DO NOT BUY!!!',
    rating: 1,
    productId: 8,
    userId: 1
  },
  {
    title: 'Cute panda!',
    text:
      'Every time I reach into my pocket I am greeted with a lovely panda. A+',
    rating: 5,
    productId: 5,
    userId: 1
  },
  {
    title: 'Well adjusted family',
    text: 'This family has a good group dynamic',
    rating: 3,
    productId: 3,
    userId: 1
  },
  {
    title: 'Not helping',
    text: 'This product did NOT solve our plumbing problem',
    rating: 2,
    productId: 4,
    userId: 1
  },
  {
    title: '!!!',
    text: 'Very cute!!',
    rating: 5,
    productId: 4,
    userId: 1
  }
]
const orders = [
  {
    shippingAddress: '123 Hello World Ln.',
    email: 'collin@email.com',
    price: 44,
    temporaryUserId: 413254,
    status: 'pending'
  },
  {
    shippingAddress: '234 Fullstack Rd.',
    email: 'ben@email.com',
    price: 42,
    temporaryUserId: 324125,
    status: 'confirmed'
  },
  {
    shippingAddress: '200 Super st.',
    email: 'meow@amail.com',
    price: 42,
    temporaryUserId: 239875,
    userId: 2,
    status: 'shipped'
  },
  {
    shippingAddress: '456 Milky Way',
    email: 'cody@email.com',
    price: 15,
    temporaryUserId: 12345,
    userId: 1,
    status: 'shipped'
  },
  {
    shippingAddress: '456 Milky Way',
    email: 'cody@email.com',
    price: 50,
    temporaryUserId: 12345,
    userId: 1,
    status: 'delivered'
  }
]

const orderProducts = [
  {orderId: 1, productId: 1},
  {orderId: 1, productId: 2},
  {orderId: 1, productId: 3},
  {orderId: 2, productId: 1},
  {orderId: 2, productId: 3},
  {orderId: 3, productId: 2},
  {orderId: 3, productId: 5},
  {orderId: 4, productId: 2},
  {orderId: 5, productId: 4}
]

const carts = [
  {temporaryUserId: 132134, userId: 1},
  {temporaryUserId: 456},
  {temporaryUserId: 1321970, userId: 2}
]

const cartProducts = [
  {cartId: 1, productId: 1, quantity: 1},
  {cartId: 1, productId: 2, quantity: 2},
  {cartId: 1, productId: 3, quantity: 3},
  {cartId: 2, productId: 1, quantity: 1},
  {cartId: 2, productId: 3, quantity: 2}
]

// const carts = []
// const cartProduct = []

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Product.bulkCreate(products)
  await Category.bulkCreate(categories)
  // await User.bulkCreate(users)
  await Promise.all(users.map(user => User.create(user)))
  await Review.bulkCreate(reviews)
  await Order.bulkCreate(orders)
  await OrderProduct.bulkCreate(orderProducts)
  await Cart.bulkCreate(carts)
  await CartProduct.bulkCreate(cartProducts)
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
