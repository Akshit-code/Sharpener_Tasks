const fs = requir('fs');
const { json } = require('body-parser');
const path = require('path');

const p = path.join( 
    path.dirname(process.mainModule.filename),
        'data',
        'cart-json'
    
);
module.exports = class Cart {
    static addProduct(id, prodsuctPrize) {
        fs.readFile(p, (err, fileContent)=> {
            let cart = {products: [] , totalPrize:0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products(existingProductIndex);
            let updatedProduct;
                if(existingProduct) {
                    updatedProduct = {...existingProductIndex};
                    updatedProduct.qty = updatedProduct.qty +1;
                    cart.products = {... cart.products};
                    cart.products[existingProductIndex] = updatedProduct;
                } else {
                    updatedProduct = {id : id , qty :1};
                    cart.products = {... cart.products, updatedProduct} ;
                }
                cart.totalPrize = cart.totalPrize  +  +  prodsuctPrize;
                
                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    console.log(err);
                })
            
        });
    }
}