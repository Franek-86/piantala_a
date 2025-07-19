import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  useMapEvent,
} from "react-leaflet";
import L, { latLng } from "leaflet";
import iconGreen from "./assets/images/ti pianto per amore-APP-verde.png";
import iconYellow from "./assets/images/ti pianto per amore-APP-giallo.png";
import iconRed from "./assets/images/ti pianto per amore-APP-rosso.png";
import iconBlue from "./assets/images/ti pianto per amore-APP-azzurro.png";
import iconLocation from "leaflet/dist/images/marker-icon.png";

// import iconLocation from "./assets/images//marker-icon.png";
import copy from "copy-to-clipboard";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Buttons from "./components/Buttons";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import BottomBar from "./components/BottomBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Loading from "./pages/Loading";
import { PlantsContext } from "../src/context/PlantsContext";
import { OrdersContext } from "./context/OrdersContext";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";
import { FilterContext } from "./context/FilterContext";
import SideBar from "./components/SideBar";
import useIsLargeScreen from "./utils/useIsLargeScreen";
import { ensurePermission } from "./utils/utils";
import PermissionModal from "./components/PermissionModal";
import { AuthContext } from "./context/AuthContext";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

// test
// Set default icon

const DefaultIcon = L.icon({
  iconUrl: iconLocation, // This can be your default icon
  iconSize: [25, 41], // Adjust size here
});
L.Marker.prototype.options.icon = DefaultIcon;

const iconMap = {
  approved: L.icon({
    iconUrl: iconGreen,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  pending: L.icon({
    iconUrl: iconYellow,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  rejected: L.icon({
    iconUrl: iconRed,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  booked: L.icon({
    iconUrl: iconBlue,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
};

//

function App() {
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [locationMarkerTag, setLocationMarkerTag] = useState(null);
  const { plants, setPlants, getAllPlants, loading, sendValuesToAddPlant } =
    useContext(PlantsContext);
  const { test } = useContext(OrdersContext);
  console.log("test from orders", test);
  const { filters, handleFilterChange } = useContext(FilterContext);
  const { setShowPermissionModal } = useContext(AuthContext);

  const [copyText, setCopyText] = useState("");
  const isLargeScreen = useIsLargeScreen();
  const [show, setShow] = useState(false);
  // filters

  // const [filters, setFilters] = useState({
  //   status: "",
  //   suburb: "",
  // });
  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: value,
  //   }));
  // };
  // useEffect(() => {
  //   ensurePermission();
  // }, []);
  useEffect(() => {
    const checkPermissionsAndShowModal = async () => {
      const platform = Capacitor.getPlatform();
      console.log("Platform:", platform);
      if (Capacitor.getPlatform() === "web") return;
      let testAndroid1 = localStorage.getItem("justLoggedIn");
      console.log("test android 1 for hust logged in", testAndroid1);
      const justLoggedIn = localStorage.getItem("justLoggedIn") === "true";

      if (!justLoggedIn) return;

      localStorage.setItem("justLoggedIn", "false");

      const perm = await Geolocation.checkPermissions();
      if (perm)
        console.log(
          "test android 3 permission from geolocation.permission is (should be either 'granted' or something else):",
          perm.location
        );
      if (perm.location === "granted") {
        console.log("location is already granted");
        return;
      } else {
        console.log("location is not granted opening modal");
        setShowPermissionModal(true);
      }
    };

    checkPermissionsAndShowModal();
  }, []);
  const filteredPlants = plants.filter((plant) => {
    return (
      (filters.status === "" || plant.status_piantina === filters.status) &&
      (filters.suburb === "" || plant.suburb === filters.suburb)
    );
  });

  // end filters

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = (copyText) => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log("last", plants.length);

  useEffect(() => {
    getAllPlants();
  }, []);

  useEffect(() => {
    if (position) {
      let locationMarker = markerRef.current;
      console.log("location marker", locationMarker);
      setLocationMarkerTag(locationMarker);
      // test.openPopup();
    }
  }, [position]);

  useEffect(() => {
    console.log("staqui");
    if (locationMarkerTag) {
      locationMarkerTag.openPopup();
    }
  }, [locationMarkerTag]);
  if (locationMarkerTag) {
    locationMarkerTag.openPopup();
  }

  const isChildRoute = location.pathname.includes("/map/");
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!isChildRoute && (
        <>
          <div className='section map-h map-section'>
            <article className='map'>
              <MapContainer
                center={[41.118778112249046, 16.871917818963464]}
                zoom={13}
                scrollWheelZoom={false}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                />
                {/* <MyTest /> */}
                <Buttons setPosition={setPosition} markerRef={markerRef} />
                {filteredPlants.length > 0 &&
                  filteredPlants.map((e) => {
                    const iconType = e.status_piantina;
                    const markerIcon = iconMap[iconType];
                    return (
                      <Marker
                        icon={markerIcon}
                        position={[e.lat, e.lang]}
                        key={e.id}
                        eventHandlers={{
                          click: () => {
                            navigate(`/map/${e.id}`);
                          },
                        }}
                      ></Marker>
                    );
                  })}

                {position && (
                  <Marker ref={markerRef} position={position}>
                    <Popup>
                      <h6>Ti trovi qui</h6>
                      <p>
                        Segnalaci la zona di piantagione aggiungendo una
                        piantina alla mappa oppure copia le coordinate per
                        poterle condividere con altri utenti.
                      </p>
                      {/* <ul>
                        <li>
                          <span>{`latitudine: ${position.lat}`}</span>
                        </li>
                        <li>
                          <span>{`longitudine: ${position.lng}`}</span>
                        </li>
                      </ul> */}
                      <div className='d-flex flex-column pb-3'>
                        <Button
                          className='mb-2'
                          onClick={() =>
                            copyToClipboard([`${position.lat},${position.lng}`])
                          }
                        >
                          copia coordinate
                        </Button>

                        <Button
                          onClick={() => (
                            sendValuesToAddPlant(
                              `${position.lat},${position.lng}`
                            ),
                            navigate("/map/addPlant")
                          )}
                        >
                          aggiungi alla mappa
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </article>
            {/* <article className='bottom-bar'>
        <BottomBar />
      </article> */}
          </div>
          <BottomBar />
        </>
      )}
      <Outlet />
      {isLargeScreen && <SideBar />}
      <PermissionModal />
    </>
  );
}

export default App;
