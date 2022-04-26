import { User } from "firebase/auth";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children:any;
    redirectTo:string;
    user:User | undefined | null;
}
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, redirectTo,user }):any => {
  let isAuthenticated = user != null ;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
