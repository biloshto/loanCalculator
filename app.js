// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.getElementById("results").style.display = "none";
  
  // Show loader
  // (as soon as button is clicked)
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// calculateResults function
function calculateResults() {

  // UI vars
  //(grab all the stuff from the UI that we need)
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // principal is the value of amount, in float
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Calculate monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if (isFinite(monthly)) {
    // toFixed(2) means the number's going to have 2 decimal places
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results
    document.getElementById("results").style.display = "block";

    // Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers!");
  }

  // e.preventDefault(); - no need of preventDefault() because calculateResults() is not an event handler, we want delayed
}

// showError function
function showError(error) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Hide loader
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Grab elements
  // (insert the alert to the DOM; we want the card as the parent div, and we want to put it before the heading, so we want that heading as well)
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class (bootstrap class alert-danger makes the alert red)
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  // (you call insertBefore() on a parent and then you pass in the element you want to put in, and you also want to pass whatever you want it inserted before)
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds (3000 milliseconds)
  setTimeout(clearError, 3000);
}

// clearError function
function clearError() {
  document.querySelector(".alert").remove();
}