import { User } from "firebase/auth";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

interface PublicRoutesProps{
    children:any;
    redirectTo:string;
    user:User | undefined | null;
}
const PublicRoutes:React.FC<PublicRoutesProps> = ({ children, redirectTo,user }):any => {
  let isAuthenticated = user == null ;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default PublicRoutes;
