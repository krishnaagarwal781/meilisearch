const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
        },
        {
          protocol: 'https',
          hostname: 'assets.coingecko.com',
        },
      ],
    },
};

export default nextConfig;
