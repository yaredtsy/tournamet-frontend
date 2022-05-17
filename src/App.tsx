import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, OtpPage, DashBoardPage } from "page";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { userAction } from "store/user/slice";
import { ProtectedRoute, PublicRoutes } from "components/routes";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      dispatch(userAction.otpConfirmSuccess(user));
    }
  }, [user]);

  if (loading) {
    return <div>loading</div>;
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
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </span>
  );
}

export default App;
