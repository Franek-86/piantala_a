import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useMap } from "react-leaflet";

const ButtonDirection = () => {
  const map = useMap();
  const [position, setPosition] = useState(null);
  return (
    <div className='section buttons-section'>
      <div className='singleButton'>
        <Button
          onClick={() => {
            if (map) {
              map
                .locate({ timeout: 10000, enableHighAccuracy: true })
                .on("locationfound", function (e) {
                  console.log(e);
                });
            }
          }}
          className='menu-button p-0'
        >
          Test
        </Button>
      </div>
    </div>
  );
};

export default ButtonDirection;
