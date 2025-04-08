import { LucideLoader2 } from "lucide-react";
import React from "react";

interface LoadingProps {
  children?: React.ReactNode;
  loading: boolean;
}

const Loading = ({ children, loading }: LoadingProps) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <LucideLoader2 className="h-8 w-8 animate-spin text-active" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
