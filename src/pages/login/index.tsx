import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2Icon, LockIcon, UserIcon } from "lucide-react";
import { signIn } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";

// Define Zod schema
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useNavigate();
   const { language } = useLanguage();
   console.log(language)
  const [pwType, setPwType] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const togglePwType = useCallback(() => {
    setPwType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const { mutate: logIn, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
      router("/");
    },
    onError: () => {
      setError("Invalid username or password. Please try again.");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setError(null);
    logIn({ user_name: data.username, password: data.password });
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      <div className="w-full relative">
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <img
            className="my-5 lg:hidden h-[120px] w-[120px] rounded-lg"
            src={"/images/logo.jpg"}
            alt="Logo"
          />
          <h1 className="my-10 hidden bg-gradient-to-r from-[#b2ff54] via-[#57b400] to-[#87600c] bg-clip-text py-[10px] text-4xl font-black uppercase text-transparent lg:block">
            {translations.welcome[language]}
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full px-2 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                        <UserIcon
                          className="text-active"
                          aria-label="Username Icon"
                        />
                        <Input
                          placeholder={translations.username[language]}
                          {...field}
                          aria-label="Username"
                        />
                      </div>
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
                    <FormControl>
                      <div className="w-full px-2 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                        <LockIcon
                          className="text-active"
                          aria-label="Password Icon"
                        />
                        <Input
                          type={pwType === "password" ? "password" : "text"}
                          placeholder={translations.password[language]}
                          {...field}
                          aria-label="Password"
                        />
                        {pwType === "password" ? (
                          <EyeOffIcon
                            onClick={togglePwType}
                            className="cursor-pointer"
                          />
                        ) : (
                          <EyeIcon
                            onClick={togglePwType}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-max border px-16 mt-6 bg-active border-active text-black hover:text-active text-base font-bold rounded-full"
                >
                  {isPending ? <Loader2Icon className="h-4 w-4 animate-spin" /> : translations.login[language]}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="absolute bottom-0 w-full mt-10">
          <div className="flex justify-center w-full mx-auto -mb-2">
            <img
              src={"/images/leftPattern.svg"}
              alt="Left Pattern"
              className="h-[50px] w-[50px]"
            />
            <p className="bg-secondary pt-1 h-10 mt-2">{translations.new_member[language]}</p>
            <img
              src={"/images/rightPattern.svg"}
              className="h-[50px] w-[50px]"
              alt="Right Pattern"
            />
          </div>
          <div className="text-center bg-secondary py-5">
            <Button
              onClick={() => router("/register")}
              className="px-12 border bg-black hover:bg-white border-white text-white hover:text-black font-bold rounded-full"
            >
              {translations.sign_up[language]}
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="hidden lg:inline-block bg-[url('/images/ponewine.jpg')] w-full h-full bg-cover bg-center bg-no-repeat"></div> */}
      <div className="hidden lg:flex w-full h-full justify-center items-center bg-gradient-to-r from-[#87600c] via-[#57b400] to-[#b2ff54]  ">
        <img
          src="/images/ponewine.jpg"
          className="h-[200px] w-[200px] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default LoginPage;
