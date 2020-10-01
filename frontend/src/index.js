import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle  from 'react-document-title';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppRoot from './components/AppRoot.component.js';
import registerServiceWorker from './registerServiceWorker';

import './assets/styles/css/main.css';

// Entrada a aplicación
// Uso Router para navegar y mostrar/ocultar el componente correcto de acuerdo a la URL.

ReactDOM.render(
  (
    <DocumentTitle title='Bienvenido a Mercado Libre'>
      <Router>
        <Route path='/' component={AppRoot} />
      </Router>
    </DocumentTitle>
  )
  , document.getElementById('app-root'));
registerServiceWorker();
