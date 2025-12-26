import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface LayoutProps extends Readonly< {
  children:ReactNode
}> {
    
}


export interface Metadata {
  label: string;
  icon: LucideIcon;
  value: number;
}
