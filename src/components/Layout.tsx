
import { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/navigation/NavBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-shipping-lightblue to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <NavBar />
          <p className="text-shipping-navy/80 mt-2">Intelligent Rate Calculator</p>
        </header>
        <main>{children}</main>
        <footer className="mt-12 text-center text-sm text-shipping-navy/70 py-4">
          <p>© 2025 ShipSmart Pro. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
