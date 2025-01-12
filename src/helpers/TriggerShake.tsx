import {Animated} from 'react-native';

export const triggerShakeAnimation = (
  animValue: Animated.Value,
  intensity: number = 10,
  duration: number = 100,
) => {
  const shakeSteps = [
    Animated.timing(animValue, {
      toValue: -intensity, // move left
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: intensity, // move right
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: -intensity, // move left
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 0, // reset position
      duration,
      useNativeDriver: true,
    }),
  ];

  Animated.sequence(shakeSteps).start();
};
