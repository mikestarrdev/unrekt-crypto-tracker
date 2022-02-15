import React, { useState } from "react";

function Filter({ searched, handleSearched, handleDisplayedResults }) {
  return (
    <div className="filter-container">
      <form className="search-form">
        <label>
          Search for token{" "}
          <input
            type="text"
            name="search"
            onChange={handleSearched}
            value={searched}
            placeholder="Enter token name..."
          />
        </label>
        <br />
        <label>Results per page</label>
        <select onChange={handleDisplayedResults}>
          <option value="50">50</option>
          <option value="25">25</option>
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
      </form>
    </div>
  );
}

export default Filter;
