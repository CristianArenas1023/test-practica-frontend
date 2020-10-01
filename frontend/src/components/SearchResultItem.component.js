import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 Renderiza un item con información resumida.
*/
function SearchResultItem (props){
    const item = props.item;
    const ariaLabelItem = "Item: " + item.title + ". Precio: " + item.price.amount;
    const imageSrc = (item.picture ?  item.picture : require("../assets/images/picture_not_found.svg"));
    return (
      <article className="item section-results__item">
        <Link className="item__link item__link-image section-results__item__link-image" to={`/items/${item.id}`} tabIndex="-1" aria-label="Imagen de item">
          <img src={imageSrc} className="item__thumb" alt="Imagen de item"/>
        </Link>
        <div className="section-results__item__data-container">
            <h3 className="section-results__item__price item__price" aria-label="Precio">
                {item.price.currency}{Math.round(item.price.amount)}
                { (item.free_shipping ? <span className="icon section-results__item__free-shipping-icon item__free-shipping-icon" title="Envío gratis" aria-label="Incluye envío gratis"></span> : null ) }
            </h3>
            <Link className="item__link section-results__item__link-title" to={`/items/${item.id}`} role="button" tabIndex="0">
              <h2 className="section-results__item__title item__title" aria-label={ariaLabelItem}>{item.title}</h2>
            </Link>
            <label className="section-results__item__location item__location" aria-label="Ubicación">
                {item.address}
            </label>
        </div>
      </article>
  )
}

export default SearchResultItem;
