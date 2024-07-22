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

const FormSchema = z.object({
  email: z.string().email(),
});

const Signup = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    navigate("/otp");
  }

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr]">
      <div className="hidden lg:grid lg:h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className=" text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
      </div>
      <div className="lg:hidden">
        <TopCurve />
      </div>
      <div className="px-6 md:px-[170px] md:py-[100px] flex flex-col gap-8">
        <div className="grid gap-2">
          <h3 className="font-semibold text-black text-base">
            Sign <span className="text-custom-pink">Up</span>
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
        <Link to="/createwallet" className="w-full">
          <Button
            variant="outline"
            className="font-semibold w-full text-xs h-[44px] rounded-[12px] border border-solid border-grey bg-white"
          >
            Sign in with Passkey
          </Button>
        </Link>
        <Link to="/signup">
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
