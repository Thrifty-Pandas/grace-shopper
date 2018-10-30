const { green, red } = require('chalk');
const { db } = require('./server/db');

const products = [
  {
    name: 'Panda Mug',
    description: 'cup',
    imageUrl: '/images/mug.jpeg',
    quantity: 15,
    price: 5,
  },
  {
    name: 'Panda at the back',
    description: 'backpack',
    imageUrl: '/images/mug.jpeg',
    quantity: 10,
    price: 35,

  },
  {
    name: 'Panda family',
    description: 'toys',
    imageUrl: '/images/toys.jpg',
    quantity: 5,
    price: 15,

  },
  {
    name: 'Cute Keychain',
    description: 'keychain',
    imageUrl: '/images/keychain.jpg',
    quantity: 4,
    price: 9,

  },
  {
    name: 'Panda on my phone',
    description: 'phonecase',
    imageUrl: '/images/phonecase.jpg',
    quantity: 8,
    price: 16,

  },
  {
    name: 'Panda umbrella',
    description: 'umbrella',
    imageUrl: '/images/umbrella.jpg',
    quantity: 1,
    price: 14,

  },
  {
    name: 'Comfy panda',
    description: 'pillow',
    imageUrl: '/images/pillow.jpg',
    quantity: 6,
    price: 20,
  }
]


const seed = async () => {
  try {
    await db.sync({ force: true });
    await Product.bulkCreate(products);
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
