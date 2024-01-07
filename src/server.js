const express = require("express");
const bodyParser = require('body-parser');


const server = express();

server.get("/", (request, response) => {
    response.send(`
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Home</title>
    </head>
    <body>
        <h1>Hello Express</h1>
    </body>
    </html>
    `);
});

server.get("/colour", (request, response) => {
    // Access URL parameters
    // const hexColour = request.query.hex;

    if (request.query.hex) {
        response.send(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Home</title>
        </head>
        <body style="background-color: #${request.query.hex};">
            <h1>Hello Express</h1>
            <form>
                <label for="hex">Colour:</label>
                <input type="text" id="hex" name="hex"><br><br>
                <input type="submit" value="Submit">
            </form>
        </body>
        </html>
    `);
    } else {
        response.send(`
            <!doctype html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Home</title>
            </head>
            <body style="background-color: #ffffff;">
                <h1>Hello Express</h1>
                <form>
                    <label for="hex">Colour:</label>
                    <input type="text" id="hex" name="hex"><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
            </html>
    `);

    }
});

server.get("/cheese", (request, response) => {
    response.send(`
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Home</title>
    </head>
    <body>
        <h1>Hello Express</h1>
        <form method="POST" action="/cheese">
            <label for="cheese">Cheese:</label>
            <input type="text" id="cheese" name="cheese" required><br><br>
            <input type="range" min="1" max="5" value="3" class="slider" id="cheeseRating"><br><br>
            <input type="submit" value="Submit">
        </form>
    </body>
    </html>
    `);
});

// Use middleware to parse URL-encoded data
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/cheese", (request, response) => {
    response.send(request.body.cheese)
})

module.exports = server;
