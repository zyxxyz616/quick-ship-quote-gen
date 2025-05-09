
import Layout from "@/components/Layout";
import ShipmentCalculator from "@/components/shipping/ShipmentCalculator";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-shipping-navy mb-2">Intelligent Rate Calculator</h2>
          <Link to="/manager" className="px-3 py-1 bg-shipping-navy text-white rounded-md text-sm">
            Manager Portal →
          </Link>
        </div>
        <p className="text-shipping-navy/80">
          Welcome back. Get instant carrier quotes with your negotiated rates in 3 simple steps.
        </p>
      </div>
      
      <ShipmentCalculator />
    </Layout>
  );
};

export default Index;
