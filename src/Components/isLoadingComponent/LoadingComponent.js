import React from "react";
import { Spin } from "antd";

const LoadingComponent = () => {
  return (
    <div className="isLoading">
      <Spin />
    </div>
  );
};

export default LoadingComponent;
