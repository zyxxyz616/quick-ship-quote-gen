
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "customer" | "manager" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userEmail: string | null;
  login: (email: string, role: "customer" | "manager") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole") as UserRole;
    const email = localStorage.getItem("userEmail");
    
    setIsAuthenticated(loggedIn);
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const login = (email: string, role: "customer" | "manager") => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
