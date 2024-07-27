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
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { Checkbox } from "@/components/ui/checkbox";
import { base } from "@/services/api-client";

const FormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must contain at least 4 characters" }),
  email: z.string().email(),
  privacyPolicy: z.boolean().default(false),
});

const Waitlist = () => {
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

    const payload = {
      email: values.email,
      name: values.name,
      privacyPolicy: `${values.privacyPolicy}`,
    };

    base(import.meta.env.VITE_WAITLIST_AIRTABLE_TABLE).create(
      [
        {
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          toast.error("Something went wrong, Try Again.");
          setIsLoading(false);
          return;
        }
        records?.forEach(function () {
          //reset();
        });
        setIsLoading(false);
        setTimeout(() => navigate("/thanks"), 1000);
        toast.success("Application submitted successfully.");
      }
    );
  };

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] overflow-hidden">
      <Toaster />
      <div className="hidden lg:grid lg:min-h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className=" text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
      </div>
      <div className="flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden fixed top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="w-[80%] h-[60%] md:h-[100%] md:px-[100px] md:py-[100px] flex flex-col gap-8">
          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-2xl text-black font-semibold">
              Join the <span className="text-gradient-custom">Waitlist</span>
            </h3>
            <p className="text-custom-text-secondary text-xs text-center">
              We’ll only contact you to learn about your needs and to provide
              updates on DateNexus.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-between h-full"
            >
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-custom-black text-sm">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            "focus:ring-custom-pink focus:ring-2 h-[44px] rounded-[12px] bg-input-bg text-custom-black"
                          )}
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>
              <div className="flex flex-col gap-3 items-center">
                <FormField
                  control={form.control}
                  name="privacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{" "}
                          <span className="text-gradient-custom">
                            privacy policy.
                          </span>
                        </FormLabel>
                      </div>
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
              </div>
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

export default Waitlist;
