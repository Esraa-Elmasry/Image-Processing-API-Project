import path from "path";
import sharp from "sharp";

const resizeImage = (
  fileName: string,
  width: number,
  height: number
): Promise<sharp.OutputInfo> => {
  const inputPath =
    path.join(process.cwd(), "images/originalImage/") + fileName + ".jpg";
  const outputFile =
    path.join(process.cwd(), "images/resizedImage/") +
    fileName + "-" +
    width + "-" +
    height +
    ".jpg";
  return sharp(inputPath).resize(width, height).toFile(outputFile);
};
export default resizeImage;
