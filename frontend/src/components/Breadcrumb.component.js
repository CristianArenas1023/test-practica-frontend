import React, { Component } from 'react';

import '../assets/styles/css/components/Breadcrumb.css';

/**
  Renderiza un "breadcrumb" para mostrar la jerarquía de categorías.
  TODO [Mejora]: Hacer "links" cada nivel de la jerarquía así permitir navegar fácilmente.
*/
function Breadcrumb(props) {
  const categories = props.categories.map((category) =>
  <li className="breadcrumb__item" key={category.toString()}>
    {category.toString()}
  </li>
  );
  return (
    <ul className="breadcrumb" role="navigation" aria-label="Categorías">
        { categories }
    </ul>
  );
}

export default Breadcrumb;
