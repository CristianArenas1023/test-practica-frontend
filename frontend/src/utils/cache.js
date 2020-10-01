
/**
  Módulo usado para almacenar localmente información consumida por la API.
  Con el propósito de mejorar la performance.
  Por cuestiones de fiabilidad de la información, los datos caducan tras pasar
  los milisegundos seteados en la constante "STORED_ITEM_TIMELIFE".

  Nota: usa sessionStorage por lo que la información almacenada se perderá al cerrar el navegador.
*/

const STORAGE_NAME = "MercadoLibreCache";

// En milisegundos. 40 segundos por defecto.
const STORED_ITEM_TIMELIFE = 40000;

const getStorage = function(){
  if(!sessionStorage.getItem(STORAGE_NAME)){
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify({datailedItems: {item: null, insertedDate: null}, searchResults: {searchResultRelatedData: {items: [], categories: []}, insertedDate: null}  }));
  }
  return JSON.parse(sessionStorage.getItem(STORAGE_NAME));
}

const setItem = function(key, value){
    const storage = getStorage();
    storage[key] = value;
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(storage));
};

const getItem = function(key){
 const storage = getStorage();
 return storage[key];
}

const getDetailedItem = function(itemId){
  const storage = getStorage();
  const storedItem = storage["datailedItems"][itemId+""];
  if (!storedItem || (storedItem && isInvalid(storedItem)) ){
    return null;
  }else{
    return storedItem["item"];
  }
}

const putDetailedItem = function(detailedItem){
  const storage = getStorage();
  storage["datailedItems"][detailedItem.id+""] = {
    item: detailedItem,
    insertedTimestamp: (new Date()).getTime()
  };
  setItem("datailedItems", storage["datailedItems"]);
}

const isInvalid = function(storedItem){
  const insertedTimestamp = storedItem["insertedTimestamp"];
  if(!insertedTimestamp){
    return true;
  }
  const now = new Date();
  return (now.getTime() - insertedTimestamp > STORED_ITEM_TIMELIFE);
};

const getSearchResults = function(searchQuery){
  const storage = getStorage();
  const storedItem = storage["searchResults"][searchQuery];
  if (!storedItem || (storedItem && isInvalid(storedItem)) ){
    return null;
  }else{
    return storedItem["searchResultRelatedData"];
  }
}

const putSearchResults = function(searchQuery, searchResultRelatedData){
  const storage = getStorage();
  storage["searchResults"][searchQuery] = {
    searchResultRelatedData: searchResultRelatedData,
    insertedTimestamp: (new Date()).getTime()
  };
  setItem("searchResults", storage["searchResults"]);
}

const AppCache = {
  setItem: setItem,
  getItem: getItem,
  getDetailedItem: getDetailedItem,
  putDetailedItem: putDetailedItem,
  getSearchResults: getSearchResults,
  putSearchResults: putSearchResults
};

export default AppCache;
