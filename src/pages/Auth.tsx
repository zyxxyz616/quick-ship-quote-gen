
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserRole = "customer" | "manager";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Mock authentication
      setTimeout(() => {
        // Store user role in localStorage for persistence
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${email}`,
        });
        
        // Redirect based on role
        if (role === "manager") {
          navigate("/manager");
        } else {
          navigate("/");
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-shipping-navy">Welcome to ShipSmart Pro</CardTitle>
            <CardDescription>Sign in to access your shipping portal</CardDescription>
          </CardHeader>
          <Tabs defaultValue="customer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer Login</TabsTrigger>
              <TabsTrigger value="manager">Manager Login</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="your.email@example.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleLogin("customer")} 
                  className="w-full" 
                  disabled={!email || !password || isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="manager">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="manager-email">Email</Label>
                  <Input 
                    id="manager-email" 
                    placeholder="manager@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager-password">Password</Label>
                  <Input 
                    id="manager-password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleLogin("manager")}
                  className="w-full bg-shipping-navy"
                  disabled={!email || !password || isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In as Manager"}
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
