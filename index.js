const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const articleController = require ('./controllers/articleController');
const userController = require('./controllers/userController');
const signupController = require('./controllers/signupController');
const jwtVerify = require('./middlewares/jwtVerify');

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_CONNECT)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur notre page d\'accueil!</h1>');
});

app.post('/items', upload.single('image'), articleController.postArticles);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/items', articleController.getArticles);
app.get ('/items/:id', articleController.getArticleById);
app.delete('/items/delete/:id', articleController.deleteArticles);
app.put('/items/:id', articleController.updateArticle);
app.post('/login', userController.login);
app.post('/signup', signupController.signup);

app.listen(3005, () => {
    console.log('Serveur démarré sur le port 3005');
  });