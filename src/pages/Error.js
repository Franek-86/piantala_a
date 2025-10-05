import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Error = () => {
  const { pageError } = useContext(AuthContext);
  return (
    <>
      {pageError && (
        <div class='error wrapper section'>
          <div class='box section-center'>
            <div className='center-box'>
              <h1>500</h1>
              <p>Scusa, sono io, non tu.</p>
              <p className='error-face'>&#58;&#40;</p>
              <p>
                <a href='/'>Riproviamo!</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
