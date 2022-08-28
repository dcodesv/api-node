const { Router } = require('express');
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'Admin',
    database: 'denunciasapp'

});
mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('coneccion con exito db');
    }
});

module.exports = mysqlConnection;