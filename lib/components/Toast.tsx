import React, { useEffect, useState } from "react";
import { Slide, toast, ToastContainer, ToastOptions } from "react-toastify";

type ToastType = "info" | "success" | "error" | "warning";

const tostify = (message: string, type: ToastType) => {
  // Optional runtime check
  if (typeof toast[type] !== "function") {
    throw new Error(`Invalid toast type: ${type}`);
  }

  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  } as ToastOptions);
};
const Toast = {
  success: (message: string) => tostify(message, "success"),
  error: (message: string) => tostify(message, "error"),
  info: (message: string) => tostify(message, "info"),
  warning: (message: string) => tostify(message, "warning"),
};

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme= "colored"
      transition={Slide}
    />
  );
};
export { ToastProvider };
export default Toast;
