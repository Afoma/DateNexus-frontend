/* eslint-disable react/no-unescaped-entities */
import TopCurve from "./TopCurve";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Line from "@/assets/Line.svg";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";
import { useState, useEffect } from "react";
import axiosInstance from "@/services/api-client";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { PuffLoader } from "react-spinners";
import BottomCurveWhite from "./BottomCurveWhite";
import { WalletConnect } from "./WalletConnect";
import { AxiosError } from "axios";
import { useAccount } from "wagmi";
import router from "@/routes/routes";

const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(7, { message: "Password must be more than 7 characters" }),
});

type FormValues = z.infer<typeof FormSchema>;

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { address, isConnected } = useAccount();

  console.log("Address ? Connected ?",address, isConnected);

  useEffect(() => {
    if (isConnected) {
      navigate("/app/createProfile");
    }
  })

  // Function to check if user profile is complete
  const checkUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      
      // Extract user data from response
      const userData = response.data.data.user;
      
      // Check if all required profile fields are filled
      const isProfileComplete = Boolean(
        userData.age && 
        userData.gender && 
        userData.profession && 
        userData.location?.coordinates?.length === 2
      );
      
      if (isProfileComplete) {
        // If profile is complete, go directly to discover page
        navigate("/app/discover");
      } else {
        // If profile is incomplete, go to onboarding
        navigate("/app/createProfile");
      }
    } catch (error) {
      console.error("Error checking user profile:", error);
      // If there's an error, default to onboarding
      navigate("/app/createProfile");
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Sign in request
      const response = await axiosInstance.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });
      
      // Store JWT token
      localStorage.setItem("jwt", response.data.token);
      
      // Reset form
      form.reset();
      
      // Check if user profile is complete and navigate accordingly
      await checkUserProfile();
    } catch (error) {
      // Handle error with proper type checking
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred during sign in");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] overflow-hidden">
      <Toaster />
      <div className="hidden relative lg:flex lg:flex-col lg:items-center lg:justify-center min-h-screen lg:bg-custom-gradient lg:min-h-0">
        <div className="hidden lg:block absolute top-0 left-0 right-0">
          <TopCurveWhite />
        </div>
        <h3 className="text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
        <div className="hidden lg:block absolute bottom-0 right-0">
          <BottomCurveWhite />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden fixed top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="px-6 md:px-[170px] lg:px-0 md:py-[100px] flex flex-col gap-8">
          <div className="grid gap-2">
            <h3 className="font-semibold text-black text-base">
              Sign <span className="text-custom-pink">In</span>
            </h3>
            <div className="flex flex-col gap-2">
              <h3 className="text-4xl text-gradient-custom font-semibold">
                <span className="text-black">DateN</span>exus
              </h3>
              <p className="text-custom-text-secondary text-sm">
                Find Love Onchain
              </p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-custom-black text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className={cn(
                          "focus:ring-custom-pink focus:ring-2 h-[44px] rounded-[12px] bg-input-bg text-custom-black"
                        )}
                        placeholder="Enter your email address"
                        {...field}
                      />
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
                    <FormLabel className="text-custom-black text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className={cn(
                            "focus:ring-custom-pink focus:ring-2 h-[44px] rounded-[12px] bg-input-bg text-custom-black pr-10"
                          )}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link to="/app/forgot-password">
                <Button variant="link" className="flex justify-end w-full">
                  <span className="text-custom-pink text-xs">
                    Forgot password ?
                  </span>
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full bg-custom-gradient h-[44px] rounded-[12px]"
              >
                {isLoading ? (
                  <PuffLoader color="#ffffff" size={24} />
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 justify-center">
            <img src={Line} alt="" />
            <span>OR</span>
            <img src={Line} alt="" />
          </div>
          
          {/* Smart Wallet Integration */}
          <div className="w-full">
            <WalletConnect />
          </div>

          {/* <Link to="/app/createwallet" className="w-full">
            <Button
              variant="outline"
              className="font-semibold w-full text-xs h-[44px] rounded-[12px] border border-solid border-grey bg-white"
            >
              Sign in with Passkey
            </Button>
          </Link> */}
          <Link to="/app/signup">
            <Button variant="link" className="flex gap-1 w-full">
              Don't have an account?{" "}
              <span className="text-custom-pink">Sign up</span>
            </Button>
          </Link>
        </div>
        <div className="lg:hidden fixed bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default Signin;