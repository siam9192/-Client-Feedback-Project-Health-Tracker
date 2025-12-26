'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
} from 'lucide-react';

const navItems = [
  {
    label: 'Home',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban,
  },
  {
    label: 'Risks',
    href: '/admin/risks',
    icon: CheckSquare,
  },
  {
    label: 'Add Project',
    href: '/admin/add-project',
    icon: CheckSquare,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white font">
      {/* Logo */}
      <div className="flex h-14 items-center px-6 ">
      <h1 className="text-2xl font-semibold ">Project <span className="text-primary">Pluse</span></h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 font-medium  font-secondary text-sm transition
                ${
                  isActive
                    ? 'bg-primary/80 text-primary-content'
                    : 'text-foreground hover:bg-base-200'
                }
              `}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
