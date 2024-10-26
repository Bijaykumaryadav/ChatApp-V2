import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
