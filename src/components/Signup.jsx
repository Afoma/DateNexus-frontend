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

const FormSchema = z.object({
  email: z.string().email(),
});

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="h-screen grid">
      <TopCurve />
      <div className="px-6 flex flex-col gap-8">
        <div className="grid gap-2">
          <h3 className="font-semibold text-black text-base">
            Sign <span className="text-custom-pink">In</span>
          </h3>
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl text-custom-pink font-semibold">
              <span className="text-black">DateN</span>exus
            </h3>
            <p className="text-custom-text-secondary text-sm">
              Find Love Onchain
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        "focus:ring-custom-pink focus:ring-2 h-[44px] rounded-[12px]"
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
              className="w-full bg-custom-pink h-[44px] rounded-[12px]"
            >
              Continue
            </Button>
          </form>
        </Form>
        <div className="flex gap-2 justify-center">
          <img src={Line} alt="" />
          <span>OR</span>
          <img src={Line} alt="" />
        </div>
        <Button
          variant="outline"
          className="font-semibold text-xs h-[44px] rounded-[12px] border border-solid border-grey bg-white"
        >
          Sign up with Passkey
        </Button>
        <Link to="/signin">
          <Button variant="link" className="flex gap-1 w-full">
            Have an account already?{" "}
            <span className="text-custom-pink">Sign in</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
