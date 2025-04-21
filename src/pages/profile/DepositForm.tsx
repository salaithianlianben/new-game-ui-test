import React, { useState } from "react";
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
import {
  // CheckIcon,
  // CopyIcon,
  LucideLoader2,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { depositWallet } from "../../services/walletService";
import { toast } from "react-hot-toast";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { translations } from "../../configs/translations";
import { useLanguage } from "../../context/LanguageContext";

interface DepositFormProps {
  onDialogClose: () => void;
  onRefresh?: () => void;
}

// Define form schema with zod
const formSchema = z.object({
  agent_payment_type_id: z
    .string()
    .min(1, { message: "payment type is required!" }),
  amount: z
    .string()
    .min(1, { message: "Amount is required!" })
    .refine((value) => parseInt(value) >= 1000, {
      message: "Amount must be at least 1000 MMK!",
    }),
  reference_no: z.string().regex(/^\d{6}$/, {
    message: "Reference number must be exactly 6 digits (numbers only)!",
  }),
  // payment_slip: z
  //   .instanceof(File)
  //   .refine((file) => file.size > 0, { message: "Payment slip is required" })
  //   .refine((file) => file.size <= 5 * 1024 * 1024, {
  //     message: "File size must be less than 5MB",
  //   })
  //   .refine(
  //     (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
  //     { message: "Only JPEG, PNG, and GIF files are allowed" }
  //   ),
});

const DepositForm = ({ onDialogClose, onRefresh }: DepositFormProps) => {
  const { language } = useLanguage();

  // const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_payment_type_id: "",
      amount: "",
      reference_no: "",
      // payment_slip: undefined,
    },
  });

  const { data = [] } = useQuery({
    queryKey: ["GET_PAYMENT_PROVIDER"],
    queryFn: fetchPaymentProviders,
  });

  const { mutate: doPayment, isPending } = useMutation({
    mutationFn: depositWallet,
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

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // Set form value
  //     form.setValue("payment_slip", file);

  //     // Create preview
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const removePreview = () => {
  //   setPreviewImage(null);
  //   form.setValue("payment_slip", undefined as never, {
  //     shouldValidate: true,
  //   });
  //   // Reset file input
  //   if (document.getElementById("payment_slip")) {
  //     (document.getElementById("payment_slip") as HTMLInputElement).value = "";
  //   }
  // };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // const formData = new FormData();
    // formData.append("agent_payment_type_id", values.agent_payment_type_id);
    // formData.append("amount", values.amount);
    // formData.append("refrence_no", values.reference_no);
    // formData.append("image", values.payment_slip);

    doPayment({
      agent_payment_type_id: parseInt(values.agent_payment_type_id),
      amount: +values.amount,
      reference_number: values.reference_no,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="agent_payment_type_id"
          render={({ field }) => {
            const selectedProvider = data.find(
              (payment) => payment.id.toString() === field.value
            );

            return (
              <FormItem>
                <FormLabel>Payment Provider</FormLabel>
                {selectedProvider ? (
                  <div className="flex flex-row space-x-2 items-center border p-3 rounded-md bg-gray-800">
                    <img
                      src={selectedProvider.image}
                      className="h-[40px] w-[40px] rounded-md"
                    />
                    <div className="space-y-1 flex-grow">
                      <span className="block font-medium text-gray-100">
                        {selectedProvider.account_name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {selectedProvider.account_number}
                      </span>
                    </div>
                    {/* <CopyToClipboard
                      text={selectedProvider.account_number}
                      onCopy={() => setCopied(true)}
                    >
                      {copied ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </CopyToClipboard> */}
                    <button
                      type="button"
                      onClick={() => field.onChange(undefined)}
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
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
                            value={payment.id.toString()}
                            className="hover:border hover:border-active"
                          >
                            <div className="flex flex-row space-x-2">
                              <img
                                src={payment.image}
                                className="h-[40px] w-[40px] rounded-md"
                                alt="Payment"
                              />
                              <div className="space-y-1 flex flex-col">
                                <span>{payment.account_name}</span>
                                <span className="text-sm text-gray-400">
                                  {payment.account_number}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <span className="text-gray-500">
                          Payment provider are not available currently.
                        </span>
                      )}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage>
                  {form.formState.errors?.agent_payment_type_id?.message}
                </FormMessage>
              </FormItem>
            );
          }}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="amount">{translations.amount[language]}</Label>
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

        <FormField
          name="reference_no"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="reference_no">Reference Number</Label>
              <FormControl>
                <Input
                  type="text"
                  id="refrence_no"
                  placeholder="Enter Reference Number"
                  className="border border-input"
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
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.reference_no?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* <FormItem>
          <FormLabel>Payment Slip</FormLabel>
          <FormControl>
            <div className="flex flex-col space-y-2">
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                id="payment_slip"
                onChange={handleFileChange}
              />
              <Label
                htmlFor="payment_slip"
                className="flex items-center justify-center border-2 border-dashed p-4 cursor-pointer hover:bg-secondary/20 transition-colors"
              >
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Payment Slip Preview"
                      className="max-h-40 max-w-full object-contain rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 m-2"
                      onClick={removePreview}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <UploadIcon className="h-5 w-5 text-gray-200" />
                    <span className="text-muted-foreground">
                      Upload Payment Slip (Max 5MB)
                    </span>
                  </div>
                )}
              </Label>
            </div>
          </FormControl>
          <FormMessage>
            {form.formState.errors?.payment_slip?.message}
          </FormMessage>
        </FormItem> */}

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

export default DepositForm;
