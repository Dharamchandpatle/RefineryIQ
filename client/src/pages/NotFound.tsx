import BackgroundComponent from "@/components/ui/background-components";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <BackgroundComponent>
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl glass-card p-8 md:p-12 rounded-2xl"
        >
          {/* IOCL Logo */}
          <Link to="/" className="inline-block mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPC-soVqmkNILA6QUDqpv9ZRMbkunkW6TRw&s"
              alt="IOCL Logo"
              className="w-20 h-20 object-contain mx-auto hover:scale-110 transition-transform"
            />
          </Link>

          {/* Error Icon */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F37021]/10 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-[#F37021]" />
          </div>

          {/* Error Message */}
          <h1 className="mb-4 text-6xl md:text-8xl font-orbitron font-bold text-[#003A8F]">404</h1>
          <p className="mb-2 text-2xl md:text-3xl font-semibold text-[#003A8F]">Page Not Found</p>
          <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => window.location.href = "/"}
              className="text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Button>
            <Button
              variant="brandOutline"
              onClick={() => window.history.back()}
              className="text-lg"
            >
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </BackgroundComponent>
  );
};

export default NotFound;
