const { green, red } = require('chalk');
const { db } = require('./server/db');

const products = [
  {
    name: 'Panda Mug',
    description: 'cup',
    imageUrl: '/images/mug.jpeg',
    stock: 15,
    price: 5,
    },
  {
    name: 'Panda at the back',
    description: 'backpack',
    imageUrl: '/images/mug.jpeg',
    stock: 10,
    price: 35,
  },
  {
    name: 'Panda family',
    description: 'toys',
    imageUrl: '/images/toys.jpg',
    stock: 5,
    price: 15,
  },
  {
    name: 'Cute Keychain',
    description: 'keychain',
    imageUrl: '/images/keychain.jpg',
    stock: 4,
    price: 9,
  },
  {
    name: 'Panda on my phone',
    description: 'phonecase',
    imageUrl: '/images/phonecase.jpg',
    stock: 8,
    price: 16,
  },
  {
    name: 'Panda umbrella',
    description: 'umbrella',
    imageUrl: '/images/umbrella.jpg',
    stock: 1,
    price: 14,
  },
  {
    name: 'Comfy panda',
    description: 'pillow',
    imageUrl: '/images/pillow.jpg',
    stock: 6,
    price: 20,
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
    },
]

const users = [
    {
        isAdmin: true,
        email: 'cody@amail.com',
        userName: 'codythedog',
        password: 12345,
        firstName: 'Cody',
        lastName: 'Dog',
        billingAddress: '100 Superior st, Chicago, IL'
    },
    {
        email: 'meow@amail.com',
        userName: 'meowthecat',
        password: abcde,
        firstName: 'Meow',
        lastName: 'Cat',
        billingAddress: '200 Super st, Chicago, IL'
    },
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
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Product.bulkCreate(products);
    await Category.bulkCreate(categories);
    await ProductCategories.bulkCreate(productCategories);
    await User.bulkCreate(users);
  } catch (err) {
    console.log(red(err));
  }
};


module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Something went wrong!'));
      console.error(err);
      db.close();
    });
}
