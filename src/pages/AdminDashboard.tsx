
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      mobile: "1234567890",
      address: "123 Main St, City",
      connectionId: "WTR-12345",
      dueAmount: 5360,
      paymentStatus: "Partial",
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "9876543210",
      address: "456 Park Ave, Town",
      connectionId: "WTR-23456",
      dueAmount: 0,
      paymentStatus: "Paid",
    },
    {
      id: 3,
      name: "Robert Johnson",
      mobile: "5554443333",
      address: "789 Oak Dr, Village",
      connectionId: "WTR-34567",
      dueAmount: 3200,
      paymentStatus: "Unpaid",
    },
    {
      id: 4,
      name: "Sarah Williams",
      mobile: "1112223334",
      address: "101 Pine Rd, County",
      connectionId: "WTR-45678",
      dueAmount: 1500,
      paymentStatus: "Partial",
    },
  ];
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm) ||
    user.connectionId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewDetails = (userId: number) => {
    // In a real app, this would navigate to user details page
    navigate(`/admin/user/${userId}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center">{users.length}</CardTitle>
              <CardDescription className="text-center">Total Users</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center">₹10,060</CardTitle>
              <CardDescription className="text-center">Total Dues</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center">₹48,500</CardTitle>
              <CardDescription className="text-center">Total Collection</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all registered users</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, mobile or connection ID"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Connection ID</TableHead>
                  <TableHead>Due Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell>{user.connectionId}</TableCell>
                      <TableCell>₹{user.dueAmount}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : 
                          user.paymentStatus === "Unpaid" ? "bg-red-100 text-red-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {user.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => handleViewDetails(user.id)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
