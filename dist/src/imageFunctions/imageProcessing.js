"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp = require('sharp');
const resizeImage = (originalPathofImage, width, height) => {
    console.log(originalPathofImage);
    return sharp(path_1.default.join(__dirname, '../images/originalImage/') +
        originalPathofImage +
        '.jpg')
        .resize(width, height)
        .toFile(path_1.default.join(__dirname, '../images/resizedImage/') +
        originalPathofImage + width +
        '.jpg').then((res) => console.log(res, "resss")).catch((error) => console.log(error));
};
exports.default = resizeImage;
