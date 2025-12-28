"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { CurrentUser } from "../types/user.type";
import type { IResponse } from "../types/response.type";
import type { UseQueryResult } from "@/hooks/useQuery";
import useQuery from "@/hooks/useQuery";
import { getCurrentUser } from "@/services/api/user.api.service";

// ✅ Correct type for context
const context = createContext<UseQueryResult<IResponse<CurrentUser>> | null>(null);

function CurrentUserProvider({ children }: { children: ReactNode }) {
  // get the query result
  const result = useQuery<IResponse<CurrentUser>>("getCurrentUser", () => getCurrentUser());

  // ✅ Pass the actual query result, not `true`
  return <context.Provider value={result}>{children}</context.Provider>;
}

export default CurrentUserProvider;

// Custom hook to consume context
export function useCurrentUserProvider() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("Wrap with CurrentUserProviderContext");
  return ctx;
}
