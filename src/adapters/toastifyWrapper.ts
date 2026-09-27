import { toast } from "react-toastify";

export const toastifyWrapper = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warn: (message: string) => toast.warn(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
  dimiss: () => toast.dismiss(),
};
