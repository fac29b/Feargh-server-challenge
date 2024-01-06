const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

test("/ returns hello world", async () => {
  const { status, body } = await request("/");

  assert.equal(status, 200);
  assert.match(
    body,
    /<h1>hello express<\/h1>/i,
    `Expected HTML to include <h1>Hello Express</h1>, but received:\n${body}\n`
  );
});
