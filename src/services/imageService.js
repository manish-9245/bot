import { generateImage } from '../utils/apiHelper.js';
import sharp from 'sharp'; // You'll need to install this: npm install sharp

class ImageService {
  /**
   * Ensures image is in supported format (PNG or JPEG)
   * @param {Buffer} imageBuffer - The image buffer
   * @param {string} mimetype - The original mimetype
   * @returns {Promise<{buffer: Buffer, mimetype: string}>} - The processed buffer and new mimetype
   */
  async ensureSupportedImageFormat(imageBuffer, mimetype) {
    const supportedFormats = ['image/jpeg', 'image/png'];
    
    if (supportedFormats.includes(mimetype)) {
      return { buffer: imageBuffer, mimetype };
    }

    // Convert to PNG for best compatibility
    try {
      const convertedBuffer = await sharp(imageBuffer).png().toBuffer();
      return { buffer: convertedBuffer, mimetype: 'image/png' };
    } catch (error) {
      console.error('Image conversion error:', error);
      throw new Error('Failed to convert image to supported format');
    }
  }

  async generateModelImage(imageBuffer, mimetype) {
    try {
      // Convert image if needed
      const { buffer, mimetype: newMimetype } = await this.ensureSupportedImageFormat(imageBuffer, mimetype);
      
      const base64Image = buffer.toString('base64');
      const contents = [
        {
          text: 'Generate an Ecommerce listing suitable image of a real human female model wearing the exact jewellery in input on a suitable body part, keep the background and lighting suitable for ecommerce in high resolution',
        },
        {
          inlineData: {
            mimeType: newMimetype,
            data: base64Image,
          },
        },
      ];
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      const imageData = await generateImage(apiKey, contents);
      return Buffer.from(imageData, 'base64');
    } catch (error) {
      console.error('Error in generateModelImage:', error);
      throw error;
    }
  }

  async removeBackground(imageBuffer, mimetype) {
    try {
      // Convert image if needed
      const { buffer, mimetype: newMimetype } = await this.ensureSupportedImageFormat(imageBuffer, mimetype);
      
      const base64Image = buffer.toString('base64');
      const contents = [
        {
          text: 'Remove the background of the provided jewellery and keep the exact jewellery as it is on a white background with good lighting and premium look for an ecommerce listing',
        },
        {
          inlineData: {
            mimeType: newMimetype,
            data: base64Image,
          },
        },
      ];
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      const imageData = await generateImage(apiKey, contents);
      return Buffer.from(imageData, 'base64');
    } catch (error) {
      console.error('Error in removeBackground:', error);
      throw error;
    }
  }

  async changeGemstoneColor(imageBuffer, mimetype, color) {
    if (!color) {
      throw new Error('Color parameter is required');
    }
    
    try {
      // Convert image if needed
      const { buffer, mimetype: newMimetype } = await this.ensureSupportedImageFormat(imageBuffer, mimetype);
      
      const base64Image = buffer.toString('base64');
      const contents = [
        {
          text: `Change the colour of gemstones provided in image to ${color}`,
        },
        {
          inlineData: {
            mimeType: newMimetype,
            data: base64Image,
          },
        },
      ];
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      const imageData = await generateImage(apiKey, contents);
      return Buffer.from(imageData, 'base64');
    } catch (error) {
      console.error('Error in changeGemstoneColor:', error);
      throw error;
    }
  }

  async replaceBackground(imageBuffer, mimetype, background) {
    if (!background) {
      throw new Error('Background parameter is required');
    }
    
    try {
      // Convert image if needed
      const { buffer, mimetype: newMimetype } = await this.ensureSupportedImageFormat(imageBuffer, mimetype);
      
      const base64Image = buffer.toString('base64');
      const contents = [
        {
          text: `Replace the background of the jewellery provided in image with ${background}`,
        },
        {
          inlineData: {
            mimeType: newMimetype,
            data: base64Image,
          },
        },
      ];
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      const imageData = await generateImage(apiKey, contents);
      return Buffer.from(imageData, 'base64');
    } catch (error) {
      console.error('Error in replaceBackground:', error);
      throw error;
    }
  }
}

export default new ImageService();