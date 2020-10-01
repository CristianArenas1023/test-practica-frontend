var express = require('express');
var router = express.Router();
const axios = require("axios");

const ItemBuilder = require("./../utils/item_builder.js");

/**
  URL para buscar items.
*/
router.get('/items', function(req, res) {
  const searchQuery = req.query.q;
  const error = function(errorMessage){
    res.status(500).json({ error: errorMessage });
  }
  if(searchQuery && searchQuery.trim().length > 0){
    ItemBuilder.getItemsEndpoint(searchQuery)
    .then(function(result){
      res.json(result);
    })
    .catch(function(errorResponse){
      error(errorResponse);
    });
  }else{
    error(`Error al tratar de encontrar items búsqueda "${searchQuery}".`);
  }
});

/**
  URL para buscar detalle de item.
*/
router.get('/items/:id', function(req, res) {
  const itemId = req.params.id;
  const error = function(errorMessage){
    res.status(500).json({ error: errorMessage });
  }
  if(itemId){
    ItemBuilder.getItemDetailEndpoint(itemId)
    .then(function(result){
      res.json(result);
    })
    .catch(function(errorResponse){
      error(errorResponse);
    });
  }else{
    error(`Item con id ${itemId} no encontrado.`);
  }
});

module.exports = router;
