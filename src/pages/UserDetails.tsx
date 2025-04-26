
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock user data - in a real app, this would be fetched based on id
  const userData = {
    id: parseInt(id || "1"),
    name: "John Doe",
    mobile: "1234567890",
    address: "123 Main St, City",
    connectionId: "WTR-12345",
    registeredOn: "15 Jan 2025",
    status: "Active",
  };
  
  // Mock consumption data
  const consumptionData = [
    { month: "January", consumption: 120, amount: 2400, reading: 5120, status: "Paid" },
    { month: "February", consumption: 135, amount: 2700, reading: 5255, status: "Paid" },
    { month: "March", consumption: 128, amount: 2560, reading: 5383, status: "Unpaid" },
    { month: "April", consumption: 140, amount: 2800, reading: 5523, status: "Unpaid" },
  ];
  
  // Mock payment history
  const paymentHistory = [
    { id: "TXN123456", date: "10 Jan 2025", month: "January", amount: 2400, method: "Credit Card" },
    { id: "TXN234567", date: "15 Feb 2025", month: "February", amount: 2700, method: "UPI" },
  ];
  
  const [newReading, setNewReading] = useState("");
  
  const handleAddReading = () => {
    // In a real app, this would update the database
    const reading = parseInt(newReading);
    if (isNaN(reading)) {
      toast({
        title: "Invalid Reading",
        description: "Please enter a valid meter reading.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reading Added",
      description: `New meter reading of ${reading} has been recorded.`,
    });
    setNewReading("");
  };
  
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">WaterBill Manager</h1>
          <div>
            <Button variant="outline" className="mr-2" onClick={() => navigate("/admin/dashboard")}>
              Back to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
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
                <span className="font-medium">Mobile:</span> {userData.mobile}
              </div>
              <div>
                <span className="font-medium">Address:</span> {userData.address}
              </div>
              <div>
                <span className="font-medium">Connection ID:</span> {userData.connectionId}
              </div>
              <div>
                <span className="font-medium">Registered On:</span> {userData.registeredOn}
              </div>
              <div>
                <span className="font-medium">Status:</span> {userData.status}
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Add New Meter Reading</CardTitle>
              <CardDescription>Record the latest meter reading for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label htmlFor="meter-reading" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Meter Reading
                  </label>
                  <Input
                    id="meter-reading"
                    type="number"
                    placeholder="Enter current reading"
                    value={newReading}
                    onChange={(e) => setNewReading(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddReading}>Add Reading</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="consumption" className="mb-8">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="consumption">Consumption History</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>
          <TabsContent value="consumption">
            <Card>
              <CardHeader>
                <CardTitle>Water Consumption History</CardTitle>
                <CardDescription>Monthly water usage and billing details</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Meter Reading</TableHead>
                      <TableHead>Consumption (L)</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consumptionData.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>{item.reading}</TableCell>
                        <TableCell>{item.consumption}</TableCell>
                        <TableCell>₹{item.amount}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Record of past payments made by the user</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.length > 0 ? (
                      paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.month}</TableCell>
                          <TableCell>₹{payment.amount}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No payment records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserDetails;
