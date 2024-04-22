//articleModel.js
const Articles = require('../schema/articles');
const Article = require ('../schema/articles');

const addArticle = (articleData, imagePath) =>{
    const newArticle = new Article({
        ...articleData,
        image: imagePath
    })
    return newArticle.save();
};

const findAllArticles = async () =>{
    try{
        return await Article.find();
    } catch (err) {
        console.log(err);
        throw new Error ('Error while retrieving items')
    }
};

const getArticlesById = async (id) => {
    try{
        return await Article.findById(id)
    } catch (err) {
        console.error(err);
        throw new Error ('Error while retrieving items')
    }
};

const deleteArticleById = async (id) => {
    try{
        return await Article.findByIdAndDelete(id);

    } catch (err){
        console.error(err);
        throw new Error('Error while deleting the article');
    }
}

const updateArticle = async (id, articleData) => {
    try {
        return await Article.findByIdAndUpdate(id, articleData, { new: true }); 
    } catch (err) {
        console.error(err);
        throw new Error('Error updating the item');
    }
}; //voici mon model

module.exports = {
    addArticle,
    findAllArticles,
    getArticlesById,
    deleteArticleById,
    updateArticle
}