import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export const PlantsContext = createContext();
export const PlantsProvider = ({ children }) => {
  const { token, getUserInfo } = useContext(AuthContext);
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
        console.log("here122", userToken);
        console.error("No user token found");
        return;
      }
      console.log("here121");
      const payload = JSON.parse(atob(userToken.split(".")[1]));
      console.log("here1222", payload);
      const userId = payload.id;
      console.log("here123", userId);
      const response = await axios.get(
        `${serverDomain}/api/plants/user-plants`,
        {
          params: { userId },
        }
      );
      setMyReports(response.data); // Store the plants in state
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReports(false); // Set loading to false after fetching
    }
  };

  const handleBookedPlant = async () => {
    let bookedPlant = JSON.parse(localStorage.getItem("booked-plant"));
    console.log("plant-approved-after-payment", bookedPlant);

    const { id, owner_id, comment, plantType, purchase_date } = bookedPlant;
    console.log(id, owner_id, comment, plantType, purchase_date, "test23");

    try {
      await axios.patch(
        `${serverDomain}/api/plants/${id}/ownership`,
        {
          status: "booked",
          owner_id,
          id,
          owner_id,
          comment,
          plantType,
          purchase_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
    } catch (err) {
      // setError(err.message);
    }
  };

  const handlePlateUpload = async (id, event) => {
    console.log("aoo");
    const file = event.target.files[0];
    if (file) {
      setPlateLoading(true);
      console.log("File uploaded:", file);
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
        console.log("server response", response.data);
      } catch (err) {
        console.log(err);
        setPlateLoading(false);
      }
    }
  };
  const handlePlateRemoval = async (id, plate_hash) => {
    console.log("123321", id, plate_hash);
    setLoading(true);
    try {
      const response = await axios.patch(
        `${serverDomain}/api/plants/clear-plate`,
        { id, plate_hash },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("sta12", response);
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
  const getAllPlants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverDomain}/api/plants`);
      console.log(response);
      setPlants(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMyPlants = async (userId) => {
    console.log("here3", userId);
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
      console.log("resp", response);
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
        console.log(response.data);
        if (response) {
          console.log("asdf", response);
          const item = response.data.find(
            (item) => item.id === parseInt(plantId)
          );
          if (item) {
            console.log("111");
            const userName = await getUserInfo(item.user_id);

            if (userName) {
              console.log("123321", userName);

              setPlant(item);
              setUserInfo(userName);
              setUserId(item.user_id);
              setOwnerId(item.owner_id);
              console.log("userInfo", userInfo);
            }
            console.log("123321123", userName);
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
    console.log(newStatus, plantId, comment);
    try {
      await axios.patch(
        `${serverDomain}/api/plants/${plantId}/status`,
        {
          status: newStatus,
          rejection_comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      setPlant((prevPlant) => ({
        ...prevPlant,
        status_piantina: newStatus,
        rejected_comment: comment,
      }));
      getAllPlants();
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePlant = async (plantId) => {
    try {
      setSinglePlantLoading(true);
      const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage
      await axios.delete(`${serverDomain}/api/plants/${plantId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      getAllPlants();
    } catch (err) {
      setError(err.message);
      setSinglePlantLoading(false);
    } finally {
      setSinglePlantLoading(false);
    }
  };

  const addPlant = (data) => {
    return axios.post(`${serverDomain}/api/plants/add-plant`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
        Authorization: `Bearer ${token}`, // Optional: Send the token if needed
      },
    });
  };

  const addLocationInfo = async (lat, lang) => {
    try {
      console.log("addLocationInfo0");
      // setSinglePlantLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lang}&format=json`
      );
      if (response) {
        console.log("addLocationInfo1", response.data.address);
        setLocationInfo(response.data.address);
        // return response.data.address;
      }
    } catch (err) {
      // setError(err.message);
      // setSinglePlantLoading(false);
      console.log(err);
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
    console.log("salve 0.1", ownerId);
    try {
      const response = await axios.get(
        `${serverDomain}/api/plants/user/owner/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log("qua", response.data);
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
        console.log("owner info", ownerInfo);
        setModalUserShow(true);
      }

      // {email,user_name,phone, createdAt}
      console.log("resp123", ownerInfo);
    } catch (err) {
      console.log("salve 2", err);
    } finally {
      console.log("salve 3");
    }
  };
  const getReporterInfo = async () => {
    console.log("salve 0", userId);
    // let updatedObj = {};
    try {
      const response = await axios.get(
        `${serverDomain}/api/plants/user/reporter/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
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
      console.log("salve 2", err);
    } finally {
      console.log("salve 3");
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
//   console.log("hdwgcvegycvyewgqcvgv", token);
//   if (token) {
//     setUserToken(token);
//   }
//   setLoading(false); // Set loading to false after checking
// }, []);

// const isAuthenticated = !!userToken; // Convert token to boolean
