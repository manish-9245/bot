import imageService from '../services/imageService.js';

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
    const imageBufferOut = await imageService.generateModelImage(
      req.file.buffer,
      req.file.mimetype
    );
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
    const imageBufferOut = await imageService.removeBackground(
      req.file.buffer,
      req.file.mimetype
    );
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
    const color = req.body.color;
    if (!color) {
      return res.status(400).json({ error: 'Color parameter is required' });
    }
    
    const imageBufferOut = await imageService.changeGemstoneColor(
      req.file.buffer,
      req.file.mimetype,
      color
    );
    res.set('Content-Type', 'image/png');
    res.send(imageBufferOut);
  } catch (error) {
    console.error(error);
    if (error.message === 'Color parameter is required') {
      return res.status(400).json({ error: error.message });
    }
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
    const background = req.body.background;
    if (!background) {
      return res.status(400).json({ error: 'Background parameter is required' });
    }
    
    const imageBufferOut = await imageService.replaceBackground(
      req.file.buffer,
      req.file.mimetype,
      background
    );
    res.set('Content-Type', 'image/png');
    res.send(imageBufferOut);
  } catch (error) {
    console.error(error);
    if (error.message === 'Background parameter is required') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to generate image' });
  }
}

export {
  generateModelImage,
  removeBackground,
  changeGemstoneColor,
  replaceBackground,
};