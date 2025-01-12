// Interface for the bid information
export interface BidInfo {
  bidReference: string;
  splitPurchase: 'Enabled' | 'Disabled';
  minBidValue: number;
  closeTime: string;
  currentMaxBid: number;
  maxBidValue: number;
  amount: number;
  status: 'Pending' | 'Redeemed' | 'Purchased';
}

// Sample data array matching the component's layout
export const bidInfoData: BidInfo[] = [
  {
    bidReference: '1234567',
    splitPurchase: 'Enabled',
    minBidValue: 1680,
    closeTime: '12:58 PM',
    currentMaxBid: 1720,
    maxBidValue: 1720,
    amount: 5000,
    status: 'Pending',
  },
  {
    bidReference: '2345678',
    splitPurchase: 'Disabled',
    minBidValue: 1500,
    closeTime: '02:30 PM',
    currentMaxBid: 1600,
    maxBidValue: 1800,
    amount: 4500,
    status: 'Purchased',
  },
  {
    bidReference: '3456789',
    splitPurchase: 'Enabled',
    minBidValue: 1900,
    closeTime: '03:45 PM',
    currentMaxBid: 2000,
    maxBidValue: 2100,
    amount: 6000,
    status: 'Redeemed',
  },
  {
    bidReference: '4567890',
    splitPurchase: 'Disabled',
    minBidValue: 1200,
    closeTime: '11:15 AM',
    currentMaxBid: 1350,
    maxBidValue: 1500,
    amount: 3800,
    status: 'Pending',
  },
  {
    bidReference: '5678901',
    splitPurchase: 'Enabled',
    minBidValue: 2000,
    closeTime: '04:20 PM',
    currentMaxBid: 2150,
    maxBidValue: 2300,
    amount: 6500,
    status: 'Purchased',
  },
  {
    bidReference: '6789012',
    splitPurchase: 'Disabled',
    minBidValue: 1400,
    closeTime: '01:10 PM',
    currentMaxBid: 1550,
    maxBidValue: 1700,
    amount: 4200,
    status: 'Pending',
  },
];

// mock/offerHistoryData.js
export const offerHistoryData: BidInfo[] = [
  {
    bidReference: '1234567',
    splitPurchase: 'Enabled',
    minBidValue: 1680,
    closeTime: '12:58 PM',
    currentMaxBid: 1720,
    maxBidValue: 1720,
    amount: 5000,
    status: 'Pending',
  },
  {
    bidReference: '2345678',
    splitPurchase: 'Disabled',
    minBidValue: 1500,
    closeTime: '02:30 PM',
    currentMaxBid: 1600,
    maxBidValue: 1800,
    amount: 4500,
    status: 'Purchased',
  },
  {
    bidReference: '3456789',
    splitPurchase: 'Enabled',
    minBidValue: 1900,
    closeTime: '03:45 PM',
    currentMaxBid: 2000,
    maxBidValue: 2100,
    amount: 6000,
    status: 'Redeemed',
  },
  {
    bidReference: '4567890',
    splitPurchase: 'Disabled',
    minBidValue: 1200,
    closeTime: '11:15 AM',
    currentMaxBid: 1350,
    maxBidValue: 1500,
    amount: 3800,
    status: 'Pending',
  },
  {
    bidReference: '5678901',
    splitPurchase: 'Enabled',
    minBidValue: 2000,
    closeTime: '04:20 PM',
    currentMaxBid: 2150,
    maxBidValue: 2300,
    amount: 6500,
    status: 'Purchased',
  },
  {
    bidReference: '6789012',
    splitPurchase: 'Disabled',
    minBidValue: 1400,
    closeTime: '01:10 PM',
    currentMaxBid: 1550,
    maxBidValue: 1700,
    amount: 4200,
    status: 'Pending',
  },
];
