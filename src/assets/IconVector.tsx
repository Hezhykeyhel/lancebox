import { VFC } from "react";

import { svgIconPack } from "@/assets/svgIconPack";
import { Box, BoxProps } from "@/shared/components/Box";
import { SvgIcon, SvgIconProps } from "./SvgIcon";

export type IconProps = SvgIconProps & {
  containerProps?: BoxProps;
};
const IconVector: VFC<IconProps> = ({
  containerProps,
  name,
  color = "whiteColor",
  ...rest
}) =>
  name in svgIconPack ? (
    <Box {...containerProps}>
      <SvgIcon color={color} name={name} size={rest?.size ?? "sm"} {...rest} />
    </Box>
  ) : (
    <Box {...containerProps} height={24} width={24} />
  );

export { IconVector };
