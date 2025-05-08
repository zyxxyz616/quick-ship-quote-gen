
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShipmentDetails, DestinationType, WarehouseLocation } from "@/types/shipping";
import { determineWarehouse, isValidUSZip } from "@/utils/shippingUtils";

interface Step2Props {
  shipmentDetails: ShipmentDetails;
  onUpdate: (details: Partial<ShipmentDetails>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2ShipmentContext({
  shipmentDetails,
  onUpdate,
  onBack,
  onNext,
}: Step2Props) {
  const [zipError, setZipError] = useState<string | null>(null);
  
  // Effect to determine warehouse based on zip code
  useEffect(() => {
    if (shipmentDetails.zipCode && isValidUSZip(shipmentDetails.zipCode)) {
      const suggestedWarehouse = determineWarehouse(shipmentDetails.zipCode);
      onUpdate({ originWarehouse: suggestedWarehouse });
    }
  }, [shipmentDetails.zipCode]);
  
  const handleZipChange = (value: string) => {
    // Accept only numbers and limit to 5 chars
    const formattedZip = value.replace(/[^\d]/g, "").substring(0, 5);
    
    onUpdate({ zipCode: formattedZip });
    
    // Validate zip code
    if (formattedZip.length === 5) {
      if (isValidUSZip(formattedZip)) {
        setZipError(null);
      } else {
        setZipError("Please enter a valid US ZIP code");
      }
    } else if (formattedZip.length > 0) {
      setZipError("ZIP code must be 5 digits");
    } else {
      setZipError(null);
    }
  };
  
  const handleDestinationTypeChange = (value: DestinationType) => {
    onUpdate({ destinationType: value });
  };
  
  const handleWarehouseChange = (value: WarehouseLocation) => {
    onUpdate({ originWarehouse: value });
  };
  
  const handleNext = () => {
    if (isValid()) {
      onNext();
    }
  };
  
  const isValid = (): boolean => {
    return (
      isValidUSZip(shipmentDetails.zipCode) &&
      !zipError &&
      !!shipmentDetails.destinationType &&
      !!shipmentDetails.originWarehouse
    );
  };
  
  return (
    <Card className="shadow-md bg-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-shipping-navy mb-4">Step 2: Shipment Context</h2>
            <p className="text-sm text-shipping-navy/70 mb-5">
              Tell us more about your shipment's origin and destination
            </p>
          </div>
          
          {/* Origin Warehouse */}
          <div className="space-y-3">
            <Label className="text-shipping-navy">Origin Warehouse</Label>
            <Select
              value={shipmentDetails.originWarehouse}
              onValueChange={(value) => handleWarehouseChange(value as WarehouseLocation)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select origin warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">California (West Coast)</SelectItem>
                <SelectItem value="DE">Delaware (East Coast)</SelectItem>
              </SelectContent>
            </Select>
            {shipmentDetails.zipCode && shipmentDetails.originWarehouse && (
              <p className="text-xs text-shipping-navy/70">
                Warehouse auto-selected based on destination ZIP code
              </p>
            )}
          </div>
          
          {/* Destination Type */}
          <div className="space-y-3">
            <Label className="text-shipping-navy">Destination Type</Label>
            <RadioGroup
              value={shipmentDetails.destinationType}
              onValueChange={(value) => handleDestinationTypeChange(value as DestinationType)}
              className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <div className="flex items-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="Residential" id="residential" />
                <Label htmlFor="residential" className="cursor-pointer">Residential</Label>
              </div>
              <div className="flex items-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="Commercial" id="commercial" />
                <Label htmlFor="commercial" className="cursor-pointer">Commercial</Label>
              </div>
            </RadioGroup>
            {shipmentDetails.destinationType === "Residential" && (
              <p className="text-xs text-shipping-navy/70">
                Additional residential delivery fees may apply
              </p>
            )}
          </div>
          
          {/* ZIP Code */}
          <div className="space-y-3">
            <Label className="text-shipping-navy">Delivery ZIP Code</Label>
            <Input
              placeholder="Enter 5-digit ZIP code"
              value={shipmentDetails.zipCode}
              onChange={(e) => handleZipChange(e.target.value)}
              className={zipError ? "border-red-500" : ""}
            />
            {zipError && <p className="text-sm text-red-500">{zipError}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        <Button 
          variant="outline"
          onClick={onBack}
          className="border-shipping-navy text-shipping-navy"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!isValid()}
          className="bg-shipping-navy hover:bg-shipping-navy/90 text-white"
        >
          Calculate Rates
        </Button>
      </CardFooter>
    </Card>
  );
}
