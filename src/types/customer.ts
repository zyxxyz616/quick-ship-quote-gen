
export interface Customer {
  id: string;
  email: string;
  name: string;
  markup: number; // percentage as a number (e.g. 10 for 10%)
  company: string;
  lastLogin: string;
}

export interface ShippingRequest {
  id: string;
  customerId: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  originWarehouse: "Delaware" | "California";
  destinationType: "Residential" | "Commercial";
  destinationAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  dateRequested: string;
  status: "Pending" | "Completed" | "Failed";
}
