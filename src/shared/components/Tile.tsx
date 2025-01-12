import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Text, TextProps } from "@/shared/components/Typography";
import { PaletteType } from "@/shared/theme/palette";
import RfValue from "@/helpers/RfValue";
import { Box, BoxProps } from "./Box";
import { SvgIconPackType } from "@/assets/svgIconPack";
import { SvgIcon } from "@/assets/SvgIcon";

export interface TileTypes {
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  rightIconName?: SvgIconPackType;
  leftIconSvg?: SvgIconPackType;
  disableRightIcon?: boolean;
  title: string;
  titleVariant?: TextProps["variant"];
  titleStyle?: TextProps;
  subtitleVariant?: TextProps["variant"];
  subtitle?: string;
  rightSideSubtitle?: string;
  rightSideSubtitleVariant?: TextProps["variant"];
  backgroundColor?: PaletteType;
  marginHorizontal?: any;
  marginVertical?: any;
  borderRadius?: any;
  titleColor?: PaletteType;
  subtitleColor?: PaletteType;
  tileContainerStyle?: BoxProps;
  leftIconColor?: PaletteType;
  rightIconColor?: PaletteType;
  rightIconSize?:
    | "lg"
    | "sml"
    | "md"
    | "sm"
    | "xl"
    | "xs"
    | "s"
    | "m"
    | undefined;
  leftIconSvgSize?:
    | "lg"
    | "sml"
    | "md"
    | "sm"
    | "xl"
    | "xs"
    | "s"
    | "m"
    | undefined;
  leftComponent?: JSX.Element | JSX.Element[];
}

const Tile = ({
  onPress = () => {},

  title = "Title",
  subtitle,
  subtitleVariant = "regular10",
  rightSideSubtitle,
  rightSideSubtitleVariant = "regular10",
  titleVariant = "regular16",
  disableRightIcon,
  marginHorizontal,
  marginVertical,
  backgroundColor = "white",
  titleColor = "textColor",
  subtitleColor = "textColor",
  tileContainerStyle,
  leftIconSvgSize,
  leftIconSvg,
  borderRadius,
  titleStyle,
  leftIconColor = "black",
  rightIconSize,
  leftComponent,
  isLoading,
  disabled,
}: TileTypes) => {
  return (
    <Pressable
      alignItems="center"
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      disabled={disabled}
      flexDirection="row"
      justifyContent="space-between"
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      onPress={onPress}
      paddingVertical={tileContainerStyle?.paddingVertical ?? "md"}
      {...tileContainerStyle}>
      <Box alignItems="center" flexDirection="row">
        {leftIconSvg && (
          <Box
            alignItems="center"
            justifyContent="center"
            paddingLeft="md"
            width={RfValue(50)}>
            <SvgIcon
              color={leftIconColor}
              name={leftIconSvg}
              size={leftIconSvgSize}
            />
          </Box>
        )}
        {leftComponent}
        <Box paddingHorizontal="md">
          <Box>
            <Text
              color={titleColor}
              numberOfLines={1}
              variant={titleVariant}
              {...titleStyle}
              style={{
                color: titleColor || "#00727D",
              }}>
              {title}
            </Text>
          </Box>
          <Box>
            {subtitle && (
              <Text color={subtitleColor} variant={subtitleVariant}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        {rightSideSubtitle && (
          <Text color={subtitleColor} variant={rightSideSubtitleVariant}>
            {rightSideSubtitle}
          </Text>
        )}
      </Box>
      {!disableRightIcon && (
        <Box marginRight="xs" padding="sm">
          {isLoading ? (
            <ActivityIndicator color="black" size="small" />
          ) : (
            <SvgIcon name="chevronright" size={rightIconSize ?? "sm"} />
          )}
        </Box>
      )}
    </Pressable>
  );
};

export default Tile;
