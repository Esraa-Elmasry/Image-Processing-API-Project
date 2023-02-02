"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = (fileName, width, height) => {
    const inputPath = path_1.default.join(process.cwd(), 'images/originalImage/') +
        fileName +
        '.jpg';
    const outputFile = path_1.default.join(process.cwd(), 'images/resizedImage/') +
        fileName + width +
        '.jpg';
    return (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFile(outputFile);
};
exports.default = resizeImage;
