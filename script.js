// ===============================
// Part 1: Variables & Conditionals
// ===============================
let userAge = 20; // pretend we got this from user input
if (userAge >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are underage.");
}

// ===============================
// Part 2: Functions
// ===============================

// Function 1: Calculate total
function calculateTotal(price, quantity) {
  return price * quantity;
}

// Function 2: Format a greeting
function makeGreeting(name) {
  return "Hello, " + name + "! Welcome to JavaScript.";
}

console.log(calculateTotal(100, 3));
console.log(makeGreeting("Mark"));

// ===============================
// Part 3: Loops
// ===============================

// Loop 1: For loop (print numbers 1–5)
for (let i = 1; i <= 5; i++) {
  console.log("Number: " + i);
}

// Loop 2: While loop (countdown)
let count = 3;
while (count > 0) {
  console.log("Countdown: " + count);
  count--;
}

// ===============================
// Part 4: DOM Interactions
// ===============================

// 1. Change text content
document.getElementById("changeTextBtn").addEventListener("click", function() {
  document.getElementById("greeting").textContent = "🎉 The text has changed!";
});

// 2. Toggle background color
document.getElementById("toggleColorBtn").addEventListener("click", function() {
  document.body.classList.toggle("dark");
});

// 3. Create dynamic content (countdown)
document.getElementById("countdownBtn").addEventListener("click", function() {
  let results = document.getElementById("results");
  results.innerHTML = ""; // clear old results
  for (let i = 5; i >= 1; i--) {
    let p = document.createElement("p");
    p.textContent = "Countdown: " + i;
    results.appendChild(p);
  }
});
