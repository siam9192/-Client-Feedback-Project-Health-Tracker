import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface LayoutProps extends Readonly<{
  children: ReactNode;
}> {}

export interface DashboardSummary {
  label: string;
  icon: LucideIcon;
  value: number | string;
}

export interface Params {
  [key: string]: string | number;
}
