import path from "path";

const sharp = require('sharp');
const resizeImage=(originalPathofImage:string, width:number, height:number)=>{
  console.log(originalPathofImage)
  return sharp( path.join(__dirname, '../images/originalImage/') +
  originalPathofImage +
  '.jpg'
  )
  .resize(width, height)
  .toFile(path.join(__dirname, '../images/resizedImage/') +
  originalPathofImage+width+
  '.jpg').then((res:any)=>console.log(res,"resss")).catch((error:any)=>console.log(error))
}
export default resizeImage;