import { useState } from "react";
import clsx from "clsx";
import { Button, Input, TextAreas } from "@/components";
import { ProfilePicUploader } from "@/components/FormComponents/ProfilePicUploader";
import styles from "./AddRecipe.module.css";

export const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    cookingTime: "",
    previewImage: "",
  });

  const handleImageChange = (imageData) => {
    setRecipeData((prevData) => ({ ...prevData, previewImage: imageData }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedRecipeData = {
      ...recipeData,
      ingredients: recipeData.ingredients.split("\n"),
      cookingTime: parseInt(recipeData.cookingTime, 10),
    };

    console.log(formattedRecipeData);
    // Here you can send formattedRecipeData to another page or API
  };

  return (
    <div>
      <form
        className={clsx(styles.AddRecipe, "d-flex flex-column")}
        onSubmit={handleSubmit}
      >
        <ProfilePicUploader
          id="fileUpload"
          onChange={handleImageChange}
          previewImage={recipeData.previewImage}
        />
        <Input
          type="text"
          label={"Title"}
          placeholder={"Title"}
          name="title"
          value={recipeData.title}
          onChange={handleChange}
        />
        <TextAreas
          label={"Ingredients (one per line)"}
          placeholder={"Ingredients (one per line)"}
          name="ingredients"
          value={recipeData.ingredients}
          onChange={handleChange}
        />
        <TextAreas
          label={"Instructions"}
          placeholder={"Instructions"}
          name="instructions"
          value={recipeData.instructions}
          onChange={handleChange}
        />
        <TextAreas
          label={"Cuisine Type"}
          placeholder={"Cuisine Type"}
          name="cuisineType"
          value={recipeData.cuisineType}
          onChange={handleChange}
        />
        <Input
          type="number"
          label={"Cooking Time (minutes)"}
          placeholder={"Cooking Time (minutes)"}
          name="cookingTime"
          value={recipeData.cookingTime}
          onChange={handleChange}
        />
        <Button className={"me-auto"} variant={"primary"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
