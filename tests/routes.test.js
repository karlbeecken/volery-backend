const dbHandler = require("./db-handler");
const request = require("supertest");
const app = require("../app");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe("/tweets route", () => {
  it("should create a new tweet", async (done) => {
    const res = await request(app).post("/tweets").send({
      name: "test tweet",
      text: "this an automatically generated test tweet",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("test tweet");
    expect(res.body.proposals[0].text).toEqual(
      "this an automatically generated test tweet"
    );
    done();
  });

  it("should find tweets", async (done) => {
    const res = await request(app).get("/tweets");

    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toBeDefined();
    done();
  });

  it("should find a specific tweet", async (done) => {
    const idRes = await request(app).get("/tweets"); // get id to be sort of independent
    const res = await request(app).get(`/tweets/${idRes.body[0]._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBeDefined();
    done();
  });

  it("should add a proposal", async (done) => {
    const idRes = await request(app).get("/tweets");
    const res = await request(app)
      .post(`/tweets/${idRes.body[0]._id}/proposal`)
      .send({ text: "this is an automatically generated test proposal" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.proposals[1].text).toEqual(
      "this is an automatically generated test proposal"
    );
    done();
  });

  it("should finalize a tweet", async (done) => {
    const idRes = await request(app).get("/tweets");
    const res = await request(app)
      .put(`/tweets/${idRes.body[0]._id}/finalize`)
      .send({ proposal: idRes.body[0].proposals[0]._id });

    expect(res.statusCode).toEqual(200);
    expect(res.body.finalized).toBe(true);
    expect(res.body.proposals[0].final).toBe(true);
    done();
  });
});
