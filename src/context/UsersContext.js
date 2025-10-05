import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { Camera, CameraResultType } from "@capacitor/camera";
import { AuthContext } from "./AuthContext";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [isRefreshTokenExpired, setIsRefreshTokenExpired] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [sessionLoading, setSessionLoading] = useState(false); // New loading state

  // const [userId, setUserId] = useState(null);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [userInfo, setUserInfo] = useState({ id: "", role: "", status: "" });
  // const [userInfo, setUserInfo] = useState({ id: "", role: "", status: "" });
  const [loggedUserInfo, setLoggedUserInfo] = useState({
    id: "",
    userName: "",
    email: "",
    phone: "",
    pic: "",
  });
  const [otherUserInfo, setOtherUserInfo] = useState({
    userName: "",
    email: "",
  });

  // const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [userName, setUserName] = useState(null);
  // const handleShowPermissionModal = () => setShowPermissionModal(true);
  // const handleClosePermissionModal = () => setShowPermissionModal(false);
  // const [allUsers, setAllUsers] = useState({});
  const {
    // setLoggedUserInfo,
    // loggedUserInfo,
    setIsAuthenticated,
    userId,
    // userInfo,
    // setUserInfo,
  } = useContext(AuthContext);
  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  // ok

  const changeUserRole = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/users/role`, {
        payload: { userInfo },
      });
      if (response.status === 200) {
        setLoading(false);
        if (response.data === "diritti amministrativi rimossi") {
          setUserInfo({ ...userInfo, role: "user" });
          toast("🌱 Ruolo utente amministratore rimosso", {
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
        if (response.data === "diritti amministrativi aggiunti") {
          setUserInfo({ ...userInfo, role: "admin" });
          toast("🌱 Ruolo utente amministratore aggiunto", {
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
      } else {
        console.error("Unexpected response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(`${error.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  const takePicture = async (id) => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    // const blob = new Blob([new Uint8Array(decode(image.base64String))], {
    //   type: `image/${Camera.format}`,
    // });
    setLoading(true);
    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (let x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    const blob = new Blob([arr], { type: "image/" + image.format });

    const formData = new FormData();
    formData.append("pic", blob);
    formData.append("id", id);

    try {
      const response = await axiosInstance.patch(
        `/api/users/set-user-pic`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        const url = response.data.url;
        setLoggedUserInfo({ ...loggedUserInfo, pic: url });
        toast("Immagine profilo aggiunta", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("Errore nel caricamento dell'immagine profilo", {
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
    } finally {
      setLoading(false);
    }
  };
  // ok
  const handleUserPic = async (event, id) => {
    setLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("pic", file);
    formData.append("id", id);
    // formData.append("id", id);

    try {
      const response = await axiosInstance.patch(
        `/api/users/set-user-pic`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        const url = response.data.url;
        setLoggedUserInfo({ ...loggedUserInfo, pic: url });
        toast("Immagine profilo aggiunta", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("Errore nel caricamento dell'immagine profilo", {
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
    } finally {
      event.target.value = null;
      setLoading(false);
    }
  };
  // ok
  const deleteProfilePic = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/users/delete-user-pic`, {
        id,
      });

      if (response.status === 200) {
        toast("Immagine profilo rimossa", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoggedUserInfo({
        ...loggedUserInfo,
        pic: "",
      });
      return;
    } catch (err) {
      toast.error("Errore nella rimozione immagine profilo", {
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
    } finally {
      setLoading(false);
    }
  };
  // ok
  const changeUserStatus = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/users/status`, {
        payload: { userInfo },
      });
      if (response.status === 200) {
        setLoading(false);
        setUserInfo({ ...userInfo, status: 0 });
        if (response.data === "User has been unblocked") {
          toast("🌱 Utente sbloccato", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setUserInfo({ ...userInfo, status: 1 });
          toast("🌱 Utente bloccato", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        console.error("Unexpected response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(`${error.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  const getUserInfo = async (userId) => {
    if (userId) {
      try {
        const response = await axiosInstance.get(
          `${serverDomain}/api/users/user/${userId}`
        );
        if (response) {
          // return response;
          setLoggedUserInfo({
            ...loggedUserInfo,
            id: response.data.id,
            userName: response.data.userName,
            email: response.data.email,
            phone: response.data.phone,
            pic: response.data.pic,
          });
          return response.data;
        }
      } catch (err) {}
    }
  };
  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);
  const getOtherUserInfo = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/users/user/${userId}`);
      if (response) {
        // return response;
        setOtherUserInfo({
          ...loggedUserInfo,
          userName: response.data.userName,
          email: response.data.email,
        });
        return response.data;
      }
    } catch (err) {}
  };
  // ok
  const deleteProfile = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete("/api/users/delete-user", {
        data: { id: data },
      });
      if (response.status === 200) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        toast("Utente cancellato", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    } catch (error) {
      toast.error(
        "Utente non cancellato, al momento non è possibile cancellare l'utente",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        }
      );
      return;
    } finally {
      setLoading(false);
    }
  };
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(`/api/users/users`);
      if (response) {
        let allUsers = response.data.usersToBeSent;

        setAllUsers(allUsers);
      }
    } catch (err) {}
  };

  // temp
  const sendEmail = async (messageBody) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/api/users/send`, {
        payload: { messageBody, loggedUserInfo },
      });
      if (response.status === 200) {
        toast("🌱 Email inviata", {
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
        return response;
      }
    } catch (err) {
      toast.error("Invio Email fallito", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        loggedUserInfo,
        getUserInfo,
        deleteProfile,
        deleteProfilePic,
        userId,
        userInfo,
        getAllUsers,
        setUserInfo,
        loading,
        changeUserRole,
        changeUserStatus,
        getOtherUserInfo,
        setIsRefreshTokenExpired,
        takePicture,
        isRefreshTokenExpired,
        otherUserInfo,
        userName,
        sessionLoading,
        setSessionLoading,
        userSession,
        regions,
        districts,
        handleUserPic,
        sendEmail,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
