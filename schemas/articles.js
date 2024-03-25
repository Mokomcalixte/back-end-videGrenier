//dans mon schema, j'ai deja le fichier book.js qui gere les livres. est ce que je devrais creer un nouveau fichier user qui permet de s'inscrire?
const mongoose = require ('mongoose')
const { Schema } = mongoose;
const articlesSchema = new Schema({

    image: {
        type: String, // Stocke l'image en tant que données binaires
      },
    name:{
        type: String,
        required : [true, 'Le tire est obligatoire'],

    },
    description:{
        type: String,
        required : [true, "L'auteur est obligatoire"],

    },
    price: {
        type: Number, 
        required: [true, 'La date de publication est obligatoire'],

    },
   

});

const Articles = mongoose.model('Articles', articlesSchema);
module.exports = Articles;