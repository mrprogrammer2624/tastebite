import { useState } from "react";

import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import RecipeForm from "./RecipeForm";
import { Button } from "@/components";

export const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() };
    setRecipes([...recipes, newRecipe]);
    setIsAddingRecipe(false);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setSelectedRecipe(null);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recipes</h2>
            <Button onClick={() => setIsAddingRecipe(true)}>
              {/* <PlusCircle className="mr-2 h-4 w-4" /> Add Recipe */}
              plus
            </Button>
          </div>
          <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />
        </div>
        <div className="md:col-span-2">
          {isAddingRecipe ? (
            <RecipeForm
              onSubmit={addRecipe}
              onCancel={() => setIsAddingRecipe(false)}
            />
          ) : selectedRecipe ? (
            <RecipeDetail
              recipe={selectedRecipe}
              onUpdate={updateRecipe}
              onDelete={deleteRecipe}
            />
          ) : (
            <div className="text-center text-gray-500 mt-8">
              Select a recipe or add a new one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
