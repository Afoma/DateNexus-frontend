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
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";
import { useState } from "react";
import axiosInstance from "@/services/api-client";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import BottomCurveWhite from "./BottomCurveWhite";

const FormSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axiosInstance
      .post("/auth/forgot-password", {
        email: values.email,
      })
      .then(() => {
        form.reset();
        setIsLoading(false);
        localStorage.setItem("email", values.email);
        localStorage.setItem("resendForgot", true);
        toast.success("An OTP was sent to your email.");
        setTimeout(() => {
          navigate("/app/otp");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] relative font-sans">
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
        <div className="w-[80%] md:py-[100px] flex flex-col gap-20">
          <div className="grid gap-2">
            <h3 className="font-semibold text-black text-3xl">
              Forgot <span className="text-gradient-custom">Password</span>
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-custom-text-secondary text-sm md:text-base">
                Don't worry! we got you covered. Please enter your registered
                email address below.
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
        </div>
        <div className="lg:hidden fixed bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
