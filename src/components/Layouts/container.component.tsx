import { NavBar } from "components/common";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

interface CustomContainerProps {
  className?: string | null;
  children?: JSX.Element | JSX.Element[];
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  className,
  ...props
}) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);

    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div className={"" + className}>
      <NavBar />
      {props.children}
    </div>
  );
};

export default CustomContainer;
