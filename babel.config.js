module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.ts',
            '.tsx',
            '.json',
            '.svg',
          ],
          alias: {
            '@/shared': './src/shared',
            '@/helpers': './src/helpers',
            '@/assets': './src/assets',
            '@/screens': './src/screens',
            '@/app': './src/app',
            '@/mock': './src/mock',
            '@/hooks': './src/hooks',
            '@/contexts': './src/contexts',
            '@/services': './src/services',
            '@/config': './src/config',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
