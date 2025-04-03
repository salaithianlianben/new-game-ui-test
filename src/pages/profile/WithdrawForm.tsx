import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPaymentProviders } from "../../services/paymentProviderService";
import { getMe } from "../../services/userService";
import { withdrawWallet } from "../../services/walletService";
import { toast } from "react-hot-toast";
import { LucideLoader2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../configs/translations";

interface WithdrawFormProps {
  onDialogClose: () => void;
  onRefresh?: () => void;
}

const WithdrawForm = ({ onDialogClose, onRefresh }: WithdrawFormProps) => {
  const { language } = useLanguage();

  const { data = [] } = useQuery({
    queryKey: ["GET_PAYMENT_PROVIDER"],
    queryFn: fetchPaymentProviders,
  });

  const { data: user } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });

  const formSchema = z.object({
    payment_type_id: z.string().min(1, { message: "It is required!" }),
    amount: z
      .string()
      .min(1, { message: "It is required!" })
      .refine(
        (value) => {
          const amount = parseInt(value);
          return amount <= Number(user?.balance ?? 0);
        },
        {
          message: "Amount must be between 10,000 and your balance!",
        }
      ),
    account_name: z.string().min(1, { message: "It is required!" }),
    account_number: z.string().min(1, { message: "It is required!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment_type_id: "",
      amount: "",
      account_name: "",
      account_number: "",
    },
  });

  const { mutate: doWithdraw, isPending } = useMutation({
    mutationFn: withdrawWallet,
    onSuccess: () => {
      onDialogClose();
      onRefresh?.();
    },
    onError: (error) => {
      console.error(error);
      toast(`${error.message}`, {
        style: {
          backgroundColor: "#FF4444",
          color: "white",
          borderRadius: "8px",
          padding: "10px",
          fontWeight: "bold",
        },
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    doWithdraw({
      account_name: values.account_name,
      account_number: values.account_number,
      amount: parseInt(values.amount),
      payment_type_id: parseInt(values.payment_type_id),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full rounded-lg bg-active text-black flex flex-row px-8 py-5 items-center justify-between">
          <span>{translations.balance[language]}</span>
          <span className="text-lg font-bold">{user?.balance ?? 0}</span>
        </div>
        <FormField
          control={form.control}
          name="payment_type_id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Payment Provider</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-secondary">
                    {data.length > 0 ? (
                      data.map((payment, idx) => (
                        <SelectItem
                          key={idx}
                          value={payment.payment_type_id.toString()}
                          className="hover:border hover:border-active"
                        >
                          {payment.payment_type}
                        </SelectItem>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        Payment provider are not available currently.
                      </span>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage>
                  {form.formState.errors?.payment_type_id?.message}
                </FormMessage>
              </FormItem>
            );
          }}
        />

        <FormField
          name="account_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="account_name">
                {translations.accountName[language]}
              </Label>
              <FormControl>
                <Input type="text" className="border border-input" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.account_name?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="account_number"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="account_number">
                {translations.accountNumber[language]}
              </Label>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onKeyDown={(e) => {
                    if (
                      !/^[0-9]+$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className="border border-input"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.account_number?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="amount">Amount</Label>
              <FormControl>
                <Input
                  type="text"
                  id="amount"
                  {...field}
                  onKeyDown={(e) => {
                    // Allow only numeric input
                    if (
                      !/^[0-9]+$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className="border border-input"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.amount?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-end items-center space-x-3">
          <Button
            type="button"
            className="border border-active hover:bg-secondary"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-active text-black hover:text-white hover:bg-secondary hover:border hover:border-active"
          >
            {isPending ? (
              <LucideLoader2 className="animate-spin h-3 w-3" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WithdrawForm;
