/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8095';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/industries',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/why-choose-us',
        destination: '/about#why-choose-us',
        permanent: false,
      },
      {
        source: '/process',
        destination: '/about#process',
        permanent: false,
      },
      {
        source: '/security-process',
        destination: '/about#process',
        permanent: false,
      },
      {
        source: '/team',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/clients',
        destination: '/services#clients',
        permanent: false,
      },
      {
        source: '/projects',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/projects/:id',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/gallery',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
      {
        source: '/blog/:slug',
        destination: '/',
        permanent: false,
      },
      {
        source: '/faq',
        destination: '/contact#faq',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
      {
        source: '/admin/service-categories',
        destination: '/admin/categories',
        permanent: false,
      },
      {
        source: '/admin/industries',
        destination: '/admin/services',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
