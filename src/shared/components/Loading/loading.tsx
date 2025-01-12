import LottieView from 'lottie-react-native';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';

import loading from './json/loader.json';

import {TextProps} from '../Typography';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaViewProps} from '../SafeAreaView';
import {Svg} from 'react-native-svg';
import {SvgIcon} from '@/assets/SvgIcon';
import {Box} from '../Box';

type TemporaryLoaderProps = SafeAreaViewProps & {
  text?: string;
  textColor?: TextProps;
  visible: boolean;
};

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    bottom: 0,
    flex: 1,
    height,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999_999_999_999_999,
  },
});

export default function Loader(props: TemporaryLoaderProps) {
  const {visible} = props;

  return (
    <>
      {visible && (
        <Modal visible={visible}>
          <View style={styles.container}>
            <LottieView
              autoPlay
              loop
              resizeMode="cover"
              source={loading}
              style={{width: RFValue(300), height: RFValue(300)}}
            />
            <Box position={'absolute'}>
              <SvgIcon name="logo" size="xxl" />
            </Box>
          </View>
        </Modal>
      )}
    </>
  );
}
