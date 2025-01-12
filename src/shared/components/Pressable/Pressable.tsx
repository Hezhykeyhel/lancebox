import {createBox} from '@shopify/restyle';
import React from 'react';
import {Pressable as NSPressable} from 'react-native';

import {Theme} from '../../theme';

const getPressable = () =>
  createBox<
    Theme,
    React.ComponentProps<typeof NSPressable> & {children?: React.ReactNode}
  >(NSPressable);

export type PressableProps = React.ComponentProps<
  ReturnType<typeof getPressable>
>;

const Pressable = getPressable();

export default Pressable;
export {Pressable};
