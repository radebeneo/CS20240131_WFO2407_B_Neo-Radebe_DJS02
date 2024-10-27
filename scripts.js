const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  // Check for non-numeric input
  if (isNaN(dividend) || isNaN(divider)) {
    console.error("Critical Error: Non-numeric input provided", new Error().stack);
    document.body.innerHTML = `<div class="critical-error">Something went wrong. Please reload the page.</div>`;
    return;
  }

  // Check for empty inputs
  if (!dividend || !divider) {
    result.innerHTML = `<div class="error-message">Division not performed. Both input are required. Try again.</div>`;
    return;
  }

  // Check for division by zero
  if (Number(divider) === 0) {
    console.error("Division Error: Attempted division by zero", new Error().stack);
    result.innerHTML = `<div class="error-message">Division not performed. Invalid input. Try again.</div>`;
    return;
  }

  // Perform the division and handle whole/decimal result
  const quotient = Number(dividend) / Number(divider);

  result.innerText = quotient % 1 === 0 ? quotient : Math.floor(quotient);
});