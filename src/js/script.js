var visibility = document.getElementById("password-visibility");
var navbar = document.getElementById("navbar");

if (visibility) {
  visibility.addEventListener("change", function () {
    const passwordInput = document.getElementById("login-password");
    if (this.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
}

const validUsername = "admin@gmail.com";
const validPassword = "12345";
const loginForm = document.querySelector("#login-form");

if (loginForm) {
  document
    .querySelector("#login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.querySelector(
        "input[placeholder='Username']"
      ).value;
      const password = document.querySelector("#login-password").value;

      if (username === validUsername && password === validPassword) {
        //alert("Login successful!");
        window.location.href = "./index.html";
        localStorage.setItem("isLoggedIn", true);
      } else {
        alert("Invalid username or password.");
      }
    });
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/login.html";
}

var items = document.getElementById("itemTable");
var customers = document.getElementById("customerTable");
var invoice = document.getElementById("invoiceTable");

if (items) {
  new DataTable("#itemTable");
  document
    .getElementById("dt-search-0")
    .setAttribute("placeholder", "Search...");
}
if (customers) {
  new DataTable("#customerTable");
  document
    .getElementById("dt-search-0")
    .setAttribute("placeholder", "Search...");
}

if (invoice) {
  new DataTable("#invoiceTable");
  document
    .getElementById("dt-search-0")
    .setAttribute("placeholder", "Search...");
}
