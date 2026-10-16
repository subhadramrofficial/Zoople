import React from 'react'

export default async function page() {
    
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    next:{revalidate:10},
  });
  const data=await res.json();
  console.log("Fetching");
  
  return (
    <div>
      <h1>ISR Example</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  )
}


