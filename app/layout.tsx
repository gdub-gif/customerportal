'use client';

import * as React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <head>
        <title>Customer Portal</title>
        <meta name="description" content="Customer Portal - Manage your orders and profile" />
      </head>
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar onMenuClick={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
          
          <div className="flex flex-1">
            <Sidebar isOpen={isMobileMenuOpen} />
            
            <main className="flex-1 md:ml-64">
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}