export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    console.log("di stare sta");
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1558542848644058",
        // appId: "2708025572871352",
        xfbml: true,
        version: "v2.7",
      });
    };
    resolve();
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        console.log("login ok", response);
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === "not_authorized") {
        console.log("login not auth", response);
        // The user hasn't authorized your application.  They
        // must click the Login button, or you must call FB.login
        // in response to a user gesture, to launch a login dialog.
      } else {
        console.log("login else", response);
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
      }
    });
    resolve();
  });
};

export const postOnFacebook = (url) => {
  window.FB.ui(
    {
      method: "share",
      href: url,
    },
    function (response) {
      console.log("post on facebook", response);
    }
  );
};
