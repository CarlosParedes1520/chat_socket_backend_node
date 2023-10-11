const { response } = require("express");
const Usuario = require("../models/usuario");



const getUsuarios = async(req, res=response) => {
    // {ok: true, msg: ''getUsuario}
    const desde = Number(req.query.desde) || 0;
    
    const usuarios =  await Usuario
    //omito mi propio usuario al listar 
    .find({_id: {$ne: req.uid}})
    .sort('-online')
    .skip(desde)
    .limit(4)


    res.json({
        ok: true,
        usuarios
        
        // usuario,
        // token
    })
} 


module.exports ={
    getUsuarios
}