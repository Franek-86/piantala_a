import React, { useRef, useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
// import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MdBackspace } from "react-icons/md";
import { PlantsContext } from "../context/PlantsContext";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Camera, CameraResultType } from "@capacitor/camera";

const AddPlant = ({ setting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm();
  const { userId, handleLogout, loggedUserInfo } = useContext(AuthContext);
  const location = useLocation();
  const fromManual = location.state?.fromManual;
  const { userName } = loggedUserInfo;
  const {
    getAllPlants,
    // userId,
    langMatch,
    latMatch,
    setLatMatch,
    setLangMatch,
    addPlant,
    locationInfo,
    addLocationInfo,
  } = useContext(PlantsContext);

  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  const token = localStorage.getItem("authToken");

  // Regex pattern for longitude and latitude format
  const latLongPattern = /^\d{1,2}\.\d+$/;
  const resetLatLang = () => {
    setLatMatch(null);
    setLangMatch(null);
  };
  const validateLongitude = (value) => {
    const lon = parseFloat(value);
    if (!latLongPattern.test(value)) {
      return "La longitude deve essere del formato corretto (e.g. 16.8724275071934).";
    }
    if (lon < 16.8 || lon > 16.95) {
      return "La longitudine deve essere tra 16.800 e 16.950 (Area di Bari).";
    }
    return true;
  };

  const validateLatitude = (value) => {
    const lat = parseFloat(value);
    if (!latLongPattern.test(value)) {
      return "La latitudine deve essere nel formato corretto (e.g. 41.1206046905597).";
    }
    if (lat < 41.075 || lat > 41.17) {
      return "La longitudine deve essere nel formato corretto (Area di Bari).";
    }
    return true;
  };

  const getPic = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    console.log("yoo", image);
    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (let x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    console.log("arr", arr);
    const blob = new Blob([arr], { type: "image/" + image.format });

    setFile(blob);
    toast(`🌱 immagine caricata`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onSubmit = async (data) => {
    const { longitude, latitude, file: dataFile } = data;
    console.log("locationInfo", locationInfo);
    const { road, residential, suburb, city, shop, house_number } =
      locationInfo;

    if (Capacitor.isNativePlatform()) {
      if (!file) {
        toast.error("Aggiungi immagine", {
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
        return;
      }
    }
    if (!Capacitor.isNativePlatform()) {
      if (!dataFile || !dataFile[0]) {
        setError("file", {
          type: "manual",
          message: "È necessario aggiungere una immagine.",
        });
        return;
      }
    }

    // // To access the actual file, use file[0]
    // const selectedFile = file[0];

    const formData = new FormData();

    formData.append("road", road);

    formData.append("residential", residential);

    formData.append("shop", shop);

    formData.append("house_number", house_number);

    formData.append("suburb", suburb);
    formData.append("city", city);
    formData.append("lat", latitude);
    formData.append("lang", longitude);
    if (Capacitor.isNativePlatform()) {
      formData.append("image", file);
    }
    if (!Capacitor.isNativePlatform()) {
      formData.append("image", dataFile[0]);
    }

    formData.append("user_id", userId);

    try {
      setLoading(true);
      const response = await addPlant(formData);
      console.log("qui", response.status);

      if (response.status === 201) {
        console.log("abc");
        setSubmissionError("");
        setLoading(false);
        setSuccessMessage("Pianta aggiunta con successo!");
        // setTimeout(() => {
        backToMap();
        setSuccessMessage("");
        setFile(null);
        reset();
        getAllPlants("add");

        // }, 1000);
      } else if (response.status === 500) {
        setSuccessMessage(response.status, response);
      } else {
        setSuccessMessage("response status:", response.status);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding plant:", error);
      // setSubmissionError(
      //   error.response?.data?.message || "Errore nella compilazione del modulo"
      // );
      setSubmissionError(
        "catch",
        error?.response || "Errore nella compilazione del modulo"
      );
    }

    // setSubmissionError("");

    // reset();
  };
  const backToMap = () => {
    resetLatLang();
    navigate("/map");
  };
  const handlePaste = (event) => {
    const pastedValue = event.clipboardData.getData("Text").trim(); // Get the pasted text
    event.preventDefault(); // Prevent default pasting behavior to handle it manually

    // Regular expression to match coordinates in "lat, long" format
    const coordsMatch = pastedValue.match(
      /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/
    );

    // If coordinates are found in the correct format (lat, long)
    if (coordsMatch) {
      const latitude = coordsMatch[1]; // Latitude
      const longitude = coordsMatch[3]; // Longitude
      // Set values in React Hook Form
      setValue("latitude", latitude);
      setValue("longitude", longitude);
      addLocationInfo(latitude, longitude);
    }
  };

  useEffect(() => {
    if (latMatch) {
      setValue("latitude", latMatch);
    }

    if (langMatch) {
      setValue("longitude", langMatch);
    }
  });

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <section className='section-background section-full-page section-map-page'>
          <div className='section-center'>
            <div className='back-btn'>
              <MdBackspace
                onClick={() => {
                  backToMap();
                }}
              />
            </div>
            <h1 className='section-title'>Segnalaci buca</h1>
            {/* Global error message */}
            {submissionError && (
              <p className='text-danger'>{submissionError}</p>
            )}
            {/* Success message */}
            {successMessage && <p className='text-success'>{successMessage}</p>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              {fromManual && (
                <Form.Group className='mb-3' controlId='formLongitude'>
                  {/* <FloatingLabel controlId='tutte' label='tutte' className='mb-3'> */}
                  <Form.Control
                    type='text'
                    placeholder='Incolla qui longitutine e latitudine'
                    onPaste={handlePaste} // Handle paste event
                  />
                  {/* {errors.longitude && (
                <small className='text-danger'>
                  {errors.longitude.message}
                </small>
              )} */}
                  {/* </FloatingLabel> */}
                </Form.Group>
              )}
              {/* Longitude input */}

              {/* Latitude input */}
              <Form.Group className='mb-3' controlId='formLatitude'>
                <FloatingLabel
                  controlId='formLatitude'
                  label='Latitudine'
                  className='mb-3'
                >
                  <Form.Control
                    type='text'
                    placeholder='Inserisci latitudine'
                    {...register("latitude", {
                      required: "È necessario inserire la latitudine",
                      validate: validateLatitude,
                    })}
                  />
                  {errors.latitude && (
                    <small className='text-danger'>
                      {errors.latitude.message}
                    </small>
                  )}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formLongitude'>
                <FloatingLabel
                  controlId='formLongitude'
                  label='Longitudine'
                  className='mb-3'
                >
                  <Form.Control
                    type='text'
                    placeholder='Enter longitude'
                    {...register("longitude", {
                      required: "È necessario inserire la latitudine",
                      validate: validateLongitude,
                    })}
                  />
                  {errors.longitude && (
                    <small className='text-danger'>
                      {errors.longitude.message}
                    </small>
                  )}
                </FloatingLabel>
              </Form.Group>

              {/* File input for uploading image */}
              {!Capacitor.isNativePlatform() && (
                <Form.Group className='mb-3' controlId='formImage'>
                  <Form.Label>Carica immagine</Form.Label>
                  <Form.Control
                    type='file'
                    // accept='image/*'
                    {...register("file", {
                      required: "Image file is required.",
                    })}
                    // ref={fileInputRef}
                    onChange={() => clearErrors("file")}
                  />
                  {errors.file && (
                    <small className='text-danger'>{errors.file.message}</small>
                  )}
                </Form.Group>
              )}

              {!Capacitor.isNativePlatform() && (
                <span
                  className={
                    file ? "btn btn-sm btn-link" : "btn btn-outline-primary"
                  }
                >
                  {!file && <IoIosAddCircleOutline />}
                  <span className={!file && "ps-1"} onClick={getPic}>
                    {file ? "Sostituisci immagine caricata" : "Aggiungi foto"}
                  </span>
                </span>
              )}
              {/* Submit Button */}
              <div className='text-center mt-5'>
                <Button variant='primary' type='submit'>
                  Invia segnalazione
                </Button>
              </div>
            </Form>
          </div>
        </section>
      )}
    </>
  );
};

export default AddPlant;
