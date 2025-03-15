import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB");
};
export const copyToClipboard = (copyText) => {
  copy(copyText);
  alert(`You have copied "${copyText}"`);
};

export const useViewportHeight = () => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.innerHeight * 0.01);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return vh;
};
