// App.jsx

import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Api from "./components/Api";

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [sortOption, setSortOption] = useState("asc");
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", updateDimensions);
    document.addEventListener("DOMContentLoaded", updateDimensions);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
      document.removeEventListener("DOMContentLoaded", updateDimensions);
    };
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <Navbar
            setSortOption={setSortOption}
            setFilterVisible={setFilterVisible}
          />
        </header>
        <aside className="left-aside"></aside>
        <main className="main">
          {/* Render Api component */}
          <Api sortOption={sortOption} />
        </main>
        <section className="banner"> {/* No Filter component here */}</section>
        <aside className="right-aside"></aside>
        <section className="low-content"></section>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;
