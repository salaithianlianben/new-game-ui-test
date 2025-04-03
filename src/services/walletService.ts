import { TransactionHistory } from "../@types/transaction-history";
import { ApiConfig } from "../configs/apiConfig";
import { apiService } from "../utils/apiService";
import get from "lodash/get";
interface DepositParams {
  agent_payment_type_id: number;
  reference_number: string;
  amount: number;
  payment_slip?: File;
}

const depositWallet = async (formData: FormData | DepositParams) => {
  try {
    // Check if formData is a FormData object (file upload)
    if (formData instanceof FormData) {
      const { data } = await apiService.post(
        `${ApiConfig.baseUrl}/${ApiConfig.deposit}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    }

    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.deposit}`,
      {
        agent_payment_type_id: formData.agent_payment_type_id,
        refrence_no: formData.reference_number,
        amount: formData.amount,
      }
    );

    return data as {
      agent_payment_type_id: number;
      user_id: number;
      agent_id: number;
      amount: string;
      refrence_no: string;
      updated_at: string;
      created_at: string;
      id: number;
    };
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message", "Deposit failed")}`);
  }
};

const withdrawWallet = async ({
  payment_type_id,
  account_name,
  account_number,
  amount,
}: {
  payment_type_id: number;
  account_name: string;
  account_number: string;
  amount: number;
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.withdraw}`,
      {
        payment_type_id,
        account_name,
        account_number,
        amount,
      }
    );

    return data as {
      payment_type_id: number;
      user_id: number;
      agent_id: number;
      amount: string;
      updated_at: string;
      created_at: string;
      id: number;
    };
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchDepositHistory = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.depositHistory}`
    );

    return data.data as TransactionHistory[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchWithdrawHistory = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.withdrawHistory}`
    );

    return data.data as TransactionHistory[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

export {
  depositWallet,
  withdrawWallet,
  fetchDepositHistory,
  fetchWithdrawHistory,
};
