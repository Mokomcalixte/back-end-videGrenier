//dans mon schema, j'ai deja le fichier book.js qui gere les livres. est ce que je devrais creer un nouveau fichier user qui permet de s'inscrire?
const mongoose = require ('mongoose')
const { Schema } = mongoose;
const articlesSchema = new Schema({

   
     image: {
        type: String, // Stocke l'image en tant que données binaires
      },

    name:{
        type: String,
        required : [true, 'Le nom est obligatoire'],

    },
    description:{
        type: String,
        required : [true, " La description est obligatoire"],

    },
    price: {
        type: String, 
        required: [true, 'Le prix est obligatoire'],

    },
   

});

const Articles = mongoose.model('Articles', articlesSchema);
module.exports = Articles;