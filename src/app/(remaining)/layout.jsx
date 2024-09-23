import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "../../context/AuthContext";


// import CommonLayout from "@/components/Layout/CommonLayout";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ProtectedRoute>
            {/* <CommonLayout> */}
              {children}
              {/* </CommonLayout> */}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}

// protected routes
//