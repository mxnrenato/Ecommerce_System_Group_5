// AbstractPage.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AbstractPage.css"; // Importamos el archivo CSS para el estilo

const AbstractPage = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [abstract, setAbstract] = useState("");

  useEffect(() => {
    fetchAbstract();
  }, [id]);

  const fetchAbstract = async () => {
    try {
      const response = await fetch(`https://api.plos.org/search?q=id:${id}&fl=abstract`);
      const jsonData = await response.json();
      const article = jsonData.response.docs[0];
      setAbstract(article.abstract);
    } catch (error) {
      console.error("Error fetching abstract:", error);
    }
  };

  return (
    <div className="container">
      <h2>Abstract del Artículo con ID: {id}</h2>
      {abstract && abstract.length > 0 ? (
        <p>{abstract}</p>
      ) : (
        <p>No tiene registrado abstract.</p>
      )}
      <Link to="/" className="back-link">Volver al listado de artículos</Link>
    </div>
  );
};

export default AbstractPage;
