import React, { useState, useEffect } from "react";
import "./Items.css";

function Items() {
  const items = [
    {
      id:1,
      title: "Used Car for sale",
      description: "I am selling a used 2003 Honda Civic. Works well.",
      price: "$1000",
    },
    {
      id:2,
      title: "computer for sale",
      description: "Selling a brand new Dell computer",
      price: "$800",
    },
    {
      id:3,
      title: "Used phone for sale",
      description: "I am selling my iphone 1",
      price: "$400",
    },
  ];
  const [posts, setPosts] = useState(items);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>{post.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Items;
