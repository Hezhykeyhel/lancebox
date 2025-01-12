import {SvgIconPackType} from '@/assets/svgIconPack';
import {Icon, MessageType, showMessage} from 'react-native-flash-message';
import {RFValue} from 'react-native-responsive-fontsize';

const ShowToast = ({
  message,
  type = 'default',
  autoHide = true,
  duration,
  icon,
}: {
  message: string;
  type?: MessageType;
  autoHide?: boolean;
  duration?: number;
  icon?: React.ReactElement | React.FC | Icon;
}) => {
  const defaultMessage = 'An error occurred. Please try again.';
  const isMessageString = typeof message === 'string';

  showMessage({
    icon,
    animated: true,
    animationDuration: 350,
    message: '',
    duration: duration ?? 5000,
    description: isMessageString ? message : defaultMessage,
    type,
    floating: false,
    autoHide,
    textStyle: {
      fontSize: RFValue(14),
      lineHeight: RFValue(21),
    },
  });
};

export default ShowToast;
