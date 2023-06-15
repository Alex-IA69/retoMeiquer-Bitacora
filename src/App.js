import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Pagina1 from './components/Pagina1';
import Pagina2 from './components/Pagina2';
import Pagina5 from './components/Pagina5';
import Pagina4 from './components/Pagina4';
import Pagina3 from './components/Pagina3';
import Pagina6 from './components/Pagina6';

import Banner from './Banner';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Banner />
        </header>
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Pagina5 />} />
            <Route path="/pagina1" element={<Pagina1 />} />
            <Route path="/pagina2" element={<Pagina2 />} />
            <Route path="/pagina4" element={<Pagina4 />} />
            <Route path="/pagina3" element={<Pagina3 />} />
            <Route path="/pagina6" element={<Pagina6 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
