import React from "react";

import logo from "../assets/images/ti pianto per amore-APP-verde.png";
const Loading = () => {
  return (
    <div className='loading-container'>
      <div className='loading-content'>
        <img src={logo} alt='loading-logo' className='loading-logo' />
        <div className='spinner'></div>
      </div>
    </div>
  );
};

export default Loading;
