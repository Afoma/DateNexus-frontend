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
import { useState } from "react";
import axiosInstance from "@/services/api-client";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { PuffLoader } from "react-spinners";
import BottomCurveWhite from "./BottomCurveWhite";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(7, { message: "Password must be more than 7 characters" }),
    passwordConfirm: z
      .string()
      .min(7, { message: "Password must be more than 7 characters" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axiosInstance
      .post("/auth/signup", {
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      })
      .then(() => {
        localStorage.setItem("userEmail", values.email);
        localStorage.setItem("tempPassword", values.password);
        navigate("/app/otp");
        form.reset();
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
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
              Sign <span className="text-custom-pink">Up</span>
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
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-custom-black text-sm">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          className={cn(
                            "focus:ring-custom-pink focus:ring-2 h-[44px] rounded-[12px] bg-input-bg text-custom-black pr-10"
                          )}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
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
          <div className="flex flex-col gap-2 mb-4 lg:mb-0">
            <Link to="/app/createwallet" className="w-full">
              <Button
                variant="outline"
                className="font-semibold w-full text-xs h-[44px] rounded-[12px] border border-solid border-grey bg-white"
              >
                Sign in with Passkey
              </Button>
            </Link>
            <Link to="/app/signin">
              <Button variant="link" className="flex gap-1 w-full h-auto p-0">
                Already have an account?{" "}
                <span className="text-custom-pink">Sign in</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:hidden fixed bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default Signup;
