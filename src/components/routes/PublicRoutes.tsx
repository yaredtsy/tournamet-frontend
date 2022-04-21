import { User } from "firebase/auth";
import React, { Component } from "react";
import { Navigate, Route } from "react-router-dom";
import { RouteComponentProps } from "@reach/router";


interface PublicRoutesProps extends RouteComponentProps
{
  user: User | undefined | null;
  element: any
}


const PublicRoutes: React.FC<PublicRoutesProps> = ({
  element,
  user,
  ...rest
}): any => { 
  if(user){
    return <Navigate to="/" />
  }
  return  {...element};
};

export default PublicRoutes;
