export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    console.log("di stare sta");
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1558542848644058",
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
        console.log("test123456789");
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === "not_authorized") {
        console.log("test123456789123456789");
        // The user hasn't authorized your application.  They
        // must click the Login button, or you must call FB.login
        // in response to a user gesture, to launch a login dialog.
      } else {
        console.log("test123456789123456789123456789");
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
      }
    });
    resolve();
  });
};

export const postOnFacebook = () => {
  window.FB.ui(
    {
      method: "share",
      href: "https://developers.facebook.com/docs/",
    },
    function (response) {
      console.log("test123", response);
    }
  );
};
