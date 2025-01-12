import { SvgIcon } from '@/assets/SvgIcon';
import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';
import { Text } from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';

import React, { FC } from 'react';
import { verticalScale } from '@/shared/theme';
import { TouchableOpacity } from '@/shared/components/TouchableOpacity';
import { Image } from '@/shared/components/Image';
import { placeholder } from '@/assets/pngImagePack';
import { ScrollView } from 'react-native';

const DashboardScreen: FC<AppNavigationProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  return (
    <MainLayout hideBackButton HeaderTitle={'Dashboard'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Text variant="bold16">Welcome Subomi!</Text>
          <Text variant="regular14" marginTop="sm" color="gray">
            What will you like to do now?
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingTop="lg">
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewInvoice')}
            height={verticalScale(124)}
            backgroundColor="secondary"
            width="48%"
            padding="md"
            borderRadius="sm">
            <SvgIcon name="plus" size="mm" />
            <Text variant="semiBold14" color="white" marginTop="md">
              New Invoice
            </Text>
            <Text variant="regular14" color="white" marginTop="sm">
              Create a quick Invoice to send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            height={verticalScale(124)}
            backgroundColor="tertiary"
            width="48%"
            paddingHorizontal="md"
            paddingVertical="mmd"
            borderRadius="sm"
            justifyContent="space-between">
            <Text variant="semiBold14" color="secondary">
              Invoices created
            </Text>
            <Text variant="semiBold18" color="secondary">
              0
            </Text>

            <Text
              variant="semiBold14"
              textDecorationLine={'underline'}
              color="secondary">
              View All
            </Text>
          </TouchableOpacity>
        </Box>
        <Box marginTop="lg">
          <Text variant="semiBold18">Past Invoices</Text>
          <Box marginTop="sm" justifyContent="center" alignItems="center">
            <Image
              width={'70%'}
              source={placeholder}
              height={verticalScale(220)}
              resizeMode="contain"
            />
            <Text
              variant="regular14"
              marginTop="lg"
              color={'textColor'}
              lineHeight={24}
              textAlign="center">
              You don’t have any Invoice history yet. Click the button below to
              Create your first invoice
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

export default DashboardScreen;
