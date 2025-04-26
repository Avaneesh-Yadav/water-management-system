
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">WaterBill Manager</h1>
          <div>
            <Button variant="outline" className="mr-2" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Water Consumption & Payment Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Register with your mobile number, view your water consumption, 
              and pay your bills online. Simplify your water utility management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <Card>
              <CardHeader>
                <CardTitle>Easy Registration</CardTitle>
                <CardDescription>Register with just your mobile number</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create your account in seconds and start managing your water bills immediately.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/register")}>
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Track Consumption</CardTitle>
                <CardDescription>Monitor your water usage</CardDescription>
              </CardHeader>
              <CardContent>
                <p>View detailed reports of your water consumption and understand your usage patterns.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Check Usage
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Easy Payments</CardTitle>
                <CardDescription>Pay your dues instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Make secure online payments and keep track of your payment history anytime, anywhere.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                  Pay Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">WaterBill Manager</h3>
              <p className="text-blue-100">Simplifying water utility management</p>
            </div>
            <div>
              <p>© 2025 WaterBill Manager. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
