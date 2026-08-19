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

downloadFile()
  .then(function (result) {
    console.log(result);
    console.log("Processing File...");
  })
  .catch(function (error) {
    console.log(error);
  });
