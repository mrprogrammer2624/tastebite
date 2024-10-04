import { useState } from 'react';
import { Button, Input } from '@/components';

export default function RecipeForm({ recipe, onSubmit, onCancel }) {
  const [title, setTitle] = useState(recipe?.title || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients.join('\n') || '');
  const [instructions, setInstructions] = useState(recipe?.instructions || '');
  const [cuisineType, setCuisineType] = useState(recipe?.cuisineType || '');
  const [cookingTime, setCookingTime] = useState(recipe?.cookingTime.toString() || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      ingredients: ingredients.split('\n').filter(i => i.trim() !== ''),
      instructions,
      cuisineType,
      cookingTime: parseInt(cookingTime, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (one per line)</label>
        <Input
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
        <Input
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">Cuisine Type</label>
        <Input
          id="cuisineType"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">Cooking Time (minutes)</label>
        <Input
          id="cookingTime"
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          required
          min="1"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{recipe ? 'Update' : 'Add'} Recipe</Button>
      </div>
    </form>
  );
}
