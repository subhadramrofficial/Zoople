function handleResponse(status: "ok" | "error", message: string): void {
  if (status === "ok") {
    console.log("Success:", message);
  } else {
    console.error("Error:", message);
  }
}
handleResponse("ok", "Data loaded");
handleResponse("error", "Not found");
