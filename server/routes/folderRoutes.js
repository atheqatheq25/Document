const express = require('express');
const Folder = require('../models/Folder');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const folder = new Folder({
      name: req.body.name,
      userId: req.user.id,
    });

    await folder.save();

    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id });
    res.json(folders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;