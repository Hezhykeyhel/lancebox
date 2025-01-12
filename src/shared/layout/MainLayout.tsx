import { BackgroundColorProps } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import { PaletteType } from '../theme/palette';
import { IconProps } from '@/assets/IconVector';
import { Box } from '../components/Box';
import { BaseButton, BaseButtonProps } from '../components/Buttons/BaseButton';
import { Text, TextProps } from '../components/Typography';
import { SvgIcon } from '@/assets/SvgIcon';
import { useNavigation } from '@react-navigation/native';

interface Style {
  imageName?: number;
  children: ReactNode;
  moduleBackgorund?: PaletteType;
  backgroundColor?: BackgroundColorProps<Theme>['backgroundColor'];
  overlayIconName?: IconProps['name'];
  transparentInner?: boolean;
  bgColorInner?: PaletteType;
  extended?: boolean;
  extensionSize?: 'sm' | 'md';
  hasBottomButton?: boolean;
  bottomButtonPress?: () => void;
  backButtonPress?: () => void;
  bottomButtonText?: string;
  bottomButtonProps?: BaseButtonProps;
  bottomButtonTextProps?: TextProps;
  HeaderTitle: String;
  hideBackButton?: boolean;
}
const MainLayout = ({
  children,
  hideBackButton = false,
  backgroundColor = 'white',
  extended = false,
  bgColorInner = 'white',
  transparentInner = false,
  hasBottomButton = false,
  bottomButtonText = 'CONTINUE',
  bottomButtonProps,
  bottomButtonTextProps,
  bottomButtonPress = () => {},
  backButtonPress,
}: Style) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <Box backgroundColor={backgroundColor} flex={1}>
      <Box flex={1}>
        <Box height={insets.top} />
        <Box
          paddingBottom="lg"
          paddingHorizontal="md"
          flexDirection="row"
          justifyContent={'space-between'}
          alignItems="center">
          {!hideBackButton ? (
            <TouchableOpacity
              onPress={() => {
                if (backButtonPress) {
                  return backButtonPress();
                }
                return navigation.goBack();
              }}>
              <SvgIcon name="chevronleft" size="md" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SvgIcon name="bar" size="lg" />
            </TouchableOpacity>
          )}
        </Box>

        <Box flex={1}>
          <Box
            backgroundColor={transparentInner ? 'transparent' : bgColorInner}
            borderTopLeftRadius={extended ? 'none' : 'md'}
            borderTopRightRadius={extended ? 'none' : 'md'}
            flex={1}
            position="relative"
            paddingHorizontal="md"
            paddingBottom="lg">
            {children}
            {hasBottomButton && (
              <Box
                backgroundColor={transparentInner ? 'transparent' : 'white'}
                bottom={0}
                left={0}
                pb="sm"
                position="absolute"
                pt="xs"
                px="md"
                right={0}>
                <BaseButton
                  justifyContent="center"
                  onPress={bottomButtonPress}
                  size="md"
                  {...bottomButtonProps}>
                  {bottomButtonProps?.isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text
                      color="white"
                      variant="medium14"
                      {...bottomButtonTextProps}>
                      {bottomButtonText}
                    </Text>
                  )}
                </BaseButton>
                <Box height={insets.bottom} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
