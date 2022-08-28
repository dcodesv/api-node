const express = require('express');
const app= express();

const morgan = require('morgan'); //es un middleward
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));//soportar datos de formularios 

//setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);


//ROUTE
app.use(require('./routes/index'))

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(` server on port ${app.get('port')}`);
});