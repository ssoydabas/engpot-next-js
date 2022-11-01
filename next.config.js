/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
    API_URL: process.env.API_URL,
    HOTJAR_ID: process.env.HOTJAR_ID,
    HOTJAR_VERSION: process.env.HOTJAR_ID,
  },
});
