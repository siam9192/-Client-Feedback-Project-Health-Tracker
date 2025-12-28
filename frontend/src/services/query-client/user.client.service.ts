import { CurrentUser } from "@/types/user.type";
import { getCurrentUser } from "../api/user.api.service";
import useQuery from "@/hooks/useQuery";
import { IResponse } from "@/types/response.type";

export function userGetCurrentUserQuery() {
  return useQuery<IResponse<CurrentUser>>("getCurrentUser", () => getCurrentUser());
}
