import React, { Component } from 'react';

import '../assets/styles/css/components/AppRoot.css';

import Api from '../utils/api.js';
import AppCache from '../utils/cache.js';
import Header from './Header.component.js';
import SectionContainer from './SectionContainer.component.js';
import LoadingSpinner from './LoadingSpinner.component.js';

/**
  Concentra el estado de la aplicación, los demás componentes reciben su estado
  cuando éste considera necesario.
  Provee funciones de callback como "hooks" ante eventos en el ciclo de vida de
  los componentes o cuando sea necesario comprobar/realizar actualización del
  estado de la aplicación.
*/
class AppRoot extends Component {

  constructor(props){
    super(props);
    this.state = {
      loadingSpinnerVisible: false,
      categories: [],
      items: [],
      selectedItem: null
    };
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleSearchItems = this.handleSearchItems.bind(this);
    this.handleItemChanged = this.handleItemChanged.bind(this);
  }

  handleSearchFormSubmit(searchQuery) {
    this.props.history.push(`/items?search=${searchQuery}`);
  }

  setLoadingSpinnerVisible(visible){
    this.setState({loadingSpinnerVisible: visible});
  }

  handleSearchItems(searchQuery) {
    // Buscar por AJAX o caché los items.
    let searchResultRelatedData = AppCache.getSearchResults(searchQuery);
    // Busco en caché.
    if(searchResultRelatedData){
      // Actualizo estado.
      this.setState({ categories: searchResultRelatedData.categories, items: searchResultRelatedData.items });
    }else{
      // De no encontrar en caché, hago petición AJAX a la API.
      this.setLoadingSpinnerVisible(true);
      Api.searchItems(searchQuery,
        (data) => {
          // Actualizo estado de aplicación.
          this.setState({ categories: data.categories, items: data.items });
          // Guardo datos obtenidos en caché
          AppCache.putSearchResults(searchQuery, { categories: data.categories, items: data.items });
          this.setLoadingSpinnerVisible(false);
        },
        (error) => {
          console.error(`Error al buscar items con "${searchQuery}"`);
          alert(`Error al buscar items con "${searchQuery}"`);
          this.setLoadingSpinnerVisible(false);
        }
      );
    }
  }

  handleItemChanged(itemId) {
    // Buscar por AJAX o caché los items.
    let cachedItem = AppCache.getDetailedItem(itemId);
    if(cachedItem && cachedItem.id === itemId){
      this.setState({ selectedItem: cachedItem });
      // Fuerzo scroll para ver portada de detalle de item.
      window.scrollTo(0, 0);
    }else{
      this.setLoadingSpinnerVisible(true);
      Api.getItemDetail(itemId,
        (data) => {
          // TODO [Mejora]: Falta setear categorías.
          this.setState({ selectedItem: data.item });
          this.setLoadingSpinnerVisible(false);
          AppCache.putDetailedItem(data.item);
          // Fuerzo scroll para ver portada de detalle de item.
          window.scrollTo(0, 0);
        },
        (error) => {
          console.error(`Error al buscar detalle de producto  "${itemId}"`);
          alert(`Error al buscar detalle de producto  "${itemId}"`);
          this.setLoadingSpinnerVisible(false);
        }
      );
    }
  }

  render() {
    return (
      <div>
        { this.state.loadingSpinnerVisible ? <LoadingSpinner /> : null }
        <Header handleSearchFormSubmit={this.handleSearchFormSubmit} />
        <SectionContainer
          categories={this.state.categories}
          items={this.state.items}
          selectedItem={this.state.selectedItem}

          handleSearchItems={this.handleSearchItems}
          handleItemChanged={this.handleItemChanged}
          />
      </div>
    );
  }
}

export default AppRoot;
