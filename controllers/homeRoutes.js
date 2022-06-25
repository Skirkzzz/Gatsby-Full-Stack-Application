const router = require('express').Router();
const { getEnabledCategories } = require('trace_events');
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
    const jobs = jobData.map((jobs) => jobs.get({ plain: true }));

    console.log(jobs);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      jobs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Load up all the posts
const postsData = await this.post.findAll({
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
    const posts = postsData.map((post) =>
    post.get({ plain: true})

//Load in categories and users so that these can be displayed
const { categories, users} = await getEnabledCategories();

res.render("homepage", {
  posts,
  categories,
  users,
  loggedIn: req.session.loggedIn,
})



    // Serialize data so the template can read it
    const jobs = jobData.map((jobs) => jobs.get({ plain: true }));

    console.log(jobs);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      jobs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

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
