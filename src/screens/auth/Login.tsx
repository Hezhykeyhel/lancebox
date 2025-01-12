import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text } from '@/shared/components/Typography';
import StatusbarImageContainer from '@/shared/layout/StatusbarImageContainer';
import { Box } from '@/shared/components/Box';
import RfValue from '@/helpers/RfValue';
import { IconVector } from '@/assets/IconVector';
import SimpleInput from '@/shared/components/TextInput/SimpleInput';
import { useForm } from 'react-hook-form';
import { SvgIcon } from '@/assets/SvgIcon';
import { PrimaryButton } from '@/shared/components/Buttons/PrimaryButton';

import { RootNavigationProps } from '@/navigations/types';

interface LoginFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Signup: FC<RootNavigationProps<'LoginScreen'>> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const onSubmit = (data: LoginFormData) => {
    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Kyc');
    }, 2000);
  };

  return (
    <StatusbarImageContainer backgroundColor="white">
      <ScrollView
        // style={{height: '100%'}}
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="md" paddingTop="md">
          <Box alignItems="center" flexDirection="row" justifyContent="center">
            <IconVector height={RfValue(48)} name="logo" width={RfValue(48)} />
          </Box>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Box padding="sm" />

            <Box marginBottom="lg" justifyContent="center" alignItems="center">
              <Text marginBottom="sm" variant={'semiBold18'}>
                Looks like you’re new here!
              </Text>
              <Text variant={'medium18'}>Let’s create your account</Text>
            </Box>

            <Box>
              <Text variant="regular14" color="textColor" marginBottom="sm">
                Email Addrress
              </Text>
              <SimpleInput
                control={control}
                name="email"
                label={'Username'}
                error={errors.email?.message}
                inputProps={{
                  placeholder: 'Peter@gmail.com',
                  placeholderTextColor: '#9ca3af',
                  onBlur: () => trigger('email'),
                }}
              />
            </Box>
            <Box marginBottom="md" />
            <Box>
              <Text variant="regular14" color="textColor" marginBottom="sm">
                Password
              </Text>
              <SimpleInput
                control={control}
                name="password"
                label={'Password'}
                isPassword
                error={errors.password?.message}
                inputProps={{
                  placeholder: 'Enter password',
                  placeholderTextColor: '#9ca3af',
                  onBlur: () => trigger('password'),
                }}
              />
            </Box>
            <Box marginBottom="md" />
            <Box>
              <Text variant="regular14" color="textColor" marginBottom="sm">
                Confirm Password
              </Text>
              <SimpleInput
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                isPassword
                error={errors.confirmPassword?.message}
                inputProps={{
                  placeholder: 'Confirm password',
                  placeholderTextColor: '#9ca3af',
                  onBlur: () => trigger('confirmPassword'),
                }}
              />
            </Box>

            <PrimaryButton
              borderRadius="lg"
              alignItems="center"
              backgroundColor="primary"
              isLoading={isLoading}
              justifyContent="center"
              label="Sign Up"
              labelProps={{ color: 'black' }}
              labelVariant="medium14"
              loadingIconColor="black"
              marginBottom="sml"
              marginTop="lg"
              onPress={handleSubmit(onSubmit)}
              paddingVertical="mmd"
            />

            <Box>
              <Text textAlign="center">Or</Text>

              <Box
                flexDirection="row"
                columnGap="md"
                justifyContent="center"
                alignItems="center">
                <SvgIcon name={'google'} size="xl" />
                <SvgIcon name={'facebook'} size="xl" />
              </Box>
            </Box>
            <Box marginTop="md" paddingHorizontal="lg">
              <Text
                lineHeight={RfValue(23)}
                variant="regular14"
                textAlign="center">
                By checking this box, I accept the{' '}
                <Text color={'secondary'} variant={'semiBold14'}>
                  Terms and Conditions{' '}
                </Text>
                for the use of this platform.
              </Text>
            </Box>
          </KeyboardAvoidingView>
        </Box>
      </ScrollView>
    </StatusbarImageContainer>
  );
};

export default Signup;
