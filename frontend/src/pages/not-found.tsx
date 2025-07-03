import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 rounded-2xl shadow-xl bg-white max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} className="text-base px-6 py-2 rounded-xl">
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;