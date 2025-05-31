import copy from "copy-to-clipboard";
import { Geolocation } from "@capacitor/geolocation";
export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB");
};
export const copyToClipboard = (copyText) => {
  console.log("ciao");
  copy(copyText);
  alert(`You have copied "${copyText}"`);
};
export const ensurePermission = async () => {
  const perm = await Geolocation.checkPermissions();

  if (perm.location !== "granted") {
    const result = await Geolocation.requestPermissions();

    if (result.location !== "granted") {
      alert("Location permission is required to use this app.");
      // You can force logout or exit here if needed
    } else {
      localStorage.setItem("locationGranted", "true");
    }
  } else {
    localStorage.setItem("locationGranted", "true");
  }
};
