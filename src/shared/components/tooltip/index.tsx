import { SvgIcon } from '@/assets/SvgIcon';
import { Box } from '@/shared/components/Box';
import { TouchableOpacity } from '@/shared/components/TouchableOpacity';
import { Text } from '@/shared/components/Typography';

import { horizontalScale } from '@/shared/theme';
import React, { useState } from 'react';

import Popover from 'react-native-popover-view';

interface tooltipProps {
  text: string;
  title?: string;
}

const Tooltip: React.FC<tooltipProps> = (props: tooltipProps) => {
  const { text, title } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Popover
      popoverStyle={{ borderRadius: 8, backgroundColor: 'white' }}
      isVisible={isVisible}
      from={
        <TouchableOpacity
          onPress={toggleTooltip}
          flexDirection="row"
          alignItems="center"
          columnGap="sm">
          {title && (
            <Text variant="regular14" color="primary">
              {title}
            </Text>
          )}
          <SvgIcon name={isVisible ? 'infoSolid' : 'infoOutline'} size="mm" />
        </TouchableOpacity>
      }
      onRequestClose={() => setIsVisible(false)}>
      <Box width={horizontalScale(200)} paddingVertical="md">
        <Box
          borderBottomWidth={1}
          borderBottomColor={'gray100'}
          paddingHorizontal="md"
          paddingBottom="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}>
          <Text variant="regular16">{text}</Text>
        </Box>
      </Box>
    </Popover>
  );
};

export default Tooltip;
