/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';

import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';

import { Text } from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';
import { ScrollBox } from '@/shared/components/ScrollBox';
import SimpleInput from '@/shared/components/TextInput/SimpleInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Keyboard } from 'react-native';

interface ChangePasswordFormData {
  newPassword: string;
  confirmPassword: string;
  password: string;
}

const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Current password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    )
    .notOneOf(
      [yup.ref('password')],
      'New password must be different from current password',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

const ChangePassword: FC<AppNavigationProps<'ChangePassword'>> = ({
  navigation,
}) => {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    Keyboard.dismiss();

    setTimeout(() => {
      navigation.replace('AppStack');
    }, 2000);
  };

  return (
    <MainLayout
      hasBottomButton
      bottomButtonPress={() => handleSubmit(onSubmit)}
      bottomButtonText="Change password"
      HeaderTitle={'Change Password'}>
      <ScrollBox showsVerticalScrollIndicator={false}>
        <Box backgroundColor={'white'}>
          <Text variant="bold16">Change password</Text>
          <Text variant="regular14" marginTop="sm" color={'gray'}>
            Please note that your new password must be different from the
            previous one.
          </Text>
          <Box marginTop="lg" />
          <SimpleInput
            control={control}
            name="password"
            label={'Current Password'}
            isPassword
            isPasswordIconBlue
            error={errors.password?.message}
            borderColor="gray200"
            labelColor="black"
            inputProps={{
              placeholder: 'Enter here',
              placeholderTextColor: '#9ca3af',
              onBlur: () => trigger('password'),
            }}
          />
          <Box marginTop="md" />
          <SimpleInput
            control={control}
            name="password"
            label={'New Password'}
            isPassword
            isPasswordIconBlue
            error={errors.newPassword?.message}
            borderColor="gray200"
            labelColor="black"
            inputProps={{
              placeholder: 'Enter here',
              placeholderTextColor: '#9ca3af',
              onBlur: () => trigger('newPassword'),
            }}
          />
          <Box marginTop="md" />
          <SimpleInput
            control={control}
            name="password"
            label={'Confirm Password'}
            isPassword
            isPasswordIconBlue
            error={errors.confirmPassword?.message}
            borderColor="gray200"
            labelColor="black"
            inputProps={{
              placeholder: 'Enter here',
              placeholderTextColor: '#9ca3af',
              onBlur: () => trigger('confirmPassword'),
            }}
          />
          <Box marginTop="md" />
          {/* <PrimaryButton
              alignItems="center"
              backgroundColor="white"
              isLoading={isLoading}
              justifyContent="center"
              label={t('auth.login')}
              labelProps={{color: 'primary'}}
              labelVariant="medium14"
              loadingIconColor="black"
              marginBottom="sml"
              marginTop="sm"
              onPress={}
              paddingVertical="mmd"
            /> */}
        </Box>
      </ScrollBox>
    </MainLayout>
  );
};

export default ChangePassword;
