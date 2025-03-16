import React, { useState } from "react";
import { MdLegendToggle } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { motion } from "motion/react";
import { PiPlantFill } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { GiPlantSeed } from "react-icons/gi";

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState("test");
  const { pathname } = useLocation();

  console.log("location", pathname);
  return (
    <article className='bottom-bar'>
      <div className='h-100'>
        <ul className='d-flex justify-content-around h-100 p-0 m-0 list-unstyled align-items-center b-bar'>
          <li className='fs-5 test position-relative'>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
              }
              onClick={() => setSelectedTab("test")}
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
          <li className='fs-5 position-relative'>
            <NavLink
              onClick={() => setSelectedTab("test2")}
              to='/legend'
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
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
          <li className='fs-5 position-relative'>
            <NavLink
              onClick={() => setSelectedTab("test3")}
              to='/myPlants'
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
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
          <li className='fs-5 position-relative'>
            <NavLink
              onClick={() => setSelectedTab("test4")}
              to='/bookedPlants'
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
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
  );
};

export default BottomBar;
