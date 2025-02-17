const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const twitterClient = new TwitterApi({
  clientId: 'USER_CLIENT_ID',
  clientSecret: 'USER_CLIENT_SECRET',
  accessToken: 'USER_ACCESS_TOKEN',
  accessTokenSecret: 'USER_ACCESS_TOKEN_SECRET',
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadImageToTwitter = async (imagePath) => {
  try {
    const media = await twitterClient.v1.uploadMedia(imagePath, { type: 'image/jpeg' });
    return media.media_url_https;
  } catch (error) {
    console.error('Error uploading image to Twitter:', error);
    throw new Error('Failed to upload image to Twitter');
  }
};

const postTweetWithImage = async (imagePath, text) => {
  try {
    const mediaUrl = await uploadImageToTwitter(imagePath);
    await twitterClient.v1.tweet({
      status: text,
      media_ids: mediaUrl,
    });
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw new Error('Failed to post tweet');
  }
};

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const sizes = [
    { width: 300, height: 250, name: '300x250' },
    { width: 728, height: 90, name: '728x90' },
    { width: 160, height: 600, name: '160x600' },
    { width: 300, height: 600, name: '300x600' },
  ];

  const originalFilePath = req.file.path;
  try {
    for (const size of sizes) {
      const outputFilePath = `uploads/${size.name}-${req.file.filename}`;
      await sharp(originalFilePath)
        .resize(size.width, size.height)
        .toFile(outputFilePath);

      const tweetText = `Check out this ${size.name} image!`;
      await postTweetWithImage(outputFilePath, tweetText);
    }

    res.send('File uploaded, resized, and posted to Twitter successfully.');
  } catch (error) {
    console.error('Error resizing and posting image:', error);
    res.status(500).send('Error processing the image and posting to Twitter.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
