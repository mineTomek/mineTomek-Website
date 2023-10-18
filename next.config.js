/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: 'cdn.pixabay.com',
        pathname: '/photo/**'
      },
      {
        hostname: 'images.unsplash.com',
        pathname: '**'
      }
    ]
  },
}

module.exports = nextConfig
