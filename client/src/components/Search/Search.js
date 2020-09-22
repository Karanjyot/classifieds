import React, { useState, useEffect } from "react";
import "./Search.css";

function Search() {
  const items = [
    {
      title: "Used Car for sale",
      description: "I am selling a used 2003 Honda Civic. Works well.",
      price: "$1000",
    },
    {
      title: "computer for sale",
      description: "Selling a brand new Dell computer",
      price: "$800",
    },
    {
      title: "Used phone for sale",
      description: "I am selling my iphone 1",
      price: "$400",
    },
  ];

  const [text, setText] = useState("");
  // const [posts, setPosts] = useState(items);
  // useEffect(() => {
  //   console.log(posts);
  // }, []);

  const searchPosts = () => {
    items.map((item) => {
      if (item.title === text) {
        console.log(item);
      } else {
        console.log("item not found");
      }
    });
  };
  return (
    <>
      <div className="input-group mb-3 main-search">
        <input
          type="text"
          className="form-control "
          placeholder="Search for anything..."
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="input-group-append">
          <button
            onClick={searchPosts}
            className="btn btn-outline-secondary main-search-button"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
