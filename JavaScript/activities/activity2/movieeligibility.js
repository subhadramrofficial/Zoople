let age = 18;
let movieRating = "A";

if (movieRating === "G") {
  console.log("Allowed");
} else if (movieRating === "PG" && age >= 10) {
  console.log("Allowed");
} else if (movieRating === "A" && age >= 18) {
  console.log("Allowed");
} else {
  console.log("Not Allowed");
}
