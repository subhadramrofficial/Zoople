function placeOrder(item) {
  return new Promise(function (resolve, reject) {
    console.log("Placing order for " + item + "...");
    setTimeout(function () {
      resolve(item);
    }, 1000);
  });
}

function shipOrder(item) {
  return new Promise(function (resolve, reject) {
    console.log("Shipping " + item + "...");
    setTimeout(function () {
      resolve(item);
    }, 1000);
  });
}
function deliverOrder(item) {
  return new Promise(function (resolve, reject) {
    console.log("Delivering" + item + "...");
    setTimeout(function () {
      resolve(item + " delivered to your door!");
    }, 1000);
  });
}
async function orderProcess() {
  try {
    let item = await placeOrder("Laptop");
    let shipfile = await shipOrder(item);
    let result = await deliverOrder(item);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
orderProcess();
