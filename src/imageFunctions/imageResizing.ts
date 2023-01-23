// import express from "express"
// import logger from "../middleware/logger";
// import resizeImage from "./imageProcessing";
// import {promises as fs} from "fs";

// const image= express.Router();
// image.get("/images",logger,async(req:express.Request,res:express.Response, next:express.NextFunction)=>{
//     // const fileName:string = req.query.name as string
//     // const width:string = req.query.width as string
//     // const height:string = req.query.height as string
//     // console.log(fileName,"lll")

// // if(fileName===undefined|| width=== undefined || height===undefined){
// //     res.status(400).send("one of the paramters is not found")
// // } else if(isNaN(parseInt(width))|| isNaN(parseInt(height)))
// // {
// //     res.status(400).send("Check width ot height value")
// // }else {
// //  await  resizeImage(fileName,parseFloat(width), parseFloat (height),fileName);
// // let imagresizedBuffer=fs.readFile(`images/resizedImage/resized${fileName}.jpg`)
// // res.end(imagresizedBuffer,"binary")
// // }
// console.log(res,"hhh")
// console.log("kkk")
// res.send("helo")
//     //  next();
// })
// export default image;