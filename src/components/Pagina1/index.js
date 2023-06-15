import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Pagina1 = () => {
  const handleSliderChange = (e) => {
    // Manejar el cambio del valor del slider
    console.log(e.target.value);
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <div className="content">
        <div className="input-container">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" placeholder="Ingresa tu nombre" />
        </div>

        <div className="input-container">
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" />
        </div>

        <div className="box-container">
          <div className="interest-container">
            <div className="meiquer-color">
              <h2 className="white-title">Nivel de interés</h2>
              <p>Pensando en el proceso de aprendizaje</p>
              <input type="range" min="1" max="5" step="1" id="proceso-aprendizaje" onChange={handleSliderChange} />
              <p>Solucionador de problemas</p>
              <input type="range" min="1" max="5" step="1" id="solucionador-problemas" onChange={handleSliderChange} />
              <p>Ideas</p>
              <input type="range" min="1" max="5" step="1" id="ideas" onChange={handleSliderChange} />
              <p>Uso de herramientas físicas</p>
              <input type="range" min="1" max="5" step="1" id="herramientas-fisicas" onChange={handleSliderChange} />
              <p>Procedimiento</p>
              <input type="range" min="1" max="5" step="1" id="procedimiento" onChange={handleSliderChange} />
              <p>Recordar cierta información</p>
              <input type="range" min="1" max="5" step="1" id="recordar-informacion" onChange={handleSliderChange} />
            </div>
          </div>
          <div className="attendance-container">
            <Link to="/pagina6" className="button">Registrar Asistentes</Link>
          </div>
          <div className="implementers-container">
            <div className="meiquer-color">
              <h2 className="white-title">Involucramiento de implementadores</h2>
              <p>Involucrado y propone <input type="checkbox" id="Involucrado-propone" /></p>
              <p>Involucrado <input type="checkbox" id="Involucrado" /></p>
              <p>Cooperativo <input type="checkbox" id="Cooperativo" /></p>
              <p>Indiferente <input type="checkbox" id="Indiferente" /></p>
              <p>Desinteresado<input type="checkbox" id="Desinteresado" /></p>
            </div>
          </div>
          <div className="environment-container">
            <div className="white-box">
              <h2 className="blue-title">Entorno</h2>
              <p>Materiales necesarios<input type="checkbox" id="materiales" /></p>
              <p>Internet<input type="checkbox" id="internet" /></p>
              <p>Mobiliario adecuado<input type="checkbox" id="mobiliario" /></p>
              <p>Luz eléctrica<input type="checkbox" id="luz" /></p>
              <p>Baños<input type="checkbox" id="banos" /></p>
            </div>
          </div>
          <div className="behavior-container">
            <div className="meiquer-color">
              <h2 className="white-title">Comportamiento</h2>
              <h5>Seleccione una opción</h5>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
            </div>
          </div>
          <div className="opening-container">
            <div className="white-box">
              <h2 className="blue-title">Apertura</h2>
              <h5>Seleccione una opción</h5>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
              <select>
                <option value="opcion1">Carlos</option>
                <option value="opcion2">Eduardo</option>
                <option value="opcion3">Francisco</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <Link to="/" className="button">Guardar</Link>
        <Link to="/" className="button">Volver</Link>
      </div>
    </div>
  );
};

export default Pagina1;
