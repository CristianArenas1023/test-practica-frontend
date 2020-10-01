import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import MessageSection from './MessageSection.component.js';
import Breadcrumb from './Breadcrumb.component.js';
import SearchResultSection from './SearchResultSection.component.js';
import ItemDetailSection from './ItemDetailSection.component.js';

/**
  Representa en contenido: breadcrumb y "página" actual.
  Renderiza una página con mensaje de error para el usuario cuando corresponda.
  Pasa las props que le corresponden (junto con los callbacks necesarios) a los componentes encargados de renderizar el estado de la aplicación.
*/
function SectionContainer (props){
    return(
    <main className="main" role="main">
        <div className="container main__container">
          <Breadcrumb categories={props.categories} />
          <Switch>
            <Route
              exact path="/"
              render={(props) => <MessageSection {...props} imageUrl={null} message="¡Bienvenido, empieza a buscar lo que quieras!" />}
            />
            <Route
              exact path="/items"
              render={(routeProps) => <SearchResultSection {...routeProps} items={props.items}  handleSearchItems={props.handleSearchItems}/>}
              />
            <Route
              exact path="/items/:id"
              render={(routeProps) => <ItemDetailSection {...routeProps} item={props.selectedItem} handleItemChanged={props.handleItemChanged} />}
              />
            <Route
              render={(props) => <MessageSection {...props} imageUrl={null} message="Ups, página no encontrada." />}
            />
          </Switch>
        </div>
    </main>
  );
}

export default SectionContainer;
