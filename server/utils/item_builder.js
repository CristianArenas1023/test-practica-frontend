/**
  Módulo para hacer peticiones a la API de Mercado Libera y retornar los items
  como JSONs apropiados.
  Nota: todos las funciones son "chainnables" usando objetos Promise.
*/

const axios = require("axios");

// TODO [Mejora]: para mejorar performance podría hacerse uso de una caché, sobre todo para almacenar las currencies obtenidas.

// URLs para acceder a API de Mercado Libre.

const API_URL = "https://api.mercadolibre.com";

const API_ENDPOINTS = {
  SEARCH: `${API_URL}/sites/MLA/search?limit=4&q=:query`,
  ITEM: `${API_URL}/items/:id`,
  ITEM_DESCRIPTION: `${API_URL}/items/:id/description`,
  CURRENCY: `${API_URL}/currencies/:id`
};

/**
  Endpoint llamado para obtener items dado cadena de búsqueda.
*/
const getItemDetailEndpoint = function(itemId){
  return new Promise(function(resolve, reject){
    const urlApiItem = API_ENDPOINTS.ITEM.replace(":id", itemId);
    axios.get(urlApiItem)
    .then(function(response){
      return getItemDetail(response.data);
    })
    .then(function(result){
      resolve(result);
    }).catch(function(error){
      console.log(error);
    });
  });
}

const getItemDetail = function(data){
  return new Promise(function(resolve, reject){
    Promise.all([getItem(data, true), getAuthor()]).then(function(values){
      resolve({
        "author": values[1],
        "item": values[0]
      });
    }).catch(function(error){
      reject(error);
    });
  });
};

/**
  Endpoint llamado para obtene un item en detalle.
*/
const getItemsEndpoint = function(searchQuery){
  var promise = new Promise(function(resolve, reject){
    const urlSearchItems = API_ENDPOINTS.SEARCH.replace(":query", searchQuery);
    axios.get(urlSearchItems)
    .then(function(response){
      return getItems(response.data);
    })
    .then(function(result){
      resolve(result);
    })
  });
  return promise;
}

const getItems = function(data){
  return new Promise(function(resolve, reject){
    var result = {};
    result.author = {};
    result.categories = [];
    result.items = [];
    Promise.all([getCategories(data.filters), getAuthor()])
    .then(function(values){
      result.categories = values[0];
      result.author = values[1];
      var promises = data.results.splice(0,4).map(function(item){
        return getItem(item);
      });
      Promise.all(promises)
      .then(function(items){
        result.items = items;
        resolve(result);
      }).catch(function(error){
        reject(error);
      });
    }).catch(function(error){
      reject(error);
    });
  });
};

const getCategories = function(filters){
  return new Promise(function(resolve, reject){
    let categories = [];
    // Obtengo las categorías recorriendo los filtros y buscando sus valores "category".
    for(var i=0;i<filters.length;i++){
      var filter = filters[i];
      if(filter.id === "category" && filter.values.length > 0){
        categories = filter.values[0].path_from_root.map(function (value) {
          return value.name
        })
      }
    }
    resolve(categories);
  });
}

const getAuthor = function(){
  return {
    name: "Diego",
    lastname: "Barrionuevo"
  };
}

const getDescription = function(itemId){
  return new Promise(function(resolve, reject){
    const urlApiItemDescription = API_ENDPOINTS.ITEM_DESCRIPTION.replace(":id", itemId);
    axios.get(urlApiItemDescription)
    .then(function(response){
      resolve(response.data.plain_text);
    });
  });
}

const getCurrency = function(currencyId){
  return new Promise(function(resolve, reject){
    const urlApiCurrency = API_ENDPOINTS.CURRENCY.replace(":id", currencyId);
    axios.get(urlApiCurrency)
    .then(function(currencyResponse){
      resolve({
        "id": currencyResponse.data.id,
        "symbol": currencyResponse.data.symbol,
        "decimals": currencyResponse.data.decimal_places
      });
    })
  });
};

const getItem = function(data, detailed = false){
  var promise = new Promise(function(resolve, reject){
    var result = {
      id: data.id,
      title: data.title,
      price: {
        currency: "$",
        amount: data.price,
        decimals: "2"
      },
      picture: "",
      condition: data.condition,
      address: "",
      free_shipping:  data.shipping.free_shipping
    };
    let neededPromises = [];
    neededPromises.push(getCurrency(data.currency_id).then(function(currencyData){
      result.price.currency = currencyData.symbol;
      result.price.decimals = currencyData.decimals;
    }));
    if(!detailed){
      // Obtengo un thumbnail de mejor calidad.
      if(data.thumbnail){
        result.picture = data.thumbnail.replace(/-I\./, "-X.");
      }
      if(data.address){
        result.address = data.address.state_name;
      }
    }else{
      if(data.pictures && data.pictures.length>0){
        result.picture = data.pictures[0].url;
      }
      if(data.seller_address && data.seller_address.state){
        result.address = data.seller_address.state.name;
      }
      // Atributos sólo disponibles para detalle de item.
      if(data.sold_quantity){
        result.sold_quantity = data.sold_quantity;
      }else{
        result.sold_quantity = "";
      }
      // Necesita una promesa para obtener la descripción.
      if(data.descriptions && data.descriptions.length > 0){
        neededPromises.push(getDescription(data.id).then(function(description){
          result.description = description;
        }));
      }else{
        result.description = "";
      }
    }
    Promise.all(neededPromises).then(function(...values){
      resolve(result);
    }).catch(function(error){
      reject(error);
    });
  });
  return promise;
}

const ItemBuilder = {
  getItemDetailEndpoint: getItemDetailEndpoint,
  getItemsEndpoint: getItemsEndpoint
};

module.exports = ItemBuilder;
