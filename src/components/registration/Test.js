import { SocialLogin } from "@capgo/capacitor-social-login";

const test0 = async () => {
  await SocialLogin.initialize({
    google: {
      webclientId: process.env.REACT_APP_GOOGLE_ID_WEB,
      iOSClientId: "",
      mode: "offline",
    },
  });
};
const test1 = async () => {
  await SocialLogin.login({
    provider: "google",
    options: {
      scopes: ["email", "profile"],
      forceRefreshToken: true,
    },
  });
};
