import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { Dimensions } from 'react-native';

import darkMode from './darkMode';
import { palette } from './palette';
import type { PaddingSizesObjectType } from './types';
import RfValue from '../../helpers/RfValue';

export const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size: number) =>
  (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export const fontFamily = {
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  thin: 'Poppins-Light',
};

const lightTheme = createTheme({
  borderRadii: {
    lg: RfValue(32),
    sml: RfValue(24),
    md: RfValue(16),
    mmd: RfValue(14),
    none: 0,
    sm: RfValue(8),
    xl: RfValue(64),
    xs: RfValue(4),
  },

  breakpoints: {
    largeScreen: 412,
    phone: 0,
    tablet: 768,
  },

  buttonGradients: {
    primary: [palette.primary, palette.primary, palette.primary],
    // secondary: [palette.gradientBlueTop, palette.gradientBlueBottom],
    // tatiary: [palette.gradientGreenTop, palette.gradientGreenBottom],
  },
  buttonSizes: {
    lg: {
      paddingHorizontal: 'xl',
      paddingVertical: 'lg',
    },
    md: {
      paddingHorizontal: 'lg',
      paddingVertical: 'md',
    },
    none: {
      paddingHorizontal: 'none',
      paddingVertical: 'none',
    },
    sm: {
      paddingHorizontal: 'md',
      paddingVertical: 'sm',
    },
    xl: {
      paddingHorizontal: 'xxl',
      paddingVertical: 'xl',
    },
    xs: {
      paddingHorizontal: 'sm',
      paddingVertical: 'xs',
    },
  } as PaddingSizesObjectType,

  buttonVariants: {
    defaults: {
      borderRadius: 'sm',
    },
    filled: {
      backgroundColor: 'primary',
    },
    ghost: {
      backgroundColor: 'gray200',
    },
    none: {},
    outlined: {
      borderColor: 'gray200',
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  },

  colors: {
    ...palette,
  },

  fontSizes: {
    caption: RfValue(12),
    h1: RfValue(32),
    h2: RfValue(24),
    h3: RfValue(20),
    h4: RfValue(18),
    h5: RfValue(16),
    h6: RfValue(14),
    p: RfValue(14),
    s: RfValue(6),
  },

  iconSizes: {
    'logo-iconsize': {
      height: RfValue(40),
      width: RfValue(40),
    },
    lg: {
      height: RfValue(32),
      width: RfValue(32),
    },
    m: {
      height: RfValue(12),
      width: RfValue(12),
    },
    mm: {
      height: RfValue(20),
      width: RfValue(20),
    },
    md: {
      height: RfValue(24),
      width: RfValue(24),
    },
    s: {
      height: RfValue(4),
      width: RfValue(4),
    },
    sml: {
      height: RfValue(20),
      width: RfValue(20),
    },
    sm: {
      height: RfValue(16),
      width: RfValue(16),
    },
    xl: {
      height: RfValue(48),
      width: RfValue(48),
    },
    xll: {
      height: RfValue(32),
      width: RfValue(99),
    },
    xlll: {
      height: RfValue(38),
      width: RfValue(140),
    },

    xxl: {
      height: RfValue(60),
      width: RfValue(60),
    },
    xs: {
      height: RfValue(8),
      width: RfValue(8),
    },
    xsl: {
      height: RfValue(108),
      width: RfValue(120),
    },
    pspxl: {
      height: RfValue(80),
      width: RfValue(80),
    },
    xxxl: {
      height: RfValue(138),
      width: RfValue(180),
    },
    xxxxl: {
      height: RfValue(183),
      width: RfValue(157),
    },
    xxxxxl: {
      height: RfValue(303),
      width: RfValue(257),
    },
  },

  spacing: {
    lg: RfValue(32),
    xlg: RfValue(48),
    md: RfValue(16),
    mmd: RfValue(20),
    none: 0,
    smd: RfValue(12),
    sm: RfValue(8),
    sml: RfValue(24),
    ss: RfValue(6),
    ssm: RfValue(8),
    xl: RfValue(64),
    xs: RfValue(4),
    xxl: RfValue(128),
    xxxl: RfValue(228),
    xxs: RfValue(2),
    xxxs: RfValue(1),
    rs: RfValue(-200),
    rlg: RfValue(-100),
    rr: RfValue(-30),
  },

  textInputSizes: {
    lg: {
      paddingHorizontal: 'lg',
      paddingVertical: 'lg',
    },
    md: {
      paddingHorizontal: 'md',
      paddingVertical: 'md',
    },
    none: {
      paddingHorizontal: 'none',
      paddingVertical: 'none',
    },
    sm: {
      paddingHorizontal: 'sm',
      paddingVertical: 'sm',
    },
    xl: {
      paddingHorizontal: 'xl',
      paddingVertical: 'xl',
    },
    xs: {
      paddingHorizontal: 'xs',
      paddingVertical: 'xs',
    },
  } as PaddingSizesObjectType,

  textInputVariants: {
    defaults: {
      borderRadius: 'sm',
      fontSize: RfValue(14),
    },
    filled: {
      backgroundColor: 'gray200',
      color: 'black',
    },
    none: {},
    outlined: {
      borderColor: 'gray200',
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  },

  textVariants: {
    body: {},
    bold8: {
      color: 'textColor',
      fontFamily: fontFamily.bold,
      fontSize: RfValue(8),
      lineHeight: RfValue(16),
    },
    bold10: {
      color: 'textColor',
      fontFamily: fontFamily.bold,
      fontSize: RfValue(10),
      lineHeight: RfValue(16),
    },
    bold12: {
      color: 'textColor',
      fontFamily: fontFamily.bold,
      fontSize: RfValue(14),
      lineHeight: RfValue(16),
    },
    bold14: {
      color: 'textColor',
      fontFamily: fontFamily.bold,
      fontSize: RfValue(14),
    },
    bold16: {
      fontFamily: fontFamily.bold,
      fontSize: RfValue(16),
    },
    bold18: {
      color: 'textColor',
      fontFamily: fontFamily.bold,
      fontSize: RfValue(18),
    },
    bold20: {
      color: 'textColor',
      fontFamily: fontFamily.bold,
      fontSize: RfValue(20),
    },
    bold22: {
      fontFamily: fontFamily.bold,
      fontSize: RfValue(22),
    },
    bold24: {
      fontFamily: fontFamily.bold,
      fontSize: RfValue(24),
    },
    bold32: {
      fontFamily: fontFamily.bold,
      fontSize: RfValue(32),
    },
    bold48: {
      fontFamily: fontFamily.bold,
      fontSize: RfValue(48),
    },
    defaults: {
      color: 'textColor',
      fontSize: RfValue(14),
      fontFamily: fontFamily.regular,
    },

    semiBold10: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(10),
      fontWeight: '600',
    },
    semiBold12: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(12),
      fontWeight: '600',
    },
    semiBold14: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(14),
      fontWeight: '600',
    },
    semiBold16: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(16),
      lineHeight: RfValue(20),
      fontWeight: '600',
    },
    semiBold18: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(18),
      fontWeight: '600',
    },
    semiBold22: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(22),
      fontWeight: '600',
    },
    semiBold24: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(24),
      fontWeight: '600',
    },
    semiBold28: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(28),
      fontWeight: '600',
    },
    semiBold8: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(8),
      fontWeight: '600',
    },

    medium10: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(10),
    },
    medium12: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(12),
    },
    medium14: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(14),
    },
    medium16: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(16),
      lineHeight: RfValue(20),
    },
    medium18: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(18),
    },
    medium22: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(22),
    },
    medium8: {
      color: 'textColor',
      fontFamily: fontFamily.medium,
      fontSize: RfValue(8),
    },
    none: {},
    regular9: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(9),
      lineHeight: RfValue(16),
    },
    regular10: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(10),
      lineHeight: RfValue(16),
    },
    regular12: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(12),
      lineHeight: RfValue(16),
    },
    regular14: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(14),
      lineHeight: RfValue(16),
    },
    regular16: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(16),
      lineHeight: RfValue(20),
    },
    regular18: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(18),
      lineHeight: RfValue(18),
    },
    regular22: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(22),
      lineHeight: RfValue(22),
    },
    regular24: {
      color: 'textColor',

      fontFamily: fontFamily.bold,
      fontSize: RfValue(24),
      lineHeight: RfValue(28),
    },
    regular8: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(8),
    },
    font10: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(10),
      lineHeight: RfValue(16),
    },
    font12: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(12),
    },
    font14: {
      color: 'textColor',
      fontFamily: fontFamily.regular,
      fontSize: RfValue(14),
    },
    font8: {
      fontFamily: fontFamily.regular,
      fontSize: RfValue(8),
    },
    title: {
      fontSize: RfValue(32),
      fontFamily: fontFamily.bold,
    },
  },

  zIndices: {
    modal: 100,
    overlay: 10,
  },
});

export type Theme = typeof lightTheme;

export const useTheme = () => useRestyleTheme<Theme>();

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    ...darkMode.colors,
  },
};

export default { darkTheme, lightTheme };
