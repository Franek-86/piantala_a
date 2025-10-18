import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { PlantsContext } from "../../context/PlantsContext";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import bluePlants from "../../assets/images/ti pianto per amore-APP-azzurro.png";
import greenPlants from "../../assets/images/ti pianto per amore-APP-verde.png";
import yellowPlants from "../../assets/images/ti pianto per amore-APP-giallo.png";
import redPlants from "../../assets/images/ti pianto per amore-APP-rosso.png";
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
  console.log("statusPlants filters", filters);
  // const [showFilters, setShowFilters] = useState(false);
  // const handleCloseFilters = () => setShowFilters(false);
  // const handleShowFilters = () => setShowFilters(true);

  useEffect(() => {
    handleFilterChange("test");
  }, []);

  const pending = (
    <div className='ms-2'>
      <span>In attesa di approvazione</span>
      <img class='filter-plant' src={yellowPlants}></img>
    </div>
  );
  const booked = (
    <div className='ms-2'>
      <span>Acquistate da voi</span>
      <img class='filter-plant' src={bluePlants}></img>
    </div>
  );
  const rejected = (
    <div className='ms-2'>
      <span>Non approvate</span>
      <img class='filter-plant' src={redPlants}></img>
    </div>
  );

  return (
    <>
      {/* <Button variant='primary' onClick={handleShowFilters}>
        Launch
      </Button> */}

      <Offcanvas
        show={showFilters}
        onHide={handleCloseFilters}
        placement={"end"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtra i risultati di ricerca</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='filters-container'>
          <span className='d-inline-block mb-4 fst-italic small'>
            Filtra la ricerca in base allo stato delle piantine
          </span>
          <Form>
            <Form.Check
              className='d-flex flex-row align-items-center mb-3'
              checked={"approved" === filters.status}
              type='radio'
              label={
                <div className='ms-2'>
                  <span>Disponibili all'acquisto</span>
                  <img class='filter-plant' src={greenPlants}></img>
                </div>
              }
              name='status'
              value='approved'
              onChange={handleFilterChange}
              id='default-radio'
            />
            {statusPlants.map((i, index) => {
              if (i === "approved") {
                return;
              }
              return (
                <Form.Check
                  className='d-flex flex-row align-items-center mb-3'
                  type='radio'
                  key={index}
                  checked={i === filters.status}
                  label={
                    i === "pending"
                      ? pending
                      : i === "booked"
                      ? booked
                      : rejected
                  }
                  name='status'
                  value={i}
                  id={`${i}-check}`}
                  onChange={handleFilterChange}
                />
              );
            })}
          </Form>
          <span className='d-inline-block mt-5 mb-4 small fst-italic'>
            Filtra la ricerca in base al quartiere
          </span>
          <Form>
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
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterControls;
