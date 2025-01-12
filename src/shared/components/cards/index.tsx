import React, { FC } from 'react';
import { Box } from '../Box';
import { Text } from '../Typography';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { BidInfo } from '../../../mock';
import { height } from '@/shared/theme';
import RfValue from '@/helpers/RfValue';

// New interface for the component props
export interface BidInfoCardProps {
  bidInfo: BidInfo;
  handleInitiate: (bidInfo: BidInfo) => void;
}

const BidInfoCard: FC<BidInfoCardProps> = ({ bidInfo, handleInitiate }) => {
  return (
    <Box
      key={bidInfo.bidReference}
      marginTop="md"
      width={'100%'}
      height={RfValue(height * 0.24)}
      flexWrap={'wrap'}
      padding="md"
      borderWidth={1}
      borderColor="gray200"
      borderRadius="md">
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Bid reference</Text>
        <Text variant={'bold14'}>{bidInfo.bidReference}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Split purchase</Text>
        <Text variant={'bold14'}>{bidInfo.splitPurchase}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Min. bid value</Text>
        <Text variant={'bold14'}>{bidInfo.minBidValue.toLocaleString()}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Close time</Text>
        <Text variant={'bold14'}>{bidInfo.closeTime}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Current max. bid</Text>
        <Text variant={'bold14'}>{bidInfo.currentMaxBid.toLocaleString()}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Max. bid value</Text>
        <Text variant={'bold14'}>{bidInfo.maxBidValue.toLocaleString()}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <Text variant="regular14">Amount ($)</Text>
        <Text variant={'bold14'}>{bidInfo.amount.toLocaleString()}</Text>
      </Box>
      <Box width={'33%'} height={'33%'}>
        <PrimaryButton
          labelProps={{
            color: 'white',
            textAlign: 'center',
          }}
          borderRadius={'xs'}
          justifyContent="center"
          alignItems="center"
          paddingVertical="sm"
          label={'Initiate'}
          onPress={() => handleInitiate(bidInfo)}
        />
      </Box>
    </Box>
  );
};

export default BidInfoCard;
