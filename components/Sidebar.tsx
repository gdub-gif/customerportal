'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Home,
  Layers,
  LifeBuoy,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Services',
    icon: Layers,
    children: [
      {
        title: 'Smart Workspace',
        href: '/services/smart-workspace',
      },
      {
        title: 'Smart IAM',
        href: '/services/smart-iam',
      },
      {
        title: 'Smart Platform',
        href: '/services/smart-platform',
      },
    ],
  },
  {
    title: 'Support Tickets',
    href: '/support-tickets',
    icon: LifeBuoy,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};

    navItems.forEach((item) => {
      if (item.children) {
        initialState[item.title] = item.children.some((child) =>
          pathname.startsWith(child.href)
        );
      }
    });

    return initialState;
  });

  React.useEffect(() => {
    setOpenSections((prev) => {
      const nextState = { ...prev };

      navItems.forEach((item) => {
        if (item.children && item.children.some((child) => pathname.startsWith(child.href))) {
          nextState[item.title] = true;
        }
      });

      return nextState;
    });
  }, [pathname]);

  const handleToggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-3 p-4">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = Boolean(item.children?.length);
            const isChildActive = item.children?.some((child) =>
              pathname.startsWith(child.href)
            );
            const isActive = item.href ? pathname === item.href : isChildActive;
            const isOpen = hasChildren ? openSections[item.title] : false;

            if (hasChildren && item.children) {
              const sectionId = `${item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')}-section`;

              return (
                <div key={item.title} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleToggleSection(item.title)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isChildActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                    aria-expanded={isOpen}
                    aria-controls={sectionId}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                    <ChevronDown
                      className={cn(
                        'ml-auto h-4 w-4 transition-transform',
                        isOpen ? 'rotate-180' : 'rotate-0'
                      )}
                    />
                  </button>
                  <div
                    id={sectionId}
                    className={cn(
                      'ml-11 flex flex-col gap-1 border-l border-border pl-3',
                      isOpen ? 'mt-1' : 'hidden'
                    )}
                  >
                    {item.children.map((child) => {
                      const childIsActive = pathname.startsWith(child.href);

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'rounded-md px-3 py-1.5 text-sm transition-colors',
                            childIsActive
                              ? 'bg-primary/10 font-medium text-foreground'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                          aria-current={childIsActive ? 'page' : undefined}
                        >
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (!item.href) {
              return null;
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                tabIndex={0}
                aria-label={item.title}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};