import React, { Component } from 'react';

import '../assets/styles/css/components/FloatingMessage.css';

/**
  Renderiza un mensaje flotante.
*/
function FloatingMessage(props) {
  let template = null;
  if(props.message){
    template = (
      <div className="floating-message" aria-live="assertive" aria-atomic="true" role="alert" aria-relevant="all">
        <p>{props.message}</p>
      </div>
      );
  }
  return template;
}

export default FloatingMessage;
