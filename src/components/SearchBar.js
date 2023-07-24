import React, { useState } from "react";
import { Input } from "antd";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <Input.Search
      placeholder="Search..."
      value={searchText}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchBar;
