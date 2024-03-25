import React , {useState} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import useAdmin from "../hook/useAdmin";
import { Outlet , Link } from "react-router-dom";

const Dialog = () => {
  const [whatMenu , setWhatMenu] = useState("")
  const {logout} = useAuth()
  const [isAdmin , isAdminLoading] = useAdmin()
  console.log(isAdmin);
  return (
    <div>
    {
      isAdmin ? (
        <div className="flex">
      <div className="md:w-1/4">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-circle btn-primary drawer-button lg:hidden"
            >
              <RxHamburgerMenu />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <div className="flex flex-row items-center ">
                <img src="/logo.png" alt="" className="h-20 mx-0" />
                <button className="btn btn-sm btn-primary rounded-full">
                    ADMIN
                </button>
              </div>
              {/* Sidebar content here */}
              <hr class="h-px my-4 bg-gray-100 border-0 dark:bg-gray-300"></hr>
              <li className="border-0">
                <a>Dashboard</a>
              </li>
              <li>
                <a>Manage Orders</a>
              </li>
              <Link to={"/dashboard/createProduct"}>
                <li>
                  <a>Add Product</a>
                </li>
              </Link>
              <Link to={"/dashboard/listProduct"}>
                <li>
                  <a>Manage Item</a>
                </li>
              </Link>
              <Link to={"/dashboard/listUser"}>
                <li>
                  <a>All Users</a>
                </li>
              </Link>
              <hr class="h-px my-4 bg-gray-100 border-0 dark:bg-gray-300"></hr>
              <Link to={"/"}>
                <li>
                  <a>Home</a>
                </li>
              </Link>
              <Link to={"/shops"}>
                <li>
                  <a>Product</a>
                </li>
              </Link>
              <li>
                <a>Order Tracking</a>
              </li>
              <li>
                <a>Customer Support</a>
              </li>
              <li onClick={logout}>
                <a>Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="md:w-1.5/4 ">
        <Outlet />
      </div>
    </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-red-500 mb-4">คุณไม่ใช่แอดมินกรุณาใช้บัญชีแอดมิน</p>
          <button className="btn btn-outline btn-lg flex items-center gap-2 btn-warning" onClick={logout}>
            <FaUser /> Logout
          </button>
        </div>
      )
    }
    </div>
  );
};

export default Dialog;
