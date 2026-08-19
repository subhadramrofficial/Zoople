const lang = ["HTML", "CSS", "JavaScript", "React"];
let rev = lang.reduceRight((total, course) => total + course);
console.log(rev);
