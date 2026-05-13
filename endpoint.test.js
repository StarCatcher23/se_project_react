const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("./app.js");

const request = supertest(app);

describe("Endpoints respond to requests", () => {
  it('Returns data and status 200 on request to "/"', () => {
    return request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
