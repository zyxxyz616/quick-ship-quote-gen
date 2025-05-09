
import Layout from "@/components/Layout";
import CustomerShippingForm from "@/components/shipping/CustomerShippingForm";
import ProtectedRoute from "@/components/navigation/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerByEmail } from "@/data/mockData";

const CustomerDashboard = () => {
  const { userEmail } = useAuth();
  const customer = getCustomerByEmail(userEmail || "");

  return (
    <ProtectedRoute requiredRole="customer">
      <Layout>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-shipping-navy mb-2">
            Welcome back, {customer ? customer.name : "Customer"}
          </h2>
          <p className="text-shipping-navy/80">
            Get instant carrier quotes with your negotiated rates in 3 simple steps.
          </p>
        </div>
        
        <CustomerShippingForm />
      </Layout>
    </ProtectedRoute>
  );
};

export default CustomerDashboard;
