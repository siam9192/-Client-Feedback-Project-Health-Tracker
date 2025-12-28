import useMutate from "@/hooks/useMutation";
import { LoginPayload } from "@/types/auth.type";
import { login, logout } from "../api/auth.api.service";

export function useLoginMutation() {
  return useMutate<null, LoginPayload>(login);
}

export function useLogoutMutation() {
  return useMutate<null, undefined>(logout);
}
