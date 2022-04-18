import React from "react";
import { Route } from "react-router-dom";
interface PrivateRoutesProps {
  component: any;
}
const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  component: Component,
  ...rest
}): React.ReactElement => (
  <Route />
);

export default PrivateRoutes;
