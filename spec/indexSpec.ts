import { response } from "express"
import supertest from "supertest"
import app from "../src/index"

const request= supertest(app)
describe("test initial page", ()=>{
    it("get api initial end point", async()=>{
        const Response= await request.get("/")
        expect(Response.status).toBe(200)
    })
})
describe("test images endpoint", ()=>{
    it("get api of image", async()=>{
        const Response= await request.get("/images?fileName=flower&width=1000&height=1000")
        expect(Response.status).toBe(200)
    })
})