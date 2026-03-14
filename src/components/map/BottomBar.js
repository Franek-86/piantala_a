import React, { useContext, useState } from "react";
import { MdLegendToggle } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { motion } from "motion/react";
import { PiPlantFill } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { GiPlantSeed } from "react-icons/gi";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import { Capacitor } from "@capacitor/core";
import { PlantsContext } from "../../context/PlantsContext";

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState("test");
  const isLarge = useIsLargeScreen();
  const { pathname } = useLocation();
  const check = Capacitor.getPlatform();
  const { dropIt } = useContext(PlantsContext);

  let padding = () => {
    if (check !== "web") {
      return "fs-5 bottom-bar-height position-relative pb-2 yellow-background";
    }
    if (check === "web" && !isLarge) {
      return "fs-5 position-relative yellow-background bottom-bar-0";
    }
    return "fs-5 position-relative";
  };
  return (
    <>
      {!isLarge && (
        <article className='bottom-bar'>
          <div className='h-100'>
            <ul className='d-flex justify-content-around h-100 p-0 m-0 list-unstyled align-items-center b-bar'>
              <li className={padding()}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary text-decoration-none pb-0"
                      : "text-dark text-decoration-none pb-0"
                  }
                  onClick={() => {
                    setSelectedTab("test");
                    dropIt();
                  }}
                  to='/map'
                >
                  <FaMap />
                  {pathname === "/map" && (
                    <motion.div
                      className='underline'
                      layoutId='underline'
                      id='underline'
                    />
                  )}
                  {/* {selectedTab === "test" && (
                <motion.div
                  className='underline'
                  layoutId='underline'
                  id='underline'
                />
              )} */}
                </NavLink>
              </li>
              <li className={padding()}>
                <NavLink
                  onClick={() => {
                    setSelectedTab("test2");
                    dropIt();
                  }}
                  to='/legend'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary text-decoration-none pb-0"
                      : "text-dark text-decoration-none pb-0"
                  }
                >
                  <MdLegendToggle />
                  {pathname === "/legend" && (
                    <motion.div
                      className='underline'
                      layoutId='underline'
                      id='underline'
                    />
                  )}
                  {/* {selectedTab === "test2" && (
                <motion.div
                  className='underline'
                  layoutId='underline'
                  id='underline'
                />
              )} */}
                </NavLink>
              </li>
              <li className={padding()}>
                <NavLink
                  onClick={() => {
                    setSelectedTab("test3");
                    dropIt();
                  }}
                  to='/myPlants'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary text-decoration-none pb-0"
                      : "text-dark text-decoration-none pb-0"
                  }
                >
                  <GiPlantSeed />

                  {pathname === "/myPlants" && (
                    <motion.div
                      className='underline'
                      layoutId='underline'
                      id='underline'
                    />
                  )}
                </NavLink>
              </li>
              <li className={padding()}>
                <NavLink
                  onClick={() => {
                    setSelectedTab("test4");
                    dropIt();
                  }}
                  to='/bookedPlants'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary text-decoration-none pb-0"
                      : "text-dark text-decoration-none pb-0"
                  }
                >
                  {/* <BsInfo /> */}
                  <PiPlantFill />

                  {pathname === "/bookedPlants" && (
                    <motion.div
                      className='underline'
                      layoutId='underline'
                      id='underline'
                    />
                  )}
                  {/* {selectedTab === "test4" && (
                <motion.div
                  className='underline'
                  layoutId='underline'
                  id='underline'
                />
              )} */}
                </NavLink>
              </li>
            </ul>
          </div>
        </article>
      )}
    </>
  );
};

export default BottomBar;
