import {
  backgroundColor,
  border,
  createRestyleComponent,
  createVariant,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  VariantProps,
  visible,
} from '@shopify/restyle';
import { FC, ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Theme, useTheme } from '@/shared/theme';
import { Box, BoxProps } from '../Box';
import { SvgIconPackType } from '@/assets/svgIconPack';
import { Icon, SvgIconProps } from '@/assets/SvgIcon';

type RestyleProps = BoxProps & VariantProps<Theme, 'buttonVariants'>;

export type BaseButtonProps = RestyleProps & {
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  touchableOpacityProps?: TouchableOpacityProps;
  size?: keyof Theme['buttonSizes'];
  id?: number;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  leftIcon?: SvgIconPackType;
  rightIcon?: SvgIconPackType;
  leftIconProps?: Omit<SvgIconProps, 'name'>;
  rightIconProps?: Omit<SvgIconProps, 'name'>;
};

const cardVariant = createVariant<Theme, 'buttonVariants'>({
  themeKey: 'buttonVariants',
});

const ButtonCard = createRestyleComponent<RestyleProps, Theme>(
  [
    backgroundColor,
    opacity,
    visible,
    shadow,
    position,
    layout,
    spacing,
    border,
    cardVariant,
  ],
  Box,
);

const BaseButton: FC<BaseButtonProps> = props => {
  const {
    onPress,
    disabled,
    touchableOpacityProps,
    children,
    leftComponent,
    rightComponent,
    leftIcon,
    rightIcon,
    leftIconProps,
    rightIconProps,
    variant = 'filled',
    size = 'xs',
    ...rest
  } = props;

  const theme = useTheme();

  const buttonSizeValues = theme.buttonSizes[size];

  const disabledOpacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      onPress={onPress}
      {...touchableOpacityProps}>
      <ButtonCard
        alignItems="center"
        flexDirection="row"
        opacity={disabledOpacity}
        variant={variant}
        {...buttonSizeValues}
        {...rest}>
        {leftComponent ?? null}
        {leftIcon ? (
          <Icon size="md" name={leftIcon} {...leftIconProps} />
        ) : null}
        {children}
        {rightIcon ? (
          <Icon size="md" name={rightIcon} {...rightIconProps} />
        ) : null}
        {rightComponent ?? null}
      </ButtonCard>
    </TouchableOpacity>
  );
};

export { BaseButton };
