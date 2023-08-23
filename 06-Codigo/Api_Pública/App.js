import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import ListArticulo from "./components/ListArticulo";
import AbstractPage from "./components/AbstractPage";
import ArticlePage from "./components/ArticlePage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ListArticulo" element={<ListArticulo />} />
          <Route path="/Abstract/:id" element={<AbstractPage />} />
          <Route path="/Article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;