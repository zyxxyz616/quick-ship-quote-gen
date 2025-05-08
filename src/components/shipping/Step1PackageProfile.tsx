
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dimensions, PackageType, WeightUnit, ShipmentDetails } from "@/types/shipping";
import { calculateDimWeight } from "@/utils/shippingUtils";

interface Step1Props {
  shipmentDetails: ShipmentDetails;
  onUpdate: (details: Partial<ShipmentDetails>) => void;
  onNext: () => void;
}

export default function Step1PackageProfile({
  shipmentDetails,
  onUpdate,
  onNext,
}: Step1Props) {
  const [dimensions, setDimensions] = useState<Dimensions>(shipmentDetails.dimensions);
  const [dimWeight, setDimWeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(shipmentDetails.weight);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(shipmentDetails.weightUnit);
  
  // Calculate dimensional weight when dimensions change
  useEffect(() => {
    if (dimensions.length && dimensions.width && dimensions.height) {
      const calculatedDimWeight = calculateDimWeight(dimensions);
      setDimWeight(calculatedDimWeight);
    } else {
      setDimWeight(0);
    }
  }, [dimensions]);
  
  const handleDimensionChange = (dimension: keyof Dimensions, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    
    setDimensions((prev) => ({
      ...prev,
      [dimension]: numValue,
    }));
    
    onUpdate({
      dimensions: {
        ...dimensions,
        [dimension]: numValue,
      },
    });
  };

  const handleWeightChange = (value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setWeight(numValue);
    onUpdate({ weight: numValue });
  };
  
  const handleWeightUnitChange = (value: WeightUnit) => {
    setWeightUnit(value);
    onUpdate({ weightUnit: value });
  };
  
  const handlePackageTypeChange = (value: PackageType) => {
    onUpdate({ packageType: value });
  };
  
  const handleNext = () => {
    if (isValid()) {
      onNext();
    }
  };
  
  const isValid = (): boolean => {
    return (
      dimensions.length > 0 &&
      dimensions.width > 0 &&
      dimensions.height > 0 &&
      weight > 0
    );
  };
  
  return (
    <Card className="shadow-md bg-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-shipping-navy mb-4">Step 1: Package Profile</h2>
            <p className="text-sm text-shipping-navy/70 mb-5">
              Enter your package details to get an accurate shipping quote
            </p>
          </div>
          
          {/* Dimensions */}
          <div className="space-y-3">
            <Label className="text-shipping-navy">Dimensions (inches)</Label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input
                  type="number"
                  placeholder="Length"
                  value={dimensions.length || ""}
                  onChange={(e) => handleDimensionChange("length", e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="text-center"
                />
                <p className="text-xs text-center mt-1 text-shipping-navy/70">Length</p>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Width"
                  value={dimensions.width || ""}
                  onChange={(e) => handleDimensionChange("width", e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="text-center"
                />
                <p className="text-xs text-center mt-1 text-shipping-navy/70">Width</p>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Height"
                  value={dimensions.height || ""}
                  onChange={(e) => handleDimensionChange("height", e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="text-center"
                />
                <p className="text-xs text-center mt-1 text-shipping-navy/70">Height</p>
              </div>
            </div>
            
            {dimWeight > 0 && (
              <div className="bg-shipping-lightblue p-3 rounded-lg mt-2">
                <p className="text-sm text-shipping-navy">
                  Dimensional Weight: <span className="font-semibold">{dimWeight} lbs</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Weight */}
          <div className="space-y-3">
            <Label className="text-shipping-navy">Weight</Label>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Weight"
                value={weight || ""}
                onChange={(e) => handleWeightChange(e.target.value)}
                min="0.1"
                step="0.1"
                className="flex-grow"
              />
              <RadioGroup
                value={weightUnit}
                onValueChange={(value) => handleWeightUnitChange(value as WeightUnit)}
                className="flex space-x-2 border p-1 rounded-md"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="lb" id="lb" className="sr-only" />
                  <Label
                    htmlFor="lb"
                    className={`px-4 py-1.5 rounded-md cursor-pointer text-sm ${
                      weightUnit === "lb"
                        ? "bg-shipping-blue text-white"
                        : "bg-transparent text-shipping-navy hover:bg-gray-100"
                    }`}
                  >
                    lb
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="kg" id="kg" className="sr-only" />
                  <Label
                    htmlFor="kg"
                    className={`px-4 py-1.5 rounded-md cursor-pointer text-sm ${
                      weightUnit === "kg"
                        ? "bg-shipping-blue text-white"
                        : "bg-transparent text-shipping-navy hover:bg-gray-100"
                    }`}
                  >
                    kg
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Package Type */}
          <div className="space-y-3">
            <Label className="text-shipping-navy">Package Type</Label>
            <Select
              value={shipmentDetails.packageType}
              onValueChange={(value) => handlePackageTypeChange(value as PackageType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Fragile">Fragile</SelectItem>
                <SelectItem value="Temperature-controlled">Temperature-controlled</SelectItem>
              </SelectContent>
            </Select>
            {shipmentDetails.packageType === "Temperature-controlled" && (
              <p className="text-amber-600 text-sm">
                Note: Temperature-controlled packages may incur additional fees
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-end">
        <Button 
          onClick={handleNext}
          disabled={!isValid()}
          className="bg-shipping-navy hover:bg-shipping-navy/90 text-white"
        >
          Continue to Shipment Details
        </Button>
      </CardFooter>
    </Card>
  );
}
