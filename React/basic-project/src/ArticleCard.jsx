import React from "react";

const ArticleCard = () => {
  const title = "Five things you missed this week";
  const category = "Technology";
  const minutes = 4;
  return (
    <div>
      <h2>{title}</h2>
      <p>
        {category}.{minutes} min read
      </p>
    </div>
  );
};

export default ArticleCard;
