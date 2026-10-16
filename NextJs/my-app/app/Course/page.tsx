import Link from "next/link";
const courses = [
  { id: "html", name: "HTML & CSS" },
  { id: "react", name: "React Development" },
  { id: "node.js", name: "Node.js Development " },
  { id: "mongodb", name: "MongoDB" },
];

function page() {
  return (
    <main style={{padding:"40px"}}>
      <h1>Our Courses</h1>
      <p>Choose a course to learn</p>
      <div style={{ marginTop: "25px" }}>
        {courses.map((course) => (
          <div key={course.id} style={{ marginBottom: "20px" }}>
            <h2>{course.name}</h2>
            <Link href={`/Course/${course.id}`}>View Course</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default page;
