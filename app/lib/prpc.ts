import axios from "axios";

export async function callPRPC(
  endpoint: string,
  method: string,
  params?: Record<string, unknown>
) {
  const response = await axios.post(
    endpoint,
    {
      jsonrpc: "2.0",
      method,
      params,
      id: 1,
    },
    {
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data?.error) {
    throw new Error(response.data.error.message || "pRPC error");
  }

  return response.data.result;
}
