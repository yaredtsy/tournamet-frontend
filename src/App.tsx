import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, OtpPage } from "page";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { userAction } from "store/user/reducer";
import { PrivateRoutes, PublicRoutes } from "components/routes";

import "bootstrap/dist/css/bootstrap.css";
import { RouteComponentProps, Router } from "@reach/router";

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
    <BrowserRouter>
      <Router>
        <PublicRoutes
          uri="/login"
          path="/login"
         
          user={user}
          element={<LoginPage />}
        />
        <PublicRoutes
          path="/otp-confirm"
         
          user={user}
          element={<OtpPage />}
        />
        <PrivateRoutes
          uri="/"
          path="/"
       
          user={user}
          element={<HomePage />}
        />
      </Router>
    </BrowserRouter>
  );
}

export default App;
