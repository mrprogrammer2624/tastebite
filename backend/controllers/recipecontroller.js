const Recipe = require("../models/Recipe");

module.exports.insertRecipe = async (req, res) => {
    try {
        if (req.body) {
            const { title, ingredients, instructions, cuisine, author } = req.body;
            if (!title || !ingredients || !instructions || !cuisine || !author) {
                return res.status(400).json({ message: "Required filed is Missing" });
            }
            let exsiting = await Recipe.findOne({ title })
            if (exsiting) return res.status(400).json({ message: "Recipe already have" });
            req.body.createdAt = new Date().toLocaleString();
            console.log(req.body);
            const recipe = await Recipe.create(req.body);
            if (recipe) return res.status(201).json({ message: 'Recipe created successfully', data: recipe });
            return res.status(404).json({ message: "Somethinh went wrong" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.viewRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        var recipe;
        if (!recipeId) {
            recipe = await Recipe.find();
        }
        recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: 'Recipe fetched successfully', data: recipe });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.editRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const { title, ingredients, instructions, cuisine, author } = req.body;
        if (!title || !ingredients || !instructions || !cuisine || !author) {
            return res.status(400).json({ message: "Required field is missing" });
        }
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            { title, ingredients, instructions, cuisine, author, updatedAt: new Date().toLocaleString() },
            { new: true } 
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: 'Recipe updated successfully', data: updatedRecipe })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}

module.exports.deleterecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;

        if (!recipeId) {
            return res.status(400).json({ message: "Recipe ID is required" });
        }
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server eroor" });
    }
}