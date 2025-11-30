import { SocialLogin } from "@capgo/capacitor-social-login";

export class GoogleService {
  // private static instance: GoogleService;
  constructor() {
    if (GoogleService.instance) {
      return GoogleService.instance;
    }
    this.init();
    GoogleService.instance = this;
  }
  init() {
    SocialLogin.initialize({
      google: {
        webclientId: process.env.REACT_APP_GOOGLE_ID_WEB,
        iOSClientId: "",
        mode: "offline",
      },
    });
  }
  async login() {
    try {
      const response = await GoogleService.signIn();
      console.log("resp da google service", response);
    } catch (err) {
      return null;
    }
  }
  logout() {
    GoogleService.signOut();
  }
}

// import { Plugins } from "@capacitor/core";
// Plugins.GoogleAuth.signIn();

// angular

// async googleSignIn() {
//   let googleUser = await Plugins.GoogleAuth.signIn();
//   const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
//   return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
// }
