import { Router } from "express";
import fs from "fs";
import cache from "node-cache"
import express from 'express';
import resizeImage from "../imageFunctions/imageProcessing";
import path from "path";
const router= Router();
const myCache= new cache()
router.get('/image',async (req:express.Request,res:express.Response)=>{
const fileName:string = req.query.fileName as string
const width:string = req.query.width as string
const height:string = req.query.height as string

if(fileName===undefined|| width=== undefined || height===undefined){
    res.status(400).send("one of the paramters is not found")
} else if(isNaN(parseInt(width))|| isNaN(parseInt(height)))
{
    res.status(400).send("Check width ot height value")
} else if (myCache.has(fileName+width)){

   const url =myCache.get(fileName+width) as string
 fs.readFile(url,(err,data)=>{
    res.end(data,"binary").status(200)
})
}else{
 await resizeImage(fileName,parseFloat(width), parseFloat(height));
fs.readFile(path.join(process.cwd(), 'images/resizedImage/')+fileName +width+'.jpg',(err,data)=>{
    myCache.set(fileName+width,path.join(process.cwd(),'images/resizedImage/') +
fileName+width+
'.jpg')
res.end(data,"binary").status(200)
})
}

})
export default router;