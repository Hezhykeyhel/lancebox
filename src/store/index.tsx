import {create} from 'zustand';

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
  setFormData: (data: Partial<InvoiceStoreState>) => void;
  addInvoiceItem: (item: InvoiceItem) => void;
  removeInvoiceItem: (index: number) => void;
  resetForm: () => void;
}
interface StoreState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

export const useStore = create<StoreState>(set => ({
  accessToken: '#####@3dmaf,adf,ad',
  setAccessToken: accessToken => set({accessToken}),
  removeAccessToken: () => set({accessToken: ''}),
}));

export const useInvoiceStore = create<InvoiceStoreState>(set => ({
  clientName: '',
  yourName: '',
  insuranceDate: null,
  currency: '',
  invoiceTitle: '',
  invoiceItems: [],
  setFormData: data => set(state => ({...state, ...data})),
  addInvoiceItem: item =>
    set(state => ({invoiceItems: [...state.invoiceItems, item]})),
  removeInvoiceItem: index =>
    set(state => ({
      invoiceItems: state.invoiceItems.filter((_, i) => i !== index),
    })),
  resetForm: () =>
    set({
      clientName: '',
      yourName: '',
      insuranceDate: null,
      currency: '',
      invoiceTitle: '',
      invoiceItems: [],
    }), // Reset form
}));
