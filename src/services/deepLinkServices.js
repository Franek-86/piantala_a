let navigate;

export const navigateFunction = (nav) => {
  navigate = nav;
};

export const navigateToFunction = (url) => {
  let urlPath = new URL(url).pathname;
  let splitPath = urlPath.split("/");
  let token = splitPath[2];
  navigate(`verify/${token}`);
};
