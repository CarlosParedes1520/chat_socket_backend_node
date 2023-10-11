

const {Schema, model } = require('mongoose');


const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // fecha: {
    //     type: Date,
    //     default: new  Date()
    // },
    // online: {
    //     type: Boolean,
    //     default: true,
    // },
    mensaje: {
        type: String,
        required: true
    }
},{
    timestamps:true
});


MensajeSchema.method('toJSON', function () {
    const {__v, _id, ...Object} = this.toObject();
   
    return  Object ;
})


module.exports  = model('Mensaje', MensajeSchema);