
import Layout from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CarrierRate, ServiceLevel } from "@/types/shipping";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChevronDown, Filter, Settings, TrendingUp } from "lucide-react";

// Sample data
const carrierPerformance = [
  { name: "FedEx", reliability: 94, averageDelay: 0.8, rates: 89.50 },
  { name: "UPS", reliability: 92, averageDelay: 1.2, rates: 92.30 },
  { name: "USPS", reliability: 88, averageDelay: 1.5, rates: 76.40 },
];

const recentShipments = [
  { id: "SH-23145", date: "2025-05-07", customer: "Acme Corp", destination: "94105", carrier: "FedEx", service: "Express", cost: 78.90, status: "Delivered" },
  { id: "SH-23144", date: "2025-05-06", customer: "TechSolutions", destination: "60611", carrier: "UPS", service: "Standard", cost: 45.20, status: "In Transit" },
  { id: "SH-23143", date: "2025-05-06", customer: "GlobalTrade", destination: "33126", carrier: "USPS", service: "Express", cost: 65.75, status: "Delivered" },
  { id: "SH-23142", date: "2025-05-05", customer: "MediHealth", destination: "02110", carrier: "FedEx", service: "Expedited", cost: 89.30, status: "Delivered" },
  { id: "SH-23141", date: "2025-05-05", customer: "RetailGiant", destination: "98101", carrier: "UPS", service: "Standard", cost: 52.60, status: "Delivered" },
];

const carrierRateHistory = [
  { month: "Jan", FedEx: 88.5, UPS: 92.1, USPS: 75.8 },
  { month: "Feb", FedEx: 89.2, UPS: 91.8, USPS: 76.0 },
  { month: "Mar", FedEx: 89.5, UPS: 92.3, USPS: 76.4 },
  { month: "Apr", FedEx: 90.1, UPS: 93.0, USPS: 77.2 },
  { month: "May", FedEx: 89.8, UPS: 92.5, USPS: 76.9 },
];

const ManagerPortal = () => {
  const [activeTab, setActiveTab] = useState<"performance" | "shipments" | "rates">("performance");

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-shipping-navy mb-2">Manager Portal</h2>
        <p className="text-shipping-navy/80">
          Monitor carrier performance, track shipments, and analyze rate trends.
        </p>
      </div>

      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab("performance")}
          className={`px-4 py-2 rounded-lg ${activeTab === "performance" ? "bg-shipping-navy text-white" : "bg-gray-100 text-shipping-navy"}`}
        >
          Carrier Performance
        </button>
        <button 
          onClick={() => setActiveTab("shipments")}
          className={`px-4 py-2 rounded-lg ${activeTab === "shipments" ? "bg-shipping-navy text-white" : "bg-gray-100 text-shipping-navy"}`}
        >
          Recent Shipments
        </button>
        <button 
          onClick={() => setActiveTab("rates")}
          className={`px-4 py-2 rounded-lg ${activeTab === "rates" ? "bg-shipping-navy text-white" : "bg-gray-100 text-shipping-navy"}`}
        >
          Rate Analysis
        </button>
      </div>

      {activeTab === "performance" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-shipping-navy">Carrier Performance Summary</h3>
            <div className="flex space-x-2">
              <Sheet>
                <SheetTrigger className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                  <Filter size={18} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Performance Data</SheetTitle>
                    <SheetDescription>
                      Apply filters to customize the performance view.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Filter options would go here.</p>
                  </div>
                </SheetContent>
              </Sheet>
              <Dialog>
                <DialogTrigger className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                  <Settings size={18} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Performance Settings</DialogTitle>
                    <DialogDescription>
                      Customize how performance metrics are calculated and displayed.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Settings options would go here.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carrier</TableHead>
                <TableHead>Reliability Score</TableHead>
                <TableHead>Avg. Delay (days)</TableHead>
                <TableHead>Avg. Rate</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carrierPerformance.map((carrier) => (
                <TableRow key={carrier.name}>
                  <TableCell className="font-medium">{carrier.name}</TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${carrier.reliability > 92 ? 'bg-green-500' : carrier.reliability > 85 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                              style={{ width: `${carrier.reliability}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{carrier.reliability}%</span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="text-sm">
                          <p><strong>On-time delivery rate</strong> based on last 90 days</p>
                          <p className="text-gray-500 text-xs mt-1">Target: 95% or above</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{carrier.averageDelay} days</TableCell>
                  <TableCell>${carrier.rates.toFixed(2)}</TableCell>
                  <TableCell>
                    <TrendingUp size={18} className="text-green-500" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {activeTab === "shipments" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-shipping-navy">Recent Shipments</h3>
            <button className="px-3 py-1 bg-shipping-navy text-white rounded-md text-sm flex items-center">
              Export <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell>{shipment.customer}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell>{shipment.service}</TableCell>
                  <TableCell>${shipment.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shipment.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {shipment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>Showing 5 most recent shipments</TableCaption>
          </Table>
        </div>
      )}

      {activeTab === "rates" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-shipping-navy">Carrier Rate Analysis</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-100 text-shipping-navy rounded-md text-sm">Last 30 Days</button>
              <button className="px-3 py-1 bg-gray-100 text-shipping-navy rounded-md text-sm">Last 90 Days</button>
              <button className="px-3 py-1 bg-gray-100 text-shipping-navy rounded-md text-sm">Year to Date</button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carrierRateHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="FedEx" fill="#1A2B42" />
                <Bar dataKey="UPS" fill="#3B82F6" />
                <Bar dataKey="USPS" fill="#93C5FD" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-2">Rate Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Average Rate</div>
                <div className="text-xl font-semibold">$86.23</div>
                <div className="text-xs text-green-600 mt-1">↓ 2.1% vs. previous period</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Best Value Carrier</div>
                <div className="text-xl font-semibold">USPS</div>
                <div className="text-xs text-gray-600 mt-1">For packages under 10lbs</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Peak Rate Increase</div>
                <div className="text-xl font-semibold">+8.3%</div>
                <div className="text-xs text-red-600 mt-1">Expected Q4 2025</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManagerPortal;
