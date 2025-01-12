import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
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
import React, { ComponentProps, VFC } from "react";
import { SafeAreaView as ReactSafeAreaView } from "react-native-safe-area-context";

import { Theme } from "@/shared/theme";

type RestyleProps = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ComponentProps<typeof ReactSafeAreaView>;

export type SafeAreaViewProps = RestyleProps;

const Card = createRestyleComponent<RestyleProps, Theme>(
  [
    backgroundColor,
    opacity,
    visible,
    shadow,
    position,
    layout,
    spacing,
    border,
  ],
  ReactSafeAreaView,
);

const SafeAreaView: VFC<SafeAreaViewProps> = props => <Card {...props} />;

export { SafeAreaView };
