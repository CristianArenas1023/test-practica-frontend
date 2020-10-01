import React, { Component } from 'react';
import SearchResultItem from "./SearchResultItem.component.js";
import MessageSection from './MessageSection.component.js';
import DocumentTitle  from 'react-document-title';
import SeoOptimizer  from '../utils/seo_optimizer.js';

import '../assets/styles/css/components/SearchResultSection.css';

/**
  Muestra una sección con una lista de items (SearchResultItem).
  Posee un callback para buscar items cuando necesite.
*/
class SearchResultSection extends Component {

  componentDidMount() {
    // Al montarse trata de buscar items (llamando a su callback) dado el queryString de la URL.
    this.refreshSearch(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    const prevLocation = this.props.location;
    const nextLocation = nextProps.location;
    if((prevLocation && nextLocation) && (prevLocation.search !== nextLocation.search)){
      // Si cambia el parámetro "search" de la URL, entonces debe buscar de nuevo.
      // Llama a su callback.
      this.refreshSearch(nextLocation.search);
    }
  }

  /*
    Dada un queryString trata de buscar el parámetro "search" y buscar los items.
  */
  refreshSearch(locatonSearchValue){
    const urlParamSearcher = new URLSearchParams(locatonSearchValue);
    const searchQuery = urlParamSearcher.get("search");
    if(searchQuery){
      this.props.handleSearchItems(searchQuery);
    }
  }

  render() {
    const itemsFound = this.props.items;
    let templateOutput = null;
    if(itemsFound.length > 0){
      templateOutput = (
        <section className="section section-results" aria-live="assertive" aria-atomic="true">
          {itemsFound.map(item => <SearchResultItem item={item} key={item.id} /> )}
        </section>
      );
    }else{
        // Muestro mensaje "no hay items".
        // No muestro el texto usado para buscar por motivos de seguridad: para impedir XSS indirecto por ejemplo.
        templateOutput = (<MessageSection imageUrl={require("../assets/images/no_results.svg")} message="No hay publicaciones que coincidan con tu búsqueda." />);
    }
    // Actualizo título y metadata para contribuir al SEO.
    const pageTitle = 'Resultados de búsqueda | Mercado Libre';
    const pageDescription = "Resultados de búsqueda";
    SeoOptimizer.changeMeta("description", pageDescription);
    SeoOptimizer.changeMeta("og:description", pageDescription);
    SeoOptimizer.changeMeta("og:title", pageTitle);
    // TODO [Mejora]: Convendría agregar al title las categorías encontradas para mejorar el SEO.
    return (
      <DocumentTitle title={pageTitle} >
        {templateOutput}
      </DocumentTitle>
    )
  }
}

export default SearchResultSection;
