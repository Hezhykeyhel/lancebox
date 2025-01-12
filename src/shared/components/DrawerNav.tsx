import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { SvgIcon } from '@/assets/SvgIcon';
import { Box } from './Box';
import { Image } from './Image';
import { fullLogo } from '@/assets/pngImagePack';
import RfValue from '@/helpers/RfValue';
import { Text } from './Typography';
import { TouchableOpacity } from './TouchableOpacity';

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: '#0D3B66',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <Box>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <SvgIcon name="xclose" size="lg" />
        </TouchableOpacity>
        <Box marginVertical="lg">
          <Image
            source={fullLogo}
            resizeMode="contain"
            height={RfValue(30)}
            width={RfValue(133)}
          />
        </Box>

        <DrawerItemList {...props} />
      </Box>

      <TouchableOpacity
        paddingHorizontal="md"
        marginBottom="lg"
        onPress={() => {}}
        flexDirection="row"
        alignItems="center"
        columnGap="md">
        <SvgIcon name="logout2" size="mm" color="transparent" />
        <Text variant="medium14" color={'white'}>
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
