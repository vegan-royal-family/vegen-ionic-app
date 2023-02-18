import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "myApp",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    iosScheme: "http",
  },
};

export default config;
