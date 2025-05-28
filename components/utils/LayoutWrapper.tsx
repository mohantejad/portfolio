'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import NProgressProvider from './NProgressProvider';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin') || pathname.startsWith('/structure');

  return (
    <div className='stars-container flex items-center justify-center min-h-screen'>
      <NProgressProvider />
      {!isAdminPage && <Header />}
      {children}
    </div>
  );
}
