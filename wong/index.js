const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const baseURLcyber = 'https://www.wong.pe/especiales/cyberwong';
const baseURL = 'https://www.wong.pe';
let products = [];
let ListProducts =[];
const finalPath = path.join(__dirname, '/data.js');

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
  console.log(products,'roduct')
  return Promise.all(arr);
};

const getItem = products => {
  // console.log(products,'prodcust')
  const arr = products.map(async(e,i) => {
    // console.log(e,'item')
    const itemHtml = await rp(e);
    const name = cheerio('div.productName', itemHtml)[0].children[0].data;
    // console.log(name,'name')
    const imgSrc = cheerio('a.image-zoom', itemHtml)[0].attribs.href;
    // console.log(imgSrc,'imgSrc');
    const contentDescription = cheerio('div.productDescription', itemHtml) || [];
    const description = contentDescription && contentDescription[0].children.map((e,i) => {
      return e.children && e.children[0].data || null
    });
    // console.log(description,'description')
    const priceList = cheerio('strong.skuListPrice', itemHtml)[0].children[0].data;
    // console.log(priceList, 'priceList')
    const priceBest = cheerio('strong.skuBestPrice', itemHtml)[0].children[0].data;
    // console.log(priceBest, 'priceBest')
    let objResult = {
      name,
      imgSrc,
      priceList,
      priceBest,
      description : description.length && description || null
    };
    ListProducts.push(objResult);
    // return objResult;
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

const writeFileJs = (data) => {
  let template = `
    const data = ${JSON.stringify(data)};
    module.exports = data;
  `;
  fs.writeFile(finalPath, template, (err) => {
    console.log(template);
    if (err) throw err;
    console.log('successful');
    })
}

getCategories()
.then(getProducts)
.then(() => products)
.then(getItem)
.then(() => ListProducts)
.then(writeFileJs)
.then((products) => console.log(products,'SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'))
.catch((err) => {
  console.log(err,ListProducts),
  writeFileJs(ListProducts)
})

// getDescription()
// .then((info) => console.log(info,'SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));