// src/controllers/imageController.js
import { generateImage } from '../utils/apiHelper.js';

/**
 * @swagger
 * /image/generate-model-image:
 *   post:
 *     summary: Generate an e-commerce image of a model wearing the jewellery
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Generated image of a model with jewellery
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Failed to generate image
 */
async function generateModelImage(req, res) {
  try {
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
    const contents = [
      {
        text: 'Generate an Ecommerce listing suitable image of a real human female model wearing the exact jewellery in input on a suitable body part, keep the background and lighting suitable for ecommerce in high resolution',
      },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ];
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const imageData = await generateImage(apiKey, contents);
    const imageBufferOut = Buffer.from(imageData, 'base64');
    res.set('Content-Type', 'image/png');
    res.send(imageBufferOut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}

/**
 * @swagger
 * /image/remove-background:
 *   post:
 *     summary: Remove background from the jewellery image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Jewellery image with background removed
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Failed to generate image
 */
async function removeBackground(req, res) {
  try {
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
    const contents = [
      {
        text: 'Remove the background of the provided jewellery and keep the exact jewellery as it is on a white background with good lighting and premium look for an ecommerce listing',
      },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ];
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const imageData = await generateImage(apiKey, contents);
    const imageBufferOut = Buffer.from(imageData, 'base64');
    res.set('Content-Type', 'image/png');
    res.send(imageBufferOut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}

/**
 * @swagger
 * /image/change-gemstone-color:
 *   post:
 *     summary: Change gemstone color in the jewellery image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               color:
 *                 type: string
 *                 description: New color for the gemstones (e.g., "red")
 *             required:
 *               - image
 *               - color
 *     responses:
 *       200:
 *         description: Image with changed gemstone color
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Color parameter is required
 *       500:
 *         description: Failed to generate image
 */
async function changeGemstoneColor(req, res) {
  try {
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
    const color = req.body.color;
    if (!color) {
      return res.status(400).json({ error: 'Color parameter is required' });
    }
    const contents = [
      {
        text: `Change the colour of gemstones provided in image to ${color}`,
      },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ];
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const imageData = await generateImage(apiKey, contents);
    const imageBufferOut = Buffer.from(imageData, 'base64');
    res.set('Content-Type', 'image/png');
    res.send(imageBufferOut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}

/**
 * @swagger
 * /image/replace-background:
 *   post:
 *     summary: Replace background of the jewellery image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               background:
 *                 type: string
 *                 description: New background description (e.g., "beach")
 *             required:
 *               - image
 *               - background
 *     responses:
 *       200:
 *         description: Image with replaced background
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Background parameter is required
 *       500:
 *         description: Failed to generate image
 */
async function replaceBackground(req, res) {
  try {
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
    const background = req.body.background;
    if (!background) {
      return res.status(400).json({ error: 'Background parameter is required' });
    }
    const contents = [
      {
        text: `Replace the background of the jewellery provided in image with ${background}`,
      },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ];
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const imageData = await generateImage(apiKey, contents);
    const imageBufferOut = Buffer.from(imageData, 'base64');
    res.set('Content-Type', 'image/png');
    res.send(imageBufferOut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}

export {
  generateModelImage,
  removeBackground,
  changeGemstoneColor,
  replaceBackground,
};