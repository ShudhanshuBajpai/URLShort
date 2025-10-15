import express from 'express';
const router = express.Router();
import { URLModel } from '../database/url.schema.js';

router.get('/:code', async (req, res) => {
  try {
    const reqUrlCode = req.params.code;

    const url = await URLModel.findOne({
      urlCode: reqUrlCode
    });

    if (!url) {
      return res.status(404).json({ success: false, message: 'No URL Found' });
    }

    res.status(200).json({
      success: true,
      hitCount: url.hitCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error'});
  }
});

export default router;
