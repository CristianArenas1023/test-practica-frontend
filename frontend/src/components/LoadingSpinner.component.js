import React, { Component } from 'react';

import '../assets/styles/css/components/LoadingSpinner.css';

/**
  Muestra un spinner para representar un estado de "cargando".
*/
function LoadingSpinner(props){
  return (
    <div className="spinner" role="presentation">
      <img className="spinner__icon" src={require('../assets/images/loading_spin.svg')} alt="Cargando" />
    </div>
  );
}

export default LoadingSpinner;
