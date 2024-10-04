import { Input } from "@/components";
import { Icons } from "@/constants";
import { useState } from "react";

export default function RecipeList({ recipes, onSelectRecipe }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4">
        {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
        <Input
          type="text"
          suffix={Icons.search}
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <ul className="space-y-2">
        {filteredRecipes.map((recipe) => (
          <li
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe)}
            className="p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold">{recipe.title}</h3>
            <p className="text-sm text-gray-500">{recipe.cuisineType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
