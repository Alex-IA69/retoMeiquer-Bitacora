import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const data = {
  labels: ['Sesión 1', 'Sesión 2', 'Sesión 3', 'Sesión 4', 'Sesión 5'],
  datasets: [
    {
      label: 'Nivel de Interés',
      data: [80, 65, 70, 75, 90],
      backgroundColor: '#36b4c4',
    },
  ],
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
      max: 100,
      ticks: {
        stepSize: 10,
      },
    },
  },
};

const Pagina3 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current) {
      if (chartRef.current.chartInstance) {
        // Destruir la instancia anterior del gráfico
        chartRef.current.chartInstance.destroy();
      }

      const context = chartRef.current.getContext('2d');
      chartInstance = new Chart(context, {
        type: 'bar',
        data: data,
        options: options,
      });
    }

    // Guardar la instancia del gráfico en la referencia
    chartRef.current.chartInstance = chartInstance;
  }, []);

  return (
    <div>
      <h1>Análisis</h1>
      <h1>Gráfica de Nivel de Interés</h1>
      <div>
        <canvas ref={chartRef} />
      </div>
      <div className="buttons">
        <Link to="/" className="button">Inicio</Link>
        <Link to="/pagina2" className="button">Ver Sesiones Pasadas</Link>
      </div>
    </div>
  );
};

export default Pagina3;
