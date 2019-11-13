const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const baseURLcyber = 'https://www.wong.pe/especiales/cyberwong';
const baseURL = 'https://www.wong.pe';
let products = [];

const getCategories= async () => {
  const html = await rp(baseURLcyber);
  const categories = cheerio('div.categsTop__item', html).map((i,e) => {
    const category = e.children[0].attribs.href;
    const link = baseURL + category;
    return link;
  }).get()
  return Promise.all(categories);
};

const getProducts = (categories) => {
  const arr = categories.map(async(e,i) => {
    const productHtml = await rp(e);
    cheerio('a.product-item__name', productHtml).map((i,e) => {
      const productLink = e.attribs.href;
      products.push(productLink);
    }).get();
  })
  return Promise.all(arr);
};

const getItem = products => {
  const arr = products.map(async(e,i) => {
    const itemHtml = await rp(e);
    const imgSrc = cheerio('a.image-zoom', itemHtml)[0].attribs.href;
    const name = cheerio('div.productName', itemHtml)[0].children[0].data;
    const description = cheerio('div.product-specifications__column', itemHtml)
    // .map((i,e) => { 
      console.log(description,'imgSrc')
      // let obj = {};
      // obj[`${e.children[0].data}`] = `${e.children[1].data}`;
      // return obj
    // })
    
  })
  return Promise.all(arr)
}

getCategories()
.then(result => {
  return result
})
.then(getProducts)
.then(() => products)
.then(getItem)
.then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));