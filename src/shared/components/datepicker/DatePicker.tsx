import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

import { Text } from '@/shared/components/Typography';
import { PaletteType } from '@/shared/theme/palette';
import { Box } from '../Box';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';

type DateInputModalProps = {
  value: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  closeDate: () => void;
  maximumDate?: Date;
  minimumDate?: Date;
  modulePalette?: PaletteType;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  displayType?:
    | 'default'
    | 'spinner'
    | 'calendar'
    | 'compact'
    | 'inline'
    | 'clock';
};

const DateInputModal: React.FC<DateInputModalProps> = ({
  value,
  onConfirm,
  onCancel,
  closeDate,
  maximumDate,
  minimumDate,
  modulePalette = 'primary',
  confirmButtonLabel = 'CONFIRM',
  cancelButtonLabel = 'CANCEL',
  displayType = 'default',
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  const onChange = (event: any, selected?: Date) => {
    const currentDate = selected || value;
    setSelectedDate(currentDate);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
    closeDate();
  };

  const handleCancel = () => {
    onCancel();
    closeDate();
  };

  return (
    <BottomSheetView style={{ flex: 1 }}>
      <Box paddingVertical="md" paddingHorizontal="lg">
        <Box alignItems="center" justifyContent="center">
          <Text variant="bold16" color="black" marginBottom="md">
            Select Date
          </Text>
          <DateTimePicker
            value={selectedDate}
            mode={displayType === 'clock' ? 'time' : 'date'}
            display={'default'}
            onChange={onChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            textColor="black"
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-around"
          marginTop="lg"
          paddingBottom="lg">
          <PrimaryButton
            alignItems="center"
            backgroundColor={modulePalette}
            borderRadius="sm"
            justifyContent="center"
            label={confirmButtonLabel}
            labelProps={{ color: 'white' }}
            onPress={handleConfirm}
            paddingHorizontal="lg"
            paddingVertical="md"
          />
          <PrimaryButton
            alignItems="center"
            backgroundColor="gray200"
            borderRadius="sm"
            justifyContent="center"
            label={cancelButtonLabel}
            labelProps={{ color: modulePalette }}
            onPress={handleCancel}
            paddingHorizontal="lg"
            paddingVertical="md"
          />
        </Box>
      </Box>
    </BottomSheetView>
  );
};

export default DateInputModal;
