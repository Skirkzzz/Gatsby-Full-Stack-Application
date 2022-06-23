const sequelize = require('../config/connection');
const { User, Jobs, Category } = require('../models');

const userData = require('./userData.json');
const jobsData = require('./jobsData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const jobsData of JobsData) {
    await Jobs.create({
      ...Jobs,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const categoryData of categoryData) {
    await categoryData.create({
      ...Category,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
