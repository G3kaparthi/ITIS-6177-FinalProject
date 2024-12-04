const express = require('express');
const axios = require('axios');
const Joi = require('joi');
require('dotenv').config();

const { swaggerDocs, swaggerUi } = require('./swagger-jsdoc'); // Import Swagger docs
const app = express();

// Middleware
app.use(express.json());

// Environment Variables
const AZURE_API_KEY = process.env.AZURE_API_KEY;
const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT;

// Define constants for Azure API endpoints
const AZURE_TAG_ENDPOINT = "vision/v3.2/tag";
const AZURE_OCR_ENDPOINT = "vision/v3.2/ocr";
const AZURE_DESCRIBE_ENDPOINT = "vision/v3.2/describe";
const AZURE_DETECT_ENDPOINT = "vision/v3.2/detect";

// Reusable validation middleware
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

// Validation schema for Image URL
const imageUrlSchema = Joi.object({
  imageUrl: Joi.string().uri().required(),
});

// Helper function to call Azure API
async function analyzeImage(endpoint, params, imageUrl) {
  try {
    const response = await axios.post(
      `${AZURE_ENDPOINT}${endpoint}`,
      { url: imageUrl },
      {
        params,
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling Azure API:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * @swagger
 * /describe-image:
 *   post:
 *     summary: Provides a textual description of the image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Returns an image description.
 */
app.post("/describe-image", validateRequest(imageUrlSchema), async (req, res) => {
  try {
    const result = await analyzeImage(AZURE_DESCRIBE_ENDPOINT, {}, req.body.imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /detect-objects:
 *   post:
 *     summary: Detects objects in an image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Returns detected objects with bounding boxes.
 */
app.post("/detect-objects", validateRequest(imageUrlSchema), async (req, res) => {
  try {
    const result = await analyzeImage(AZURE_DETECT_ENDPOINT, {}, req.body.imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /image-info:
 *   get:
 *     summary: Fetches image information (tags) using query parameters
 *     parameters:
 *       - in: query
 *         name: imageUrl
 *         schema:
 *           type: string
 *         required: true
 *         description: URL of the image
 *     responses:
 *       200:
 *         description: Returns image tags.
 */
app.get("/image-info", async (req, res) => {
  const { imageUrl } = req.query;
  if (!imageUrl) return res.status(400).send("Missing imageUrl query parameter.");

  try {
    const result = await analyzeImage(AZURE_TAG_ENDPOINT, {}, imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /process-image:
 *   put:
 *     summary: Unified endpoint for tagging or describing images
 *     parameters:
 *       - in: query
 *         name: operation
 *         schema:
 *           type: string
 *           enum: [tag, describe]
 *         description: Operation type (tag or describe)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Returns results based on operation.
 */
app.put("/process-image", async (req, res) => {
  const { error } = imageUrlSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { operation = "tag" } = req.query;
  const endpointMap = {
    tag: AZURE_TAG_ENDPOINT,
    describe: AZURE_DESCRIBE_ENDPOINT,
  };

  const selectedEndpoint = endpointMap[operation];
  if (!selectedEndpoint) {
    return res.status(400).send("Invalid operation type. Use 'tag' or 'describe'.");
  }

  try {
    const result = await analyzeImage(selectedEndpoint, {}, req.body.imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));