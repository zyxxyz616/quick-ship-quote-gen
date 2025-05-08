
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShipmentDetails, CarrierRate } from "@/types/shipping";
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Step3Props {
  shipmentDetails: ShipmentDetails;
  rates: CarrierRate[];
  onBack: () => void;
  onReset: () => void;
}

export default function Step3RatesDisplay({
  shipmentDetails,
  rates,
  onBack,
  onReset,
}: Step3Props) {
  // Helper function to get color based on reliability
  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 95) return "text-green-600";
    if (reliability >= 90) return "text-amber-500";
    return "text-red-500";
  };
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Helper function to display package dimensions
  const formatDimensions = () => {
    const { length, width, height } = shipmentDetails.dimensions;
    return `${length}" × ${width}" × ${height}"`;
  };
  
  // Helper function to format weight
  const formatWeight = () => {
    const { weight, weightUnit } = shipmentDetails;
    return `${weight} ${weightUnit}`;
  };
  
  return (
    <Card className="shadow-md bg-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-shipping-navy mb-1">Step 3: Optimized Rates</h2>
            <p className="text-sm text-shipping-navy/70 mb-5">
              Compare rates and services from multiple carriers
            </p>
          </div>
          
          {/* Shipment Summary */}
          <div className="bg-shipping-lightblue rounded-lg p-4 mb-6">
            <h3 className="font-medium text-shipping-navy mb-2">Shipment Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-shipping-navy/70">Package:</span>{" "}
                <span className="text-shipping-navy">{shipmentDetails.packageType}</span>
              </div>
              <div>
                <span className="text-shipping-navy/70">Dimensions:</span>{" "}
                <span className="text-shipping-navy">{formatDimensions()}</span>
              </div>
              <div>
                <span className="text-shipping-navy/70">Weight:</span>{" "}
                <span className="text-shipping-navy">{formatWeight()}</span>
              </div>
              <div>
                <span className="text-shipping-navy/70">Destination:</span>{" "}
                <span className="text-shipping-navy">
                  {shipmentDetails.zipCode} ({shipmentDetails.destinationType})
                </span>
              </div>
              <div>
                <span className="text-shipping-navy/70">From:</span>{" "}
                <span className="text-shipping-navy">
                  {shipmentDetails.originWarehouse === "CA" ? "California" : "Delaware"} Warehouse
                </span>
              </div>
            </div>
          </div>
          
          {/* Rates Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-shipping-navy text-white text-left">
                  <th className="px-4 py-3 rounded-tl-lg">Carrier</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3 text-right">Rate</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Transit Time</th>
                  <th className="px-4 py-3 text-center hidden md:table-cell rounded-tr-lg">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate, index) => (
                  <tr 
                    key={`${rate.carrier}-${rate.serviceLevel}`}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } ${
                      index === 0 ? "border-l-4 border-shipping-blue" : ""
                    } hover:bg-shipping-lightblue/50 cursor-pointer transition-colors`}
                  >
                    <td className="px-4 py-4 font-medium">
                      <div className="flex items-center">
                        {index === 0 && (
                          <div className="mr-2 bg-shipping-blue rounded-full p-0.5">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                        {rate.carrier}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span>{rate.serviceLevel}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex flex-col">
                        <span className="font-semibold">{formatCurrency(rate.totalRate)}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xs text-shipping-navy/70 flex items-center justify-end mt-1 cursor-help">
                                <Info size={12} className="inline mr-1" /> Price breakdown
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="p-2 w-48 bg-white shadow-lg border">
                              <div className="text-xs space-y-1">
                                <p className="flex justify-between">
                                  <span>Base rate:</span>
                                  <span>{formatCurrency(rate.baseRate)}</span>
                                </p>
                                <p className="flex justify-between">
                                  <span>Your markup:</span>
                                  <span>{formatCurrency(rate.markupAmount)}</span>
                                </p>
                                <div className="border-t my-1"></div>
                                <p className="flex justify-between font-semibold">
                                  <span>Total:</span>
                                  <span>{formatCurrency(rate.totalRate)}</span>
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <span>
                        {rate.deliveryDays} {rate.deliveryDays === 1 ? "day" : "days"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <span className={getReliabilityColor(rate.reliability)}>
                        {rate.reliability}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Seasonal Notes */}
          {new Date().getMonth() >= 9 && new Date().getMonth() <= 11 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-700 flex items-start">
                <Info size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Peak season surcharges are currently in effect (October-December)</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        <Button 
          variant="outline"
          onClick={onBack}
          className="border-shipping-navy text-shipping-navy"
        >
          Modify Shipment
        </Button>
        <Button 
          onClick={onReset}
          className="bg-shipping-navy hover:bg-shipping-navy/90 text-white"
        >
          New Quote
        </Button>
      </CardFooter>
    </Card>
  );
}
