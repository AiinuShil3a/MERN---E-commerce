import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import ProductList from "../pages/shop/product_list";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import RouterIsAdmin from "../PrivateRouter/RouterIsAdmin";
import SignIn from "../components/SignIn";
import Home from "../pages/home/Home";
import DashBoard from "../layout/DashBoard"

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
    )
  }
]);



export default router