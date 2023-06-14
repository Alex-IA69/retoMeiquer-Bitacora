import React from 'react';
import logo from './logo.png';
import './Banner.css';

function Banner() {
  return (
    <div className="banner">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="banner-title">Bitacora</h1>
    </div>
  );
}

export default Banner;
