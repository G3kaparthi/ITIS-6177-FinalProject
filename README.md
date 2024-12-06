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
  "message": ""
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

-**URL**: http://your-server-ip:3000/detect-objects

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

-**URL**: http://your-server-ip:3000/image-info

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

**URL**: http://your-server-ip:3000/process-image

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

# Test URL Request and Response in Postman 

### 1. **GET /** 

**URL** - http://204.48.17.243:3000 (GET)

**Response**:  
```
{
  "message": "Welcome to the Image Analysis API!"
}
```
### 2. POST /describe-image /

**URL** - http://204.48.17.243:3000/describe-image (POST)

**Request**

{
  "imageUrl": "https://i.imgur.com/7tDrvDG.jpeg"
}

**Response**
```
{
    "description": {
        "tags": [
            "tree",
            "palm",
            "outdoor",
            "sky",
            "light",
            "sunset",
            "plant",
            "lined"
        ],
        "captions": [
            {
                "text": "a street with palm trees and buildings",
                "confidence": 0.5085804462432861
            }
        ]
    },
    "requestId": "b2c5fb7d-0c9a-4ef1-8399-ecb6f4d76e1f",
    "metadata": {
        "height": 3328,
        "width": 4864,
        "format": "Jpeg"
    },
    "modelVersion": "2021-05-01"
}
```
### 3. POST /detect-objects

**URL** - http://204.48.17.243:3000/detect-objects (POST)

**Request**

{
  "imageUrl": "https://i.imgur.com/7tDrvDG.jpeg"
}

**Response**
```
{
    "objects": [
        {
            "rectangle": {
                "x": 267,
                "y": 0,
                "w": 749,
                "h": 2841
            },
            "object": "palm tree",
            "confidence": 0.515,
            "parent": {
                "object": "tree",
                "confidence": 0.541,
                "parent": {
                    "object": "plant",
                    "confidence": 0.542
                }
            }
        },
        {
            "rectangle": {
                "x": 0,
                "y": 1433,
                "w": 476,
                "h": 1567
            },
            "object": "palm tree",
            "confidence": 0.625,
            "parent": {
                "object": "tree",
                "confidence": 0.63,
                "parent": {
                    "object": "plant",
                    "confidence": 0.632
                }
            }
        },
        {
            "rectangle": {
                "x": 997,
                "y": 1662,
                "w": 588,
                "h": 1330
            },
            "object": "palm tree",
            "confidence": 0.529,
            "parent": {
                "object": "tree",
                "confidence": 0.533,
                "parent": {
                    "object": "plant",
                    "confidence": 0.534
                }
            }
        }
    ],
    "requestId": "f9e8a070-8e61-4b25-b6d8-889ab2913816",
    "metadata": {
        "height": 3328,
        "width": 4864,
        "format": "Jpeg"
    },
    "modelVersion": "2021-04-01"
}
```

### 4. GET /image-info

**URL** - http://204.48.17.243:3000/image-info?imageUrl=https%3A%2F%2Fi.imgur.com%2F7tDrvDG.jpeg (GET)

**Response** - 
```
{
    "tags": [
        {
            "name": "outdoor",
            "confidence": 0.9986806511878967
        },
        {
            "name": "sky",
            "confidence": 0.9843864440917969
        },
        {
            "name": "palm tree",
            "confidence": 0.9722390174865723
        },
        {
            "name": "cloud",
            "confidence": 0.9592316150665283
        },
        {
            "name": "car",
            "confidence": 0.9511812925338745
        },
        {
            "name": "street",
            "confidence": 0.9480193257331848
        },
        {
            "name": "road",
            "confidence": 0.9386511445045471
        },
        {
            "name": "arecales",
            "confidence": 0.9338918924331665
        },
        {
            "name": "sunset",
            "confidence": 0.9197931289672852
        },
        {
            "name": "vehicle",
            "confidence": 0.8952008485794067
        },
        {
            "name": "land vehicle",
            "confidence": 0.8819502592086792
        },
        {
            "name": "date palm",
            "confidence": 0.8769435882568359
        },
        {
            "name": "street light",
            "confidence": 0.874387264251709
        },
        {
            "name": "building",
            "confidence": 0.8660222291946411
        },
        {
            "name": "attalea speciosa",
            "confidence": 0.8529790043830872
        },
        {
            "name": "city",
            "confidence": 0.8024938702583313
        },
        {
            "name": "palm",
            "confidence": 0.8006398677825928
        },
        {
            "name": "tree",
            "confidence": 0.7937787175178528
        },
        {
            "name": "sunrise",
            "confidence": 0.7754545211791992
        },
        {
            "name": "plant",
            "confidence": 0.7179710865020752
        },
        {
            "name": "sun",
            "confidence": 0.5257657170295715
        },
        {
            "name": "landscape",
            "confidence": 0.4525394141674042
        }
    ],
    "requestId": "4514192c-5e9d-4041-a5d4-f61e2aa479ef",
    "metadata": {
        "height": 3328,
        "width": 4864,
        "format": "Jpeg"
    },
    "modelVersion": "2021-04-01"
}
```
### 5. PUT /process-image

**URL** - http://204.48.17.243:3000/process-image?operation=describe

**Request**

{
  "imageUrl": "https://i.imgur.com/7tDrvDG.jpeg"
}

**Response**
```
{
    "description": {
        "tags": [
            "tree",
            "palm",
            "outdoor",
            "sky",
            "light",
            "sunset",
            "plant",
            "lined"
        ],
        "captions": [
            {
                "text": "a street with palm trees and buildings",
                "confidence": 0.5085801482200623
            }
        ]
    },
    "requestId": "410b4d14-4521-44a1-86b7-e0e5000d82d8",
    "metadata": {
        "height": 3328,
        "width": 4864,
        "format": "Jpeg"
    },
    "modelVersion": "2021-05-01"
}
```
**URL** - http://204.48.17.243:3000/process-image?operation=tag

**Request**

{
  "imageUrl": "https://i.imgur.com/7tDrvDG.jpeg"
}

**Response**
```
{
    "tags": [
        {
            "name": "outdoor",
            "confidence": 0.9986806511878967
        },
        {
            "name": "sky",
            "confidence": 0.9843864440917969
        },
        {
            "name": "palm tree",
            "confidence": 0.9722390174865723
        },
        {
            "name": "cloud",
            "confidence": 0.9592316150665283
        },
        {
            "name": "car",
            "confidence": 0.9511812925338745
        },
        {
            "name": "street",
            "confidence": 0.9480193257331848
        },
        {
            "name": "road",
            "confidence": 0.9386511445045471
        },
        {
            "name": "arecales",
            "confidence": 0.9338918924331665
        },
        {
            "name": "sunset",
            "confidence": 0.9197931289672852
        },
        {
            "name": "vehicle",
            "confidence": 0.8952008485794067
        },
        {
            "name": "land vehicle",
            "confidence": 0.8819502592086792
        },
        {
            "name": "date palm",
            "confidence": 0.8769435882568359
        },
        {
            "name": "street light",
            "confidence": 0.874387264251709
        },
        {
            "name": "building",
            "confidence": 0.8660222291946411
        },
        {
            "name": "attalea speciosa",
            "confidence": 0.8529790043830872
        },
        {
            "name": "city",
            "confidence": 0.8024938702583313
        },
        {
            "name": "palm",
            "confidence": 0.8006398677825928
        },
        {
            "name": "tree",
            "confidence": 0.7937787175178528
        },
        {
            "name": "sunrise",
            "confidence": 0.7754545211791992
        },
        {
            "name": "plant",
            "confidence": 0.7179710865020752
        },
        {
            "name": "sun",
            "confidence": 0.5257657170295715
        },
        {
            "name": "landscape",
            "confidence": 0.4525394141674042
        }
    ],
    "requestId": "ef45b735-3fdc-4e85-839c-d4a68417f55a",
    "metadata": {
        "height": 3328,
        "width": 4864,
        "format": "Jpeg"
    },
    "modelVersion": "2021-04-01"
}
```

# Swagger Documentation
You can view the API documentation and try out the endpoints using Swagger at:
```
http://204.48.17.243:3000/api-docs
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
