/* eslint-disable react/no-unescaped-entities */
import Layouts from "./layouts/NoAuthLayout";
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
import { useState } from "react";
import { PuffLoader } from "react-spinners";
//import axiosInstance from "@/services/api-client";
//import toast from "react-hot-toast";
//import { Toaster } from "react-hot-toast";

const FormSchema = z.object({
  email: z.string().email(),
});

const SmartWalletSignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app/verify");
    }, 5000);
  };

  return (
    <Layouts>
      <div className="h-full px-8 md:px-[100px] flex flex-col justify-between my-[120px] lg:my-[50px]">
        <div className="grid gap-2">
          <h3 className="font-semibold text-custom-black text-base">
            Sign in to your{" "}
            <span className="text-gradient-custom">Smart Wallet</span>
          </h3>
          <div className="">
            <p className="text-custom-text-secondary text-sm font-medium">
              See our{" "}
              <span className="underline text-custom-pink">privacy policy</span>{" "}
              for more info. Not your device? use a private window
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="flex gap-2 justify-center">
          <img src={Line} alt="" />
          <span>OR</span>
          <img src={Line} alt="" />
        </div>
        <Link to="/app/verify" className="w-full">
          <Button
            variant="outline"
            className="font-semibold w-full text-xs h-[44px] rounded-[12px] border border-solid border-grey bg-white"
          >
            Sign in with Passkey
          </Button>
        </Link>
        <p className="text-xs text-custom-text-secondary text-center mt-12">
          We use strictly necessary cookies to enable essential information, see
          our <span className="underline text-custom-pink">Cookie Policy</span>{" "}
          and <span className="underline text-custom-pink">Privacy Policy</span>
          . This site is protected by reCAPTCHA AND THE{" "}
          <span className="underline text-custom-pink">
            Google Privacy Policy
          </span>{" "}
          The AND{" "}
          <span className="underline text-custom-pink">Terms of Service </span>{" "}
          Apply.
        </p>
      </div>
    </Layouts>
  );
};

export default SmartWalletSignIn;
