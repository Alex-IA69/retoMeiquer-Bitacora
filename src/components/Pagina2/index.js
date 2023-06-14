import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Pagina2 = () => {
  return (
    <div className="container">
      <h1>Ver sesiones pasadas</h1>
      <div className="content">
        <div className="buttons">
        <Link to="/pagina3" className="button">Ver Analisis</Link>
        <Link to="/pagina4" className="button">Buscar Sesion</Link>
        </div>
      </div>
    </div>
  );
};

export default Pagina2;
