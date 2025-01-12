/* eslint-disable react-native/no-inline-styles */
import RfValue from '@/helpers/RfValue';
import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';
import { ScrollBox } from '@/shared/components/ScrollBox';
import Tile from '@/shared/components/Tile';
import { Text } from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';
import React, { FC } from 'react';

const SettingScreen: FC<AppNavigationProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  return (
    <MainLayout hideBackButton HeaderTitle={'Dashboard'}>
      <ScrollBox showsVerticalScrollIndicator={false}>
        <Box>
          <Text variant="bold16">Settings</Text>
          <Text variant="regular14" marginTop="sm" color={'gray'}>
            Manage your experiences here
          </Text>
          <Box marginTop="lg" />
          <Tile
            backgroundColor="white"
            leftIconColor="white"
            leftIconSvgSize="lg"
            onPress={() => {}}
            tileContainerStyle={{
              marginHorizontal: 'md',
              marginBottom: 'md',
              borderRadius: 'mmd',
              borderWidth: 1.5,
              borderColor: 'transparent',
              backgroundColor: 'white',
              paddingRight: 'sm',

              style: {
                borderWidth: 1,
                borderColor: '#E3E6EA',
                borderRadius: RfValue(10),
                paddingVertical: RfValue(15),
              },
            }}
            title="Change Location"
            titleColor="black"
            titleStyle={{
              lineHeight: RfValue(25),
            }}
            titleVariant="medium14"
          />
          <Box marginTop="md" />
          <Tile
            backgroundColor="white"
            leftIconColor="white"
            leftIconSvgSize="lg"
            onPress={() => {}}
            tileContainerStyle={{
              marginHorizontal: 'md',
              marginBottom: 'md',
              borderRadius: 'mmd',
              borderWidth: 1.5,
              borderColor: 'transparent',
              backgroundColor: 'white',
              paddingRight: 'sm',

              style: {
                borderWidth: 1,
                borderColor: '#E3E6EA',
                borderRadius: RfValue(10),
                paddingVertical: RfValue(15),
              },
            }}
            title="Add Another Profile"
            titleColor="black"
            titleStyle={{
              lineHeight: RfValue(25),
            }}
            titleVariant="medium14"
          />
          <Box marginTop="md" />
          <Tile
            backgroundColor="white"
            leftIconColor="white"
            leftIconSvgSize="lg"
            onPress={() => {}}
            tileContainerStyle={{
              marginHorizontal: 'md',
              marginBottom: 'md',
              borderRadius: 'mmd',
              borderWidth: 1.5,
              borderColor: 'transparent',
              backgroundColor: 'white',
              paddingRight: 'sm',

              style: {
                borderWidth: 1,
                borderColor: '#E3E6EA',
                borderRadius: RfValue(10),
                paddingVertical: RfValue(15),
              },
            }}
            title="Dectivate Accounts"
            titleColor="black"
            titleStyle={{
              lineHeight: RfValue(25),
            }}
            titleVariant="medium14"
          />
        </Box>
      </ScrollBox>
    </MainLayout>
  );
};

export default SettingScreen;
