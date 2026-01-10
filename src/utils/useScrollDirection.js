import React, { useEffect, useState } from "react";

const useScrollDirection = () => {
  console.log("sta?");
  const [scrollDirection, setScrollDirection] = useState(null);
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      console.log("scroll", scrollY);
      console.log("last", lastScrollY);
      let direction = scrollY > lastScrollY ? "down" : "up";
      console.log(direction);

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  });
  return scrollDirection;
};

export default useScrollDirection;
