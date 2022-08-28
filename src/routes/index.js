const express =  require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/denuncias', (req, res)=>{
    mysqlConnection.query('SELECT * FROM Denucias',(err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});

router.get('/check-health', (req, res)=>{
    res.status(200).json({message:'Servicio corriendo en puerto 3000'});
});

router.get('/:id',(req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM Denucias WHERE IdDenuncia = ?', [id],(err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/', (req, res)=>{
    const {IdDenuncia, IdZona, Fecha, Estado, Descripcion, Direccion, Mac} = req.body;
    const query = `
    CALL denunciasAddorEdit (?,?,?,?,?,?,?);
    `;
        

   
    mysqlConnection.query(query,[IdDenuncia, IdZona, Fecha, Estado, Descripcion, Direccion, Mac] ,(err,rows, fields) => {
       if(!err){
        res.json({Status: 'Denuncia Guardada exitosamente '})
       } else{
        console.log(err);
       }
    });
});

router.put('/:id', (req, res) => {
    const {IdZona, Fecha, Estado, Descripcion, Direccion, Mac} = req.body;
    const {id} = req.params;
    const query = `
    CALL denunciasAddorEdit (?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query,[id, IdZona, Fecha, Estado, Descripcion, Direccion, Mac],(err,rows, fields) => {
        if(!err){
            res.json({Status: 'Denuncia actualizada exitosamente '})
           } else{
            console.log(err);
           } 
    });
});

router.delete('/:id', (req,res)=>{
  const {id} = req.params;
  mysqlConnection.query('DELETE FROM Denucias WHERE IdDenuncia=?',[id],(err,rows,fields)=>{
    if(!err){
        res.json({Status: 'Denuncia Eliminada exitosamente '})
       } else{
        console.log(err);
       } 
  }); 
});
module.exports = router;