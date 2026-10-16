type CoursePageProps = {
  params: Promise<{ id: string }>
};
export default async function CourseDetails({ params }: CoursePageProps) {
  const { id } = await params;
  return (
    <main style={{ padding: "40px" }}>
      <h1>Course Details</h1>
      <p>
        Selected courses: <strong>{id}</strong>
      </p>
    </main>
  );
}
