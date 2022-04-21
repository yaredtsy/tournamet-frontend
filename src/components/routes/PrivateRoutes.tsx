import { User } from "firebase/auth";
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { RouteComponentProps } from "@reach/router";

interface PrivateRoutesProps extends RouteComponentProps{
  element: any;
  user: User | undefined | null;
  
}
const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  element,
  user,
  ...rest
}): any => {
  if(!user){
    return <Navigate to="login" />
  }
  return {...element}
};

export default PrivateRoutes;
