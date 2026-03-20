import React from "react";

import logo from "../assets/images/ti pianto per amore-APP-verde.png";
import useIsLargeScreen from "../utils/useIsLargeScreen";
const Loading = () => {
  const isLarge = useIsLargeScreen();
  return (
    <div
      className={
        !isLarge
          ? "loading-container"
          : "loading-container loading-container-large"
      }
    >
      <div className='loading-content'>
        <img src={logo} alt='loading-logo' className='loading-logo' />
        <div className='spinner'></div>
      </div>
    </div>
  );
};

export default Loading;
