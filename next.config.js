const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qdgabbgfwbvffkhhpwoj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'gbpimzlecwtyzghkupxh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  }
};

const config = withPlausibleProxy()(nextConfig);

module.exports = config;
