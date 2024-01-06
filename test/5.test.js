const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

test("/cheese can store new cheese ratings", async () => {
  const post_response = await request("/cheese", {
    method: "POST",
    body: "name=Gorgonzola&rating=3",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    redirect: "manual",
  });

  assert.equal(post_response.status, 302);
  assert.equal(post_response.headers.location, "/cheese");

  const { status, body } = await request("/cheese");

  assert.equal(status, 200);
  assert.match(
    body,
    /gorgonzola/i,
    `Expected HTML to include "gorgonzola", the submitted cheese's name, but received:\n${body}`
  );
  assert.match(
    body,
    /3/i,
    `Expected HTML to include "3", the submitted cheese's rating, but received:\n${body}`
  );
});
