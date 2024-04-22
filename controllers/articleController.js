//articleController.js
const articleModel = require ('../models/articleModel');

const postArticles = async (req, res) => {
    try {
        // Vérifie si req.file est défini et s'il a la propriété 'path'
        if (!req.file || !req.file.path) {
            throw new Error('No file uploaded');
        }

        // Si req.file est défini et a la propriété 'path', continuez le traitement
        const newArticle = await articleModel.addArticle(req.body, req.file.path);
        res.status(200).send({
            message: 'Articles added successfully',
            data: newArticle,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Error while adding data', details: err.message });
    }
};

const getArticles = async (req, res) => {
    try{
        const articles = await articleModel.findAllArticles(req.body);
        res.status(200).send({
            message: 'Items successfully recovered',
            data: articles,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Error while retrieving items', details: err.message });
    }
    
};
const getArticleById = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await articleModel.getArticlesById(id);
        res.status(200).json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error while retrieving the article' });
    }
};

const deleteArticles = async (req, res) => {
    try {
        const article = await articleModel.deleteArticleById(req.params.id);
        if (!article) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.status(200).send({
            message: 'Item deleted sucessfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error while deleting the article', details: err.message });
    }
}
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        let updatedArticle = await articleModel.updateArticle(id, newData);

        if (!updatedArticle) {
            return res.status(404).send({ error: 'Item not found' });
        }

        // Mettre à jour les champs de l'article avec les nouvelles données
        Object.assign(updatedArticle, newData);

        // Sauvegarder les modifications dans la base de données
        updatedArticle = await updatedArticle.save();

        res.status(200).send({
            message: 'Item updated successfully',
            data: updatedArticle,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error updating the item', details: err.message });
    } 
};

module.exports = {
    postArticles,
    getArticles,
    getArticleById,
    deleteArticles,
    updateArticle
};