import { Button } from "../../components/ui/button";
import { InputWithIcon } from "../../components/widgets/InputWithIcon";
import { signUp } from "../../services/userService";
import { useMutation } from "@tanstack/react-query";
import {
  CodeIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Card, CardContent } from "../../components/ui/card";

// Validation schema using Zod
const registerSchema = z
  .object({
    mobileNumber: z
      .string()
      .min(10, { message: "Mobile number must be at least 10 digits." })
      .regex(/^\d+$/, { message: "Mobile number must contain only digits." }),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirm_password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    agentCode: z.string().min(1, { message: "Referral code is required!" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      mobileNumber: "",
      name: "",
      password: "",
      confirm_password: "",
      agentCode: "",
    },
  });

  // React Query mutation for user registration
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error: any) => {
      setError(error.message || "Registration failed");
      toast.error(error.message || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setError(null);
    console.log(data);
  };

  console.log(translations);

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="border-0 md:w-[30%] lg:w-[30%] w-full ">
        <CardContent className="p-9">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-primary">
              {translations.register[language] || "Register"}
            </h2>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4">
                {/* Mobile Number Input */}
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>
                        {translations.mobile_number[language] ||
                          "Mobile Number"}
                      </FormLabel> */}
                      <FormControl>
                        <InputWithIcon
                          icon={<PhoneIcon className="h-5 w-5" />}
                          placeholder={
                            translations.enterMobileNumber[language] ||
                            "Enter mobile number"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>
                        {translations.accountName[language] || "Name"}
                      </FormLabel> */}
                      <FormControl>
                        <InputWithIcon
                          icon={<UserIcon className="h-5 w-5" />}
                          placeholder={
                            translations.enterName[language] || "Enter name"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>
                        {translations.password[language] || "Password"}
                      </FormLabel> */}
                      <FormControl>
                        <InputWithIcon
                          icon={<LockIcon className="h-5 w-5" />}
                          type={"password"}
                          placeholder={
                            translations.enterPassword[language] ||
                            "Enter password"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Input */}
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>
                        {translations.confirm_password[language] ||
                          "Confirm Password"}
                      </FormLabel> */}
                      <FormControl>
                        <InputWithIcon
                          icon={<LockIcon className="h-5 w-5" />}
                          type={"password"}
                          placeholder={
                            translations.confirm_password[language] ||
                            "Confirm password"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Agent Code Input */}
                <FormField
                  control={form.control}
                  name="agentCode"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>
                        {translations.referral_code[language] ||
                          "Referral Code"}
                      </FormLabel> */}
                      <FormControl>
                        <InputWithIcon
                          icon={<CodeIcon className="h-5 w-5" />}
                          placeholder={
                            translations.enterReferralCode[language] ||
                            "Enter referral code"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      {translations.processing[language] || "Processing..."}
                    </>
                  ) : (
                    translations.register[language] || "Register"
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {translations.already_have_an_account[language] ||
                    "Already have an account?"}{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    {translations.login[language] || "Login"}
                  </a>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
