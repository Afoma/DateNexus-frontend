/* eslint-disable react/no-unescaped-entities */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { base } from "@/services/api-client";
import User from "@/assets/user.svg";
import Email from "@/assets/mail.svg";

const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters" }),
  email: z.string().email(),
  privacyPolicy: z.boolean().default(false),
});

const Waitlist = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        toast.success("Application submitted successfully.");
      }
    );
  };

  return (
    <div>
      <Toaster />
      <div className="flex flex-col gap-8 w-[650px] justify-between items-center">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-5xl text-gradient-custom font-semibold">
            Join the Waitlist
          </h3>
          <p className="text-custom-text-secondary text-xl text-center">
            Be first to join DateNexus and connect with a network of like-minded
            individuals.
          </p>
        </div>
        <div className="w-[400px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-10 justify-between h-full"
            >
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <img
                            src={User}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            className={cn(
                              "focus:ring-custom-pink focus:ring-2 h-[56px] rounded-[12px] bg-input-bg text-custom-black pl-14"
                            )}
                            placeholder="Enter your name"
                            {...field}
                          />
                        </div>
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
                      <FormControl>
                        <div className="relative">
                          <img
                            src={Email}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            className={cn(
                              "focus:ring-custom-pink focus:ring-2 h-[56px] rounded-[12px] bg-input-bg text-custom-black pl-14"
                            )}
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-custom-gradient h-[60px] rounded-[12px]"
              >
                {isLoading ? (
                  <PuffLoader color="#ffffff" size={24} />
                ) : (
                  "Join The Waitlist Today"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
