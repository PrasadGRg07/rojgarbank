import { Loader2 } from "lucide-react";

const PageLoader = ({ message = "Please wait...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
      <p className="text-lg text-gray-500">{message}</p>
    </div>
  );
};

export default PageLoader;