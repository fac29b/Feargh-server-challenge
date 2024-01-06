const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

test("/colour sets body background to hex param", async () => {
  const { status, body } = await request("/colour?hex=ff0000");

  assert.equal(status, 200);
  assert.match(
    body,
    /body\s*{/i,
    `Expected styles to target the body element, but received:\n${body}`
  );
  assert.match(
    body,
    /background(-color)?:\s*#ff0000/i,
    `Expected styles to set background to the right hex code, but received:\n${body}`
  );
});

test("/colour defaults background to white", async () => {
  const { status, body } = await request("/colour");

  assert.equal(status, 200);
  assert.doesNotMatch(
    body,
    /undefined/,
    `Expected the HTML not to include undefined, but received:
  ${body}`
  );
  assert.match(body, /background(-color)?:\s*#ffffff/i);
});
