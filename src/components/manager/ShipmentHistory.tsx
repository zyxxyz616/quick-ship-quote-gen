
import { mockShippingRequests } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ShipmentHistory = () => {
  // Sort requests by date (most recent first)
  const sortedRequests = [...mockShippingRequests].sort(
    (a, b) => new Date(b.dateRequested).getTime() - new Date(a.dateRequested).getTime()
  );

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "outline";
      case "Pending":
        return "secondary";
      case "Failed":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-shipping-navy">Recent Shipment Requests</CardTitle>
        <CardDescription>
          View and manage recent shipping requests from customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.map((request) => {
              const customer = mockShippingRequests.find(
                (sr) => sr.customerId === request.customerId
              );
              
              return (
                <TableRow key={request.id}>
                  <TableCell>
                    {new Date(request.dateRequested).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer?.customerId || "Unknown"}
                  </TableCell>
                  <TableCell>
                    {`${request.dimensions.length}x${request.dimensions.width}x${request.dimensions.height}", ${request.weight}lbs`}
                  </TableCell>
                  <TableCell>
                    {request.originWarehouse}
                  </TableCell>
                  <TableCell>
                    {request.destinationAddress.city}, {request.destinationAddress.state}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShipmentHistory;
