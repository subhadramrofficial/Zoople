export default async function Page() {
  const generatedAt = new Date().toISOString();
  const res = await fetch("http://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-cache",
  });
  if(!res.ok){
    throw new Error("Failed to fetch data")
  }
  const data = await res.json();
  console.log("fetching data...");
  return (
    <div>
      <h1>SSR Example</h1>
      <h1>{data.title}</h1>
      <h2>{data.body}</h2>
      <p>{generatedAt}</p>
    </div>
  );
}
