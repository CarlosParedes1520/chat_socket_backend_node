const { comprobanteJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection',  (client) => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobanteJWT(client.handshake.headers['x-token']);
    // Verificar autentificacion
    if (!valido) {
        return client.disconnect();
    }
    // Cliente autentificado
    usuarioConectado(uid);

    // ingresar al usuario a una sala especifica
    // Sala global
    client.join(uid);
//escuchar del cliente el mensaje
     client.on('mensaje-personal', async(payload)=> {
        await grabarMensaje(payload);
        console.log(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
     });


    console.log('Cliente autenticado');
    
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });

});
