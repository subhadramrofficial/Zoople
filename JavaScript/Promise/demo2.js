let downloadFile = new Promise((resolve, reject) => {
  let downloadSuccess = true;
  console.log("File downloading");
  setTimeout(() => {
    if (downloadSuccess) {
      resolve("File downloaded successfully!");
    } else {
      reject("File download failed");
    }
  }, 2000);
});
downloadFile
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
