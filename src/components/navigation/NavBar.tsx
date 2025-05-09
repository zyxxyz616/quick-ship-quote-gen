
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Package, Settings } from "lucide-react";

export default function NavBar() {
  const { isAuthenticated, userRole, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <div className="mr-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="8" fill="#1A2B42"/>
            <path d="M10 18L16 24L26 14" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold text-shipping-navy">ShipSmart Pro</h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="hidden md:flex items-center">
              <User className="h-4 w-4 mr-1 text-shipping-navy/70" />
              <span className="text-sm text-shipping-navy/70">{userEmail}</span>
            </div>
            
            {userRole === "customer" ? (
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-1" />
                  <span>Shipping</span>
                </Button>
              </Link>
            ) : (
              <Link to="/manager">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  <span>Manager Portal</span>
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              <span>Logout</span>
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button>
              <User className="h-4 w-4 mr-1" />
              <span>Sign In</span>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
