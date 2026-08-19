// console.log("Start");
// setTimeout(function () {
//   console.log("Inside Timeout");
// }, 2000);
// console.log("End");
/*------------EXP 1-----------------*/
// function greet(name, callback) {
//   console.log("Hello " + name);
//   callback();
// }
// function sayBye() {
//   console.log("Goodbye!");
// }

// greet("John ", sayBye);

// /*------------EXP 2-----------------*/
// function downloadFile(callback) {
//   console.log("Downloading file...");
//   setTimeout(function () {
//     console.log("Download complete");
//     callback();
//   }, 2000);
// }
// function processFile() {
//   console.log("Processing File...");
// }
// downloadFile(processFile);

// /*------------EXP 3-----------------*/
// function loginUser(username, showDashboard) {
//   console.log("Logging in " + username + "...");
//   setTimeout(function () {
//     console.log("Login Successfull!");
//     showDashboard(username);
//   }, 2000);
// }
// function showDashboard(username) {
//   console.log("Welcome to dashboard, " + username + "!");
// }
// loginUser("Ali", showDashboard);

// /*------------EXP 4 - callback chaining-----------------*/
function placeOrder(item, shipOrder) {
  console.log("Placing order for " + item + "...");
  setTimeout(function () {
    console.log("Order Placed!");
    shipOrder(item);
  }, 2000);
}

function shipOrder(item, deliverOrder) {
  console.log("Shipping " + item + "...");
  setTimeout(function () {
    console.log("Order Shipped!");
    deliverOrder(item);
  }, 2000);
}

function deliverOrder(item) {
  console.log(item + " delivered to your door!");
}

placeOrder("Laptop", function (item) {
  shipOrder(item, function (item) {
    deliverOrder(item);
  });
});
