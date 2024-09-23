"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Unauthorized from "./Unauthorized/Unauthorized";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/Login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null; // Render children only if authenticated
};

export default ProtectedRoute;
