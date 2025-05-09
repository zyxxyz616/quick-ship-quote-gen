
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockCustomers } from "@/data/mockData";
import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const { toast } = useToast();

  const handleEditClick = (customer: Customer) => {
    setEditingId(customer.id);
    setEditValue(customer.markup);
  };

  const handleSaveClick = (id: string) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, markup: editValue } : c
    ));
    
    setEditingId(null);
    
    toast({
      title: "Markup updated",
      description: "Customer markup has been successfully updated"
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-shipping-navy">Customer Accounts</CardTitle>
        <CardDescription>
          Manage customer accounts and markup percentages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Markup %</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>{new Date(customer.lastLogin).toLocaleDateString()}</TableCell>
                <TableCell>
                  {editingId === customer.id ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-20"
                    />
                  ) : (
                    `${customer.markup}%`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === customer.id ? (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleSaveClick(customer.id)}
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditClick(customer)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerList;
