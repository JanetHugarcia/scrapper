# Scrapping Web
## Wong
### Scrapping con Nodejs
1. request-promise : paquete npm para los request a la página
2. cheerio: paquete npm que trabaja como un jquery para la búsqueda de elementos
3. fs: modulo de node para crear archivos.
4. path: paquete npm para trabajar las rutas en el directorio del proyecto.
### Mostrar data en un servidor local
1. Express
2. Morgan
3. Express-handlebars
4. path

- La data de los productos es un array de objetos con la siguiente estructura
    ```js
    const producto = {
        name, //nombre
        imgSrc, //imagen
        priceList, //precioNormal
        priceBest, //preciioPromocion
        description //descripción
    }
    ```
- Para correr el proyecto:
1. Instalar los paquetes en la carpeta raíz
    > npm install
2. Para Extraer la data de la web y generar un archivo data.js Correr en tu directorio raíz
    > node wong/index.js
3. Para servir la data en el puerto 3000
    > node index.js
4. Dirigete a la siguiente ruta:
    > http://localhost:3000/wong

- Preview:
    ![Preview](https://github.com/JanetHugarcia/scrapper/blob/master/views/assets/img/wong.png)