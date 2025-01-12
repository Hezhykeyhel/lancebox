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
import { useFieldArray, useForm } from 'react-hook-form';
import { TouchableOpacity } from '@/shared/components/TouchableOpacity';
import { useInvoiceStore } from '../../store/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import InvoiceGenerator from '../pdf/InvoiceGenerator';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { showMessage } from 'react-native-flash-message';
// Currency options
const CURRENCY_LIST = [
  { id: 'usd', value: 'USD' },
  { id: 'eur', value: 'EUR' },
  { id: 'gbp', value: 'GBP' },
];

const AddNewInvoice: FC<AppNavigationProps<'DashboardScreen'>> = ({
  navigation,
}) => {
  const [stepForm, setStepForm] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const step1Schema = Yup.object().shape({
    clientName: Yup.string().required("Client's name is required."),
    yourName: Yup.string().required('Your name is required.'),
    currency: Yup.string().required('Currency is required.'),
    invoiceItems: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required('Description is required.'),
          title: Yup.string().required('Title is required.'),
          quantity: Yup.number()
            .typeError('Quantity must be a number.')
            .positive('Quantity must be greater than zero.')
            .required('Quantity is required.'),
          price: Yup.number()
            .typeError('Price must be a number.')
            .positive('Price must be greater than zero.')
            .required('Price is required.'),
          amount: Yup.number()
            .typeError('Amount must be a number.')
            .positive('Amount must be greater than zero.')
            .required('Amount is required.'),
        }),
      )
      .min(1, 'You must add at least one invoice item.')
      .required('Invoice items are required.'),
    itemDescription: Yup.string().optional(),
    quantity: Yup.number()
      .typeError('Quantity must be a number.')
      .positive('Quantity must be greater than zero.')
      .optional(),
    price: Yup.number()
      .typeError('Price must be a number.')
      .positive('Price must be greater than zero.')
      .optional(),
  });

  // Step 2 Validation Schema
  const step2Schema = Yup.object().shape({
    bankNumber: Yup.string().required('Bank number is required.'),
    bankName: Yup.string().required('Bank name is required.'),
    accountName: Yup.string().required('Account name is required.'),
    paymentTerms: Yup.string().required('Payment terms are required.'),
  });

  const {
    control: step1Control,
    handleSubmit: handleStep1Submit,
    formState: { errors: step1Errors },
    setValue: setStep1Value,
    reset: resetStep1,
    watch: watchStep1,
  } = useForm({
    defaultValues: {
      clientName: '',
      yourName: '',
      invoiceTitle: '',
      invoiceItems: [
        {
          description: '',
          quantity: 0,
          title: '',
          price: 0,
          amount: 0,
        },
      ],
      currency: '',
    },
    resolver: yupResolver(step1Schema),
  });

  const { fields, append, remove } = useFieldArray({
    control: step1Control,
    name: 'invoiceItems',
  });

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index); // Remove the item if more than one exists
    } else {
      showMessage({
        message: 'Cannot delete the last item',
        type: 'danger',
      });
    }
  };

  const {
    control: step2Control,
    handleSubmit: handleStep2Submit,
    formState: { errors: step2Errors },
    reset: resetStep2,
  } = useForm({
    defaultValues: {
      bankNumber: '',
      bankName: '',
      accountName: '',
      paymentTerms: '',
    },
    resolver: yupResolver(step2Schema),
  });

  const onSubmitStep1 = async (data: any) => {
    try {
      setIsLoading(true);
      // setFormData(data);
      setStepForm(2);
    } catch (error) {
      console.error('Step 1 Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitStep2 = async (data: any) => {
    try {
      setIsLoading(true);
      // setFormData2(prev => ({ ...prev, ...data }));
      setStepForm(3);
    } catch (error) {
      console.error('Step 2 Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetStep1();
        resetStep2();
      };
    }, [resetStep1, resetStep2]),
  );

  const calculateSubtotal = (items = [] as any) =>
    items.reduce(
      (total: number, item: { quantity: number; price: number }) =>
        total + item.quantity * item.price,
      0,
    );

  const calculateVat = () => {
    const subtotal = calculateSubtotal(watchStep1('invoiceItems'));
    const VAT_RATE = 0.15;
    return (subtotal * VAT_RATE).toFixed(2);
  };

  const calculateShipping = () => {
    const shippingCost = 50;
    return shippingCost.toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal(watchStep1('invoiceItems'));
    const vat = parseFloat(calculateVat());
    const shipping = parseFloat(calculateShipping());
    return (subtotal + vat + shipping).toFixed(2);
  };

  return (
    <MainLayout HeaderTitle="Dashboard">
      <ScrollBox showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView extraHeight={180}>
          {stepForm === 1 && (
            <>
              <Text variant="bold16">New Invoice</Text>
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

              {/* Step 1 Form */}
              <Box marginTop="lg" width={'50%'}>
                <Text marginBottom="sm">Client's Name</Text>
                <SimpleInput
                  control={step1Control}
                  name="clientName"
                  error={step1Errors.clientName?.message}
                  inputProps={{
                    placeholder: "Enter Client's Name",
                  }}
                />
              </Box>

              <Box marginTop="md">
                <Text marginBottom="sm">Your Name</Text>
                <SimpleInput
                  control={step1Control}
                  borderColor="gray"
                  name="yourName"
                  error={step1Errors.yourName?.message}
                  inputProps={{
                    placeholder: 'Enter Your Name',
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
                <Box>
                  {fields?.map((item, index) => (
                    <Box marginTop="md" key={index}>
                      <Box>
                        <Text marginBottom="sm">Title</Text>
                        <SimpleInput
                          control={step1Control}
                          name={`invoiceItems.${index}.title`}
                          error={
                            step1Errors?.invoiceItems?.[index]?.title?.message
                          }
                          inputProps={{
                            placeholder: 'Enter title',
                          }}
                        />
                      </Box>
                      <Box height={20} />
                      <Text marginBottom="sm">Item Description</Text>
                      <SimpleInput
                        control={step1Control}
                        name={`invoiceItems.${index}.description`}
                        error={
                          step1Errors?.invoiceItems?.[index]?.description
                            ?.message
                        }
                        inputProps={{
                          placeholder: 'Description',
                        }}
                      />
                      <Box height={20} />
                      <Box flexDirection="row" justifyContent={'space-between'}>
                        <Box width="48%">
                          <Text marginBottom="sm">Quantity</Text>
                          <SimpleInput
                            control={step1Control}
                            name={`invoiceItems.${index}.quantity`}
                            error={
                              step1Errors?.invoiceItems?.[index]?.quantity
                                ?.message
                            }
                            inputProps={{
                              placeholder: 'Quantity',
                            }}
                          />
                        </Box>
                        <Box width="48%">
                          <Text marginBottom="sm">Price</Text>
                          <SimpleInput
                            control={step1Control}
                            name={`invoiceItems.${index}.price`}
                            error={
                              step1Errors?.invoiceItems?.[index]?.price?.message
                            }
                            inputProps={{
                              placeholder: 'Price',
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
                            name={`invoiceItems.${index}.amount`}
                            error={
                              step1Errors?.invoiceItems?.[index]?.amount
                                ?.message
                            }
                            borderColor="gray200"
                            labelColor="black"
                            inputProps={{
                              placeholder: 'e.g 2.00',
                              placeholderTextColor: '#9ca3af',
                              keyboardType: 'numeric',
                            }}
                          />
                        </Box>
                        <TouchableOpacity
                          width={'20%'}
                          onPress={() => {
                            removeItem(index);
                          }}>
                          <SvgIcon name="trash" size="xl" />
                        </TouchableOpacity>
                      </Box>
                      <TouchableOpacity
                        onPress={() =>
                          append({
                            description: '',
                            quantity: 0,
                            price: 0,
                            amount: 0,
                            title: '',
                          })
                        }>
                        <Text
                          variant="bold14"
                          marginTop="md"
                          textDecorationStyle="solid"
                          textDecorationLine="underline"
                          color="primary">
                          Add New Item
                        </Text>
                      </TouchableOpacity>
                      <Box marginTop="lg">
                        <Box
                          marginBottom="md"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center">
                          <Text>SubTotal</Text>
                          <Text variant="semiBold18">
                            {calculateSubtotal(watchStep1('invoiceItems'))}
                          </Text>
                        </Box>
                        <Box
                          marginBottom="md"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center">
                          <Text>VAT</Text>
                          <Text variant="semiBold18">{calculateVat()}</Text>
                        </Box>
                        <Box
                          marginBottom="md"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center">
                          <Text>Shipping</Text>
                          <Text variant="semiBold18">
                            {calculateShipping()}
                          </Text>
                        </Box>
                        <Box
                          marginBottom="md"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center">
                          <Text>Total</Text>
                          <Text variant="semiBold18">{calculateTotal()}</Text>
                        </Box>
                      </Box>

                      <PrimaryButton
                        isLoading={isLoading}
                        alignItems="center"
                        justifyContent="center"
                        label="NEXT"
                        labelProps={{ color: 'white' }}
                        labelVariant="medium14"
                        loadingIconColor="black"
                        marginTop="md"
                        onPress={handleStep1Submit(onSubmitStep1)}
                        paddingVertical="mmd"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {stepForm === 2 && (
            <>
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
                  <Text variant="regular10">Bank Details</Text>
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
              <Box marginTop="lg">
                <Text marginBottom="sm">Bank Number</Text>
                <SimpleInput
                  control={step2Control}
                  name="bankNumber"
                  error={step2Errors.bankNumber?.message}
                  inputProps={{
                    placeholder: 'Enter Bank Name',
                  }}
                />
              </Box>
              <Box marginTop="lg">
                <Text marginBottom="sm">Bank Name</Text>
                <SimpleInput
                  control={step2Control}
                  name="bankName"
                  error={step2Errors.bankName?.message}
                  inputProps={{
                    placeholder: 'Enter Bank Name',
                  }}
                />
              </Box>

              <Box marginTop="md">
                <Text marginBottom="sm">Name of Account</Text>
                <SimpleInput
                  control={step2Control}
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
                  control={step2Control}
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
