import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pagina6 = ({ location }) => {
  const registroId = location?.state?.registroId;
  const [asistentes, setAsistentes] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setAsistentes((prevAsistentes) =>
      prevAsistentes.map((asistente, i) =>
        i === index ? { ...asistente, [name]: value } : asistente
      )
    );
  };

  const handleAgregarAsistente = () => {
    setAsistentes((prevAsistentes) => [...prevAsistentes, { nombre: '', tipo: '' }]);
  };

  const handleEliminarAsistente = (index) => {
    setAsistentes((prevAsistentes) => prevAsistentes.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/participantes', asistentes)
      .then((response) => {
        console.log('Asistentes registrados exitosamente:', response.data);
        const nombres = response.data.map((asistente) => asistente.nombre);
        setAsistentes(nombres);
      })
      .catch((error) => {
        console.error('Error al registrar los asistentes:', error);
      });
  };

  return (
    <div className="container">
      <h1>Registro de Asistentes</h1>
      <form onSubmit={handleFormSubmit}>
        {asistentes.map((asistente, index) => (
          <div key={index} className="asistente-container">
            <label htmlFor={`asistente-nombre-${index}`}>Asistente {index + 1}:</label>
            <input
              type="text"
              id={`asistente-nombre-${index}`}
              name="nombre"
              placeholder="Ingrese el nombre"
              value={asistente.nombre || ''}
              onChange={(e) => handleInputChange(e, index)}
            />
            <label htmlFor={`asistente-tipo-${index}`}>Tipo:</label>
            <select
              id={`asistente-tipo-${index}`}
              name="tipo"
              value={asistente.tipo || ''}
              onChange={(e) => handleInputChange(e, index)}
            >
              <option value="">Seleccione un tipo</option>
              <option value="colaborador">Colaborador</option>
              <option value="participante">Participante</option>
            </select>
            <button type="button" onClick={() => handleEliminarAsistente(index)}>
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarAsistente}>
          Agregar Asistente
        </button>
        <button type="submit">Guardar</button>
      </form>
      <div className="buttons">
        <Link to="/pagina7" className="button">
          Siguiente
        </Link>
      </div>
    </div>
  );
};

export default Pagina6;