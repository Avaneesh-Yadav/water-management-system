
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for user
  const userData = {
    name: "John Doe",
    mobileNumber: "1234567890",
    address: "123 Main St, City",
    connectionId: "WTR-12345",
  };
  
  // Mock consumption data
  const consumptionData = [
    { month: "January", consumption: 120, amount: 2400, status: "Paid" },
    { month: "February", consumption: 135, amount: 2700, status: "Paid" },
    { month: "March", consumption: 128, amount: 2560, status: "Unpaid" },
    { month: "April", consumption: 140, amount: 2800, status: "Unpaid" },
  ];
  
  const handlePayment = (month: string) => {
    // In a real app, this would open a payment gateway
    toast({
      title: "Payment Initiated",
      description: `Processing payment for ${month}...`,
    });
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Your payment for ${month} has been processed successfully.`,
      });
    }, 2000);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">WaterBill Manager</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Name:</span> {userData.name}
              </div>
              <div>
                <span className="font-medium">Mobile:</span> {userData.mobileNumber}
              </div>
              <div>
                <span className="font-medium">Address:</span> {userData.address}
              </div>
              <div>
                <span className="font-medium">Connection ID:</span> {userData.connectionId}
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Water Consumption Summary</CardTitle>
              <CardDescription>Your recent water usage and bills</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Consumption (L)</TableHead>
                    <TableHead>Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consumptionData.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell>{item.month}</TableCell>
                      <TableCell>{item.consumption}</TableCell>
                      <TableCell>₹{item.amount}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === "Unpaid" && (
                          <Button size="sm" onClick={() => handlePayment(item.month)}>
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Record of your previous payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>10 Jan 2025</TableCell>
                  <TableCell>TXN123456</TableCell>
                  <TableCell>January</TableCell>
                  <TableCell>₹2400</TableCell>
                  <TableCell>Credit Card</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>15 Feb 2025</TableCell>
                  <TableCell>TXN234567</TableCell>
                  <TableCell>February</TableCell>
                  <TableCell>₹2700</TableCell>
                  <TableCell>UPI</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UserDashboard;
