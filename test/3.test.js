const test = require("node:test");
const assert = require("node:assert");
const { request, assert_attr } = require("./helpers.js");

test("/colour renders a <form>", async () => {
  const { status, body } = await request("/colour?hex=ff0000");

  assert.equal(status, 200);
  assert.match(
    body,
    /<form/i,
    `Expected HTML to contain a form element, but received:\n${body}`
  );
  assert_attr(
    body,
    "action",
    ["/colour", ""],
    `Action attribute should be "/colour", but received:\n${body}\nNote: action can also be empty or missing as it defaults to the same page\n`
  );
  assert_attr(
    body,
    "method",
    ["GET", "get", ""],
    `Method attribute should be "GET", but received:\n${body}\nNote: method can also be empty or missing as it defaults to GET\n`
  );
  assert.match(
    body,
    /<label/i,
    `Expected HTML to include a label element, but received:\n${body}`
  );
});
