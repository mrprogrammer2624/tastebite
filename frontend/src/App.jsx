import { RouterProvider } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import TaskPilotRoute from "./routes";
import "./assets/css/style.css";
import ToasterProvider from "./providers/ToasterProvider";

export const HeaderTextContext = createContext();

function App() {
  const [headerText, setHeaderText] = useState("");
  return (
    <HeaderTextContext.Provider value={{ headerText, setHeaderText }}>
      <RouterProvider router={TaskPilotRoute} />
      <ToasterProvider />
    </HeaderTextContext.Provider>
  );
}

export const useTitle = () => {
  return useContext(HeaderTextContext);
};

export default App;
