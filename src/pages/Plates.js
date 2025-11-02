import React, { useContext, useEffect, useState } from "react";
import { PlantsContext } from "../context/PlantsContext";
// import ReactFancyBox from "react-fancybox";
// import "react-fancybox/lib/fancybox.css";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Fancybox from "../components/plates/Fancybox";
import Slider from "react-slick";

import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";
const Plates = () => {
  const { getAllPlants, plates } = useContext(PlantsContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const isLargeScreen = useIsLargeScreen();
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
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };
  console.log("e1", plates);
  return (
    <>
      <section className='section-background section-full-page section-large'>
        <div className='back-container'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
        </div>
        <div className='section-center'>
          <section className='section-page section-background'>
            <div className='section-center menu-section-center'>
              <h2 className='section-title'>Le vostre targhe</h2>
              {plates?.length === 0 && (
                <p>Non ci sono targhe da visualizzare.</p>
              )}
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
                  <div className='slider-container'>
                    <Slider {...settings}>
                      {plates.map((e, index) => {
                        return (
                          <a data-fancybox='gallery' href={e.plate} key={index}>
                            <div
                              className='slide-plate'
                              style={{
                                backgroundImage: `url(${e.plate})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            {/* <img
                            onLoad={handleImageLoad}
                            className={`plates-img transition-opacity duration-500 ${
                              isLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            alt=''
                            src={e.plate}
                          /> */}
                          </a>
                        );
                      })}
                    </Slider>
                  </div>
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
      {isLargeScreen && <SideBar />}
    </>
  );
};

export default Plates;
