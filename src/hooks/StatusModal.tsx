/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconVector } from '@/assets/IconVector';
import { Box } from '@/shared/components/Box';
import { BaseButton } from '@/shared/components/Buttons/BaseButton';
import { Image } from '@/shared/components/Image';
import { Pressable } from '@/shared/components/Pressable';
import { Text } from '@/shared/components/Typography';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { RefObject, useMemo } from 'react';

type StatusModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  buttonLabel?: string;
  receiptLabel?: string;
  onProceed: () => void;
  transactionStatus?: 'success' | 'failure' | 'warning';
  generateReceipt?: () => void;
  hasReceipt?: boolean;
  title: string;
  loading?: boolean;
  receiptLoading?: boolean;
  message: string;
  image?: number;
  loginRetry?: boolean;
};
const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} opacity={0.5} pressBehavior="none" />
);

const StatusModal = (props: StatusModalProps) => {
  const {
    bottomSheetModalRef,
    title = 'Failure',
    buttonLabel = 'Return to Dashboard',
    onProceed,
    loginRetry = false,
    receiptLabel = 'Share Receipt',
    generateReceipt,
    transactionStatus = 'success',
    receiptLoading = false,
    hasReceipt = false,
    message = 'Unable to process your request',
    loading,
  } = props;

  const snapPoints = useMemo(() => ['45%', '45%'], []);
  const snapPointsBig = useMemo(() => ['50%', '50%'], []);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      enableContentPanningGesture={false}
      enableDismissOnClose
      enableHandlePanningGesture={false}
      keyboardBehavior="interactive"
      ref={bottomSheetModalRef}
      snapPoints={
        loginRetry || message?.length > 60
          ? snapPointsBig
          : message?.length < 60
          ? snapPoints
          : hasReceipt
          ? snapPointsBig
          : snapPoints
      }>
      {transactionStatus === 'failure' || transactionStatus === 'warning' ? (
        <Box flex={1}>
          <Box flex={1}>
            <Pressable
              marginHorizontal="md"
              onPress={() => bottomSheetModalRef?.current?.dismiss()}
              alignItems="flex-end">
              <IconVector name="xclose" size="md" />
            </Pressable>
            <Box paddingHorizontal="sm" alignItems="center" marginTop="lg">
              {/* <Image
                source={transactionStatus === 'failure' ? r : warningFlag}
                resizeMode="contain"
                width={50}
                height={50}
              /> */}
              <Text mb="xs" textAlign="center" mt="md" variant="bold16">
                {title}
              </Text>
              <Text
                color="textColor"
                textAlign="center"
                paddingHorizontal="md"
                marginVertical="xs"
                variant="regular14">
                {message}
              </Text>
            </Box>
          </Box>
          {loginRetry ? (
            <Box padding="md" flexDirection="column">
              <BaseButton
                disabled={loading}
                isLoading={loading}
                label={buttonLabel}
                labelProps={{
                  color: 'white',
                }}
                onPress={onProceed}
              />
              <BaseButton
                disabled={loading}
                isLoading={loading}
                label="Try Logging In"
                labelProps={{
                  color: 'primary',
                }}
                backgroundColor="white"
                borderWidth={1}
                borderColor="primary"
                marginVertical="sm"
                onPress={() => bottomSheetModalRef?.current?.dismiss()}
              />
            </Box>
          ) : (
            <Box padding="md" flexDirection="column">
              <BaseButton
                disabled={loading}
                isLoading={loading}
                label={buttonLabel}
                labelProps={{
                  color: 'white',
                }}
                marginVertical="sm"
                onPress={onProceed}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box flex={1}>
          <Box flex={1}>
            <Box paddingHorizontal="sm" alignItems="center" marginTop="lg">
              {/* <Image
                source={successFlag}
                resizeMode="contain"
                width={100}
                height={100}
              /> */}
              <Text mb="xs" mt="md" variant="bold16">
                {title}
              </Text>
              <Text
                color="textColor"
                textAlign="center"
                paddingHorizontal="md"
                marginVertical="xs"
                variant="regular14">
                {message}
              </Text>
            </Box>
          </Box>
          <Box padding="md">
            <BaseButton
              disabled={loading}
              isLoading={loading}
              label={buttonLabel}
              labelProps={{
                color: 'white',
              }}
              marginVertical="sm"
              onPress={onProceed}
            />
            {hasReceipt && (
              <BaseButton
                backgroundColor="white"
                disabled={receiptLoading}
                isLoading={receiptLoading}
                label={receiptLabel}
                labelProps={{
                  color: 'primary',
                }}
                marginBottom="md"
                onPress={generateReceipt}
              />
            )}
          </Box>
        </Box>
      )}
    </BottomSheetModal>
  );
};

export default StatusModal;
