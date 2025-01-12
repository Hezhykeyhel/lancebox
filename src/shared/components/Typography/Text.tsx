import { createText } from "@shopify/restyle";
import { ComponentProps, FC } from "react";

import { Theme } from "@/shared/theme";

/**
 * Custom `Text` component with type checked layout stylings and props including typography.
 * All styles can be passed as props rather than using the StyleSheet API, and we can select a variant with predefined styles.
 *
 * Includes all the props that are available in the native `Text` component.
 * Fully themeable.
 * @see https://github.com/Shopify/restyle#text
 */
const RestyleText = createText<Theme>();

export type RestyleTextProps = ComponentProps<typeof RestyleText>;

export type TextProps = RestyleTextProps & {
  fontVariant?: keyof Theme["fontSizes"];
};

const Text: FC<TextProps> = props => {
  const { children, variant = "body", color = "textColor", ...rest } = props;

  // const theme = useTheme();

  // const deviceFontScale = Number(useWindowDimensions().fontScale.toFixed(1));
  // RestyleText.defaultProps = Text.defaultProps || {};
  // RestyleText.defaultProps.maxFontSizeMultiplier =
  //   deviceFontScale >= 1.4 ? 1.2 : deviceFontScale >= 1.2 ? 1.1 : 1;
  return (
    <RestyleText
      allowFontScaling={false}
      variant={variant}
      {...rest}
      color={color}>
      {children}
    </RestyleText>
  );
};
export { Text };
