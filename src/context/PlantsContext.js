import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import axios from "../services/axiosInstance";
import { UsersContext } from "./UsersContext";
export const PlantsContext = createContext();
export const PlantsProvider = ({ children }) => {
  const { getOtherUserInfo } = useContext(UsersContext);
  const [plants, setPlants] = useState([]);
  const [myPlants, setMyPlants] = useState(null);
  const [plant, setPlant] = useState(null);
  const [error, setError] = useState(null);
  const [singlePlantError, setSinglePlantError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [singlePlantLoading, setSinglePlantLoading] = useState(null);
  const [plateLoading, setPlateLoading] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [plateUrl, setPlateUrl] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [request, setRequest] = useState(null);
  // const [userId, setUserId] = useState(null);
  // const [submissionError, setSubmissionError] = useState("");
  const [plates, setPlates] = useState([]);
  const [latMatch, setLatMatch] = useState(null);
  const [langMatch, setLangMatch] = useState(null);
  const [modalUserShow, setModalUserShow] = useState(false);

  const [myReports, setMyReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reporterInfo, setReporterInfo] = useState({
    type: "reporter",
    firstName: "",
    lastName: "",
    user: "",
    phone: "",
    email: "",
  });
  const [ownerInfo, setOwnerInfo] = useState({
    first_name: "",
    last_name: "",
    address: "",
    fiscal_code: "",
    role: "owner",
    user: "",
    phone: "",
    email: "",
    cratedAt: "",
  });
  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;

  const fetchUserPlants = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        console.error("No user token found");
        return;
      }
      const payload = JSON.parse(atob(userToken.split(".")[1]));
      const userId = payload.id;
      const response = await axios.get(
        `${serverDomain}/api/plants/user-plants`,
        {
          params: { userId },
        }
      );
      setMyReports(response.data); // Store the plants in state
    } catch (error) {
    } finally {
      setLoadingReports(false); // Set loading to false after fetching
    }
  };

  const handleBookedPlant = async () => {
    let bookedPlant = JSON.parse(localStorage.getItem("booked-plant"));

    const { id, owner_id, comment, plantType, purchase_date } = bookedPlant;

    try {
      await axios.patch(`${serverDomain}/api/plants/${id}/ownership`, {
        status: "booked",
        owner_id,
        id,
        owner_id,
        comment,
        plantType,
        purchase_date,
      });
    } catch (err) {
      // setError(err.message);
    }
  };

  const handlePlateUpload = async (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setPlateLoading(true);
      const formData = new FormData();
      formData.append("plate", file);
      try {
        const response = await axios.post(
          `${serverDomain}/api/plants/upload-plate/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const plate = response.data.image_url;
        setPlateUrl(plate);
        setPlateLoading(false);
      } catch (err) {
        setPlateLoading(false);
      }
    }
  };
  const handlePlateRemoval = async (id, plate_hash) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${serverDomain}/api/plants/clear-plate`,
        { id, plate_hash }
      );
      // setPlants(response.data);
    } catch (err) {
      // setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearBookedStorage = () => {
    localStorage.removeItem("booked-plant");
  };
  const getAllPlants = async (action) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverDomain}/api/plants`);
      setPlants(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);

      if (action === "add") {
        toast("🌱 Piantina aggiunta alla mappa", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
      if (action === "delete") {
        toast("🌱 Piantina rimossa dalla mappa", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    }
  };
  const deletePlant = async (plantId) => {
    try {
      setSinglePlantLoading(true);

      await axios.delete(`${serverDomain}/api/plants/${plantId}/delete`);

      getAllPlants("delete");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(`${err.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError(err.message);
      setSinglePlantLoading(false);
    } finally {
      setSinglePlantLoading(false);
    }
  };

  const getMyPlants = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverDomain}/api/plants/owned-plants`,
        {
          params: {
            ID: userId,
          },
        }
      );
      setMyPlants(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSinglePlant = async (plantId) => {
    const fetchData = async () => {
      try {
        setSinglePlantLoading(true);
        const response = await axios.get(`${serverDomain}/api/plants`);
        if (response) {
          const item = response.data.find(
            (item) => item.id === parseInt(plantId)
          );
          if (item) {
            setPlant(item);
            const userInfo = await getOtherUserInfo(item.user_id);

            if (userInfo?.userName) {
              setUserInfo(userInfo.userName);
              setUserId(item.user_id);
            }
            if (item?.owner_id) {
              setOwnerId(item.owner_id);
            }
          }
        }
      } catch (err) {
        setSinglePlantError(err.message);
      } finally {
        setSinglePlantLoading(false);
      }
    };

    fetchData();
  };

  const handleStatusChange = async (newStatus, plantId, comment) => {
    // const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage
    try {
      // const resp = await axios.patch(`/api/plants/${plantId}/status`, {
      //   status: newStatus,
      //   rejection_comment: comment,
      // });
      await axios({
        method: "patch",
        url: `/api/plants/${plantId}/status`,
        data: {
          status: newStatus,
          rejection_comment: comment,
        },
        headers: {
          "content-type": "application/json",
        },
      });

      if (newStatus === "approved") {
        toast("🌱 Piantina approvata", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

          // transition: Bounce,
        });
      }
      if (newStatus === "rejected") {
        toast("🌱 Piantina rifiutata", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
      setPlant((prevPlant) => ({
        ...prevPlant,
        status_piantina: newStatus,
        rejected_comment: comment,
      }));
      getAllPlants();
      return;
    } catch (err) {
      setError(err.message);
    }
  };
  const handleTypeUpdate = async (type, plantId) => {
    // const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage
    setLoading(true);
    try {
      const response = await axios({
        method: "patch",
        url: `/api/plants/${plantId}/type`,
        data: {
          plant_type: type,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 200) {
        toast(`Tipo pianta ${type} aggiunto`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        setPlant((prevPlant) => ({
          ...prevPlant,
          plant_type: type,
        }));
        getAllPlants();
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (data) => {
    try {
      let response = await axios.post(`/api/plants/add-plant`, data);

      return response;
    } catch (error) {}
  };

  const addLocationInfo = async (lat, lang) => {
    try {
      // setSinglePlantLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lang}&format=json`
      );
      if (response) {
        setLocationInfo(response.data.address);
        // return response.data.address;
      }
    } catch (err) {
      // setError(err.message);
      // setSinglePlantLoading(false);
    } finally {
      // setSinglePlantLoading(false);
    }
  };
  const getUserName = (user_id) => {
    return user_id;
  };
  const sendValuesToAddPlant = (val) => {
    const coordsMatch = val.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);

    // If coordinates are found in the correct format (lat, long)
    if (coordsMatch) {
      const latMatch = coordsMatch[1]; // Latitude
      const langMatch = coordsMatch[3]; // Longitude
      setLatMatch(latMatch);
      setLangMatch(langMatch);
      addLocationInfo(latMatch, langMatch);
    }
  };
  const getOwnerInfo = async () => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/plants/user/owner/${ownerId}`
      );
      if (response) {
        setOwnerInfo({
          // ...ownerInfo,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          birthday: response.data.birthday,
          city: response.data.city,
          fiscalCode: response.data.fiscalCode,
          user: response.data.user,
          role: response.data.role,
          phone: response.data.phone,
          email: response.data.email,
          cratedAt: response.data.cratedAt,
        });
        setRequest("owner");
        setModalUserShow(true);
      }

      // {email,user_name,phone, createdAt}
    } catch (err) {
    } finally {
    }
  };
  const getReporterInfo = async () => {
    // let updatedObj = {};
    if (userId) {
      try {
        const response = await axios.get(
          `${serverDomain}/api/plants/user/reporter/${userId}`
        );
        if (response) {
          setReporterInfo({
            ...reporterInfo,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            user: response.data.user,
            phone: response.data.phone,
            role: response.data.role,
            email: response.data.email,
            cratedAt: response.data.cratedAt,
          });
          setRequest("reporter");

          setModalUserShow(true);
        }
      } catch (err) {
      } finally {
      }
    } else {
      setReporterInfo({
        ...reporterInfo,
        firstName: "N/A (utente rimosso)",
        lastName: "N/A (utente rimosso)",
        user: "N/A (utente rimosso)",
        phone: "N/A (utente rimosso)",
        role: "N/A (utente rimosso)",
        email: "N/A (utente rimosso)",
        cratedAt: "N/A (utente rimosso)",
      });
      setRequest("reporter");

      setModalUserShow(true);
    }
  };
  const filterPlates = plants.filter((e) => {
    return e.plate !== null;
  });
  useEffect(() => {
    setPlates(filterPlates);
  }, [plants]);

  return (
    <PlantsContext.Provider
      value={{
        plants,
        plant,
        plateUrl,
        myPlants,
        latMatch,
        langMatch,
        myReports,
        loadingReports,
        locationInfo,
        plateLoading,
        setPlants,
        getAllPlants,
        getSinglePlant,
        getMyPlants,
        sendValuesToAddPlant,
        addPlant,
        setLatMatch,
        setLangMatch,
        singlePlantLoading,
        clearBookedStorage,
        setSinglePlantLoading,
        handleStatusChange,
        deletePlant,
        addLocationInfo,
        handlePlateUpload,
        handlePlateRemoval,
        singlePlantError,
        loading,
        handleBookedPlant,
        handleTypeUpdate,
        fetchUserPlants,
        getUserName,
        getReporterInfo,
        getOwnerInfo,
        userInfo,
        modalUserShow,
        setModalUserShow,
        reporterInfo,
        ownerInfo,
        request,
        filterPlates,
        plates,
        getAllPlants,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

// useEffect(() => {
//   const token = localStorage.getItem("userToken");
//   if (token) {
//     setUserToken(token);
//   }
//   setLoading(false); // Set loading to false after checking
// }, []);

// const isAuthenticated = !!userToken; // Convert token to boolean
