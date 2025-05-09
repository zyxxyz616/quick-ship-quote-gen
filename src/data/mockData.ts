
import { Customer, ShippingRequest } from "@/types/customer";
import { CarrierRate } from "@/types/shipping";

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    email: "customer@example.com",
    name: "John Smith",
    markup: 15,
    company: "Smith Trading Co.",
    lastLogin: "2025-05-06T14:30:00Z"
  },
  {
    id: "c2",
    email: "jane@techcorp.com",
    name: "Jane Miller",
    markup: 12,
    company: "Tech Corp Inc.",
    lastLogin: "2025-05-07T09:15:00Z"
  },
  {
    id: "c3",
    email: "robert@globalship.net",
    name: "Robert Johnson",
    markup: 18,
    company: "Global Shipping Solutions",
    lastLogin: "2025-05-08T16:45:00Z"
  },
  {
    id: "c4",
    email: "maria@quickdist.com",
    name: "Maria Garcia",
    markup: 10,
    company: "Quick Distribution LLC",
    lastLogin: "2025-05-05T11:20:00Z"
  },
  {
    id: "c5",
    email: "david@retailpro.org",
    name: "David Chen",
    markup: 20,
    company: "Retail Pro Organization",
    lastLogin: "2025-05-01T08:30:00Z"
  }
];

export const mockShippingRequests: ShippingRequest[] = [
  {
    id: "sr1",
    customerId: "c1",
    dimensions: { length: 12, width: 8, height: 6 },
    weight: 5,
    originWarehouse: "Delaware",
    destinationType: "Residential",
    destinationAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    dateRequested: "2025-05-08T10:15:00Z",
    status: "Completed"
  },
  {
    id: "sr2",
    customerId: "c2",
    dimensions: { length: 24, width: 18, height: 12 },
    weight: 15,
    originWarehouse: "California",
    destinationType: "Commercial",
    destinationAddress: {
      street: "456 Market Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94103"
    },
    dateRequested: "2025-05-07T14:30:00Z",
    status: "Pending"
  },
  {
    id: "sr3",
    customerId: "c3",
    dimensions: { length: 36, width: 24, height: 18 },
    weight: 25,
    originWarehouse: "Delaware",
    destinationType: "Commercial",
    destinationAddress: {
      street: "789 Business Pkwy",
      city: "Chicago",
      state: "IL",
      zip: "60601"
    },
    dateRequested: "2025-05-06T09:45:00Z",
    status: "Completed"
  },
  {
    id: "sr4",
    customerId: "c1",
    dimensions: { length: 8, width: 6, height: 4 },
    weight: 2,
    originWarehouse: "Delaware",
    destinationType: "Residential",
    destinationAddress: {
      street: "321 Pine Ln",
      city: "Boston",
      state: "MA",
      zip: "02108"
    },
    dateRequested: "2025-05-05T16:20:00Z",
    status: "Failed"
  },
  {
    id: "sr5",
    customerId: "c4",
    dimensions: { length: 18, width: 12, height: 10 },
    weight: 8,
    originWarehouse: "California",
    destinationType: "Commercial",
    destinationAddress: {
      street: "555 Commerce Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90001"
    },
    dateRequested: "2025-05-04T11:30:00Z",
    status: "Completed"
  }
];

export const generateMockRates = (
  origin: string, 
  destinationZip: string,
  weight: number,
  dimWeight: number,
  markup: number
): CarrierRate[] => {
  // Use the greater of actual weight and dimensional weight
  const billableWeight = Math.max(weight, dimWeight);
  
  // Mock distance calculation based on zip code
  const distanceFactor = parseInt(destinationZip.substring(0, 1)) / 10;
  
  const carriers = [
    {
      carrier: "FedEx",
      baseRate: Math.round((billableWeight * 3.5 + distanceFactor * 15) * 100) / 100,
      serviceLevel: "Standard",
      deliveryDays: 3,
      reliability: 92
    },
    {
      carrier: "UPS",
      baseRate: Math.round((billableWeight * 3.75 + distanceFactor * 14) * 100) / 100,
      serviceLevel: "Standard",
      deliveryDays: 3,
      reliability: 94
    },
    {
      carrier: "USPS",
      baseRate: Math.round((billableWeight * 3.25 + distanceFactor * 16) * 100) / 100,
      serviceLevel: "Standard",
      deliveryDays: 4,
      reliability: 89
    },
    {
      carrier: "FedEx",
      baseRate: Math.round((billableWeight * 5.5 + distanceFactor * 20) * 100) / 100,
      serviceLevel: "Expedited",
      deliveryDays: 2,
      reliability: 96
    },
    {
      carrier: "UPS",
      baseRate: Math.round((billableWeight * 5.75 + distanceFactor * 19) * 100) / 100,
      serviceLevel: "Expedited",
      deliveryDays: 2,
      reliability: 95
    },
    {
      carrier: "FedEx",
      baseRate: Math.round((billableWeight * 8.5 + distanceFactor * 25) * 100) / 100,
      serviceLevel: "Express",
      deliveryDays: 1,
      reliability: 98
    },
    {
      carrier: "UPS",
      baseRate: Math.round((billableWeight * 8.75 + distanceFactor * 24) * 100) / 100,
      serviceLevel: "Express",
      deliveryDays: 1,
      reliability: 97
    }
  ] as CarrierRate[];

  // Apply markup to each rate
  return carriers.map(rate => {
    const markupAmount = (rate.baseRate * markup) / 100;
    return {
      ...rate,
      markupAmount: Math.round(markupAmount * 100) / 100,
      totalRate: Math.round((rate.baseRate + markupAmount) * 100) / 100
    };
  }).sort((a, b) => a.totalRate - b.totalRate);
};

export const getCustomerByEmail = (email: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.email === email);
};

export const getCustomerMarkup = (email: string): number => {
  const customer = getCustomerByEmail(email);
  return customer?.markup || 10; // Default to 10% if customer not found
};
