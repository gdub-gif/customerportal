'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Bell, LifeBuoy, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
              <span className="text-lg font-semibold">CP</span>
            </div>
            <div className="hidden flex-col md:flex">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Customer</span>
              <span className="text-base font-bold text-foreground">Portal</span>
            </div>
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Zoek naar orders, klanten of documenten..."
              className="pl-9"
              aria-label="Zoeken"
            />
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Help"
            tabIndex={0}
            className="hidden md:inline-flex"
          >
            <LifeBuoy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Meldingen" tabIndex={0}>
            <Bell className="h-5 w-5" />
          </Button>
          <div className="hidden items-center gap-3 rounded-full border bg-background/80 px-3 py-1 shadow-sm md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              JD
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground">Johan de Vries</span>
              <span className="text-xs text-muted-foreground">Accountmanager</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
