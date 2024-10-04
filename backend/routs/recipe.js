const express = require('express');
const router = express.Router();
const recipecontroller = require('../controllers/recipecontroller');

router.post('/createRecipe', recipecontroller.insertRecipe);
router.get('/viewRecipe/:id', recipecontroller.viewRecipe);
router.get('/vieRecipe', recipecontroller.viewRecipe);
router.post('/editRecipe/:id', recipecontroller.editRecipe);
router.delete('/deleteRecipe/:id', recipecontroller.deleterecipe);
module.exports = router;