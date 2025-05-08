
export type WeightUnit = 'lb' | 'kg';
export type PackageType = 'Standard' | 'Fragile' | 'Temperature-controlled';
export type DestinationType = 'Residential' | 'Commercial';
export type WarehouseLocation = 'CA' | 'DE';
export type ServiceLevel = 'Standard' | 'Expedited' | 'Express';
export type CarrierName = 'FedEx' | 'UPS' | 'USPS';

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface ShipmentDetails {
  dimensions: Dimensions;
  weight: number;
  weightUnit: WeightUnit;
  packageType: PackageType;
  originWarehouse: WarehouseLocation;
  destinationType: DestinationType;
  zipCode: string;
}

export interface CarrierRate {
  carrier: CarrierName;
  baseRate: number;
  markupAmount: number;
  totalRate: number;
  serviceLevel: ServiceLevel;
  deliveryDays: number;
  reliability: number; // Percentage as a number (e.g., 95 for 95%)
}
