import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importamos el archivo CSS para el estilo

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/ListArticulo" className="nav-link">Lista de Artículos Científicos</Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
