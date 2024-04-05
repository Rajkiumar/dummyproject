const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose")
const mongobduri = process.env.MONGODB_URI

// define the /env route with the response in JSON

app.get('/ping', (req,res)=> {
  res.json({message:"pong"});
})

// conecting mongodb
mongoose.connect(mongobduri)

// Defining a route to check the mongoose connecting status
app.get('/mongodbConnection0', (req,res)=> {
  if (mongoose.connection.readyState === 1){
    res.status(200).send(`MongoDB connected successfully`);
  } else {
    res.status(400).send('Error connecting to mongodb')
  }
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;