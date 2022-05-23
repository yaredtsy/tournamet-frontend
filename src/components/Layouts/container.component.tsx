import { NavBar } from "components/common";
import React from "react";

interface CustomContainerProps {
  className?: string | null;
  children?: JSX.Element | JSX.Element[];
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  className,

  ...props
}) => {
  return (
    <div className={"" + className}>
      <NavBar />
      {props.children}
    </div>
  );
};

export default CustomContainer;
