import axios from 'axios';

/**
  API para consultar los endpotins del servidor:

  Función para buscar items dado una consulta.
  - searchItems(query: String)

  Functión para buscar un item dado su id.
  - getItemDetail(itemId: String)

  Nota: en lugar de usar Promises, la Api provee mecanismos de callback.
  TODO [Mejora]: por flexibilidad sería conveniente que retorne el objeto Promise devuelto por axios.
*/

const serverUrl = "http://localhost:3002";
const API_URL = `${serverUrl}/api`;

function sendRequest(url, handleSuccess, handleError){
  axios.get(url)
  .then(function (response) {
    handleSuccess(response.data);
  })
  .catch(function (error) {
    if(handleError){
      handleError(error);
    }else{
      console.log(error);
    }
  });
}

function searchItems(query, handleSuccess, handleError){
  let url = API_URL + '/items?q=' + query;
  sendRequest(url, handleSuccess, handleError);
}

function getItemDetail(itemId, handleSuccess, handleError){
  let url = API_URL + '/items/' + itemId;
  sendRequest(url, handleSuccess, handleError);
}

const Api = {
  searchItems: searchItems,
  getItemDetail: getItemDetail
};

export default Api;
