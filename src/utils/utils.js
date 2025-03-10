import copy from "copy-to-clipboard";

export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB");
};
export const copyToClipboard = (copyText) => {
  copy(copyText);
  alert(`You have copied "${copyText}"`);
};
