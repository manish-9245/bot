// src/Routes/imageRoutes.js
import express from 'express';
import multer from 'multer';
import {
  generateModelImage,
  removeBackground,
  changeGemstoneColor,
  replaceBackground,
} from '../controllers/imageController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate-model-image', upload.single('image'), generateModelImage);
router.post('/remove-background', upload.single('image'), removeBackground);
router.post('/change-gemstone-color', upload.single('image'), changeGemstoneColor);
router.post('/replace-background', upload.single('image'), replaceBackground);

export default router;