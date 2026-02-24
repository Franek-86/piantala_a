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
import BackBtn from "../components/menu/BackBtn";
import { BsVectorPen } from "react-icons/bs";
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
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // vertical: true,
    // verticalSwiping: true,
    swipeToSlide: true,
    // beforeChange: function (currentSlide, nextSlide) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    // afterChange: function (currentSlide) {
    //   console.log("after change", currentSlide);
    // },
  };
  console.log("e1", plates);
  return (
    <div className='d-flex flex-row'>
      {isLargeScreen && <SideBar />}
      <section className='section-page vh-100 section-background section-full-page section-users section-large section-plates page-large-container'>
        <BackBtn />
        <div className='section-center pt-5'>
          <section className='section-page'>
            <div className='menu-section-center'>
              <h2 className='section-title'>Le vostre targhe</h2>
              <article className='plate-info mb-5'>
                <p>
                  Acquistando una piantina applicheremo un targa realizzata{" "}
                  <b>in alluminio</b> avente come <b>sfondo</b> il quadro di{" "}
                  <b>Ernest Verner</b>.
                </p>
                <p className='mb-0'>
                  Tutte le vostre targhe sono presenti nella{" "}
                  <i>galleria targhe</i> in basso.
                </p>
              </article>
              <span className='mb-3 h5 d-flex flex-row align-items-center position-relative'>
                <div className='step-title pe-1'>
                  <BsVectorPen />
                </div>
                <span className='fst-italic font-plate'>Galleria targhe</span>
                <div className='ink-gallery'></div>
              </span>
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
                            {/* <div
                              className='slide-plate'
                              style={{
                                backgroundImage: `url(${e.plate})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                objectFit: "cover",
                              }}
                            ></div> */}
                            <img
                              className='plate-img transition-opacity duration-500 ${
                                isLoaded ? "opacity-100" : "opacity-0'
                              onLoad={handleImageLoad}
                              alt=''
                              src={e.plate}
                            />
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
    </div>
  );
};

export default Plates;
