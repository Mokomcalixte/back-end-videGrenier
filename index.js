
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Importez le module path
const signuoController = require('./controllers/signupController')
const articleController=require('./controllers/articleController')
const signupController = require('./controllers/signupController')


require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_CONNECT)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const app = express();

// Configuration de bodyParser pour analyser les données JSON et les données de formulaire
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route GET pour la page d'accueil
app.get('/', (req, res) => {
  res.send('<h1>Bienvenue sur notre page d\'accueil!</h1>');
});

app.post('/signup', signuoController.signup);
app.post('/article',articleController.insert);
app.get('/article/list',articleController.ViewAllArticle);
app.put('/article/update',articleController.UpdateArticle);
app.delete('/article/deletion',articleController.deleteById);
app.post('/signup', signupController.signup);
app.post('/login', signupController.login);




// Démarrage du serveur
app.listen(3005, () => {
  console.log('Serveur démarré sur le port 3005');
});


