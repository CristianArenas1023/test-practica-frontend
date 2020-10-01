import React, { Component } from 'react';
import { withRouter } from 'react-router'

import '../assets/styles/css/components/SearchBar.css';

class SearchBar extends Component {

  constructor(props){
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { searchQuery: ""};
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const searchQuery = this.state.searchQuery;
    // Llamo callback para realizar búsqueda de items.
    this.props.handleSearchFormSubmit(searchQuery);
  }

  handleInputChange(e) {
    const searchQuery = e.target.value;
    this.setState({searchQuery: searchQuery});
  }

  render() {
    return (
      <form className="header__search-bar search-bar" onSubmit={this.handleFormSubmit} role="search">
          <label htmlFor="search-text-field" className="sr-only">Texto a buscar</label>
          <input type="text" id="search-text-field" className="header__search-bar__text-field search-bar__text-field text-field" onChange={this.handleInputChange} placeholder="Nunca dejes de buscar" aria-label="Escribe aquí lo que deseas buscar"  aria-required="true" autoComplete="off" autoFocus maxLength="80" />
          <button type="submit" className="header__search-bar__icon-container search-bar__icon-container" aria-label="Presiona este botón para buscar." >
              <span className="icon search-field__icon-container__icon"></span>
          </button>
      </form>
    );
  }
}

export default withRouter(SearchBar);
