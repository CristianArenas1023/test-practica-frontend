import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.component.js';
import { withRouter } from 'react-router'

import '../assets/styles/css/components/Header.css';

/**
  Renderiza la cabecera principal con el logo y el buscador de items.
*/
function Header (props){
  return (
    <header className="header" role="banner">
        <div className="container header__container">
          <Link className="link header__logo-container" to="/" tabIndex="-1" aria-label="Comenzar otra búsqueda" title="Comenzar otra búsqueda">
            <span className="icon header__logo-container__logo"></span>
          </Link>
          <SearchBar handleSearchFormSubmit={props.handleSearchFormSubmit}/>
        </div>
    </header>
  );
}

export default withRouter(Header);
