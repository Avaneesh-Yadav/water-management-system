
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  mobileNumber: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      mobileNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // In a real app, this would verify credentials via API
    console.log("Login attempt:", data);
    
    // Simulating admin/user login logic
    if (data.mobileNumber === "admin" && data.password === "admin") {
      toast({
        title: "Admin Login Successful",
        description: "Welcome back, Admin!",
      });
      navigate("/admin/dashboard");
    } else {
      // For demo, any other credentials log in as a user
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number / Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number or username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>For demo purposes:</p>
            <p>Admin login: admin/admin</p>
            <p>User: use any credentials</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate("/register")}>
            Don't have an account? Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
