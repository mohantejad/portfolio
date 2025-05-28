'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
