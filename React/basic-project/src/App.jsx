// import React, { Fragment } from "react";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import ArticleCard from "./ArticleCard";
// import "./App.css";

// function NewsHeader() {
//   return (
//     <div>
//       <h1>Daily Brief</h1>
//       <p>The news that matters, curated for you.</p>
//     </div>
//   );
// }

// const App = () => {
//   const num1 = 45;
//   const num2 = 30;
//   return (
//     <div>
//       <Navbar />
//       <NewsHeader />
//       <ArticleCard />
//       <ArticleCard />
//       <h1>Welcome</h1>
//       <p>Number 1:{num1}</p>
//       <p>Number 2:{num2}</p>
//       <p>Sum:{num1 + num2}</p>
//       <Footer />
//     </div>
//   );
// };

// export default App;

function ArticleCard({ isBreaking }) {
  const title = "New Climate Report Released";
  return (
    <div>
      {isBreaking ? <strong>BREAKING</strong> : null}
      <h2>{title}</h2>
    </div>
  );
}

function ArticleMeta() {
  return (
    <>
      <span>Environment</span>
      <span> . 6 min read</span>
    </>
  );
}

function App() {
  return (
    <div>
      <ArticleCard isBreaking={true} />
      <ArticleCard isBreaking={false} />
      <ArticleMeta />
    </div>
  );
}

export default App;
