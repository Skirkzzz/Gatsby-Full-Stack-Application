const router = require('express').Router();
const { Job } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newJob = await Job.create(
      req.body
    );

    res.status(200).json(newJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', async (req, res) => {

  try {
    const updateJob = await Job.update(req.body);

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
