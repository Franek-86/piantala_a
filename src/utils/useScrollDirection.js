import React, { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      let scrollY = window.pageYOffset;
      let direction = scrollY > lastScrollY ? "down" : "up";
      console.log(scrollY, lastScrollY, direction);
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 60 || scrollY - lastScrollY < -60)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY < 0 ? 0 : scrollY;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);
  return scrollDirection;
};

export default useScrollDirection;
