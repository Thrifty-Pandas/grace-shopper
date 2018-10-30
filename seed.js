const { green, red } = require('chalk');
const { db } = require('./server/db');

const products = [
  {
    name: 'Panda Mug',
    description: 'cup',
    imageUrl: '/images/mug.jpeg',
    quantity: 15,
    price: 5,
    category: [
        { name: 'kitchen'},
      ]
    },
  {
    name: 'Panda at the back',
    description: 'backpack',
    imageUrl: '/images/mug.jpeg',
    quantity: 10,
    price: 35,
    category: [
        { name: 'accesories'},
        { name: 'home'},
      ]
  },
  {
    name: 'Panda family',
    description: 'toys',
    imageUrl: '/images/toys.jpg',
    quantity: 5,
    price: 15,
    category: [
        { name: 'toys'},
      ]
  },
  {
    name: 'Cute Keychain',
    description: 'keychain',
    imageUrl: '/images/keychain.jpg',
    quantity: 4,
    price: 9,
    category: [
        { name: 'accesories'},
      ]
  },
  {
    name: 'Panda on my phone',
    description: 'phonecase',
    imageUrl: '/images/phonecase.jpg',
    quantity: 8,
    price: 16,
    category: [
        { name: 'accesories'},
      ]
  },
  {
    name: 'Panda umbrella',
    description: 'umbrella',
    imageUrl: '/images/umbrella.jpg',
    quantity: 1,
    price: 14,
    category: [
        { name: 'home'},
        { name: 'accesories'},
      ]
  },
  {
    name: 'Comfy panda',
    description: 'pillow',
    imageUrl: '/images/pillow.jpg',
    quantity: 6,
    price: 20,
    category: [
        { name: 'home'},
      ]
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
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Product.bulkCreate(products, {  include: [{
        model: Categories,
        as: 'ProductCategory'
      }]});
    await Category.bulkCreate(categories);
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
