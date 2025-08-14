/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media2.dev.to',
      'dev-to-uploads.s3.amazonaws.com',
      'res.cloudinary.com',
      'media.dev.to',
      'images.unsplash.com',
    ],
  },
};

export default nextConfig;
