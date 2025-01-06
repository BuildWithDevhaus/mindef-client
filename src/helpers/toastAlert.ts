import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastAlert = (toastType: "success" | "info" | "warning" | "error", message: string, duration?: number) => {

toast[toastType](`${ message }`, {
        position: "bottom-right",
        autoClose: duration || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
};