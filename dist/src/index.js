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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageProcessing_1 = __importDefault(require("./imageFunctions/imageProcessing"));
const logger_1 = __importDefault(require("./middleware/logger"));
const fs_1 = require("fs");
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(logger_1.default);
app.get('/', (req, res) => {
    res.status(200).send("connected");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
app.get('/images', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        let url = myCache.get(fileName + width);
        let imagresizedBuffer = yield fs_1.promises.readFile(url);
        res.sendFile(path_1.default.join(__dirname, '/images/resizedImage/') +
            fileName + width +
            '.jpg');
        res.end(imagresizedBuffer, "binary");
    }
    else {
        yield (0, imageProcessing_1.default)(fileName, parseFloat(width), parseFloat(height));
        let imagresizedBuffer = yield fs_1.promises.readFile(path_1.default.join(__dirname, '/images/resizedImage/') +
            fileName + width +
            '.jpg');
        myCache.set(fileName + width, path_1.default.join(__dirname, '/images/resizedImage/') +
            fileName + width +
            '.jpg');
        console.log(myCache, "mucahe");
        res.setHeader("Content-Type", "jpg");
        res.sendFile(path_1.default.join(__dirname, '/images/resizedImage/') +
            fileName + width +
            '.jpg');
        res.status(200);
        res.end(imagresizedBuffer, "binary");
        res.contentType("jpg");
    }
    next();
}));
exports.default = app;
