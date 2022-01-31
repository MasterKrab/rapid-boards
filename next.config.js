/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
})
