/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-image-lightbox'], // Транспиляция пакета
  images: {
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        pathname: "**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "img1.akspic.ru",
        pathname: "**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "krisha-photos.kcdn.online",
        pathname: "**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "krisha.kz",
        pathname: "**",
        port: ""
      }
    ],
  },
};



module.exports = nextConfig;
