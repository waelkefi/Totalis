import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./Redux/Actions/Auth.action";
import ForgotPasswordPage from "./Components/Authentification/ForgotPasswordPage";
import LoadingSpinner from "./Components/LoadingSpiner";
import ResetPasswordPage from "./Components/Authentification/ResetPasswordPage";
import EmailVerificationPage from "./Components/Authentification/EmailVerificationPage";
import LandingPage from "./Pages/LandingPage";
import ClientRoute from "./Routes/ClientRoute";
import Auth2 from "./Components/Authentification/Auth2";
import AdminRoute from "./Routes/AdminRoute";

// Composant pour protéger les routes nécessitant une authentification
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <LandingPage/>;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};



// Composant pour rediriger les utilisateurs authentifiés vers le tableau de bord
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((state) => state.auth);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
  

      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ClientRoute />
            </ProtectedRoute>
            
          }
        />
        <Route
          path="/auth"
          element={
            <RedirectAuthenticatedUser>
              <Auth2/>
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/auth"
          element={
            <RedirectAuthenticatedUser>
              <Auth2 />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Redirection des routes inexistantes vers la page d'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
  );
}


export default App;