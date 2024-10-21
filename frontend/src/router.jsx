import ForgotPassword from "./pages/Auth/ForgotPassword";
import  Home  from "./pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        children: [{
          path: "forgotpassword",
          element: <ForgotPassword />
        }]
      }
    ],
  },
]);
//fix the css of the login page and  
//start adding all others pages