import React, { useState, useContext, createContext } from "react";

export const FilterContext = createContext();
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    status: "approved",
    suburb: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleFilterChange = (e) => {
    if (e?.target?.type === "radio") {
      // e.target.isChecked = true;
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
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
