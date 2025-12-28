import { LayoutProps } from "@/types";

function Container({ children }: LayoutProps) {
  return <div className="max-w-[1600px] mx-auto lg:p-0 p-2">{children}</div>;
}

export default Container;
