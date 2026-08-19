let units = 0;

if (units >= 0 && units <= 100) {
  console.log("Low Usage");
} else if (units >= 101 && units <= 300) {
  console.log("Medium Usage");
} else if (units >= 301 && units <= 500) {
  console.log("High Usage");
} else {
  console.log("Very High Usage");
}
