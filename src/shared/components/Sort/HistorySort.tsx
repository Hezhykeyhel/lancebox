import { SvgIcon } from '@/assets/SvgIcon';
import { Box } from '@/shared/components/Box';
import TouchableOpacity from '@/shared/components/TouchableOpacity/TouchableOpacity';
import { Text } from '@/shared/components/Typography';

import { horizontalScale } from '@/shared/theme';
import React, { useState } from 'react';

import Popover from 'react-native-popover-view';

type SortOption = 'closeTime' | 'status' | 'amount' | 'bidReference';

interface SortPopoverProps {
  onSort: (sortBy: SortOption) => void;
}

const SortPopover: React.FC<SortPopoverProps> = ({ onSort }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('bidReference');

  const handleSortChange = (value: SortOption) => {
    setSelectedSort(value);
    onSort(value);
    setIsVisible(false);
  };

  return (
    <Popover
      popoverStyle={{ borderRadius: 8, backgroundColor: 'white' }}
      isVisible={isVisible}
      from={
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          backgroundColor={'blue100'}
          borderRadius={'xl'}
          justifyContent="center"
          alignItems="center"
          padding="sm">
          <SvgIcon name="fliterBlue" size="mm" />
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
          <Text variant="regular16">Filter By:</Text>
        </Box>
        <TouchableOpacity
          borderBottomWidth={1}
          borderBottomColor={'gray100'}
          paddingHorizontal="md"
          paddingVertical="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}
          onPress={() => handleSortChange('amount')}>
          <Text variant="regular16">Amount</Text>
          <SvgIcon
            name={selectedSort === 'amount' ? 'checkCircle' : 'circle'}
            size="mm"
          />
        </TouchableOpacity>
        <TouchableOpacity
          borderBottomWidth={1}
          borderBottomColor={'gray100'}
          paddingHorizontal="md"
          paddingVertical="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}
          onPress={() => handleSortChange('status')}>
          <Text variant="regular16">Status</Text>
          <SvgIcon
            name={selectedSort === 'status' ? 'checkCircle' : 'circle'}
            size="mm"
          />
        </TouchableOpacity>
        <TouchableOpacity
          paddingHorizontal="md"
          paddingTop="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}
          onPress={() => handleSortChange('closeTime')}>
          <Text variant="regular16">Closing Time</Text>
          <SvgIcon
            name={selectedSort === 'closeTime' ? 'checkCircle' : 'circle'}
            size="mm"
          />
        </TouchableOpacity>
      </Box>
    </Popover>
  );
};

export default SortPopover;
