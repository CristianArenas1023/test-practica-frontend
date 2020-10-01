
/**
  Módulo capaz de cambiar etiquetas metas de la cabecera dinámicamente con el
  propósito de ayudar a los crawlers de los motores de búsqueda y mejorar el SEO.
*/

const SeoOptimizer = {
  changeMeta: function(name, content){
   let meta = document.querySelectorAll(`meta[name="${name}"]`);
   if(meta.length>0){
     meta.forEach(function(currentMeta){
       currentMeta.content = content;
     });
   }
  }
};


export default SeoOptimizer;
