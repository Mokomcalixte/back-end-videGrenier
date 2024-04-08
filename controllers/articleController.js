const articleModel=require('../models/articleModel')

const insert= async (req,res)=>{
const {name,description,price}=req.body;
await articleModel.insertArticle({ name, description, price ,});


    try {
        await articleModel.insertArticle({ name, description, price });
        res.status(201).json({ message: 'a new article is added' });
    } catch (error) {
        res.status(500).json({message:'this article is not added'})
    }
};
const ViewAllArticle=async(res,req)=>{
    try {
        const articles= await articleModel.find()
        res.status(200).json(articles);

    } catch (error) {
    res.status(500).json({message:'articles are unavailable'})
    }
}
const deleteById=async(res,req)=>{
    try {
        await articleModel.findByIdAndDelete(req.body.id);
        res.status(200).json("Product has been deleted...");

    } catch (error) {
        res.status(500).json(error);
    }
}

//const UpdateArticle
const UpdateArticle=async(res,req)=>{
    try {
        await articleModel.findByIdAndUpdate(
                req.params.id,
            { $set: req.body },
            { new: true },
        )
        res.status(200).json(updatedArticle);

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { 
    insert,ViewAllArticle,deleteById,UpdateArticle
};
