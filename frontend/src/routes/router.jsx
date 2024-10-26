// src/router.js
import DashboardLayout from "../components/DashboardLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import GoogleCallback from "../pages/Auth/googleCallback";
import ResetPassword from "../pages/Auth/ResetPassword";
import ProfileImageUpload from "../pages/Dashboard/ProfileImageUpload";
import Home from "../pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

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
        children: [
          {
            path: "forgotpassword",
            element: <ForgotPassword />,
          },
          {
            path: "resetpassword",
            element: <ResetPassword />,
          },
          {
            path: "ProfileImageUpload",
            element: <ProfileImageUpload />,
          },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            ),
          },
          {
            path: "google",
            children: [
              {
                path: "googleCallback",
                element: <GoogleCallback />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
