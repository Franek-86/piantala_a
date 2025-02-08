import React, { useState, useContext, createContext } from "react";
export const FilterContext = createContext();
export const FilterProvider = ({ children }) => {
  console.log("ttt2");
  const [filters, setFilters] = useState({
    status: "",
    suburb: "",
  });
  const handleFilterChange = (e) => {
    console.log("ttt1");
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  // const filteredPlants = plants.filter((plant) => {
  //   return (
  //     (filters.status === "" || plant.status_piantina === filters.status) &&
  //     (filters.suburb === "" || plant.suburb === filters.suburb)
  //   );
  // });
  return (
    <FilterContext.Provider
      value={{
        filters,
        handleFilterChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
