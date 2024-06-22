import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'bioskop-booking',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1022665527937-r9l30juuim8ouan4oo9mh0mr0vg729gk.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
