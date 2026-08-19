/*---------Read file node.js---------*/

// const fs = require("fs");
// fs.readFile("data.txt", "utf8", (error, data) => {
//   if (error) {
//     console.log("Error reading file");
//     return;
//   }
//   console.log("File content");
//   console.log(data);
// });

/*---------Read file node.js---------*/
const fs = require("fs");
fs.writeFile("log.txt", "Server started", (error) => {
  if (error) {
    console.log("Write Failed");
    return;
  }
  console.log("File written successfully");
});

fs.appendFile("log.txt", "\nNew request received", (error) => {
  if (error) {
    console.log("Append failed");
    return;
  }
  console.log("Log updated");
});

fs.readFile("log.txt", "utf8", (error, data) => {
  if (error) {
    console.log("Error reading File");
    return;
  }
  console.log("File Content");
  console.log(data);
});
