import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

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
    GoogleAuth.initialize({
      clientId: process.env.REACT_APP_GOOGLE_ID_WEB,
      scopes: ["profile", "email"],
    });
  }
  async login() {
    try {
      const response = await GoogleAuth.signIn();
      console.log("resp da google service", response);
    } catch (err) {
      return null;
    }
  }
  logout() {
    GoogleAuth.signOut();
  }
}
