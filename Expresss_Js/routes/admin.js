const express=  require('express');
const router = express.Router();

router.use( "/add-product" , (req, res, next)=> {
    res.send(`
    <form action="/api//product-details" method="POST"> 
        <input type="text", name="title", placeholder="Enter product name">
        <input type="text", name="desc", placeholder="Description"> 
        <button type="submit">Submit</button>
    </form>`);
});

router.post("/product-details", (req, res, next) => {
    console.log(req.body);
    res.redirect("/api//add-product");
});

module.exports = router;