
import React, { useState } from "react";
import ProgressTracker from "@/components/shipping/ProgressTracker";
import Step1PackageProfile from "@/components/shipping/Step1PackageProfile";
import Step2ShipmentContext from "@/components/shipping/Step2ShipmentContext";
import Step3RatesDisplay from "@/components/shipping/Step3RatesDisplay";
import { ShipmentDetails, CarrierRate } from "@/types/shipping";
import { generateCarrierRates } from "@/utils/shippingUtils";
import { useToast } from "@/components/ui/use-toast";

export default function ShipmentCalculator() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({
    dimensions: { length: 0, width: 0, height: 0 },
    weight: 0,
    weightUnit: "lb",
    packageType: "Standard",
    originWarehouse: "DE",
    destinationType: "Commercial",
    zipCode: "",
  });
  const [rates, setRates] = useState<CarrierRate[]>([]);
  
  const updateShipmentDetails = (updates: Partial<ShipmentDetails>) => {
    setShipmentDetails((prev) => ({ ...prev, ...updates }));
  };
  
  const goToNextStep = () => {
    // If going from step 2 to step 3, calculate rates
    if (currentStep === 2) {
      try {
        // Generate carrier rates based on shipment details
        const calculatedRates = generateCarrierRates(shipmentDetails);
        setRates(calculatedRates);
        toast({
          title: "Rates calculated successfully",
          description: "Found options from multiple carriers"
        });
      } catch (error) {
        console.error("Error calculating rates:", error);
        toast({
          variant: "destructive",
          title: "Error calculating rates",
          description: "There was a problem calculating shipping rates. Please try again."
        });
        return;
      }
    }
    
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };
  
  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  const resetCalculator = () => {
    setCurrentStep(1);
    setShipmentDetails({
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
      weightUnit: "lb",
      packageType: "Standard",
      originWarehouse: "DE",
      destinationType: "Commercial",
      zipCode: "",
    });
    setRates([]);
  };
  
  return (
    <div>
      <ProgressTracker currentStep={currentStep} totalSteps={3} />
      
      {currentStep === 1 && (
        <Step1PackageProfile
          shipmentDetails={shipmentDetails}
          onUpdate={updateShipmentDetails}
          onNext={goToNextStep}
        />
      )}
      
      {currentStep === 2 && (
        <Step2ShipmentContext
          shipmentDetails={shipmentDetails}
          onUpdate={updateShipmentDetails}
          onBack={goToPreviousStep}
          onNext={goToNextStep}
        />
      )}
      
      {currentStep === 3 && (
        <Step3RatesDisplay
          shipmentDetails={shipmentDetails}
          rates={rates}
          onBack={goToPreviousStep}
          onReset={resetCalculator}
        />
      )}
    </div>
  );
}
