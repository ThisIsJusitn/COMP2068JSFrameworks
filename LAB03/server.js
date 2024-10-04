// Import necessary modules
const connect = require("connect");
const url = require("url");

// Create the Connect app
const app = connect();

// Middleware function to handle calculations based on URL parameters
function calculate(req, res, next) {
  // Parse the URL and extract query parameters (method, x, y)
  const query = url.parse(req.url, true).query;
  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);

  // Log the extracted query parameters for debugging
  console.log(`x: ${query.x}, y: ${query.y}`);

  // Check if x and y are present
  if (!query.x || !query.y) {
    res.end("Error: x and y are required.\n");
    return;
  }

  // Check if x and y are valid numbers
  if (isNaN(x) || isNaN(y)) {
    res.end("Error: Both x and y must be valid numbers.\n");
    return;
  }

  let result;

  // Choose the operation based on the "method" parameter
  switch (method) {
    case "add":
      result = x + y;
      res.end(`${x} + ${y} = ${result}\n`);
      break;
    case "subtract":
      result = x - y;
      res.end(`${x} - ${y} = ${result}\n`);
      break;
    case "multiply":
      result = x * y;
      res.end(`${x} * ${y} = ${result}\n`);
      break;
    case "divide":
      if (y === 0) {
        res.end("Error: Division by zero is not allowed.\n");
      } else {
        result = x / y;
        res.end(`${x} / ${y} = ${result}\n`);
      }
      break;
    default:
      res.end(
        'Error: Invalid method. Use "add", "subtract", "multiply", or "divide".\n'
      );
  }
}

// Use the calculate function to handle requests at /lab2 endpoint
app.use("/lab2", calculate);

// Start the server on port 3000
app.listen(3000, () => {
  // Display the URL with a full path to click on
  console.log(
    "Server running at http://localhost:3000/lab2?method=add&x=16&y=4"
  );
});
