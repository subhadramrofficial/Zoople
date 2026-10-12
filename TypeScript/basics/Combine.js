"use strict";
function handleResponse(status, message) {
    if (status === "ok") {
        console.log("Success:", message);
    }
    else {
        console.error("Error:", message);
    }
}
handleResponse("ok", "Data loaded");
handleResponse("error", "Not found");
