import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Pagina5 = () => {
  return (
    <div className="page5-container">
      <h1 className="page5-title">Bienvenid@ a Estación Meiquer</h1>
      <div className="page5-buttons">
        <Link to="/pagina6" className="page5-button">
          Registrar
        </Link>
        <Link to="/pagina2" className="page5-button">
          Ver Sesiones Pasadas
        </Link>
      </div>
    </div>
  );
};

export default Pagina5;
