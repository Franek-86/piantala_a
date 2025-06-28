let navigationFunk;

export const navigationDeepLink = (navigation) => {
  navigationFunk = navigation;
};

export const deepLinkFunk = () => {
  // const token = new URL(url).searchParams("token");
  // console.log("this is the token from deep link console log", token);
  navigationDeepLink(`/verification-success`);
};
