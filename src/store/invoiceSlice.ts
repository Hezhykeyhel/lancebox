import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceItem {
  itemDescription: string;
  quantity: number;
  price: number;
  currency: string;
  amount: number;
  invoiceTitle: string;
}

interface InvoiceStoreState {
  clientName: string;
  yourName: string;
  insuranceDate: Date | null;
  currency: string;
  invoiceTitle: string;
  invoiceItems: InvoiceItem[];
}

const initialState: InvoiceStoreState = {
  clientName: '',
  yourName: '',
  insuranceDate: null,
  currency: '',
  invoiceTitle: '',
  invoiceItems: [],
};

const invoiceStoreSlice = createSlice({
  name: 'invoiceStore',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<InvoiceStoreState>>) => {
      return { ...state, ...action.payload };
    },
    addInvoiceItem: (state, action: PayloadAction<InvoiceItem>) => {
      state.invoiceItems.push(action.payload);
    },
    removeInvoiceItem: (state, action: PayloadAction<number>) => {
      state.invoiceItems = state.invoiceItems.filter(
        (_, i) => i !== action.payload,
      );
    },
    resetForm: state => {
      state.clientName = '';
      state.yourName = '';
      state.insuranceDate = null;
      state.currency = '';
      state.invoiceTitle = '';
      state.invoiceItems = [];
    },
  },
});

export const { setFormData, addInvoiceItem, removeInvoiceItem, resetForm } =
  invoiceStoreSlice.actions;
export default invoiceStoreSlice.reducer;
