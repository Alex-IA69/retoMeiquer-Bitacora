import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Pagina2 = () => {
  return (
    <div className="container">
      <h1>Ver resumen</h1>
      <div className="content">
        <div className="buttons">
        <Link to="/" className="button">Inicio</Link>
        <Link to="/pagina3" className="button">Análisis de sesiones</Link>
        <Link to="/pagina4" className="button">Sesiones pasadas</Link>
        </div>
      </div>
    </div>
  );
};

export default Pagina2;
