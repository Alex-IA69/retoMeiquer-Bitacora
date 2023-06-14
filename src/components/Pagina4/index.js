import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Pagina4 = () => {
  return (
    <div className="container">
      <h1>Buscar Sesión</h1>
      <div className="form-container">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Ingresa tu nombre" />
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" id="fecha" />
      </div>
      <div className="buttons">
        <Link to="/" className="button">Buscar</Link>
      </div>
      <div className="container">
        <div className="buttons">
          <Link to="/" className="button">Inicio</Link>
          <Link to="/pagina2" className="button">Ver Sesiones Pasadas</Link>
        </div>
      </div>
    </div>
  );
};

export default Pagina4;
