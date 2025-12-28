"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, KanbanSquare, AlertTriangle, PlusCircle } from "lucide-react";
const navItems = [
  {
    label: "Home",
    href: "/admin",
    icon: Home,
  },
  {
    label: "Projects Group",
    href: "/admin/projects",
    icon: KanbanSquare,
  },
  {
    label: "Risks",
    href: "/admin/risks",
    icon: AlertTriangle,
  },
  {
    label: "Add Project",
    href: "/admin/add-project",
    icon: PlusCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white  shadow-sm flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 ">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          Project <span className="text-primary">Pulse</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                group flex items-center gap-3 rounded-lg px-4 py-2.5
                text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/90 text-primary-content shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {/* Active Indicator */}
              <span
                className={`
                  h-5 w-1 rounded-full
                  ${isActive ? "bg-primary-content" : "bg-transparent group-hover:bg-gray-300"}
                `}
              />

              <Icon size={18} />

              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
