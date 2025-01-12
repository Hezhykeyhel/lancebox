import {createBox} from '@shopify/restyle';
import React from 'react';
import {TouchableOpacity as NSTouchableOpacity} from 'react-native';

import {Theme} from '../../theme';

const getTouchableOpacity = () =>
  createBox<
    Theme,
    React.ComponentProps<typeof NSTouchableOpacity> & {
      children?: React.ReactNode;
    }
  >(NSTouchableOpacity);

export type TouchableOpacityProps = React.ComponentProps<
  ReturnType<typeof getTouchableOpacity>
>;

const TouchableOpacity = getTouchableOpacity();

export default TouchableOpacity;
export {TouchableOpacity};
