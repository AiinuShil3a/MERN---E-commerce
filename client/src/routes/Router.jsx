import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import ProductList from "../pages/shop/product_list";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import RouterIsAdmin from "../PrivateRouter/RouterIsAdmin";
import SignIn from "../components/SignIn";
import Home from "../pages/home/Home";
import DashBoard from "../layout/DashBoard"
import ManageUser from "../components/Admin-Component/ManageUser"
import CreateProducts from "../components/Admin-Component/AddProducts"
import UpdateProducts from "../components/Admin-Component/ManageProduct"
import UpdateProductById from "../components/Admin-Component/UpdateProduct"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shops",
        element: (
          <PrivateRouter>
            <ProductList />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path:"/signin",
    element:<SignIn/>
  },
  {
    path:"/dashboard",
    element:(
      <RouterIsAdmin>
        <DashBoard />
      </RouterIsAdmin>
    ),
    children: [
      {
        path: "/dashboard/listUser",
        element: <ManageUser />,
      },
      {
        path: "/dashboard/createProduct",
        element: <CreateProducts />,
      },
      {
        path: "/dashboard/listProduct",
        element: <UpdateProducts />,
      },
      {
        path: "/dashboard/update/:id",
        element: <UpdateProductById />,
      },
    ]
  }
]);



export default router