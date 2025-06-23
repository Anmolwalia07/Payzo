import { useEffect } from "react";
 
interface FeedbackMessageProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const FeedbackMessage = ({ type, message, onClose }: FeedbackMessageProps) => {
  const baseStyles = "px-5 py-3 shadow text-lg absolute top-20 lg:right-40 md:right-25 right-5 capitalize";
  const styles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${baseStyles} ${styles[type]} animate-fade`}>
      <strong className="font-semibold">{message}</strong>
    </div>
  );
};

export default FeedbackMessage;