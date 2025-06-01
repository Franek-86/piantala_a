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
      alert(
        "Il consenso alla geolocalizzazione è necessario per l'utilizzo di questa app, verrai dunque rediretto alla pagina di log in."
      );
      return false;
    } else {
      localStorage.setItem("locationGranted", "true");
      return true;
    }
  } else {
    localStorage.setItem("locationGranted", "true");
  }
};
