import React, { FC } from 'react';
// Assuming the previous types are in a separate file
import { Box } from '../Box';
import { Text } from '../Typography';
import { BidInfo } from '../../../mock';
import { height, verticalScale } from '@/shared/theme';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import Animated, { Easing, FadeInUp } from 'react-native-reanimated';

export interface BidInfoCardProps {
  bidInfo: BidInfo;
  handleUpdate?: (bidInfo: BidInfo) => void;
  isUpdateButton?: boolean;
}

const OfferCreatedCard: FC<BidInfoCardProps> = ({
  bidInfo,
  isUpdateButton,
  handleUpdate,
}) => {
  return (
    <Animated.View
      key={bidInfo.bidReference}
      entering={FadeInUp.duration(400)
        .delay(200)
        .easing(Easing.inOut(Easing.ease))}>
      <Box
        key={bidInfo.bidReference}
        marginTop="md"
        width={'100%'}
        height={verticalScale(height * 0.2)}
        flexWrap={'wrap'}
        padding="md"
        borderWidth={1}
        borderColor="gray200"
        borderRadius="md"
        columnGap="md">
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Bid reference</Text>
          <Text variant={'bold14'}>{bidInfo.bidReference}</Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Split purchase</Text>
          <Text variant={'bold14'}>{bidInfo.splitPurchase}</Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Min. bid value</Text>
          <Text variant={'bold14'}>{bidInfo.minBidValue.toLocaleString()}</Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Close time</Text>
          <Text variant={'bold14'}>{bidInfo.closeTime}</Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Current max. bid</Text>
          <Text variant={'bold14'}>
            {bidInfo.currentMaxBid.toLocaleString()}
          </Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Max. bid value</Text>
          <Text variant={'bold14'}>{bidInfo.maxBidValue.toLocaleString()}</Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Amount ($)</Text>
          <Text variant={'bold14'}>{bidInfo.amount.toLocaleString()}</Text>
        </Box>
        <Box width={'32%'} height={'33%'}>
          <Text variant="regular14">Status</Text>

          <Text
            variant={'semiBold16'}
            color={
              bidInfo.status === 'Purchased'
                ? 'green800'
                : bidInfo.status === 'Redeemed'
                ? 'black'
                : 'orange800'
            }>
            {bidInfo.status}
          </Text>
        </Box>
        {isUpdateButton && handleUpdate && (
          <Box width={'32%'} height={'33%'} pr="sm">
            <PrimaryButton
              labelProps={{
                color: 'white',
                textAlign: 'center',
              }}
              borderRadius={'xs'}
              justifyContent="center"
              alignItems="center"
              paddingVertical="sm"
              label={'Update offer'}
              onPress={() => handleUpdate(bidInfo)}
            />
          </Box>
        )}
      </Box>
    </Animated.View>
  );
};

export default OfferCreatedCard;
