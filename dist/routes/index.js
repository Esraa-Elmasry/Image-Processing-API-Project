"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const node_cache_1 = __importDefault(require("node-cache"));
const imageProcessing_1 = __importDefault(require("../imageFunctions/imageProcessing"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const myCache = new node_cache_1.default();
router.get('/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    if (fileName === undefined || width === undefined || height === undefined) {
        res.status(400).send("one of the paramters is not found");
    }
    else if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
        res.status(400).send("Check width ot height value");
    }
    else if (myCache.has(fileName + width)) {
        const url = myCache.get(fileName + width);
        fs_1.default.readFile(url, (err, data) => {
            res.end(data, "binary").status(200);
        });
    }
    else {
        yield (0, imageProcessing_1.default)(fileName, parseFloat(width), parseFloat(height));
        fs_1.default.readFile(path_1.default.join(process.cwd(), 'images/resizedImage/') + fileName + width + '.jpg', (err, data) => {
            myCache.set(fileName + width, path_1.default.join(process.cwd(), 'images/resizedImage/') +
                fileName + width +
                '.jpg');
            res.end(data, "binary").status(200);
        });
    }
}));
exports.default = router;
