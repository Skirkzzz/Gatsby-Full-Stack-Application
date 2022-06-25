const User = require('./User');
const Job = require('./Job');
const Category = require('./Category');


User.hasMany(Job, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Job.belongsTo(User, {
  foreignKey: 'author_id'
});

Job.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Job, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Job, Category };
