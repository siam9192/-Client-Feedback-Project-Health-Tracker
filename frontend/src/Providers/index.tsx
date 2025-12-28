"use client";
import { ReactNode } from "react";
import CurrentUserProvider from "./CurrentUserProvider";

interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}

export default Providers;
