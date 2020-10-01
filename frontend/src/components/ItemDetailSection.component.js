import React, { Component } from 'react';
import { withRouter } from 'react-router';
import DocumentTitle  from 'react-document-title';
import MessageSection from './MessageSection.component.js';
import SeoOptimizer  from '../utils/seo_optimizer.js';

import '../assets/styles/css/components/ItemDetailSection.css';

/**
  Muestra una sección con el detalle de un item.
  Posee un callback para buscar el item en caso de que sea necesario actualizarlo.
*/
class ItemDetailSection extends Component {

  componentDidMount() {
    const itemId = this.props.match.params.id;
    this.props.handleItemChanged(itemId);
  }

  render() {
    let reactElement = null;
    const item = this.props.item;
    let pageTitle = "Detalles de producto seleccionado";
    if(item){
      // Template con información del item seleccionado.
      pageTitle = "Producto " +  item.title + " | Mercado Libre";
      // Creo constantes para mostrar datos sobre el precio.
      const roundPrice = (parseFloat(item.price.amount).toFixed(item.price.decimals)) + "";
      const [integerPart, decilmalPart] = (roundPrice.split("."));
      // Src de imagen
      const imageSrc = (item.picture ?  item.picture : require("../assets/images/picture_not_found.svg"));
      // Actualizo título y metadata para contribuir al SEO.
      const pageDescription = "Compra " + item.title;
      SeoOptimizer.changeMeta("description", pageDescription);
      SeoOptimizer.changeMeta("og:description", pageDescription);
      SeoOptimizer.changeMeta("og:title", pageTitle);
      // TODO [Mejora]: Convendría agregar al title las categorías encontradas para mejorar el SEO.
      reactElement = (
      <section className="section section--item-detail">
        <article className="item item-detail">
          <div className="item-detail__image-container">
            <img className="item-detail__image-container__image" src={imageSrc} alt="Imagen del producto" />
          </div>
          <div className="item-detail__data-container">
            <label className="item-detail__other-data">
              <span aria-label="Condición">{item.condition === "new" ? "Nuevo" : "Usado"}</span>
              { (item.sold_quantity ? <span>&nbsp;-&nbsp;</span> : null) }
              { (item.sold_quantity ? <span aria-label="Cantidad de unidades vendidas">{item.sold_quantity} vendidos</span> : null) }
            </label>
            { (item.address ? <label className="item-detail__other-data" aria-label="Ubicación"> {item.address} </label> : null) }
            <h1 className="item-detail__title" aria-label="Título" title={item.title}>{item.title}</h1>
            <h3 className="item-detail__price" aria-label="Precio">
              {item.price.currency}{integerPart}
              <sup className="item-detail__price__decimals">
                {decilmalPart}
              </sup>
            </h3>
            { (item.free_shipping ? <label className="item-detail__other-data item-detail__other-data--free-shipping" aria-label="Incluye envío gratis">Envío gratis</label> : null ) }
            <button className="button button--primary button--block" type="button" tabIndex="0" title="Haga click aquí para comprar el item." aria-label="Botón para comprar">Comprar</button>
          </div>
          <div className="item-detail__description-container">
            <h2 className="item-detail__description-title">Descripción del producto</h2>
            <p className="item-detail__description" aria-label="Descripción del producto">
                {(item.description) ? item.description : "Sin descripción."}
            </p>
          </div>
        </article>
      </section>
    );
    }else{
      // Template vacío
      pageTitle = "Producto no encontrado.";
      reactElement = (<MessageSection imageUrl={null} message="No se pudo encontrar el producto." />);
    }
    return (
        <DocumentTitle title={pageTitle}>
          {reactElement}
        </DocumentTitle>
    )
  }
}

export default ItemDetailSection;
