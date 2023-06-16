import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pagina7 = () => {
  const [formulario, setFormulario] = useState({
    cantParticipantes: '',
    nombreAct: '',
    nombreEspacio: '',
    fecha: '',
    notas: '',
    materialNecesario: false,
    internet: false,
    mobiliarioAdecuado: false,
    luzElectrica: false,
    banos: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: inputValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/sesiones', formulario)
      .then((response) => {
        console.log('Registro creado:', response.data);
      })
      .catch((error) => {
        console.error('Error al crear el registro:', error);
      });
  };

  return (
    <div className="container">
      <h1>Formulario de Sesiones</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="cant-participantes">Cantidad de participantes:</label>
          <input type="number" id="cant-participantes" name="cantParticipantes" value={formulario.cantParticipantes} onChange={handleInputChange} />
        </div>

        <div className="input-container">
          <label htmlFor="nombre-actividad">Nombre de la actividad:</label>
          <input type="text" id="nombre-actividad" name="nombreAct" value={formulario.nombreAct} onChange={handleInputChange} />
        </div>

        <div className="input-container">
          <label htmlFor="nombre-espacio">Nombre del espacio:</label>
          <input type="text" id="nombre-espacio" name="nombreEspacio" value={formulario.nombreEspacio} onChange={handleInputChange} />
        </div>

        <div className="input-container">
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" name="fecha" value={formulario.fecha} onChange={handleInputChange} />
        </div>

        <div className="input-container">
          <label htmlFor="notas">Notas:</label>
          <textarea id="notas" name="notas" value={formulario.notas} onChange={handleInputChange}></textarea>
        </div>

        <div className="checkbox-container">
          <label htmlFor="material-necesario">Material necesario:</label>
          <input type="checkbox" id="material-necesario" name="materialNecesario" checked={formulario.materialNecesario} onChange={handleInputChange} />
        </div>

        <div className="checkbox-container">
          <label htmlFor="internet">Internet:</label>
          <input type="checkbox" id="internet" name="internet" checked={formulario.internet} onChange={handleInputChange} />
        </div>

        <div className="checkbox-container">
          <label htmlFor="mobiliario-adecuado">Mobiliario adecuado:</label>
          <input type="checkbox" id="mobiliario-adecuado" name="mobiliarioAdecuado" checked={formulario.mobiliarioAdecuado} onChange={handleInputChange} />
        </div>

        <div className="checkbox-container">
          <label htmlFor="luz-electrica">Luz eléctrica:</label>
          <input type="checkbox" id="luz-electrica" name="luzElectrica" checked={formulario.luzElectrica} onChange={handleInputChange} />
        </div>

        <div className="checkbox-container">
          <label htmlFor="banos">Baños:</label>
          <input type="checkbox" id="banos" name="banos" checked={formulario.banos} onChange={handleInputChange} />
        </div>

        <div className="buttons">
          <button className="button" type="submit">Guardar</button>
          <Link to="/" className="button">Volver</Link>
          <Link to="/pagina1" className="button">Continuar</Link>
        </div>
      </form>
    </div>
  );
};

export default Pagina7;