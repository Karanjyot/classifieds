import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Items from "../../components/Items/Items"

function Home() {
  return (
    <>
      <Search />
      <Items />
    </>
  );
}

export default Home