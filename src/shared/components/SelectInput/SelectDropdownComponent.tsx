import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {debounce} from 'lodash';
import {PaletteType} from '@/shared/theme/palette';
import {Text} from '../Typography';
import {Box} from '../Box';
import {IconVector} from '@/assets/IconVector';
import {SearchBar} from '../searchBar';
import RfValue from '@/helpers/RfValue';

// Improved type definition
export interface SelectType {
  value: string;
  id: string;
  iconName?: string;
  label?: string;
}

export interface SelectInputDropdownProps {
  searchable?: boolean;
  list: SelectType[];
  handleItemPress: (item: SelectType) => void;
  selected: string | number;
  selectedTextColor?: PaletteType;
  unselectedTextColor?: PaletteType;
  nodataList?: string;
  dismissBottomSheet?: () => void;
  placeholder?: string;
}

const SelectDropdownComponent: React.FC<SelectInputDropdownProps> = ({
  searchable = false,
  list,
  handleItemPress,
  selected,
  selectedTextColor = 'primary',
  unselectedTextColor = 'textColor',
  nodataList = 'No items found',
  dismissBottomSheet,
  placeholder = 'Search...',
}) => {
  // State management
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState<SelectType[]>(list);

  // Memoized filter function
  const filterList = useCallback(
    (query: string) => {
      const lowercasedQuery = query.toLowerCase();
      return list.filter(
        item =>
          item.value.toLowerCase().includes(lowercasedQuery) ||
          item.id.toLowerCase().includes(lowercasedQuery),
      );
    },
    [list],
  );

  // Debounced search with memoization
  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setFilteredList(filterList(text));
      }, 300),
    [filterList],
  );

  // Search handler
  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  // Reset filtered list when list changes
  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  // Styles
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scrollView: {
          flex: 1,
          paddingBottom: 100,
        },
        emptyState: {
          flex: 1,
          height: 200,
          textAlign: 'center',
          textAlignVertical: 'center',
        },
      }),
    [],
  );

  // Render item
  const renderItem = useCallback(
    (listElement: SelectType) => {
      const isSelected = listElement.id === selected;

      return (
        <TouchableOpacity
          key={listElement.id}
          onPress={() => {
            handleItemPress(listElement);
            dismissBottomSheet?.();
          }}>
          <Box
            alignItems="center"
            backgroundColor={listElement.id === '' ? 'gray200' : 'transparent'}
            borderBottomWidth={1}
            borderColor="blue200"
            flexDirection="row"
            marginTop="md"
            paddingTop="md"
            paddingVertical="sm">
            {listElement?.iconName && (
              <IconVector
                name={listElement.iconName}
                size="lg"
                style={{marginRight: 15}}
              />
            )}

            <Box>
              <Text
                color={isSelected ? selectedTextColor : unselectedTextColor}
                fontWeight={isSelected ? 'bold' : 'normal'}
                numberOfLines={1}
                variant={listElement.id === '' ? 'medium14' : 'regular14'}>
                {listElement.value}
              </Text>

              {listElement?.label && (
                <Box mt="sm">
                  <Text
                    color={isSelected ? selectedTextColor : unselectedTextColor}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    numberOfLines={1}
                    variant="medium16">
                    {listElement.label}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </TouchableOpacity>
      );
    },
    [
      handleItemPress,
      dismissBottomSheet,
      selected,
      selectedTextColor,
      unselectedTextColor,
    ],
  );

  return (
    <Box paddingHorizontal="md" flex={1}>
      {searchable && (
        <SearchBar
          getSearchInput={handleSearch}
          marginTop={RfValue(1)}
          placeholder={placeholder}
        />
      )}

      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        {filteredList.map(renderItem)}
      </ScrollView>

      {filteredList.length === 0 && (
        <Text style={styles.emptyState}>{nodataList}</Text>
      )}
    </Box>
  );
};

export default React.memo(SelectDropdownComponent);
