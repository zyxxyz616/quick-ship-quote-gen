
import React from "react";

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressTracker({
  currentStep,
  totalSteps,
}: ProgressTrackerProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <React.Fragment key={i}>
            {/* Step circle */}
            <div className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  i + 1 <= currentStep
                    ? "bg-shipping-navy text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              <div className="text-xs mt-2 text-shipping-navy font-medium">
                {i === 0 ? "Package" : i === 1 ? "Shipment" : "Rates"}
              </div>
            </div>

            {/* Connector line between steps (except after last step) */}
            {i < totalSteps - 1 && (
              <div
                className={`flex-grow h-1 mx-2 rounded ${
                  i + 1 < currentStep
                    ? "bg-shipping-navy"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
