/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    // loader: 'custom',
    // domains: ["images.ctfassets.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
};
