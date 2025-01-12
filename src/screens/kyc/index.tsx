import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { Text } from '@/shared/components/Typography';
import StatusbarImageContainer from '@/shared/layout/StatusbarImageContainer';
import { Box } from '@/shared/components/Box';
import RfValue from '@/helpers/RfValue';
import { IconVector } from '@/assets/IconVector';
import { SvgIcon } from '@/assets/SvgIcon';
import { RootNavigationProps } from '@/navigations/types';
import TouchableOpacity from '@/shared/components/TouchableOpacity/TouchableOpacity';
import { Pressable } from '@/shared/components/Pressable';
import { SafeAreaView } from '@/shared/components/SafeAreaView';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { showMessage } from 'react-native-flash-message';
import { PrimaryButton } from '@/shared/components/Buttons/PrimaryButton';

const Kyc: FC<RootNavigationProps<'LoginScreen'>> = ({ navigation }) => {
  const [userType, SetUserType] = useState<'businessOwner' | 'individual'>(
    'businessOwner',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null,
  );

  const cameraPermission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  const photoLibraryPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  const checkAndRequestPermissions = async () => {
    try {
      const cameraStatus = await check(cameraPermission);
      if (cameraStatus === RESULTS.DENIED) {
        await request(cameraPermission);
      }

      const photoLibraryStatus = await check(photoLibraryPermission);
      if (photoLibraryStatus === RESULTS.DENIED) {
        await request(photoLibraryPermission);
      }

      if (
        cameraStatus === RESULTS.BLOCKED ||
        photoLibraryStatus === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Permission Denied',
          'Please enable camera and photo library permissions in your device settings.',
        );
      }
    } catch (error) {
      console.error('Error checking or requesting permissions:', error);
    }
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('DashboardScreen');
    }, 2000);
  };

  const handleImageUpload = async () => {
    await checkAndRequestPermissions();
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'No image selected',
          type: 'default',
        });
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setSelectedImage(source);
      }
    });
  };

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <StatusbarImageContainer
        activityLoading={false}
        hideBackButton
        backgroundColor="white">
        <ScrollView
          bounces={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Box paddingHorizontal="md" paddingTop="md">
            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="center">
              <IconVector
                height={RfValue(48)}
                name="logo"
                width={RfValue(48)}
              />
            </Box>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Box padding="sm" />

              <Box
                marginBottom="lg"
                justifyContent="center"
                alignItems="center">
                <Text marginBottom="sm" variant={'semiBold18'}>
                  Let’s Get to Know you Better
                </Text>
              </Box>

              <Box columnGap="md" flexDirection="row" alignItems="center">
                <Text variant="regular12">Set Up Profile</Text>
                <Text>{'>'}</Text>
                <Text variant="regular12" color="gray400">
                  Personal Details
                </Text>
                <Text variant="regular12" color="gray400">
                  {'>'}
                </Text>
                <SvgIcon name="checkCircle" size="mm" />
              </Box>

              <Box marginTop="lg">
                <Text variant="regular14" color="textColor" marginBottom="sm">
                  Upload your logo/personal branding
                </Text>
                <TouchableOpacity
                  marginTop="md"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={'blue50'}
                  width={'100%'}
                  borderWidth={2}
                  borderColor="primary"
                  borderStyle="dashed"
                  height={RfValue(111)}
                  onPress={handleImageUpload}>
                  {selectedImage ? (
                    <Image
                      source={{ uri: selectedImage }}
                      style={{ width: '100%', height: '100%', borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Box justifyContent="center" alignItems="center">
                      <SvgIcon name="imgPlus" size="lg" />
                      <Text color="gray400">Drag or select a file</Text>
                    </Box>
                  )}
                </TouchableOpacity>
                <Box marginTop="sm" justifyContent="center" alignItems="center">
                  <Text variant="regular12">Upload a logo</Text>
                  <Text variant="regular12" color="gray400">
                    PNG or JPG less than 20mb
                  </Text>
                </Box>
              </Box>
              <Box marginBottom="md" />
              <Box marginTop="md">
                <Text variant="regular14" color="textColor" marginBottom="lg">
                  How will you like to use your Lancebox?
                </Text>
                <Pressable
                  onPress={() => SetUserType('businessOwner')}
                  height={RfValue(78)}
                  borderWidth={1}
                  borderRadius="md"
                  borderColor={'gray200'}
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={
                    userType === 'businessOwner' ? 'secondary' : 'transparent'
                  }>
                  <Text
                    color={
                      userType === 'businessOwner' ? 'gray200' : 'textColor'
                    }>
                    As a Business Owner
                  </Text>
                </Pressable>

                <Box marginBottom="md" />

                <Pressable
                  onPress={() => SetUserType('individual')}
                  height={RfValue(78)}
                  borderWidth={1}
                  borderRadius="md"
                  borderColor={'gray200'}
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={
                    userType === 'individual' ? 'secondary' : 'transparent'
                  }>
                  <Text
                    color={userType === 'individual' ? 'gray200' : 'textColor'}>
                    As an Individual/Freelancer
                  </Text>
                </Pressable>
              </Box>

              <PrimaryButton
                borderRadius="lg"
                alignItems="center"
                backgroundColor="primary"
                isLoading={isLoading}
                justifyContent="center"
                label={'Proceed'}
                labelProps={{ color: 'black' }}
                labelVariant="medium14"
                loadingIconColor="black"
                marginBottom="sml"
                marginTop="lg"
                onPress={onSubmit}
                paddingVertical="mmd"
              />

              <TouchableOpacity>
                <Text
                  variant={'medium14'}
                  color="primary"
                  textDecorationLine={'underline'}
                  textAlign="center">
                  Skip for now
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Box>
        </ScrollView>
      </StatusbarImageContainer>
    </SafeAreaView>
  );
};
export default Kyc;
