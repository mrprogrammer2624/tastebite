import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { Button } from "@/components";

export default function RecipeDetail({ recipe, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <RecipeForm
        recipe={recipe}
        onSubmit={onUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="mr-2"
          >
            edit
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(recipe.id)}
          >
            trash
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">Cuisine: {recipe.cuisineType}</p>
      <p className="text-gray-600 mb-4">
        Cooking Time: {recipe.cookingTime} minutes
      </p>
      <h3 className="font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="font-semibold mb-2">Instructions:</h3>
      <p className="whitespace-pre-wrap">{recipe.instructions}</p>
    </div>
  );
}
