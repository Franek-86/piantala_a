let navigationFunk;

export const navigationDeepLink = (navigation) => {
  navigationFunk = navigation;
};

export const deepLinkFunk = (url) => {
  let newUrl = new URL(url);
  let splittedUrl = newUrl.pathname.split("/");
  let token = splittedUrl[2];

  console.log("this is the token from deep link console log", token);
  navigationFunk(`/verify/${token}`);
};
