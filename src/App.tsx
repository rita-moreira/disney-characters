import React from "react";
import Characters from "./components/Characters";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleCharacter from "./components/SingleCharacter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:characterId" element={<SingleCharacter />} />
      </Routes>
    </Router>
  );
}

export default App;
