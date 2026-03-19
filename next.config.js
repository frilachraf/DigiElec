/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
        new URL('http://localhost:8000/images/'),
        new URL('http://localhost/digielec/ma/'),
        {
            protocol: 'http',
            port: '80',
            hostname: "localhost",
            pathname :"/digielec/ma/wp-content/uploads/**"
        },
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '8000',
            pathname: '/**',
        },
    ],
  },
};

module.exports = nextConfig;
