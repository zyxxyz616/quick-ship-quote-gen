
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/navigation/ProtectedRoute";
import CustomerList from "@/components/manager/CustomerList";
import ShipmentHistory from "@/components/manager/ShipmentHistory";

export default function ManagerPortal() {
  return (
    <ProtectedRoute requiredRole="manager">
      <Layout>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-shipping-navy mb-2">Manager Portal</h2>
          <p className="text-shipping-navy/80">
            Manage customer accounts, view shipment history, and analyze performance metrics.
          </p>
        </div>
        
        <div className="space-y-8">
          <CustomerList />
          <ShipmentHistory />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
