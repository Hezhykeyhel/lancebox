import React, { FC } from 'react';

import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';
import MainLayout from '@/shared/layout/MainLayout';
import LottieView from 'lottie-react-native';
import { comingSoon } from '@/assets/lottie';
import { Text } from '@/shared/components/Typography';

const Settings: FC<AppNavigationProps<'Settings'>> = ({ navigation }) => {
  return (
    <MainLayout hideBackButton HeaderTitle="Profile">
      <Box flex={1} alignItems="center" justifyContent="center">
        <LottieView
          style={{ width: 150, height: 150, marginTop: -100 }}
          source={comingSoon}
          autoPlay
          loop
        />
        <Text variant="bold12" marginTop="lg">
          Settings feature is coming soon
        </Text>
      </Box>
    </MainLayout>
  );
};

export default Settings;
``;
