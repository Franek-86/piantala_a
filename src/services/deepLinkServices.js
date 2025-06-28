let navigationFunk;

export const navigationDeepLink = (navigation) => {
  navigationFunk = navigation;
};

export const deepLinkFunk = (url) => {
  const token = new URLSearchParams(url).get("token");
  console.log("this is the token from deep link console log", token);
  navigationDeepLink(`/verify/${token}`);
};
