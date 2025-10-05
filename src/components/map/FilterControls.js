import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { PlantsContext } from "../../context/PlantsContext";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";

const FilterControls = ({ showFilters, handleCloseFilters }) => {
  const { filters, handleFilterChange } = useContext(FilterContext);
  const { plants } = useContext(PlantsContext);

  console.log("ppp", plants);
  const getUniqueValues = (data, item) => {
    let test = data.map((i) => {
      return i[item];
    });
    return [...new Set(test)];
  };

  const statusPlants = getUniqueValues(plants, "status_piantina");
  const suburbPlants = getUniqueValues(plants, "suburb");

  console.log("statusPlants", statusPlants);
  // const [showFilters, setShowFilters] = useState(false);
  // const handleCloseFilters = () => setShowFilters(false);
  // const handleShowFilters = () => setShowFilters(true);

  useEffect(() => {
    handleFilterChange("test");
  }, []);
  return (
    <>
      {/* <Button variant='primary' onClick={handleShowFilters}>
        Launch
      </Button> */}

      <Offcanvas
        show={showFilters}
        onHide={handleCloseFilters}
        placement={"top"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtra piantine</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='filters-container'>
          <Form.Select
            name='status'
            value={filters.status}
            onChange={handleFilterChange}
            // style={{ marginRight: "10px" }}
            className='mb-2'
          >
            <option name='stato' value=''>
              Tutti gli stati
            </option>
            {statusPlants.map((i, index) => {
              return (
                <option name='stato' value={i} key={index}>
                  {i}
                </option>
              );
            })}
          </Form.Select>
          <Form.Select
            name='suburb'
            value={filters.suburb}
            onChange={handleFilterChange}
            // style={{ marginRight: "10px" }}
          >
            <option name='suburb' value=''>
              Tutti i quartieri
            </option>
            {suburbPlants.map((i, index) => {
              return (
                <option name='suburb' value={i} key={index}>
                  {i}
                </option>
              );
            })}
          </Form.Select>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterControls;
