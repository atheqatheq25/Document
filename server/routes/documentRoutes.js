const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  '/upload/:folderId',
  authMiddleware,
  upload.single('file'),
  async (req, res) => {
    try {
      const document = new Document({
        filename: req.file.originalname,
        path: req.file.filename,
        folderId: req.params.folderId,
      });

      await document.save();

      res.status(201).json(document);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/:folderId', authMiddleware, async (req, res) => {
  try {
    const docs = await Document.find({ folderId: req.params.folderId });
    res.json(docs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;