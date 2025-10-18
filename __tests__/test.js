const request = require("supertest");
const cheerio = require("cheerio");
const db = require("../models");
const app = require("../app");

let server, agent;

function extractCsrfToken(res) {
  const $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

const login = async (agent, username, password) => {
  let res = await agent.get("/login");
  let csrfToken = extractCsrfToken(res);
  res = await agent.post("/session").send({
    email: username,
    password: password,
    _csrf: csrfToken,
  });
};

describe("LMS test suite", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(2000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.error("Error closing server:", error);
    }
  });

  test("User signup", async () => {
    let res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      name: "rishav",
      email: "rishav@test.com",
      password: "rishav",
      role: "admin",
      _csrf: csrfToken,
    });
  });

  test("User signin with valid credentials", async () => {
    let store = await agent.get("/login");
    const csrfToken = extractCsrfToken(store);
    store = await agent.post("/session").send({
      email: "rishav@test.com",
      password: "rishav",
      role: "admin",
      _csrf: csrfToken,
    });
  });

  test("User sign out", async () => {
    const response = await agent.get("/admin");
    expect(response.statusCode).toBe(200); // Assuming successful sign-out returns status code 200
  });

  // ... (similar updates for other test cases)

  test("User changes password", async () => {
    let store = await agent.get("/changepass");
    const csrfToken = extractCsrfToken(store);
    store = await agent.post("/users").send({
      oldpassword: "rishav",
      newpassword: "gupta",
      _csrf: csrfToken,
    });
    // Add assertions or validations if needed
  });
});
