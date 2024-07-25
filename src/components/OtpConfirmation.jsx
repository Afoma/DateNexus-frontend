import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import TopCurve from "./TopCurve";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OtpConfirmation = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr]">
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
        <div className="lg:hidden absolute top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="px-6 flex flex-col gap-12 md:py-[100px] md:px-[170px]">
          <h3 className="font-semibold text-black text-xl w-[254px]">
            Please check your
            <span className="text-gradient-custom"> email for a code</span>
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-custom-pink text-sm font-medium">
                      Resend code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-[44px] rounded-[8px] bg-custom-gradient"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:hidden absolute bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default OtpConfirmation;
