import { SvgIcon } from '@/assets/SvgIcon';
import { AppNavigationProps } from '@/navigations/types';
import { Box } from '@/shared/components/Box';
import { ScrollBox } from '@/shared/components/ScrollBox';
import { Text } from '@/shared/components/Typography';
import MainLayout from '@/shared/layout/MainLayout';
import React, { FC, useCallback, useRef, useState } from 'react';
import { PrimaryButton } from '@/shared/components/Buttons/PrimaryButton';
import SelectInput from '@/shared/components/SelectInput/Index';
import SimpleInput from '@/shared/components/TextInput/SimpleInput';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from '@/shared/components/TouchableOpacity';
import { useInvoiceStore } from '../../store/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import InvoiceGenerator from '../pdf/InvoiceGenerator';

// Currency options
const CURRENCY_LIST = [
  { id: 'usd', value: 'USD' },
  { id: 'eur', value: 'EUR' },
  { id: 'gbp', value: 'GBP' },
];

const AddNewInvoice: FC<AppNavigationProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  const openStatusModal = useRef<BottomSheetModal>(null);
  const [stepForm, setStepForm] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    clientName,
    yourName,
    insuranceDate,
    currency,
    invoiceTitle,
    invoiceItems,
    bankNumber,
    bankName,
    accountName,
    paymentTerms,
    setFormData,
    addInvoiceItem,
    removeInvoiceItem,
    resetForm,
  } = useInvoiceStore();

  const {
    control: step1Control,
    handleSubmit: handleStep1Submit,
    formState: { errors: step1Errors },
    watch: watchStep1,
    setValue: setStep1Value,
    reset: resetStep1,
  } = useForm({
    defaultValues: {
      clientName,
      yourName,
      insuranceDate,
      currency,
      invoiceTitle,
      itemDescription: '',
      quantity: undefined,
      price: undefined,
      amount: undefined,
    },
  });

  const {
    control: control2,
    handleSubmit: handleStep2Submit,
    formState: { errors: step2Errors },
    reset: resetStep2,
  } = useForm({
    defaultValues: {
      bankNumber,
      bankName,
      accountName,
      paymentTerms,
    },
  });

  // Reset forms on screen focus change
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetStep1();
        resetStep2();
        resetForm();
      };
    }, [resetStep1, resetStep2, resetForm]),
  );

  const onSubmitStep1 = async data => {
    try {
      setIsLoading(true);
      setFormData(data);
      setStepForm(2);
    } catch (error) {
      console.error('Step 1 Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitStep2 = async data => {
    try {
      setIsLoading(true);
      setFormData(data);
      setStepForm(3);
    } catch (error) {
      console.error('Step 2 Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (index: number) => {
    removeInvoiceItem(index);
  };

  // Calculate totals
  const calculateSubtotal = (items: any[]) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateVat = (vatRate = 0.1) => {
    return calculateSubtotal(invoiceItems) * vatRate;
  };

  const calculateShipping = (shippingRate = 50) => {
    return calculateSubtotal(invoiceItems) > 0 ? shippingRate : 0;
  };

  const calculateTotal = () => {
    return (
      calculateSubtotal(invoiceItems) + calculateVat() + calculateShipping()
    );
  };

  return (
    <MainLayout HeaderTitle={'Dashboard'}>
      <ScrollBox showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          extraHeight={180}
          showsVerticalScrollIndicator={false}>
          {stepForm === 1 && (
            <>
              <Box>
                <Text variant="bold16">New Invoice</Text>
                <Box
                  marginHorizontal="sm"
                  marginTop="md"
                  columnGap="md"
                  flexDirection="row"
                  justifyContent={'space-between'}
                  alignItems="center">
                  <Box maxWidth="15%">
                    <Text variant="regular10">Invoice Details</Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12">{'>'}</Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Bank Details
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Preview Invoice
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Download Invoice
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <SvgIcon name="checkCircle" size="mm" />
                  </Box>
                </Box>
              </Box>

              <Box>
                <Box marginTop="lg" width={'50%'}>
                  <Text marginBottom="sm">Client's Name</Text>
                  <SimpleInput
                    control={step1Control}
                    name="clientName"
                    error={step1Errors.clientName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: "Enter Client's Name",
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom="sm">Your Name</Text>
                  <SimpleInput
                    control={step1Control}
                    name="yourName"
                    error={step1Errors.yourName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Your Name',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>
                <Box
                  flexDirection="row"
                  justifyContent={'space-between'}
                  alignItems="center">
                  <Box marginTop="md" width={'48%'}>
                    <Text marginBottom="sm">Insurance Date</Text>
                    <Box
                      paddingHorizontal="md"
                      borderRadius="sm"
                      paddingVertical="md"
                      borderWidth={1}
                      borderColor={'gray200'}>
                      <Text>22/03/2023</Text>
                    </Box>
                  </Box>

                  <Box marginTop="lg" width={'48%'}>
                    <Text>Currency</Text>
                    <SelectInput
                      borderColor="gray200"
                      title="Select Currency"
                      items={CURRENCY_LIST}
                      name="currency"
                      control={step1Control}
                      placeholder="Choose currency"
                      errorMessage={step1Errors.currency?.message}
                    />
                  </Box>
                </Box>
                <Box>
                  {invoiceItems?.map((item, index) => (
                    <Box marginTop="md">
                      <Box
                        key={index}
                        flexDirection="row"
                        justifyContent={'space-between'}
                        flexWrap="wrap">
                        <Box width={'48%'}>
                          <Text marginBottom="sm">Title</Text>

                          <Box
                            paddingHorizontal="md"
                            borderRadius="sm"
                            paddingVertical="md"
                            borderWidth={1}
                            borderColor="gray400">
                            <Text>{item.invoiceTitle}</Text>
                          </Box>
                        </Box>
                        <Box width={'48%'}>
                          <Text marginBottom="sm">Item Description</Text>

                          <Box
                            paddingHorizontal="md"
                            borderRadius="sm"
                            paddingVertical="md"
                            borderWidth={1}
                            borderColor="gray400">
                            <Text>{item.itemDescription}</Text>
                          </Box>
                        </Box>
                        <Box width={'48%'}>
                          <Text marginBottom="sm">Unit Price</Text>

                          <Box
                            paddingHorizontal="md"
                            borderRadius="sm"
                            paddingVertical="md"
                            borderWidth={1}
                            borderColor="gray400">
                            <Text>{item.price}</Text>
                          </Box>
                        </Box>
                        <Box>
                          <Text marginBottom="sm"> Quantity</Text>

                          <Box
                            paddingHorizontal="md"
                            borderRadius="sm"
                            paddingVertical="md"
                            borderWidth={1}
                            borderColor="gray400">
                            <Text>{item.quantity}</Text>
                          </Box>
                        </Box>

                        <Box>
                          <Text marginBottom="sm">Item Description</Text>

                          <Box
                            paddingHorizontal="md"
                            borderRadius="sm"
                            paddingVertical="md"
                            borderWidth={1}
                            borderColor="gray400">
                            <Text>{item.itemDescription}</Text>
                          </Box>
                        </Box>
                      </Box>

                      <TouchableOpacity
                        onPress={() => handleRemoveItem(index)}
                        backgroundColor={'red200'}
                        padding="sm"
                        marginTop="sm"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center">
                        <Text>Remove</Text>
                      </TouchableOpacity>
                    </Box>
                  ))}
                </Box>

                <Text marginTop="md" variant={'semiBold16'}>
                  Invoice Details
                </Text>
                <Box marginTop="md">
                  <Text marginBottom="sm">Invoice Title</Text>
                  <SimpleInput
                    control={step1Control}
                    name="invoiceTitle"
                    error={step1Errors.invoiceTitle?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Invoice Title',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom="sm">Item Description</Text>
                  <SimpleInput
                    control={step1Control}
                    name="itemDescription"
                    error={step1Errors.itemDescription?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Item Description',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box
                  marginTop="md"
                  flexDirection="row"
                  justifyContent={'space-between'}>
                  <Box width={'48%'}>
                    <Text marginBottom="sm">Quantity</Text>
                    <SimpleInput
                      control={step1Control}
                      name="quantity"
                      error={step1Errors.quantity?.message}
                      borderColor="gray200"
                      labelColor="black"
                      inputProps={{
                        placeholder: 'e.g 2.00',
                        placeholderTextColor: '#9ca3af',
                        keyboardType: 'number-pad',
                      }}
                    />
                  </Box>
                  <Box width={'48%'}>
                    <Text marginBottom="sm">Unit Price</Text>
                    <SimpleInput
                      control={step1Control}
                      name="price"
                      error={step1Errors.price?.message}
                      borderColor="gray200"
                      labelColor="black"
                      inputProps={{
                        placeholder: 'e.g 3,000,000.00',
                        placeholderTextColor: '#9ca3af',
                        keyboardType: 'numeric',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  marginTop="md"
                  flexDirection="row"
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}>
                  <Box width={'75%'}>
                    <Text marginBottom="sm">Amount</Text>
                    <SimpleInput
                      control={step1Control}
                      name="amount"
                      error={step1Errors.quantity?.message}
                      borderColor="gray200"
                      labelColor="black"
                      inputProps={{
                        placeholder: 'e.g 2.00',
                        placeholderTextColor: '#9ca3af',
                        keyboardType: 'numeric',
                      }}
                    />
                  </Box>

                  <TouchableOpacity width={'20%'}>
                    <SvgIcon name="trash" size="xl" />
                  </TouchableOpacity>
                </Box>

                <TouchableOpacity onPress={() => {}} marginTop="md">
                  <Text color="primary">Add New Item</Text>
                </TouchableOpacity>

                <Box marginTop="lg">
                  <Box
                    marginBottom="md"
                    flexDirection="row"
                    justifyContent={'space-between'}
                    alignItems="center">
                    <Text>SubTotal</Text>
                    <Text variant={'semiBold18'}>
                      {calculateSubtotal(invoiceItems)}
                    </Text>
                  </Box>
                  <Box
                    marginBottom="md"
                    flexDirection="row"
                    justifyContent={'space-between'}
                    alignItems="center">
                    <Text>VAT</Text>
                    <Text variant={'semiBold18'}>{calculateVat()}</Text>
                  </Box>
                  <Box
                    marginBottom="md"
                    flexDirection="row"
                    justifyContent={'space-between'}
                    alignItems="center">
                    <Text>Shipping</Text>
                    <Text variant={'semiBold18'}> {calculateShipping()}</Text>
                  </Box>
                  <Box
                    marginBottom="md"
                    flexDirection="row"
                    justifyContent={'space-between'}
                    alignItems="center">
                    <Text>Total</Text>
                    <Text variant={'semiBold18'}>{calculateTotal()}</Text>
                  </Box>
                </Box>

                <PrimaryButton
                  //   disabled={invoiceItems?.length < 1}
                  isLoading={isLoading}
                  alignItems="center"
                  justifyContent="center"
                  label={'NEXT'}
                  labelProps={{ color: 'white' }}
                  labelVariant="medium14"
                  loadingIconColor="black"
                  marginTop="md"
                  onPress={handleStep1Submit(onSubmitStep1)}
                  paddingVertical="mmd"
                />
              </Box>
            </>
          )}

          {stepForm === 2 && (
            <>
              <Box>
                <Text variant="bold16">Bank Details</Text>
                <Box
                  marginHorizontal="sm"
                  marginTop="md"
                  columnGap="md"
                  flexDirection="row"
                  justifyContent={'space-between'}
                  alignItems="center">
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Invoice Details
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10">Bank Details</Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12">{'>'}</Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Preview Invoice
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Download Invoice
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <SvgIcon name="checkCircle" size="mm" />
                  </Box>
                </Box>
              </Box>

              <Box marginTop="lg">
                <Box marginTop="md">
                  <Text marginBottom="sm">Bank Number</Text>
                  <SimpleInput
                    control={control2}
                    name="bankNumber"
                    error={control2.bankNumber?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Bank Number',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom="sm">Name of Bank</Text>
                  <SimpleInput
                    control={control2}
                    name="bankName"
                    error={step2Errors.bankName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Bank Name',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom="sm">Name of Account</Text>
                  <SimpleInput
                    control={control2}
                    name="accountName"
                    error={step2Errors.accountName?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Account Name',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <Box marginTop="md">
                  <Text marginBottom="sm">Terms of Payment</Text>
                  <SimpleInput
                    control={control2}
                    name="paymentTerms"
                    error={step2Errors.paymentTerms?.message}
                    borderColor="gray200"
                    labelColor="black"
                    inputProps={{
                      placeholder: 'Enter Payment Terms',
                      placeholderTextColor: '#9ca3af',
                    }}
                  />
                </Box>

                <PrimaryButton
                  isLoading={isLoading}
                  alignItems="center"
                  justifyContent="center"
                  label="Preview Invoice"
                  labelProps={{ color: 'textColor', variant: 'bold14' }}
                  labelVariant="medium14"
                  loadingIconColor="black"
                  marginTop="lg"
                  borderRadius="lg"
                  onPress={handleStep2Submit(onSubmitStep2)}
                  paddingVertical="mmd"
                />
              </Box>
            </>
          )}
          {stepForm === 3 && (
            <>
              <Box>
                <Box
                  marginHorizontal="sm"
                  marginTop="md"
                  columnGap="md"
                  flexDirection="row"
                  justifyContent={'space-between'}
                  alignItems="center">
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Invoice Details
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12">{'>'}</Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Bank Details
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10">Preview Invoice</Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="15%">
                    <Text variant="regular10" color="gray400">
                      Download Invoice
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <Text variant="regular12" color="gray400">
                      {'>'}
                    </Text>
                  </Box>
                  <Box maxWidth="4%">
                    <SvgIcon name="checkCircle" size="mm" />
                  </Box>
                </Box>
              </Box>
              <InvoiceGenerator />
            </>
          )}
        </KeyboardAwareScrollView>
      </ScrollBox>
      {/* <StatusModal bottomSheetModalRef={openStatusModal} title="Success" /> */}
    </MainLayout>
  );
};

export default AddNewInvoice;
