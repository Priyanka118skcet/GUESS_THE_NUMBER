// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TNavbar from "./components/TNavbar";

import GuessTheNumber from "./components/GuessTheNumber/Guess";
function App() {
  return (
    <Router>

    <Routes>
        <Route path="/" element={<GuessTheNumber />} />
        </Routes>
    </Router>
  );
}

export default App;
