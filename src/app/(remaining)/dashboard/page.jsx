// import ProtectedRoute from '../../../components/ProtectedRoute';
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    // <ProtectedRoute>
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Dashboard Page</h1>
      <Link href="/Login">Go to Login</Link>
    </div>
    // </ProtectedRoute>
  );
};

export default page;
