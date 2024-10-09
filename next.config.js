const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'gbpimzlecwtyzghkupxh.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**',
          },
        ],
      },
};

const config = withPlausibleProxy()(nextConfig);

module.exports = config;
