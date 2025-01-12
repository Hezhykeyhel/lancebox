import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';

import { ScrollBox } from '@/shared/components/ScrollBox';
import { Text } from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';

import React, { FC } from 'react';

const ReceiptScreen: FC<AppNavigationProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  return (
    <MainLayout hideBackButton HeaderTitle={'Dashboard'}>
      <ScrollBox showsVerticalScrollIndicator={false}>
        <Box>
          <Text variant="bold16">Receipts</Text>
          <Text variant="regular14" marginTop="sm" color={'gray'}>
            View All Receipts
          </Text>
        </Box>
      </ScrollBox>
    </MainLayout>
  );
};

export default ReceiptScreen;
