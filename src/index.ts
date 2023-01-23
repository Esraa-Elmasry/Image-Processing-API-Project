import express from 'express';
import path from 'path';


import resizeImage from './imageFunctions/imageProcessing';
import logger from './middleware/logger';
import {promises as fs} from "fs";

import cache from "node-cache"
import { Key } from 'readline';
const myCache = new cache();
const app = express();
const port =  3000;

app.use(express.json());
app.use(logger);




app.get('/', (req, res) => {
   res.status(200).send("connected");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
app.get('/images',async (req:express.Request,res:express.Response, next:express.NextFunction)=> {
       const fileName:string = req.query.fileName as string
    const width:string = req.query.width as string
    const height:string = req.query.height as string

if(fileName===undefined|| width=== undefined || height===undefined){
    res.status(400).send("one of the paramters is not found")
} else if(isNaN(parseInt(width))|| isNaN(parseInt(height)))
{
    res.status(400).send("Check width ot height value")
}
 else if (myCache.has(fileName+width)){

    let url =myCache.get(fileName+width) as string
let imagresizedBuffer=await fs.readFile(url)
res.sendFile(path.join(__dirname, '/images/resizedImage/') +
fileName+width+
'.jpg')
res.end(imagresizedBuffer,"binary")
}

else {

await  resizeImage(fileName,parseFloat(width), parseFloat (height));
let imagresizedBuffer=await fs.readFile(path.join(__dirname, '/images/resizedImage/') +
fileName +width+
'.jpg')
myCache.set(fileName+width,path.join(__dirname, '/images/resizedImage/') +
fileName+width+
'.jpg')
console.log(myCache,"mucahe")
res.setHeader("Content-Type","jpg")
res.sendFile(path.join(__dirname, '/images/resizedImage/') +
fileName+width+
'.jpg')
res.status(200)
res.end(imagresizedBuffer,"binary")
res.contentType("jpg")
}

      next();
 });
 
export default app;