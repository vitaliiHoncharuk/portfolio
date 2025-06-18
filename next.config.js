/** @type {import('next').NextConfig} */

// Bundle analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'export',
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'sonner'],
  },
  // Improve dev server stability
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enhanced webpack optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Fix development mode source map issues and improve debugging
    if (dev && !isServer) {
      config.devtool = 'cheap-module-source-map';
      
      // Reduce memory usage in development
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/
      };
    }
    
    // Production optimizations
    if (!dev && !isServer) {
      // Enhanced bundle splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000, // Reduced for better loading
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
          // React and core libraries
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
            enforce: true,
          },
          // UI libraries
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 15,
            chunks: 'all',
            enforce: true,
          },
          // Animation libraries
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 12,
            chunks: 'all',
            enforce: true,
          },
          // Utility libraries
          utils: {
            test: /[\\/]node_modules[\\/](date-fns|clsx|class-variance-authority|tailwind-merge)[\\/]/,
            name: 'utils',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          // Icon libraries
          icons: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'icons',
            priority: 8,
            chunks: 'all',
            enforce: true,
          },
          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 5,
            chunks: 'all',
            enforce: true,
          },
        },
      };

      // Enhanced tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Module concatenation for smaller bundles
      config.optimization.concatenateModules = true;
      
      // Better minification
      config.optimization.minimize = true;
    }

    // Resolve optimizations for faster builds
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    // Performance hints
    config.performance = {
      hints: dev ? false : 'warning',
      maxAssetSize: 250000,
      maxEntrypointSize: 400000,
    };

    // Cache optimization for faster rebuilds
    if (!dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);