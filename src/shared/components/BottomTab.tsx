import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import {Text} from '@/shared/components/Typography';
import {PaletteType} from '@/shared/theme/palette';
import RfValue from '@/helpers/RfValue';
import {SvgIconPackType} from '@/assets/svgIconPack';
import {SvgIcon} from '@/assets/SvgIcon';
import {Box} from './Box';
import {horizontalScale} from '../theme';

export type TabType<K> = {
  tabText: string;
  name: keyof K;
  svgIcon: SvgIconPackType;
  svgIconActive?: SvgIconPackType;
  component: any;
  special?: boolean;
  onPress?: () => void;
};

type BottomTabPropsType<T extends ParamListBase> = {
  Tab: any;
  tabList: TabType<T>[];
  activeColor?: PaletteType;
};

function BottomTab<T extends ParamListBase>({
  Tab,
  tabList,
  activeColor = 'primary',
}: BottomTabPropsType<T>) {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          height: RfValue(85),
          paddingTop: 5,
        },
        tabBarItemStyle: {height: RfValue(75)},
      }}>
      {tabList?.map((tab, i) => (
        <Tab.Screen
          component={tab.component}
          key={i}
          name={tab.name}
          options={{
            headerShown: false,
            tabBarIconStyle: {
              flex: 1,
            },
            tabBarLabel: '',
            tabBarIcon: ({focused}: any) => (
              <Box
                width={horizontalScale(90)}
                alignItems="center"
                flex={1}
                justifyContent="center">
                <SvgIcon
                  color={focused ? activeColor : 'black'}
                  name={focused ? tab.svgIconActive : tab.svgIcon}
                  size="md"
                />

                <Text
                  color={focused && activeColor}
                  marginTop={'ss'}
                  variant="medium12">
                  {tab.tabText}
                </Text>
              </Box>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default BottomTab;
