import { useState, useEffect } from "react";

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isLarge;
};

export default useIsLargeScreen;
