import React from "react";
import { PongSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      {" "}
      <PongSpinner color="#e94b3cff" size={90} />
    </div>
  );
};

export default Loading;
