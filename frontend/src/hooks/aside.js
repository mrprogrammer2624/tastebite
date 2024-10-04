import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Aside = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
      case "/admin/dashboard":
        setCurrentPage("admin//dashboard");
        break;
      case "/admin/add-recipe":
        setCurrentPage("/admin/add-recipe");
        break;
      case "/settings":
        setCurrentPage("/settings");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return { currentPage };
};
