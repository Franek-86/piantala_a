import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.piantala.app",
  appName: "ti pianto per amore",
  webDir: "build",
  server: {
    url: "https://piantala-a.onrender.com",
    cleartext: true,
  },
  plugins: {
    Keyboard: {
      resize: "body", // options: 'body', 'ionic', 'native', 'none'
    },
  },
};

export default config;
