import RfValue from '@/helpers/RfValue';
import {Text} from './Typography';

const NewErrorText = ({error}: {error: boolean | string | null}) =>
  error ? (
    <Text style={[{color: 'red', marginTop: RfValue(3)}]} variant="regular14">
      {error}
    </Text>
  ) : null;
export default NewErrorText;
