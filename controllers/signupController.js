const signupModel = require('../models/signupModel');

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await signupModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validation des données d'entrée
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Création d'un nouvel utilisateur
    await signupModel.createUser({ firstName, lastName, email, password });

    // Redirection vers la page de connexion après l'inscription réussie
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'An error occurred while signing up' });
  } 
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe
    const user = await signupModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérification du mot de passe
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Login réussi
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

module.exports = { 
    signup,
    login
};
