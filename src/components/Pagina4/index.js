import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import SessionInfo from './session';

const Pagina4 = () => {
  return (
    <div className="container">
      <h1>Lista de sesiones</h1>
      <div className="container">
        <SessionInfo></SessionInfo>
      </div>
      <div className="container">
        <div className="buttons">
          <Link to="/" className="button">Inicio</Link>
          <Link to="/pagina2" className="button">Ver Resumen</Link>
        </div>
      </div>
    </div>
  );
};

export default Pagina4;
