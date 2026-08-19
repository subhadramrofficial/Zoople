let hasPassport = true;
let hasVisa = true;
let hasTicket = true;
let bannedPassengger = false;

if (hasPassport && hasVisa && hasTicket && !bannedPassengger) {
  console.log("Boarding Allowed");
} else {
  console.log("Boarding Denied");
}
