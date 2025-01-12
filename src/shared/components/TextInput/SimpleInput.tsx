/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  Clipboard,
  Animated,
} from 'react-native';

import { Text } from '../Typography';
import { palette, PaletteType } from '@/shared/theme/palette';
import { Box } from '../Box';
import { SvgIcon } from '@/assets/SvgIcon';
import RfValue from '@/helpers/RfValue';
import { fontFamily } from '@/shared/theme';
import { triggerShakeAnimation } from '@/helpers/TriggerShake';

type SimpleInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isPassword?: boolean;
  isAmount?: boolean;
  error?: string;
  inputProps?: TextInputProps;
  valueStyle?: StyleProp<TextStyle>;
  borderColor?: PaletteType;
  labelColor?: PaletteType;
  allowPaste?: boolean;
  currency?: string;
  isPasswordIconBlue?: boolean;
};

const SimpleInput = <T extends FieldValues>({
  control,
  name,
  isPasswordIconBlue = false,
  isPassword = false,
  error,
  inputProps,
  valueStyle,
  borderColor = 'gray400',

  allowPaste = false,
}: SimpleInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(!isPassword);

  const inputStyle = useMemo(
    () => [
      {
        fontSize: RfValue(16),
        color: palette.black,
        padding: 0,
        margin: 0,
        fontFamily: fontFamily.regular,
        flex: 1,
        height: RfValue(25),
      },
      valueStyle,
    ],
    [valueStyle],
  );

  const handlePaste = async (setValue: (value: string) => void) => {
    const text = await Clipboard.getString();
    setValue(text);
  };

  const animValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (error) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, error]);

  return (
    <Animated.View style={{ transform: [{ translateX: animValue }] }}>
      <Box
        position={'relative'}
        borderWidth={1}
        borderColor={error ? 'errorColor' : borderColor}
        borderRadius="sm"
        paddingVertical="md"
        paddingHorizontal="md">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Box flexDirection="row" alignItems="center">
              <TextInput
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={onChange}
                value={value}
                style={inputStyle}
                secureTextEntry={!showPassword}
                {...inputProps}
              />

              <Box flexDirection="row" alignItems="center">
                {isPassword && (
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      bottom: RfValue(1),
                      right: RfValue(5),
                    }}>
                    {isPasswordIconBlue ? (
                      <SvgIcon
                        name={showPassword ? 'eyeOpenBlue' : 'eyeClosedBlue'}
                        size="md"
                        color="gray200"
                      />
                    ) : (
                      <SvgIcon
                        name={showPassword ? 'eyeOpen' : 'eyeClosed'}
                        size="md"
                        color="gray200"
                      />
                    )}
                  </TouchableOpacity>
                )}

                {allowPaste && (
                  <TouchableOpacity onPress={() => handlePaste(onChange)}>
                    <SvgIcon name="newCopy" size="md" color="gray200" />
                  </TouchableOpacity>
                )}
                {!error && value?.length > 0 && (
                  <TouchableOpacity>
                    <SvgIcon name="check" size="md" color="gray200" />
                  </TouchableOpacity>
                )}
              </Box>
            </Box>
          )}
        />
      </Box>
      {error && (
        <Text color="errorColor" variant="regular12" mt="xs">
          {error}
        </Text>
      )}
    </Animated.View>
  );
};

export default SimpleInput;
