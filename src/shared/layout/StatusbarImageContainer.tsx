import { BackgroundColorProps } from '@shopify/restyle';
import React, { ReactNode } from 'react';

// import { IconProps, IconVector } from "../assets/icons/IconVector";
import { Theme } from '../theme';
import { PaletteType } from '../theme/palette';

import { IconProps } from '@/assets/IconVector';
import { Box } from '../components/Box';
import { TouchableOpacity } from '../components/TouchableOpacity';
import { SvgIcon } from '@/assets/SvgIcon';
import RfValue from '@/helpers/RfValue';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/Typography';
import Loader from '../components/Loading/loading';

interface Style {
  imageName?: number;
  children: ReactNode;
  moduleBackgorund?: PaletteType;
  backgroundColor?: BackgroundColorProps<Theme>['backgroundColor'];
  overlayIconName?: IconProps['name'];
  hideBackButton?: boolean;
  activityLoading?: boolean;
}
const StatusbarImageContainer = ({
  children,
  backgroundColor = 'white',
  hideBackButton,
  activityLoading,
}: Style) => {
  const navigation = useNavigation();
  return (
    <Box backgroundColor={backgroundColor} flex={1} paddingHorizontal="sm">
      {hideBackButton && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          flexDirection="row"
          alignItems="center"
          columnGap="sm"
          style={{
            paddingRight: RfValue(16),
            paddingLeft: RfValue(4),
          }}>
          <SvgIcon name="chevronleft" size="md" color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
      )}
      {children}
      {activityLoading && <Loader visible={activityLoading} />}
    </Box>
  );
};

export default StatusbarImageContainer;
