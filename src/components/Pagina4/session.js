import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const SessionInfo = () => {
    const [sessions, setSessions] = useState([]);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [additionalData, setAdditionalData] = useState({});
  
    useEffect(() => {
      const fetchSessions = async () => {
        try {
          const response = await axios.get('/sesiones');
          const sessionsData = response.data;
          setSessions(sessionsData);
        } catch (error) {
          console.error('Error fetching informacion:', error);
        }
      };
  
      fetchSessions();
    }, []);
  
    const fetchAdditionalData = async (sessionId) => {
        try {
          const response = await axios.get(`/Cognitivo/id/${sessionId}`);
          return response.data[0]; // Assuming only one row of data is returned
        } catch (error) {
          console.error('Error fetching additional data:', error);
          return null;
        }
      };
    
      const handleToggleAdditionalInfo = async () => {
        setShowAdditionalInfo(!showAdditionalInfo);
    
        if (!showAdditionalInfo) {
          const additionalDataMap = {};
          for (const session of sessions) {
            const additionalData = await fetchAdditionalData(session.idSesion);
            additionalDataMap[session.idSesion] = additionalData;
          }
          setAdditionalData(additionalDataMap);
        } else {
          setAdditionalData({});
        }
      };

    return (
        <div>
          <button className="button" onClick={handleToggleAdditionalInfo}>
            {showAdditionalInfo ? 'Esconder información desplegada' : 'Mostrar información desplegada'}
          </button>
          {sessions.length > 0 ? (
            <>
              {sessions.map((session) => (
                <div key={session.idSesion} className="session-container">
                    <div className="default-info">
                    <div className="black-square">
                        <h2>{session.nombreAct}</h2>
                    </div>
                    <p>Participantes: {session.cantParticipantes}</p>
                    <p>Nombre del espacio: {session.nombreEspacio}</p>
                    <p>Fecha: {session.fecha}</p>
                    <p>Notas: {session.notas}</p>
                    </div>
                    {showAdditionalInfo && (
                    <div className="additional-info">
                        <h4>Entorno</h4>
                        <p>Material necesario: {session.materialNecesario ? 'Sí' : 'No'}</p>
                        <p>Internet: {session.internet ? 'Sí' : 'No'}</p>
                        <p>Mobiliario adecuado: {session.mobiliarioAdecuado ? 'Sí' : 'No'}</p>
                        <p>Electricidad: {session.luzElectrica ? 'Sí' : 'No'}</p>
                        <p>Baños: {session.banos ? 'Sí' : 'No'}</p>
                        <h4>Cognitivo</h4>
                        {additionalData[session.idSesion] && (
                            <>
                            <p>pensOrdenAlto: {additionalData[session.idSesion].pensOrdenAlto}</p>
                            <p>pensMinRequerido: {additionalData[session.idSesion].pensMinRequerido}</p>
                            <p>pensNoRelacionado: {additionalData[session.idSesion].pensNoRelacionado}</p>
                            <p>pensDesconocidos: {additionalData[session.idSesion].pensDesconocidos}</p>
                            </>
                        )}
                    </div>
                    )}
                </div>              
              ))}
            </>
          ) : (
            <p>Cargando información de sesiones...</p>
          )}
        </div>
      );
      
};

export default SessionInfo;
