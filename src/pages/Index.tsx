
import Layout from "@/components/Layout";
import ShipmentCalculator from "@/components/shipping/ShipmentCalculator";

const Index = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-shipping-navy mb-2">Intelligent Rate Calculator</h2>
        <p className="text-shipping-navy/80">
          Welcome back. Get instant carrier quotes with your negotiated rates in 3 simple steps.
        </p>
      </div>
      
      <ShipmentCalculator />
    </Layout>
  );
};

export default Index;
