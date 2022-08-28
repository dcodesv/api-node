const { Router } = require('express');
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'sonzacatealert_dbsys',
    password: 'Sonzacate_2022',
    database: 'DenunciasApp'

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