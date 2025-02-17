# Image Upload and Twitter Post Application

This is a web application that allows users to upload an image, resize it into multiple dimensions, and automatically post the resized images to their X (formerly Twitter) account.

## Features

- Image upload functionality with file validation.
- Automatic image resizing into multiple predefined sizes.
- Integration with X (formerly Twitter) API to post images to the user's account.

## Requirements

- Node.js (v14 or higher)
- NPM or Yarn
- X (formerly Twitter) Developer Account and API credentials

## Setup Instructions

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-repository-name.git
cd your-repository-name
```

### 2. Backend Setup

In the backend directory, install the necessary dependencies:

```bash
cd backend
npm install
```
Configure X (formerly Twitter) API Credentials
In the server.js file, replace the following placeholders with your own X (formerly Twitter) API credentials:

```bash
const twitterClient = new TwitterApi({
  clientId: 'USER_CLIENT_ID',
  clientSecret: 'USER_CLIENT_SECRET',
  accessToken: 'USER_ACCESS_TOKEN',
  accessTokenSecret: 'USER_ACCESS_TOKEN_SECRET',
});
```

You will need to update the above data with your personal credentials from the Twitter Developer platform.

Start the backend server:

```bash
npm start
The backend will be available on http://localhost:5000.
```

### 3. Frontend Setup

In the frontend directory, install the necessary dependencies:

```bash
cd frontend
npm install
```
Start the frontend application:

```bash
npm start
```
The frontend will be available on http://localhost:3000.

### 4. Using the Application
1. Open the frontend in your browser.
2. Select an image to upload from your local machine.
3. The image will automatically be resized into the following dimensions:
        300x250
        728x90
        160x600
        300x600
4. After resizing, the application will post all four resized images to your X (formerly Twitter) account.

### 5. Handling Errors
If an error occurs during the image upload or posting process, the frontend will display a relevant error message. The backend will log errors to the console for debugging purposes.

### 6. Technology Stack
Frontend: React.js
Backend: Node.js, Express.js
Image Processing: Sharp
X (formerly Twitter) API: twitter-api-v2
