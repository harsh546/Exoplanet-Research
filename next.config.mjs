/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export (required for GitHub Pages)
  basePath: "/exoplanet-research", // sets the base path for GitHub Pages
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
