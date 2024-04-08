//voici mon page signupModel, qu'est ce que je dois dois mettre dans le signupController
const User = require ('../schemas/user');


// Fonction pour créer un nouvel utilisateur
const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        return newUser.save();
    } catch (error) {
        throw new Error('Could not create user');
    }
};

// Fonction pour rechercher un utilisateur par son adresse e-mail
const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error('Could not find user by email');
    }
};


module.exports = {
    createUser,
    findUserByEmail
};
