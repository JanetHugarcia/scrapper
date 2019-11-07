const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const baseURLcyber = 'https://www.wong.pe/especiales/cyberwong';
const baseURL = 'https://www.wong.pe';

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
    let products = [];
    const arr = categories.map(async(e,i) => {
        const productHtml = await rp(e);
        // console.log(i,'ele')
        // console.log(productHtml,'producthtml')
        cheerio('a.product-item__name', productHtml).map((i,e) => {
            const productLink = e.attribs.href;
            products.push(productLink)
        }).get();
        // console.log(products,'prodcust')
        return products;
    })
    return Promise.all(arr);
};

const getProduct = async () => {
    const html = await rp(baseURLcyber);
    const categories = cheerio('div.categsTop__item', html).map(async(i,e) => {
        const category = e.children[0].attribs.href;
        const link = baseURL + category;
        return link;
        // const productHtml = await rp(link);
        // const products = cheerio('a.product-item__name', productHtml).map(async(i,e) => {
        //     const productLink = e.attribs.href;
        //     return {
        //         productLink
        //     }
        //     const title = e.attribs.title;
        //     const innerHtml = await rp(productLink);
        //     const img = cheerio('img.zoomImg', innerHtml).props('src');
        //     const price = cheerio('strong.skuBestPrice', innerHtml).text();
        //     const description = cheerio('div.productDescription').find('p').map((i,e) => {
        //         let line = e.text();
        //         return line + e.text() + ' ';
        //     })
        //     return {
        //         title,
        //         img,
        //         price,
        //         description
        //     }

        // }).get();
        // return Promise.all(products);
    }).get()
    // const businessMap = cheerio('div.categsTop__item', html).map(async (i, e) => {
    //   const link = baseURL + e.attribs.href;
    //   const innerHtml = await rp(link);
    //   const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
    //   const name = e.children[0].data;
    //   const phone = cheerio('p.phone', innerHtml).text();
  
    //   return {
    //     emailAddress,
    //     link,
    //     name,
    //     phone,
    //   }
    // }).get();
    return Promise.all(categories);
  };

  getCategories()
  .then(result => {
        // console.log(results,'finaly')
    //   fs.writeFile('data.js', JSON.stringify(result), (err) => {
    //     console.log(typeof JSON.stringify(result));
    //     if (err) throw err;
    //     console.log('successful');
    //   })
    return result
  })
  .then(getProducts)
  .then(result => console.log(result.length, 'productos'))
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));