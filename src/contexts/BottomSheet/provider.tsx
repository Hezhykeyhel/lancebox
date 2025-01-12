import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { palette } from '@/shared/theme/palette';

import BottomSheetContext, {
  BottomSheetProps,
  BottomSheetProviderProps,
} from './context';
import { Box } from '@/shared/components/Box';

export let createBottomSheet: (props: BottomSheetProps) => void;

const BottomSheetProvider = ({ children }: BottomSheetProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [snapPoints, setSnapPoints] = useState(['0%', '50%', '90%']);

  const [content, setContent] = useState<ReactNode | null>(null);

  const closeBottomSheet = () => {
    setIsVisible(false);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const [onDismiss] = useState(() => () => {});

  createBottomSheet = (props: BottomSheetProps) => {
    const { _snapPoints: SnapPoints, _content: Content, _title: Title } = props;

    setContent(typeof Content === 'function' ? <Content /> : Content);
    setSnapPoints(SnapPoints);

    setIsVisible(true);
  };

  const CustomBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1}>
        <Box
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5',
          }}
        />
      </BottomSheetBackdrop>
    ),
    [],
  );

  const contextValue = useMemo(
    () => ({
      createBottomSheet,
      dismissBottomSheet: closeBottomSheet,
    }),
    [closeBottomSheet],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetContext.Provider value={contextValue}>
        {children}
        <Portal>
          <BottomSheetModal
            android_keyboardInputMode="adjustResize"
            backdropComponent={CustomBackdrop}
            backgroundStyle={{
              backgroundColor: palette.white,
            }}
            index={1}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            onDismiss={() => {
              closeBottomSheet();
              onDismiss();
            }}
            ref={bottomSheetRef}
            snapPoints={snapPoints}>
            <Box flex={1}>
              {/* <Header
              title={title}
              onClose={closeBottomSheet}
              onProceed={onProceed}
              activeModule={activeModule}
            /> */}
              <Box mt="md" />
              <Box flex={1}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                  style={{
                    flex: 1,
                    height: '100%',
                  }}>
                  <Box
                    style={{
                      flexGrow: 1,
                    }}>
                    {content}
                  </Box>
                </TouchableWithoutFeedback>
              </Box>
            </Box>
          </BottomSheetModal>
        </Portal>
      </BottomSheetContext.Provider>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetProvider;
