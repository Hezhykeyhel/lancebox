import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import React from 'react';
import {Box} from './Box';
import {Pressable} from 'react-native';

export const Backdrop = ({
  onPress,
  style,
  backdropChildren,
}: BottomSheetBackdropProps & {
  onPress?: () => void;
  showIndex?: number;
  backdropChildren?: React.ReactNode | React.ReactNode[];
}) => (
  <Box style={style}>
    <Pressable
      onPress={onPress}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      {backdropChildren}
    </Pressable>
  </Box>
);
