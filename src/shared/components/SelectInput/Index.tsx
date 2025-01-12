/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

// Custom components/types
import { Text } from '@/shared/components/Typography';
import { Box } from '@/shared/components/Box';
import { SvgIcon } from '@/assets/SvgIcon';
import { Backdrop } from '@/shared/components/Backdrop';
import RfValue from '@/helpers/RfValue';

// Types
export interface Item {
  id: string;
  value: string;
}

interface SelectModalProps<TFieldValues extends FieldValues> {
  title: string;
  items: Item[];
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues>;
  errorMessage?: string;
  inputColor?: string;
  borderColor?: string;
  placeholderColor?: string;
  iconColor?: string;
  isSearchEnabled?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  autoPopup?: boolean;
  hasAutoPopped?: any; // New prop for auto-popup
}

const SelectInput = <TFieldValues extends FieldValues>({
  title,
  items,
  name,
  control,
  placeholder = 'Select an option',
  errorMessage = '',
  inputColor = 'black',
  borderColor = 'white',
  placeholderColor = 'gray200',
  iconColor = 'black',
  rules,
  isSearchEnabled = false,
  disabled = false,
  isLoading = false,
  autoPopup = false,
  hasAutoPopped, // Default to false
}: SelectModalProps<TFieldValues>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Track if the modal has auto-popped

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.value.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);

  const snapPoints = useMemo(() => {
    if (items.length > 8) return ['80%', '80%'];
    if (items.length < 3) return ['35%', '35%'];
    return ['35%', '35%'];
  }, [items.length]);

  const handlePresentModal = (onChange: (value: string) => void) => {
    if (!disabled) {
      onChange(''); // Reset the value when the modal is presented
      bottomSheetModalRef.current?.present();
    }
  };

  const handleDismissModal = () => bottomSheetModalRef.current?.dismiss();

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <Backdrop onPress={handleDismissModal} {...props} />
  );

  // Auto-popup logic
  useEffect(() => {
    if (autoPopup && items.length > 0 && !hasAutoPopped?.current) {
      // Use a dummy onChange function for auto-popup
      handlePresentModal(() => {});
      hasAutoPopped.current = true;
    }
  }, [autoPopup, items]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedItemValue = items.find(item => item.id === value)?.value;

        return (
          <Box marginVertical="sm">
            <Pressable
              onPress={() => handlePresentModal(onChange)}
              accessibilityRole="button"
              accessibilityLabel={`Select ${title}`}
              disabled={disabled}
              style={({ pressed }) => [
                {
                  opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
                },
              ]}>
              <Box
                borderColor={error ? 'errorColor' : borderColor}
                borderRadius="sm"
                borderWidth={0.5}
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal="md"
                paddingVertical="md">
                <Box>
                  <Text
                    marginTop="sm"
                    color={value ? inputColor : placeholderColor}
                    numberOfLines={1}
                    variant="regular16">
                    {selectedItemValue || placeholder}
                  </Text>
                </Box>
                <Box alignItems="center" justifyContent="center">
                  {isLoading ? (
                    <ActivityIndicator color="#0051FF" />
                  ) : (
                    <SvgIcon
                      color={disabled ? 'gray' : iconColor}
                      name="chevronDown"
                      size="m"
                    />
                  )}
                </Box>
              </Box>
            </Pressable>

            {(error || errorMessage) && (
              <Text color="errorColor" variant="regular12">
                {error?.message || errorMessage}
              </Text>
            )}

            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
              backdropComponent={renderBackdrop}
              enableContentPanningGesture={false}>
              <BottomSheetView style={{ flex: 1 }}>
                <Box flex={1} paddingHorizontal="md">
                  <Text
                    color="black"
                    marginBottom="md"
                    marginTop="md"
                    marginHorizontal="sm"
                    variant="bold14">
                    {title}
                  </Text>

                  {isSearchEnabled && (
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search..."
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  )}

                  <FlatList
                    data={filteredItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          onChange(item.id); // Set the selected value
                          setSearchQuery('');
                          handleDismissModal();
                        }}>
                        <Box
                          backgroundColor={
                            value === item.id ? 'blue200' : 'white'
                          }
                          paddingVertical="mmd">
                          <Text
                            marginHorizontal="sm"
                            color={value === item.id ? 'primary' : 'secondary'}
                            variant="regular14">
                            {item.value}
                          </Text>
                        </Box>
                      </Pressable>
                    )}
                  />
                </Box>
              </BottomSheetView>
            </BottomSheetModal>
          </Box>
        );
      }}
    />
  );
};

// Styles for the search input
const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
    marginHorizontal: 16,
  },
});

export default SelectInput;
