import supertest from "supertest";
import resizeImage from "../imageFunctions/imageProcessing";
import app from "../index";

const request = supertest(app);
describe("test initial page", () => {
  it("get api initial end point", async () => {
    const Response = await request.get("/");
    expect(Response.status).toBe(200);
  });
});
describe("test images endpoint", () => {
  it("get api of image", async () => {
    const Response = await request.get(
      "/api/image?fileName=flower&width=1000&height=1000"
    );
    expect(Response.status).toBe(200);
  });
});

describe("test imageprocessing", () => {
  it("get resized image", async () => {
    const fileName = "flower";
    const width = "400";
    const height = "400";
    const data = await resizeImage(
      fileName,
      parseFloat(width),
      parseFloat(height)
    );
    expect(data).toBeDefined();
  });
});
