const sequelize = require('../config/connection');
const { User, Job, Category } = require('../models');

const userData = require('./userData.json');
const jobData = require('./jobsData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await User.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  for (const jobsRecord of JobsData) {
    await Jobs.create({
      ...jobsRecord,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      category_id: categories[Math.floor(Math.random() * categories.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
