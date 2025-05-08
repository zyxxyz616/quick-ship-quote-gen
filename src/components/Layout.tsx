
import { ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-shipping-lightblue to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="#1A2B42"/>
                  <path d="M10 18L16 24L26 14" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-shipping-navy">ShipSmart Pro</h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm px-3 py-1 bg-shipping-navy text-white rounded-full">Customer Portal</span>
            </div>
          </div>
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
