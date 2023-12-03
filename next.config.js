const fs = require('fs');
const initText = fs.readFileSync('./public/default.md', 'utf-8');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEFAULT_MD: initText,
  },
};

module.exports = nextConfig;
