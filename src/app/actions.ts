"use server";

import { BASE_URL } from "@/helpers/constant";
import { ApiResponseType } from "@/types/ApiResponse";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const deleteMessageById = async (id: string, userId: string) => {
  const resp = await axios.delete<ApiResponseType>(
    BASE_URL + "/api/delete-message/" + id + "?userId=" + userId
  );
  if (resp.data.success) {
    revalidatePath("/api/get-messages");
  }
};

export const refreshMessageThread = async () => {
  revalidatePath("/api/get-messages");
};
