
import { CarrierName, CarrierRate, Dimensions, ServiceLevel, ShipmentDetails, WarehouseLocation } from "@/types/shipping";

// Convert weight from kg to lb
export function kgToLb(weightKg: number): number {
  return weightKg * 2.20462;
}

// Convert weight from lb to kg
export function lbToKg(weightLb: number): number {
  return weightLb / 2.20462;
}

// Calculate dimensional weight based on dimensions (in inches) and divisor
export function calculateDimWeight(dimensions: Dimensions, divisor: number = 139): number {
  const { length, width, height } = dimensions;
  return Math.round((length * width * height) / divisor);
}

// Get appropriate warehouse based on zip code
export function determineWarehouse(zipCode: string): WarehouseLocation {
  // Simple logic: West coast (zip starts with 8 or 9) goes to CA, rest to DE
  const firstDigit = parseInt(zipCode[0]);
  return firstDigit >= 8 ? 'CA' : 'DE';
}

// Validate US zip code
export function isValidUSZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

// Mock function to simulate seasonal adjustment
export function seasonalAdjustment(): number {
  // Return a value between 0 and 2 to represent 0-2% seasonal adjustment
  const now = new Date();
  const month = now.getMonth(); // 0-11
  
  // Higher rates during peak shipping season (October-December)
  if (month >= 9 && month <= 11) {
    return 2.0;
  }
  
  return 0.5;
}

// Apply markup to base rate
export function applyMarkup(baseRate: number, userMarkup: number): number {
  const dynamicAdjustment = seasonalAdjustment();
  return baseRate * (1 + (userMarkup + dynamicAdjustment) / 100);
}

// Mock function to generate carriers' rates
export function generateCarrierRates(details: ShipmentDetails, userMarkup: number = 10): CarrierRate[] {
  // Calculate actual weight and dimensional weight
  const weight = details.weightUnit === 'kg' ? kgToLb(details.weight) : details.weight;
  const dimWeight = calculateDimWeight(details.dimensions);
  
  // Use the greater of actual weight and dimensional weight
  const billableWeight = Math.max(weight, dimWeight);
  
  // Base rate calculations (simplified mock data)
  const distance = details.originWarehouse === 'CA' ? 
    parseInt(details.zipCode.substring(0, 1)) * 100 :
    Math.abs(5 - parseInt(details.zipCode.substring(0, 1))) * 100;
  
  // Residential delivery fee
  const residentialFee = details.destinationType === 'Residential' ? 4.95 : 0;
  
  // Package type surcharges
  const packageSurcharge = 
    details.packageType === 'Standard' ? 0 :
    details.packageType === 'Fragile' ? 5.50 :
    12.00; // Temperature-controlled
  
  const carriers: CarrierName[] = ['FedEx', 'UPS', 'USPS'];
  const serviceLevels: ServiceLevel[] = ['Standard', 'Expedited', 'Express'];
  
  const rates: CarrierRate[] = [];
  
  // Generate mock rates for each carrier
  for (let i = 0; i < carriers.length; i++) {
    const carrier = carriers[i];
    
    // Generate different rates for different service levels
    for (let j = 0; j < serviceLevels.length; j++) {
      const serviceLevel = serviceLevels[j];
      
      // Base rate calculation with some carrier-specific variations
      let baseRate = (billableWeight * (0.50 + (i * 0.05))) + (distance / 100) + residentialFee + packageSurcharge;
      
      // Service level multipliers
      if (serviceLevel === 'Expedited') baseRate *= 1.5;
      if (serviceLevel === 'Express') baseRate *= 2.2;
      
      // Round to two decimal places
      baseRate = Math.round(baseRate * 100) / 100;
      
      // Apply customer's negotiated markup
      const totalRate = applyMarkup(baseRate, userMarkup);
      const markupAmount = totalRate - baseRate;
      
      // Estimated delivery days
      let deliveryDays = 
        serviceLevel === 'Standard' ? 5 - j :
        serviceLevel === 'Expedited' ? 3 - j :
        1;
        
      // Ensure minimum 1 day
      deliveryDays = Math.max(1, deliveryDays);
      
      // Mock reliability percentages
      const baseReliability = 85 + (i * 3) + (j * 2); // Different carriers have different reliability
      const reliability = Math.min(99, baseReliability); // Cap at 99%
      
      rates.push({
        carrier,
        baseRate,
        markupAmount,
        totalRate: Math.round(totalRate * 100) / 100,
        serviceLevel,
        deliveryDays,
        reliability
      });
    }
  }
  
  // Sort by total rate (cheapest first)
  return rates.sort((a, b) => a.totalRate - b.totalRate);
}
