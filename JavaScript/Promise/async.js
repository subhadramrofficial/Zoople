function downloadFile() {
  return new Promise(function (resolve, reject) {
    let downloadSuccess = true;
    console.log("File downloading...");
    setTimeout(function () {
      if (downloadSuccess) {
        resolve("File Downloaded Successfully!");
      } else {
        reject("File download failed");
      }
    }, 2000);
  });
}
function processFile(fileName) {
  return new Promise(function (resolve, reject) {
    let processSuccess = true;

    console.log("Processing file...");

    setTimeout(function () {
      if (processSuccess) {
        resolve(fileName + " -> File Processed Successfully!");
      } else {
        reject("File processing failed");
      }
    }, 2000);
  });
}
async function startProcess() {
  try {
    let fileName = await downloadFile();
    let result = await processFile(fileName);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
startProcess();
