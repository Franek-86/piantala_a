import React, { useContext, useEffect, useState } from "react";
import { PlantsContext } from "../context/PlantsContext";
// import ReactFancyBox from "react-fancybox";
// import "react-fancybox/lib/fancybox.css";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Fancybox from "../components/Fancybox";
import Slider from "react-slick";
const Plates = () => {
  const { getAllPlants, plates } = useContext(PlantsContext);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    getAllPlants();
    // setPlates(filterPlates);
  }, []);

  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log("e1", plates);
  return (
    <section className='section-background section-full-page'>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <section className='section-page section-background'>
          <div className='section-center'>
            <h2 className='section-title'>Le vostre targhe</h2>
            {plates?.length === 0 && <p>Non ci sono targhe da visualizzare.</p>}
            {plates?.length === 1 && (
              <img
                onLoad={handleImageLoad}
                className={`plates-img transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                alt=''
                src={plates[0].plate}
              />
            )}
            {plates?.length > 1 && (
              <Fancybox>
                <Slider {...settings}>
                  {plates.map((e, index) => {
                    return (
                      <a data-fancybox='gallery' href={e.plate} key={index}>
                        <img
                          onLoad={handleImageLoad}
                          className={`plates-img transition-opacity duration-500 ${
                            isLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          alt=''
                          src={e.plate}
                        />
                      </a>
                    );
                  })}
                </Slider>
              </Fancybox>
            )}
            {/* <ReactFancyBox
              thumbnail='https://loremflickr.com/320/240'
              image='https://www.w3schools.com/howto/img_forest.jpg'
            /> */}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Plates;
