import React, { useContext, useState } from "react";
import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const Modal = ({ name }) => {

  const { user  } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <dialog id={name} className="modal">
      <div className="modal-box">

      </div>
    </dialog>
  );
};

export default Modal;
