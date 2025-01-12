module.exports = {
  // dependencies: {
  //   "react-native-vector-icons": {
  //     platforms: {
  //       ios: null
  //     }
  //   }
  // },
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? {
          "react-native-flipper": {
            platforms: {
              ios: null,
            },
          },
        }
      : {}),
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ["./src/shared/assets/fonts"],
};
