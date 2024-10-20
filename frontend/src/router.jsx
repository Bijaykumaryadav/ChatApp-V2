import  {Home}  from "./pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
//fix the css of the login page and  
//start adding all others pages