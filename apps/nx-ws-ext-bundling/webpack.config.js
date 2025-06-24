const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/nx-ws-ext-bundling'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      externalDependencies: [
        '@nestjs/core',
        '@nestjs/common',
        '@nestjs/config',
        '@nestjs/platform-express',
        'reflect-metadata',
        'rxjs',
      ],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
