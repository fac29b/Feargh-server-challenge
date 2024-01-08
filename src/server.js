const express = require("express");
const bodyParser = require('body-parser');
const cheeseStorage = require('../cheeseStorage.js');


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
    // Get the cheeses from the sotrage module:
    const cheeses = cheeseStorage.getCheeseNames();

    // Generate a list of cheeses
    const cheeseList = cheeses.map(cheese => `<li>${cheese.cheeseType} | ${cheese.rating} stars</li>`).join('');

    // HTML response
    const htmlResponse =`
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>🧀 Cheese Rating</title>
    </head>
    <body>
        <h1>Cheese Rating 🧀</h1>
        <form method="POST" action="/cheese">
            <label for="cheese">Cheese:</label>
            <input type="text" id="cheese" name="cheeseType" required><br><br>
            <input type="range" min="1" max="5" value="3" class="slider" name="rating"><br><br>
            <input type="submit" value="Submit">
        </form>
        <ul>${cheeseList}</ul>
    </body>
    </html>
    `;

    // Send the HTML response
    response.send(htmlResponse);
    
});

// Use middleware to parse URL-encoded data
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/cheese", (request, response) => {
    const cheeseType = request.body.cheeseType;
    const rating = parseInt(request.body.rating, 10);

    // Add the cheese and the rating to the array using the sotrage module
    cheeseStorage.addCheese({ cheeseType, rating })

    // // Respond to the client (changes all the HTML)
    // response.send(`Received cheese type: ${cheeseType}, Rating: ${rating}`);

    // Redirect back to the "/cheese" page after processing the form submission
    response.redirect("/cheese");
})

module.exports = server;
