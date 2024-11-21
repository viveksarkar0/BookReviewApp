

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useNavigate } from 'react-router-dom';


import { Link } from "react-router-dom";
import axios from "axios";
import { login } from "@/services/authService";

// Define the schema for the form
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>; // Type inference for the form data

function Login() {


  
  // Initialize the form with react-hook-form and zod schema
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "", // Add default value for password
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data);
      console.log(response.status) // Replace with your actual signup API route
      if (response.status === 200) {
        alert("Signup successful! Please log in.");
       
        window.location.href = "/";
     
      }
    } catch (error) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
        console.error("Signup error:", errorMessage);
        alert(errorMessage);
      } else {
        // Handle unexpected error types
        console.error("An unexpected error occurred:", error);
        alert("Signup failed. Please try again.");
      }
    }
  };


  return (
    
    <div className="flex items-center justify-center h-[90vh] mt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your account password. Make sure it’s strong.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Submit</Button>

          {/* New User Section */}
          <div className="flex justify-end mt-4">
            <p className="text-sm text-gray-500">
              New user?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline" >
                Sign up here.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login


