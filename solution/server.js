const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
});

server.get("/colour", (req, res) => {
  const hex = req.query.hex || "ffffff"; // defaults to white
  const html = `
    <style>
      body {
        background-color: #${hex};
      }
    </style>
    <form>
      <label for="hex">Enter hex</label>
      <input name="hex" value="${hex}">
    </form>
  `;
  res.send(html);
});

const cheeses = [];

server.get("/cheese", (req, res) => {
  const list = cheeses.map((cheese) => {
    return `<li>${cheese.name} | ${cheese.rating} stars</li>`;
  });
  const html = `
    <form method="POST">
      <p>
        <label for="name">Cheese name</label>
        <input name="name">
      </p>
      <p>
        <label for="rating">Cheese rating</label>
        <input name="rating" type="range" min="0" max="5" step="0.5">
      </p>
      <button>Rate cheese</button>
    </form>
    <ul>
      ${list.join("")}
    </ul>
  `;
  res.send(html);
});

server.post("/cheese", express.urlencoded({ extended: false }), (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  cheeses.push({ name, rating });
  res.redirect("/cheese");
});

module.exports = server;
