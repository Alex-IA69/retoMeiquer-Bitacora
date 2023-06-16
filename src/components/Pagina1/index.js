import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pagina1 = () => {
  const [nombresAsistentes, setNombresAsistentes] = useState([]);
  const [formValues, setFormValues] = useState({
    nombre: '',
    fecha: '',
    procesoAprendizaje: '',
    solucionadorProblemas: '',
    ideas: '',
    usoHerramientas: '',
    procedimiento: '',
    recordarInformacion: '',
    involucradoYPropone: false,
    involucrado: false,
    cooperativo: false,
    indiferente: false,
    desinteresado: false,
    proactivo: '',
    atento: '',
    indiferenteComportamiento: '',
    desinteresadoComportamiento: '',
    disruptivo: '',
    opinionesExternas: '',
    interesEnLosDemas: '',
    escuchar: ''
  });
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/participantes')
      .then((response) => {
        const nombres = response.data.map((asistente) => asistente.nombre);
        setNombresAsistentes(nombres);
      })
      .catch((error) => {
        console.error('Error al obtener los nombres de los asistentes:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleAsistentesChange = (e) => {
    const { value } = e.target;
    const selectedAsistentes = value.split(',').map((asistente) => asistente.trim());
    setAsistentes(selectedAsistentes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Guardar los datos en la tabla Sesiones
    const sesionData = {
      cantParticipantes: asistentes.length,
      nombreAct: formValues.nombre,
      nombreEspacio: '',
      fecha: formValues.fecha,
      notas: '',
      materialNecesario: false,
      internet: false,
      mobiliarioAdecuado: false,
      luzElectrica: false,
      banos: false
    };

    axios
      .post('http://localhost:3001/sesiones', sesionData)
      .then((response) => {
        const sesionId = response.data.message.split(':')[1].trim();

        // 2. Guardar los datos en la tabla Cognitivo
        const cognitivoData = {
          idSesion: sesionId,
          pensOrdenAlto: parseInt(formValues.procesoAprendizaje),
          pensMinRequerido: parseInt(formValues.solucionadorProblemas),
          pensNoRelacionado: parseInt(formValues.ideas),
          pensDesconocidos: parseInt(formValues.usoHerramientas)
        };

        axios
          .post('http://localhost:3001/cognitivo', cognitivoData)
          .then(() => {
            console.log('Datos de Cognitivo guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error al guardar los datos de Cognitivo:', error);
          });

        // 3. Guardar los datos en la tabla Interacciones
        const interaccionesData = {
          idSesion: sesionId,
          conCompaneros: parseInt(formValues.procedimiento),
          conImplementadores: 0, // ¡Reemplaza 0 por el valor correcto!
          disenadoresContenido: 0 // ¡Reemplaza 0 por el valor correcto!
        };

        axios
          .post('http://localhost:3001/interacciones', interaccionesData)
          .then(() => {
            console.log('Datos de Interacciones guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error al guardar los datos de Interacciones:', error);
          });

        // 4. Guardar los datos en la tabla NivelDeInteres
        const nivelInteresData = {
          idSesion: sesionId,
          pensandoProcesoAprendizaje: parseInt(formValues.recordarInformacion),
          solucionadorProblemas: 0, // ¡Reemplaza 0 por el valor correcto!
          ideas: 0, // ¡Reemplaza 0 por el valor correcto!
          usoHerramientas: 0, // ¡Reemplaza 0 por el valor correcto!
          procedimiento: 0, // ¡Reemplaza 0 por el valor correcto!
          recordarCiertaInfo: 0 // ¡Reemplaza 0 por el valor correcto!
        };

        axios
          .post('http://localhost:3001/niveldeinteres', nivelInteresData)
          .then(() => {
            console.log('Datos de NivelDeInteres guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error al guardar los datos de NivelDeInteres:', error);
          });

        // 5. Guardar los datos en la tabla Comportamiento
        const comportamientoData = {
          idSesion: sesionId,
          proactivo: formValues.proactivo,
          atento: formValues.atento,
          indiferente: formValues.indiferenteComportamiento,
          desinteresado: formValues.desinteresadoComportamiento,
          disruptivo: formValues.disruptivo
        };

        axios
          .post('http://localhost:3001/comportamiento', comportamientoData)
          .then(() => {
            console.log('Datos de Comportamiento guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error al guardar los datos de Comportamiento:', error);
          });

        // 6. Guardar los datos en la tabla Emocional
        const emocionalData = {
          idSesion: sesionId,
          emocionado_inspirado: '', // ¡Reemplaza '' por el valor correcto!
          positivo_dispuesto: '', // ¡Reemplaza '' por el valor correcto!
          atento_participativo: '', // ¡Reemplaza '' por el valor correcto!
          frustrado_preocupado: '', // ¡Reemplaza '' por el valor correcto!
          molesto_triste: '' // ¡Reemplaza '' por el valor correcto!
        };

        axios
          .post('http://localhost:3001/emocional', emocionalData)
          .then(() => {
            console.log('Datos de Emocional guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error al guardar los datos de Emocional:', error);
          });

        // 7. Guardar los datos en la tabla Apertura
        const aperturaData = {
          idSesion: sesionId,
          opinionesExternas: formValues.opinionesExternas,
          interesEnLosDemas: formValues.interesEnLosDemas,
          escuchar: formValues.escuchar
        };

        axios
          .post('http://localhost:3001/apertura', aperturaData)
          .then(() => {
            console.log('Datos de Apertura guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error al guardar los datos de Apertura:', error);
          });

        // 8. Guardar los datos en la tabla Involucramiento
        const involucramientoData = {
          idSesion: sesionId,
          involucradoYPropone: formValues.involucradoYPropone,
          involucrado: formValues.involucrado,
          cooperativo: formValues.cooperativo,
          indiferente: formValues.indiferente,
          desinteresado: formValues.desinteresado
        };

        axios
          .post('http://localhost:3001/involucramiento', involucramientoData)
          .then(() => {
            console.log('Datos de Involucramiento guardados exitosamente');
            // Realizar alguna acción adicional o redirigir a otra página
          })
          .catch((error) => {
            console.error('Error al guardar los datos de Involucramiento:', error);
          });
      })
      .catch((error) => {
        console.error('Error al guardar el registro:', error);
      });
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <div className="content">
        <div className="input-container">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Ingresa tu nombre" />
        </div>

        <div className="input-container">
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" name="fecha" value={formValues.fecha} onChange={handleChange} />
        </div>

        <div className="box-container">
          <div className="interest-container">
            <div className="meiquer-color">
              <h2 className="white-title">Nivel de interés</h2>
              <p>Pensando en el proceso de aprendizaje</p>
              <input type="range" min="1" max="5" step="1" id="proceso-aprendizaje" name="procesoAprendizaje" value={formValues.procesoAprendizaje} onChange={handleChange} />
              <p>Solucionador de problemas</p>
              <input type="range" min="1" max="5" step="1" id="solucionador-problemas" name="solucionadorProblemas" value={formValues.solucionadorProblemas} onChange={handleChange} />
              <p>Ideas</p>
              <input type="range" min="1" max="5" step="1" id="ideas" name="ideas" value={formValues.ideas} onChange={handleChange} />
              <p>Uso de herramientas físicas</p>
              <input type="range" min="1" max="5" step="1" id="herramientas-fisicas" name="usoHerramientas" value={formValues.usoHerramientas} onChange={handleChange} />
              <p>Procedimiento</p>
              <input type="range" min="1" max="5" step="1" id="procedimiento" name="procedimiento" value={formValues.procedimiento} onChange={handleChange} />
              <p>Recordar cierta información</p>
              <input type="range" min="1" max="5" step="1" id="recordar-informacion" name="recordarInformacion" value={formValues.recordarInformacion} onChange={handleChange} />
            </div>
          </div>
          <div className="attendance-container">
            <div className="white-box">
              <h2 className="blue-title">Niñas y Niños que asistieron</h2>
              <input type="text" id="asistentes" onChange={handleAsistentesChange} placeholder="Ingrese los nombres separados por comas" />
            </div>
          </div>
          <div className="implementers-container">
            <div className="meiquer-color">
              <h2 className="white-title">Involucramiento de implementadores</h2>
              <p>Involucrado y propone <input type="checkbox" id="Involucrado-propone" name="involucradoYPropone" checked={formValues.involucradoYPropone} onChange={handleChange} /></p>
              <p>Involucrado <input type="checkbox" id="Involucrado" name="involucrado" checked={formValues.involucrado} onChange={handleChange} /></p>
              <p>Cooperativo <input type="checkbox" id="Cooperativo" name="cooperativo" checked={formValues.cooperativo} onChange={handleChange} /></p>
              <p>Indiferente <input type="checkbox" id="Indiferente" name="indiferente" checked={formValues.indiferente} onChange={handleChange} /></p>
              <p>Desinteresado<input type="checkbox" id="Desinteresado" name="desinteresado" checked={formValues.desinteresado} onChange={handleChange} /></p>
            </div>
          </div>
          <div className="behavior-container">
            <div className="meiquer-color">
              <h2 className="white-title">Comportamiento</h2>
              <h5>Seleccione una opción</h5>
              <p>Proactivo</p>
              <select name="proactivo" value={formValues.proactivo} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
              <p>Atento</p>
              <select name="atento" value={formValues.atento} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
              <p>Indiferente</p>
              <select name="indiferenteComportamiento" value={formValues.indiferenteComportamiento} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
              <p>Desinteresado</p>
              <select name="desinteresadoComportamiento" value={formValues.desinteresadoComportamiento} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
              <p>Disruptivo</p>
              <select name="disruptivo" value={formValues.disruptivo} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="opening-container">
            <div className="white-box">
              <h2 className="blue-title">Apertura</h2>
              <h5>Seleccione una opción</h5>
              <p>Apertura a opiniones externas</p>
              <select name="opinionesExternas" value={formValues.opinionesExternas} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
              <p>Apertura a interesarse en los demás</p>
              <select name="interesEnLosDemas" value={formValues.interesEnLosDemas} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
              <p>Apertura a escuchar</p>
              <select name="escuchar" value={formValues.escuchar} onChange={handleChange}>
                {nombresAsistentes.map((nombre, index) => (
                  <option key={index} value={nombre}>{nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="button" onClick={handleSubmit}>Guardar</button>
        <Link to="/" className="button">Volver</Link>
      </div>
    </div>
  );
};

export default Pagina1;