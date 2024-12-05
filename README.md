# ITIS-6177-FinalProject

This documentation provides the necessary steps to set up and use the Image Analysis API built with Node.js, which integrates with Azure Computer Vision API for analyzing images.

# Introduction
This project provides a RESTful API for performing image analysis using Azure's Cognitive Services Azure AI Image Analysis
(https://azure.microsoft.com/en-us/products/ai-services/ai-vision/). 

The API accepts image URLs and returns analysis results such as categories, descriptions, and dominant colors of the image.

# Prerequisites
Before you start using the API, ensure that you have the following:

Node.js installed (preferably the latest stable version)

npm (Node Package Manager) installed

An Azure Cognitive Services account with the Computer Vision API enabled (for analyzing images)

Access to Azure API Keys and Endpoint for Computer Vision API

# Setting Up the Environment

**Clone the repository to your local machine**

git clone https://github.com/your-repo/image-analysis-api.git

**Navigate to the project directory**:

cd image-analysis-api

**Create an .env file to store sensitive environment variables**:

touch .env

**Add Azure credentials to the .env file**:

# Installing Dependencies

Run the following command to install the necessary dependencies:
```
npm install
```
The dependencies include:

'axios' for making HTTP requests

'dotenv' for managing environment variables securely

# Running the API
Start the server:
```
node image-anaylsis.js
```
# API Endpoints
# Image Analysis API

This API allows you to analyze images using Azure's Cognitive Services. You can perform tasks like image tagging, object detection, and description generation.

**Few Image links that can be tested**

https://i.imgur.com/7tDrvDG.jpeg

https://i.imgur.com/OnthWS4.jpeg

https://i.imgur.com/uUkc26y.jpeg

## API Endpoints

### 1. **GET /**  
**Description**: This is the root endpoint that can be used to check the server's basic functionality. You can customize it to provide a welcome message or simple information about the API.

- **URL**: `http://your-server-ip:3000/`
- **Method**: `GET`
  
**Response Example**:  
```
{
  "message": "Welcome to the Image Analysis API!"
}
```

### 2. POST /describe-image /
**Description**: Provides a textual description of the image.

- **URL**: http://your-server-ip:3000/describe-image
- **Method**: POST

**Request Body**:
```
{
  "imageUrl": "https://example.com/image.jpg"
}
```
**Response Example**:  
```
{
  "description": {
    "captions": [
      {
        "text": "",
        "confidence": 
      }
    ]
  }
}
```

### 3. POST /detect-objects
**Description**: Detects objects in an image and returns their details.

-**URL**: /detect-objects

-**Method**: POST

**Request Body**:
```
{
  "imageUrl": "https://example.com/image.jpg"
}
```
**Response Example**:
```
{
  "objects": [
    {
      "object": "",
      "confidence":,
    }
  ]
}
```
### 4. GET /image-info
**Description**: Fetches image information (tags) using query parameters.

-**URL**: /image-info

-**Method**: GET

-**Query Parameters**:

imageUrl (string, required): URL of the image to be analyzed.

**Response Example**:
```
{
  "tags": [
    {
      "name": "",
      "confidence": 
    },
    {
      "name": "",
      "confidence": 
    }
  ]
}
```
### 5. PUT /process-image
**Description**: Unified endpoint for tagging or describing images based on query parameters.

**URL**: /process-image

**Method**: PUT

**Query Parameter**:

operation (string, optional): Type of analysis (tag or describe). Defaults to tag.

**Request Body**:
```
{
  "imageUrl": "https://example.com/image.jpg"
}
```
***Response Example for describe**:
```
{
  "description": {
    "captions": [
      {
        "text": "",
        "confidence": 
      }
    ]
  }
}
```
**Response Example for tag**:
```
{
  "tags": [
    {
      "name": "",
      "confidence": 
    },
    {
      "name": "",
      "confidence": 
    }
  ]
}
```
# Swagger Documentation
You can view the API documentation and try out the endpoints using Swagger at:
```
http://your-server-ip:3000/api-docs
```
# Error Handling
If the request body or query parameters are missing or invalid, the API will return a 400 Bad Request response with an error message.

**Example error**:
```
{
  "error": "Missing imageUrl query parameter."
}
```
If there's an internal server issue, a 500 Internal Server Error will be returned along with a message detailing the error.

# Rate Limits and Performance Considerations

This API leverages Azure Cognitive Services for image analysis, which operates under a rate limiting system. While we strive for optimal performance, exceeding these limits can lead to delays or errors.

Current Azure Cognitive Services Plan:

**Pricing Tier**: Free (F0)

**Rate Limits**: 20 Calls per minute

**5,000 Calls per month**

**Impact on API Performance**:

Heavy usage exceeding these limits might impact your API's performance. To ensure smooth operation, we recommend:

**Moderate Usage**: Avoid overwhelming the service with excessive requests within short intervals.

**Error Handling**: Implement proper error handling to manage potential rate limit errors gracefully.

**Additional Tips for Optimal Performance**:

**Consider Caching**: Implementing caching mechanisms can reduce load on the Azure service and improve response times.

**Monitor Usage**: Regularly monitor your API's usage and the underlying Azure service to identify potential bottlenecks. This allows for proactive optimization.

# Contributing

This project is open-source and welcomes contributions. If you'd like to contribute, please fork the repository and submit a pull request.

# License

This project is licensed under the MIT 1  License
