import React from "react";
import "./Search.css";

function Search() {
  return (
    <div className="input-group mb-3 main-search">
      <input
        type="text"
        className="form-control "
        placeholder="Search for anything..."
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary main-search-button"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
