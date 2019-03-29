const express = require('express');
const app = express();

function MW1(req, res, next){
    console.log(`MWa1`);
    next();
    console.log(`MWa2`);
}

function MW2(req, res, next) { 
    console.log(`MWb1`);
    next()
    console.log(`MWb2`);
}

app.use(MW1);
app.use(MW2);

app.listen(8080, () => {
    console.log(`listening port: 8080.....`);
})

app.get("/", function(req, res, next){
    res.json(req.toString());
})