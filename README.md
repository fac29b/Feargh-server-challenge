# Server challenge

Practice using Express to create an HTTP server with a variety of different features.

## Setup

Make sure you have Git and Node (v18) installed.

1. [Use this template](https://github.com/foundersandcoders/server-challenge/generate), clone your copy, cd into it
1. Run `npm install` to install all the dependencies
1. Run `npm run dev` to start the server.  
   This uses the `nodemon` library to auto-restart the server when you save changes.

## Checking your work

Each challenge has associated unit tests. You can either run all the tests with `npm test`, or each individual challenge's tests with `npm run test:1`, `npm run test:2` etc.

Make sure you read test failures carefully—the output can be noisy but the error message should provide useful information to help you.

## Challenge 1

Create a new route for the homepage at `GET /`. It should return an HTML body including a `<h1>Hello Express</h1>`.

## Challenge 2

Create a new route at `GET /colour`. It should check the URL's search parameters for a `hex` property. If present the returned HTML page should have its `<body>` element's background-color set to the `hex` value. E.g. this request `GET /colour?hex=ff0000` should result in an HTML page with a red background. If `hex` is not present the background should be white.

**Hint**: you can dynamically create the HTML response body using a template literal string—and HTML pages can include inline `<style>` tags...

## Challenge 3

Edit your `GET /colour` route to include a form in the HTML response. This form should include an input for the user to type in a hex code. When the form is submitted a `GET` request will be sent to the same route, which will change the background of the page to whatever the user entered.

## Challenge 4

Create a new route `GET /cheese`. It should return an HTML response containing a form for submitting new cheeses. The form should send POST requests to the same page. It should include a text input for the cheese name and a range input for the cheese's rating (from 0 to 5).

## Challenge 5

Create a new route `POST /cheese`. It should receive the POST request from the previous form and use the built-in Express middleware to read the url-encoded request body.

It should store each cheese rating in an array **outside** of the handler function, so other routes can access this information. Once the new rating is pushed to this array it should redirect back to the same page.

Amend the `GET /cheese` handler to render a list of cheese ratings that have been submitted.

**Hint**: you can dynamically create an HTML list from an array by looping over it with `for..of` or `.map().join("")` to create a string. E.g.

```js
const nums = [1, 2, 3];
const list = nums.map((num) => `<li>${num}</li>`);
const html = `<ul>${list.join("")}</ul>`;
```

Submitting the form should result in the page reloading and displaying the newly added cheese in the list.

https://user-images.githubusercontent.com/9408641/185444951-a9510a3a-906e-499a-8142-b7bd058f8838.mp4
