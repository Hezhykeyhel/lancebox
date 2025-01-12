import { createBox } from "@shopify/restyle";
import { ScrollView as NativeScrollView } from "react-native";

import { Theme } from "@/shared/theme";

const ScrollBox = createBox<
  Theme,
  React.ComponentProps<typeof NativeScrollView> & { children?: React.ReactNode }
>(NativeScrollView);

export type ScrollBoxProps = React.ComponentProps<typeof ScrollBox>;

export { ScrollBox };
