import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import axios from 'axios';

const getCognitivoData = async () => {
  const response = await axios.get('/cognitivo');
  const data = response.data;

  // Calcula el promedio por cada columna
  const pensOrdenAltoAverage = calculateAverage(data, 'pensOrdenAlto');
  const pensMinRequeridoAverage = calculateAverage(data, 'pensMinRequerido');
  const pensNoRelacionadoAverage = calculateAverage(data, 'pensNoRelacionado');
  const pensDesconocidosAverage = calculateAverage(data, 'pensDesconocidos');

  // Formatea los datos
  const chartData = {
    labels: ['Pensamiento de orden alto', 'Pensamiento mínimo requerido',
             'Pensamientos no relacionados', 'Pensamientos desconocidos'],
    datasets: [
      {
        label: 'Promedio',
        data: [pensOrdenAltoAverage, pensMinRequeridoAverage, pensNoRelacionadoAverage, pensDesconocidosAverage],
        backgroundColor: '#36b4c4',
      },
    ],
  };
  return chartData;
};

const getInteraccionesData = async () => {
  const response = await axios.get('/interacciones');
  const data = response.data;

  // Calcula el promedio por cada columna
  const conCompanerosAverage = calculateAverage(data, 'conCompaneros');
  const conImplementadoresAverage = calculateAverage(data, 'conImplementadores');
  const disenadoresContenidoAverage = calculateAverage(data, 'disenadoresContenido');

  // Formatea los datos
  const chartData = {
    labels: ['Con compañeros', 'Con implementadores', 'Con diseñadores de contenido'],
    datasets: [
      {
        label: 'Promedio',
        data: [conCompanerosAverage, conImplementadoresAverage, disenadoresContenidoAverage],
        backgroundColor: '#36b4c4',
      },
    ],
  };
  return chartData;
};


  const getNivelDeInteres = async () => {
    const response = await axios.get('/nivelDeInteres');
    const data = response.data;
  
    const pensandoProcesoAprendizajeAverage = calculateAverage(data, 'pensandoProcesoAprendizaje');
    const solucionadorProblemasAverage = calculateAverage(data, 'solucionadorProblemas');
    const ideasAverage = calculateAverage(data, 'ideas');
    const usoHerramientasAverage = calculateAverage(data, 'usoHerramientas');
    const procedimientoAverage = calculateAverage(data, 'procedimiento');
    const recordarCiertaInfoAverage = calculateAverage(data, 'recordarCiertaInfo');
  
    // Formatea los datos
    const chartData = {
      labels: ['Pensando en el aprendizaje', 'Solucionador de problemas', 
        'Ideas', 'Uso de herramientas',
        'Procedimiento (seguir pasos)', 'Recordar cierta información'],
      datasets: [
        {
          label: 'Promedio',
          data: [pensandoProcesoAprendizajeAverage, solucionadorProblemasAverage, ideasAverage,
                usoHerramientasAverage, procedimientoAverage, recordarCiertaInfoAverage],
          backgroundColor: '#36b4c4',
        },
      ],
    };

  return chartData;
};

const calculateAverage = (data, column) => {
  const values = data.map(item => item[column]);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  return average;
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const Pagina3 = () => {
  const chartRefA = useRef(null); // Cognitivo
  const chartRefB = useRef(null); // Interacciones
  const chartRefC = useRef(null); // Nivel de interes
  
  useEffect(() => {
    getCognitivoData()
      .then(data => {
        if (chartRefA.current) {
          const context = chartRefA.current.getContext('2d');
          new Chart(context, {
            type: 'bar',
            data: data,
            options: options,
          });
        }})
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    getInteraccionesData()
      .then(data => {
        if (chartRefB.current) {
          const context = chartRefB.current.getContext('2d');
          new Chart(context, {
            type: 'bar',
            data: data,
            options: options,
          });
        }})
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    getNivelDeInteres()
      .then(data => {
        if (chartRefC.current) {
          const context = chartRefC.current.getContext('2d');
          new Chart(context, {
            type: 'bar',
            data: data,
            options: options,
          });
        }})
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Análisis</h1>
      <h2>Desempeño Interacciones</h2>
      <div>
        <canvas ref={chartRefB} />
      </div>
      <h2>Desempeño cognitivo</h2>
      <div>
        <canvas ref={chartRefA} />
      </div>
      <h2>Desempeño Interacciones</h2>
      <div>
        <canvas ref={chartRefC} />
      </div>
      <div className="buttons">
        <Link to="/" className="button">Inicio</Link>
        <Link to="/pagina2" className="button">Ver resumen</Link>
      </div>
    </div>
  );
};

export default Pagina3;
