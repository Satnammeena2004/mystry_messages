"use server";

import { BASE_URL } from "@/helpers/constant";
import { unstable_update } from "@/lib/auth";
import { ApiResponseType } from "@/types/ApiResponse";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const deleteMessageById = async (id: string, userId: string) => {
  // const resp = await axios.post<ApiResponseType>(
  //   BASE_URL + "/api/delete-message/" + id + "?userId=" + userId
  // );
  // if (resp.data.success) {
    revalidatePath("/api/get-messages");
  // }
};

export const refreshMessageThread = async () => {
  revalidatePath("/api/get-messages");
};


export async function updateSessionByManual(){
  unstable_update({user:{username:"helllllllllll"}})
}
