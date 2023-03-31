// import { v2 as cloudinary } from 'cloudinary';
// const v2 = require('cl');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dem7mdzh7",
    api_key: "416724216478164",
    api_secret: "4mGBUv7EZlUTyhkKUCGfgATpPhc",
});

module.exports = cloudinary;