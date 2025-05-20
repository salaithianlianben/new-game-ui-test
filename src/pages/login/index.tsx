import { LockIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { InputWithIcon } from "../../components/widgets/InputWithIcon";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";

// Define the validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginPage = () => {

  const { language } = useLanguage();
  
  // Initialize form with validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  // Define form submission handler
  const onSubmit = (values) => {
    console.log(values);
    // Add your login logic here
  };

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="border-0 md:w-[30%] lg:w-[30%] w-full ">
        <CardContent className="p-9">
          <div className="flex flex-col items-center justify-center space-y-9 ">
            <div className="rounded-full border h-30 w-30 p-5 flex items-center justify-center">
              <span>LOGO</span>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <div className="space-y-7">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWithIcon
                            icon={<UserIcon className="h-5 w-5" />}
                            placeholder={translations.accountName[language]}
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
                        <FormControl>
                          <InputWithIcon
                            icon={<LockIcon className="h-5 w-5" />}
                            placeholder={translations.password[language]}
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="w-full space-y-5">
                  <Button className="w-full" type="submit">
                    {translations.login[language]}
                  </Button>
                  <Button
                    className="w-full border-primary text-primary"
                    variant="outline"
                    type="button"
                    onClick={goToRegister}
                  >
                    {translations.register[language]}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;