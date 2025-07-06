let navigate;

export const navigateFunction = (nav) => {
  navigate = nav;
};

export const navigateToFunction = (url) => {
  let urlPath = new URL(url).pathname;
  let splitPath = urlPath.split("/");
  console.log(splitPath[1]);
  if (splitPath[1] === "verify") {
    let token = splitPath[2];
    navigate(`verify/${token}`);
  } else if (splitPath[1] === "verify-reset") {
    let token = splitPath[2];
    navigate(`verify-reset/${token}`);
  }
};
