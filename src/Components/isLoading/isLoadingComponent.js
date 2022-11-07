import React from "react";
import { Spin } from "antd";

const isLoadingComponent = () => {
  return (
    <div className="isLoading">
      <Spin />
    </div>
  );
};

export default isLoadingComponent;
