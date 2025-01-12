import { comingSoon } from '@/assets/lottie';

import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';
import { Text } from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';
import LottieView from 'lottie-react-native';
import React, { FC } from 'react';

const ProfileScreen: FC<AppNavigationProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  return (
    <MainLayout hideBackButton HeaderTitle={'Dashboard'}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <LottieView
          style={{ width: 150, height: 150, marginTop: -100 }}
          source={comingSoon}
          autoPlay
          loop
        />
        <Text variant="bold12" marginTop="lg">
          Profile feature is coming soon
        </Text>
      </Box>
    </MainLayout>
  );
};

export default ProfileScreen;
