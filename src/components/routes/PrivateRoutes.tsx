import { User } from "firebase/auth";
import React from "react";

import { RouteComponentProps, Redirect, useLocation } from "@reach/router";

interface PrivateRoutesProps extends RouteComponentProps {
  user: User | undefined | null;
 
  element: any;
}
const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  element,
  user,

  ...rest
}): any => {
  const location = useLocation();
  if (!user)
    return <Redirect to="/login" from={location.pathname} noThrow={true} />;

  return { ...element };
};

export default PrivateRoutes;
