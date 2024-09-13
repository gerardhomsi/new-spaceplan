"use client";

import { toast } from "react-hot-toast";

const ToastNotification = ({ type, message }) => {
  const toastStyle = {
    duration: 3500,
    style: {
      background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
      color: type === "success" ? "green" : "red",
      fontSize: "18px",
      borderRadius: "10px",
      padding: "30px",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      marginTop: "100px",
    },
  };

  if (type === "success") toast.success(message, toastStyle);
  else if (type === "error") toast.error(message, toastStyle);

  return null;
};

export default ToastNotification;
