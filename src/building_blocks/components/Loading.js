import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  <div className="spinner bg-dark text-white">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;