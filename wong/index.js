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
    const name = cheerio('div.productName', itemHtml)[0].children[0].data;
    const imgSrc = cheerio('a.image-zoom', itemHtml)[0].attribs.href;
    const contentDescription = cheerio('div.productDescription', itemHtml) || [];
    const description = contentDescription && contentDescription[0].children.map((e,i) => {
      return e.children && e.children[0].data || null
    });
    return {
      name,
      imgSrc,
      description : description.length && description || null
    }
  })
  return Promise.all(arr)
}

const getDescription = async() => {
  const itemHtml = await rp('https://www.wong.pe/panasonic-televisor-led-43-tc-43fs500-37445/p');
  const description = cheerio('div.productDescription', itemHtml)[0].children.map((e,i) => {
    return e.children[0].data
  })
  return description
}

getCategories()
.then(getProducts)
.then(() => products)
.then(getItem)
.then(result => {
  fs.writeFile('data.js', JSON.stringify(result), (err) => {
    console.log(typeof JSON.stringify(result));
    if (err) throw err;
    console.log('successful');
    })
})
.then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));

// getDescription()
// .then((info) => console.log(info,'SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));