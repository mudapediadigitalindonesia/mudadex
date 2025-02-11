import { toast } from "react-toastify";

const handleCopy = (text: string, delay = 2500) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Copied!', { autoClose: delay })
    })
    .catch((error) => {
      toast.error("Failed to copy!");
    });
}

export default handleCopy;