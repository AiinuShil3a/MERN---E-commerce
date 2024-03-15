import React from "react";
import { Outlet } from "react-router-dom";
import Dialog from "../components/Dialog";

const DashBoard = () => {
  return (
    <div>
      <Dialog />
      <Outlet />
    </div>
  );
};

export default DashBoard;
