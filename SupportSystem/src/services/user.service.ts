import { api } from "../api/api";
import { User } from "../types/auth";

export interface MeResponse {
    user: User;
}

export const getCurrentUser = async ():Promise<MeResponse> => {
    const {data} = await api.get<MeResponse>("/me");

    return data;
}