import React, { useState, useContext, createContext } from "react";
export const FilterContext = createContext();
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    status: "",
    suburb: "",
  });
  const handleFilterChange = (e) => {
    if (e === "test") {
    }
    if (e?.target) {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
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
