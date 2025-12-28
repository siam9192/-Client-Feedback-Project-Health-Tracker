import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import type { LayoutProps } from "@/types";

export default function layout({ children }: LayoutProps) {
  return (
    <div className="lg:flex">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen lg:block hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="lg:flex-1 ">
        <Header />
        <div className="lg:p-5">
          <Container>{children}</Container>
        </div>
      </main>
    </div>
  );
}
