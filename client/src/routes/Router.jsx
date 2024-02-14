import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home";
import ProductList from "../pages/shop/product_list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[
      {
        path:"/",
        element:<Home />,
      },
      {
        path:"/shops",
        element:<ProductList />,
      }
    ],
  },
]);

export default router;
