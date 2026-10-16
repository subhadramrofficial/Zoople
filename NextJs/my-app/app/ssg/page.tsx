export default async function Page() {
  const generatedAt: string = new Date().toISOString();
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "force-cache",
  });
  const data = await res.json();
  console.log("fetching...");
  console.log(data);
  return (
    <div>
      <h1>SSG Example</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <p>{generatedAt}</p>
    </div>
  );
}
//used in blog