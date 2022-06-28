const router = require('express').Router();
const { where, and } = require('sequelize/types');
const { Category, User, Job } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log('Home page route is running');
    const jobData = await Job.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Category,
        },
      ],
    });

    // Serialize data so the template can read it
    const jobs = jobData.map((job) => job.get({ plain: true }));

        console.log('Categories are running');
        const categoriesData = await Category.findAll({
          include: [
            {
              model: User,
            },
            {
              model: Category,
            },
          ],
        });
    
        // Serialize data so the template can read it
        const categories = categoriesData.map((category) => category.get({ plain: true }));


    const companies = [];

    jobs.forEach((job) => {
      if (!companies.includes(job.company_name)) {
        companies.push(job.company_name)
      }
    })

    
    // Pass serialized data and session flag into template
    res.render('homepage', {
      jobs,
      companies,
      categories,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  });

  router.get('/jobs/:id', async (req, res) => {
    try {
      console.log('Home Job route is running')
const jobData = await Job.findByPk(req.params.id, {
  include: [
    {
      model: User,
    }
    {
      model: Category,
    },
  ],
});


  // Serialize data so the template can read it
  const job = jobData.get({ plain: true });

  console.log(job);
  // Pass serialized data and session flag into template
  res.render('job-details', {
    job,
    logged_in: req.session.logged_in
  });
} catch (err) {
  res.status(500).json(err);
}
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: jobs }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
