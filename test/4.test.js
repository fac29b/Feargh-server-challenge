const test = require("node:test");
const assert = require("node:assert");
const { request, assert_attr } = require("./helpers.js");

test("/cheese renders a <form>", async () => {
  const { status, body } = await request("/cheese");

  assert.equal(status, 200);
  assert.match(
    body,
    /<form/i,
    `Expected HTML to contain a form element, but received:\n${body}`
  );
  assert_attr(
    body,
    "action",
    ["/cheese", ""],
    `Action attribute should be "/cheese", but received:\n${body}\nNote: action can also be empty or missing as it defaults to the same page\n`
  );
  assert_attr(
    body,
    "method",
    ["POST", "post"],
    `Method attribute should be "POST", but received:\n${body}`
  );
  assert.match(
    body,
    /<label/i,
    `Expected HTML to include a label element, but received:\n${body}`
  );
  assert_attr(
    body,
    "max",
    ["5"],
    `Range input should use max attribute to limit rating to 5, but received:\n${body}`
  );
});
