import { useState } from "react";
import clsx from "clsx";
import { Button, Input, Select, TextAreas } from "@/components";
import styles from "./AddRecipe.module.css";
import { cuisineOptions } from "@/constants";

export const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    cookingTime: "",
  });

  const handleChange = (name, value) => {
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedRecipeData = {
      ...recipeData,
      ingredients: recipeData.ingredients.split("\n"),
      cookingTime: parseInt(recipeData.cookingTime, 10),
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedRecipeData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setRecipeData({
        title: "",
        ingredients: "",
        instructions: "",
        cuisineType: "",
        cookingTime: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        className={clsx(styles.AddRecipe, "d-flex flex-column")}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          label={"Title"}
          placeholder={"Title"}
          name="title"
          value={recipeData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextAreas
          label={"Ingredients (one per line)"}
          placeholder={"Ingredients (one per line)"}
          name="ingredients"
          value={recipeData.ingredients}
          onChange={(e) => handleChange("ingredients", e.target.value)}
        />
        <TextAreas
          label={"Instructions"}
          placeholder={"Instructions"}
          name="instructions"
          value={recipeData.instructions}
          onChange={(e) => handleChange("instructions", e.target.value)}
        />

        <Select
          id="cuisineType"
          label={"Cuisine Type"}
          name="cuisineType"
          value={recipeData.cuisineType}
          onChange={(value) => handleChange("cuisineType", value)} // Pass value directly
          options={cuisineOptions}
          required
        />

        <Input
          type="number"
          label={"Cooking Time (minutes)"}
          placeholder={"Cooking Time (minutes)"}
          name="cookingTime"
          value={recipeData.cookingTime}
          onChange={(e) => handleChange("cookingTime", e.target.value)}
        />
        <Button className={"me-auto"} variant={"primary"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
