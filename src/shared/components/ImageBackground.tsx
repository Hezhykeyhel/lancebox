import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  visible,
  VisibleProps,
} from "@shopify/restyle";
import React, { FC } from "react";
import {
  ImageBackground as ReactImageBackground,
  ImageBackgroundProps as ReactImageBackgroundProps,
} from "react-native";

import { Theme } from "@/shared/theme";

type RestyleProps = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  ReactImageBackgroundProps;

export type ImageBackgroundProps = RestyleProps;

const Card = createRestyleComponent<RestyleProps, Theme>(
  [backgroundColor, opacity, visible, shadow, position, layout, spacing],
  ReactImageBackground,
);

const ImageBackground: FC<ImageBackgroundProps> = props => (
  <Card resizeMode="cover" {...props} />
);

export { ImageBackground };
