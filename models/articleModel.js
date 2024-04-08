const Articles = require ('../schemas/articles')

const insertArticle=async(req,res)=>{
    try {
        const newArticles =new Articles(articleData)
        return newArticles.save();

    } catch (error) {
         throw new Error('Could not create the Article ');
    }
};

module.exports={insertArticle}