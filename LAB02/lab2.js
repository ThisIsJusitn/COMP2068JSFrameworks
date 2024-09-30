// Import the prompt package to get user input
const prompt = require("prompt");

// Define the schema for user input (must be rock, paper, or scissors)
const schema = {
  properties: {
    userSelection: {
      description: "Choose ROCK, PAPER, or SCISSORS", // Prompt message
      pattern: /^(rock|paper|scissors)$/i, // Valid input (case insensitive)
      message: "Input must be ROCK, PAPER, or SCISSORS", // Error message for invalid input
      required: true, // Make sure input is mandatory
    },
  },
};

// Start the prompt
prompt.start();

// Function to play the game
prompt.get(schema, function (err, result) {
  // Handle error
  if (err) {
    console.log("Error:", err);
    return;
  }

  // Get user input and convert it to lowercase
  const userSelection = result.userSelection.toLowerCase();

  // Generate a random number to decide the computer's selection
  const random = Math.random();
  const computerSelection =
    random < 0.34 ? "paper" : random < 0.67 ? "scissors" : "rock";

  // Display user and computer choices
  console.log(`You chose: ${userSelection}`);
  console.log(`Computer chose: ${computerSelection}`);

  // Determine who wins the game using basic Rock-Paper-Scissors rules
  if (userSelection === computerSelection) {
    console.log("It's a tie!");
  } else if (
    (userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "scissors" && computerSelection === "paper") ||
    (userSelection === "paper" && computerSelection === "rock")
  ) {
    console.log("You win!");
  } else {
    console.log("Computer wins!");
  }
});
