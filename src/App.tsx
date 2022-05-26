import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KukuluPage, LoginPage, OtpPage, DashBoardPage } from "page";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { userAction } from "store/user/slice";
import { ProtectedRoute, PublicRoutes } from "components/routes";

import "bootstrap/dist/css/bootstrap.css";

import TrasPage from "page/homepage/tras-page";
import FetaPage from "page/homepage/feta-page";

import { PongSpinner, PushSpinner } from "react-spinners-kit";

function App() {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      dispatch(userAction.otpConfirmSuccess(user));
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <PongSpinner color="#e94b3cff" size={90} />
      </div>
    );
  }
  return (
    <span className="bg-light h-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes user={user} redirectTo="/dashboard">
                <LoginPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/otp-confirm"
            element={
              <PublicRoutes user={user} redirectTo="/dashboard">
                <OtpPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} redirectTo="/login">
                <DashBoardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<KukuluPage />} />

          <Route path="/tras" element={<TrasPage />} />
          <Route path="/feta" element={<FetaPage />} />
        </Routes>
      </BrowserRouter>
    </span>
  );
}

export default App;
