import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export const PlantsContext = createContext();
export const PlantsProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const [myPlants, setMyPlants] = useState(null);
  const [plant, setPlant] = useState(null);
  const [error, setError] = useState(null);
  const [singlePlantError, setSinglePlantError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [singlePlantLoading, setSinglePlantLoading] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  // const [userId, setUserId] = useState(null);
  // const [submissionError, setSubmissionError] = useState("");
  const [latMatch, setLatMatch] = useState(null);
  const [langMatch, setLangMatch] = useState(null);

  const [myReports, setMyReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
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
        console.log("server response", response.data);
      } catch (err) {
        console.log(err);
      }
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
        const item = response.data.find(
          (item) => item.id === parseInt(plantId)
        );
        if (item) {
          setPlant(item);
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

  return (
    <PlantsContext.Provider
      value={{
        plants,
        plant,
        myPlants,
        latMatch,
        langMatch,
        myReports,
        loadingReports,
        locationInfo,
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
        singlePlantError,
        loading,
        handleBookedPlant,
        fetchUserPlants,
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
