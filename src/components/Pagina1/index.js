import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pagina1 = () => {
  const [registroId, setRegistroId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [procesoAprendizaje, setProcesoAprendizaje] = useState(1);
  const [solucionadorProblemas, setSolucionadorProblemas] = useState(1);
  const [ideas, setIdeas] = useState(1);
  const [herramientasFisicas, setHerramientasFisicas] = useState(1);
  const [procedimiento, setProcedimiento] = useState(1);
  const [recordarInformacion, setRecordarInformacion] = useState(1);
  const [comportamientos, setComportamientos] = useState([]);
  const [aperturas, setAperturas] = useState([]);
  const [asistentes, setAsistentes] = useState([]);

  const handleSliderChange = (e, setState) => {
    setState(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del registro
    const registro = {
      nombre,
      fecha,
      proceso_aprendizaje: procesoAprendizaje,
      solucionador_problemas: solucionadorProblemas,
      ideas,
      herramientas_fisicas: herramientasFisicas,
      procedimiento,
      recordar_informacion: recordarInformacion,
      comportamientos,
      aperturas,
    };

    try {
      // Realizar la solicitud POST al endpoint /api/registros
      const response = await axios.post('/api/registros', registro);

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        // El registro se guardó correctamente
        console.log('Registro guardado correctamente');
        // Obtener el ID del registro y pasarlo al estado
        const { id } = response.data;
        setRegistroId(id);
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
      } else {
        // Hubo un error al guardar el registro
        console.log('Error al guardar el registro');
        // Aquí puedes mostrar un mensaje de error o manejar la situación de otra manera
      }
    } catch (error) {
      console.log('Error de conexión:', error);
      // Manejar el error de conexión, por ejemplo, mostrando un mensaje de error al usuario
    }
  };

  useEffect(() => {
    // Obtener los comportamientos desde el servidor
    axios
      .get('/api/comportamientos')
      .then((response) => {
        setComportamientos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los comportamientos:', error);
      });

    // Obtener las aperturas desde el servidor
    axios
      .get('/api/aperturas')
      .then((response) => {
        setAperturas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las aperturas:', error);
      });
  }, []);

  useEffect(() => {
    // Obtener el registro actual desde el servidor si hay un registroId
    if (registroId) {
      axios
        .get(`/api/registros/${registroId}`)
        .then((response) => {
          const registro = response.data;
          setNombre(registro.nombre);
          setFecha(registro.fecha);
          setProcesoAprendizaje(registro.proceso_aprendizaje);
          setSolucionadorProblemas(registro.solucionador_problemas);
          setIdeas(registro.ideas);
          setHerramientasFisicas(registro.herramientas_fisicas);
          setProcedimiento(registro.procedimiento);
          setRecordarInformacion(registro.recordar_informacion);
          setComportamientos(registro.comportamientos);
          setAperturas(registro.aperturas);
        })
        .catch((error) => {
          console.error('Error al obtener el registro:', error);
        });
    }
  }, [registroId]);

  useEffect(() => {
    // Obtener los asistentes asociados al registro actual desde el servidor si hay un registroId
    if (registroId) {
      axios
        .get(`/api/registros/${registroId}/asistentes`)
        .then((response) => {
          setAsistentes(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los asistentes:', error);
        });
    }
  }, [registroId]);

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="content">
          <div className="input-container">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="box-container">
            <div className="interest-container">
              <div className="meiquer-color">
                <h2 className="white-title">Nivel de interés</h2>
                <p>Pensando en el proceso de aprendizaje</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="proceso-aprendizaje"
                  value={procesoAprendizaje}
                  onChange={(e) => handleSliderChange(e, setProcesoAprendizaje)}
                />
                <p>Solucionador de problemas</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="solucionador-problemas"
                  value={solucionadorProblemas}
                  onChange={(e) => handleSliderChange(e, setSolucionadorProblemas)}
                />
                <p>Ideas</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="ideas"
                  value={ideas}
                  onChange={(e) => handleSliderChange(e, setIdeas)}
                />
                <p>Uso de herramientas físicas</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="herramientas-fisicas"
                  value={herramientasFisicas}
                  onChange={(e) => handleSliderChange(e, setHerramientasFisicas)}
                />
                <p>Procedimiento</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="procedimiento"
                  value={procedimiento}
                  onChange={(e) => handleSliderChange(e, setProcedimiento)}
                />
                <p>Recordar cierta información</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  id="recordar-informacion"
                  value={recordarInformacion}
                  onChange={(e) => handleSliderChange(e, setRecordarInformacion)}
                />
              </div>
            </div>
            <div className="attendance-container">
              <h2>Asistentes registrados:</h2>
              <ul>
                {asistentes.map((asistente) => (
                  <li key={asistente.id}>{asistente.nombre}</li>
                ))}
              </ul>
              <Link to={{ pathname: "/pagina6", state: { registroId } }} className="button">
                Registrar Asistentes
              </Link>
            </div>
            <div className="implementers-container">
              <div className="meiquer-color">
                <h2 className="white-title">Involucramiento de implementadores</h2>
                {/* Aquí debes mostrar los checkboxes de los implementadores */}
              </div>
            </div>
            <div className="environment-container">
              <div className="white-box">
                <h2 className="blue-title">Entorno</h2>
                {/* Aquí debes mostrar los checkboxes del entorno */}
              </div>
            </div>
            <div className="behavior-container">
              <div className="meiquer-color">
                <h2 className="white-title">Comportamiento</h2>
                <h5>Seleccione una opción</h5>
                <select
                  value={comportamientos[0]}
                  onChange={(e) => setComportamientos([e.target.value, ...comportamientos.slice(1)])}
                >
                  <option value="">Seleccione una opción</option>
                  {comportamientos.map((comportamiento, index) => (
                    <option key={index} value={comportamiento}>
                      {comportamiento}
                    </option>
                  ))}
                </select>
                {/* Aquí debes mostrar los selects de los comportamientos restantes */}
              </div>
            </div>
            <div className="opening-container">
              <div className="white-box">
                <h2 className="blue-title">Apertura</h2>
                <h5>Seleccione una opción</h5>
                <select
                  value={aperturas[0]}
                  onChange={(e) => setAperturas([e.target.value, ...aperturas.slice(1)])}
                >
                  <option value="">Seleccione una opción</option>
                  {aperturas.map((apertura, index) => (
                    <option key={index} value={apertura}>
                      {apertura}
                    </option>
                  ))}
                </select>
                {/* Aquí debes mostrar los selects de las aperturas restantes */}
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="button">
            Guardar
          </button>
          <Link to="/" className="button">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Pagina1;
