const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const getProductFromFile = cb => {
    const p = path.join(path.dirname(process.mainModule.filename,
        'data',
        'products.json'));
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        }
        cb(JSON.parse(fileContent)); 
    });
}
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductFromFile();
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=> console.log(err) );
        });
    }

    static fetchAll(cb) {
        getProductFromFile(cb);
    }
}