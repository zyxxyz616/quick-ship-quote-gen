import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateDimWeight } from "@/utils/shippingUtils";
import { generateMockRates, getCustomerMarkup } from "@/data/mockData";
import { Dimensions, CarrierRate } from "@/types/shipping";

// Create schema for form validation
const shippingFormSchema = z.object({
  length: z.coerce.number().positive("Length must be positive").max(999, "Length exceeds maximum allowed"),
  width: z.coerce.number().positive("Width must be positive").max(999, "Width exceeds maximum allowed"),
  height: z.coerce.number().positive("Height must be positive").max(999, "Height exceeds maximum allowed"),
  weight: z.coerce.number().positive("Weight must be positive").max(999, "Weight exceeds maximum allowed"),
  originWarehouse: z.enum(["Delaware", "California"]),
  destinationType: z.enum(["Residential", "Commercial"]),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().length(2, "State must be a 2-letter code"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format")
});
type ShippingFormValues = z.infer<typeof shippingFormSchema>;
const CustomerShippingForm = () => {
  const {
    userEmail
  } = useAuth();
  const {
    toast
  } = useToast();
  const [rates, setRates] = useState<CarrierRate[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get the customer-specific markup from mock data
  const customerMarkup = getCustomerMarkup(userEmail || "");
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      length: 12,
      width: 8,
      height: 6,
      weight: 5,
      originWarehouse: "Delaware",
      destinationType: "Residential",
      street: "",
      city: "",
      state: "",
      zip: ""
    }
  });
  const onSubmit = (data: ShippingFormValues) => {
    setIsSubmitting(true);

    // Calculate dimensional weight
    const dimensions: Dimensions = {
      length: data.length,
      width: data.width,
      height: data.height
    };
    const dimWeight = calculateDimWeight(dimensions);

    // Generate mock shipping rates
    setTimeout(() => {
      try {
        const generatedRates = generateMockRates(data.originWarehouse, data.zip, data.weight, dimWeight, customerMarkup);
        setRates(generatedRates);
        setShowResults(true);
        setIsSubmitting(false);
        toast({
          title: "Shipping rates calculated",
          description: `Found ${generatedRates.length} shipping options for your package`
        });
      } catch (error) {
        setIsSubmitting(false);
        toast({
          title: "Error calculating rates",
          description: "Failed to generate shipping rates. Please try again.",
          variant: "destructive"
        });
      }
    }, 1000);
  };
  return <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-shipping-navy">Shipping Rate Calculator</CardTitle>
          <CardDescription>
            Enter package details to get shipping rates with your negotiated markup ({customerMarkup}%)
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Package Dimensions (inches)</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <FormField control={form.control} name="length" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-xs">Length</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    <FormField control={form.control} name="width" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-xs">Width</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    <FormField control={form.control} name="height" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-xs">Height</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Package Weight</h3>
                  <FormField control={form.control} name="weight" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Weight (lbs)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Shipment Details</h3>
                  <div className="space-y-4">
                    <FormField control={form.control} name="originWarehouse" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Origin Warehouse</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select origin warehouse" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Delaware">Delaware</SelectItem>
                              <SelectItem value="California">California</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="destinationType" render={({
                    field
                  }) => <FormItem className="space-y-2">
                          <FormLabel>Destination Type</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <RadioGroupItem value="Residential" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Residential
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <RadioGroupItem value="Commercial" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Commercial
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Destination Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="street" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  <FormField control={form.control} name="city" render={({
                  field
                }) => <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="state" render={({
                  field
                }) => <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} maxLength={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  <FormField control={form.control} name="zip" render={({
                  field
                }) => <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>
              </div>

              <Button type="submit" className="w-full bg-shipping-navy" disabled={isSubmitting}>
                {isSubmitting ? "Calculating Rates..." : "Calculate Shipping Rates"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showResults && rates.length > 0 && <Card>
          <CardHeader>
            <CardTitle className="text-xl text-shipping-navy">Shipping Options</CardTitle>
            <CardDescription>
              Showing rates with your {customerMarkup}% markup applied
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Carrier</th>
                    <th className="p-2 text-left">Service</th>
                    
                    
                    <th className="p-2 text-left">Total Rate</th>
                    <th className="p-2 text-left">Delivery</th>
                    <th className="p-2 text-left">Reliability</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((rate, index) => <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-2 font-medium">{rate.carrier}</td>
                      <td className="p-2">{rate.serviceLevel}</td>
                      
                      
                      <td className="p-2 font-bold">${rate.totalRate.toFixed(2)}</td>
                      <td className="p-2">{rate.deliveryDays} day{rate.deliveryDays !== 1 && 's'}</td>
                      <td className="p-2">{rate.reliability}%</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Back to Calculator
            </Button>
            <Button>Select Cheapest Option</Button>
          </CardFooter>
        </Card>}
    </div>;
};
export default CustomerShippingForm;