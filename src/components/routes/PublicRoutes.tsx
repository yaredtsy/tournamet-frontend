import { User } from "firebase/auth";
import React from "react";

import { RouteComponentProps, Redirect, useLocation } from "@reach/router";

interface PublicRoutesProps extends RouteComponentProps {
  user: User | undefined | null;
  element: any;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({
  element,
  user,
  ...rest
}): any => {
  const local = useLocation();

  if (user) return <Redirect to="/" from={local.pathname} noThrow={true} />;
  return { ...element };
};

export default PublicRoutes;
