/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {DimensionValue, TextInput, View} from 'react-native';
import {palette} from '@/shared/theme/palette';
import {RFValue} from 'react-native-responsive-fontsize';
import RfValue from '@/helpers/RfValue';
import {SvgIcon} from '@/assets/SvgIcon';

type SelectInputSearchbarProps = {
  getSearchInput: (text: string) => void;
  placeholder?: string;
  searchInput?: string;
  marginTop?: DimensionValue;
  backgroundColor?: string;
  paddingHorizontal?: DimensionValue;
  height?: DimensionValue;
};

export const SearchBar: React.FC<SelectInputSearchbarProps> = ({
  getSearchInput,
  placeholder = 'Search for an item',
  backgroundColor,
  paddingHorizontal,
  marginTop,
  height,
}) => {
  const textInputRef = useRef(null);

  return (
    <View
      style={{
        backgroundColor: backgroundColor || '#f7f7f7',
        borderRadius: RfValue(10),
        paddingHorizontal: paddingHorizontal || RfValue(10),
        height: height || RFValue(50),
        alignItems: 'center',
        borderColor: palette.gray200,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: marginTop || RfValue(10),
      }}>
      <SvgIcon name="search" size="sml" />
      <TextInput
        autoCorrect={false}
        onChangeText={getSearchInput}
        placeholder={placeholder}
        placeholderTextColor="black"
        ref={textInputRef}
        style={{
          height: '100%',
          flex: 1,
          color: '#000',
          textTransform: 'lowercase',
          paddingHorizontal: RfValue(10),
          fontSize: RfValue(11),
        }}
      />
    </View>
  );
};
