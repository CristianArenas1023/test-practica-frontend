import React, { Component } from 'react';

import '../assets/styles/css/components/MessageSection.css';

/**
  Renderiza un mensaje con una imagen opcional.
*/
function MessageSection (props){
  return(
    <section className="section section--message" aria-live="assertive" aria-atomic="true" role="alert" aria-relevant="all">
        <div className="section--message__container">
            {props.imageUrl ? <img src={props.imageUrl} alt="Alerta" /> : null }
            <p className="section--message__container__message">
                {props.message}
            </p>
        </div>
    </section>
  );
}

export default MessageSection;
