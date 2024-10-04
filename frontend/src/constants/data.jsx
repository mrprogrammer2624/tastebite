import { Link } from "react-router-dom";
import { Icons } from "./icons";

function getItem(label, key, icon, path) {
  return {
    key,
    icon,
    label: path ? <Link to={path}>{label}</Link> : label,
  };
}

export const DashboardData = [
  getItem("Dashboard", "/admin/dashboard", Icons.Dashboard, "/admin/dashboard"),
  getItem(
    "Add Recipe",
    "/admin/add-recipe",
    Icons.Dashboard,
    "/admin/add-recipe"
  ),
];

export const cuisineOptions = [
  { value: "", label: "Select a cuisine", disabled: true },
  { value: "Italian", label: "Italian" },
  { value: "Chinese", label: "Chinese" },
  { value: "Mexican", label: "Mexican" },
  { value: "Indian", label: "Indian" },
  { value: "French", label: "French" },
  { value: "Other", label: "Other" },
];
