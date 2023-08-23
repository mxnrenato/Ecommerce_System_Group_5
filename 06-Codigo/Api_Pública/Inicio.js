import React from "react";
import "./Inicio.css";

const Inicio = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Bienvenido al Sistema de Artículos Científicos</h1>
        
      </header>

      <div className="presentation">
        <div className="presentation-text">
          <h3>¡Explora el Mundo de la Investigación Científica!</h3>
          <p>
            Nuestro sistema te brinda acceso a una amplia gama de artículos científicos
            para mantenerte al día con los avances en diversas disciplinas.
            Ya sea que busques estudios recientes o clásicos, ¡aquí los encontrarás!
          </p>
        </div>
        <div className="presentation-images">
          <img
            src="https://us.123rf.com/450wm/jardelbassi/jardelbassi2306/jardelbassi230600410/206148807-funny-cartoon-scientist-with-laboratory-equipment-3d-rendering-illustration.jpg?ver=6"
            alt="Artículos Científicos"
            className="presentation-image"
          />
          <img
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSQJ6D7py_ToQ2G8DCJZCn7HQHzZcb2j44kUTtpNZNXtRF2vWA1"
            alt="Investigación Científica"
            className="presentation-image"
          />
        </div>
      </div>
    </div>
  );
};
