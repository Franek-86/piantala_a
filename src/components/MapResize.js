import React, { useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";

const MapResize = () => {
  console.log("ciao0");
  // const map = useMap();

  useMapEvent("move", () => {
    console.log("ciao1");
  });

  return null;
};

export default MapResize;
