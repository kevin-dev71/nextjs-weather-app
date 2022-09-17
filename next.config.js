/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "es-ES",
  },
  images: {
    domains: ["openweathermap.org"],
  },
};

module.exports = nextConfig;
