'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import FloatingActions from './FloatingActions';

export default function ClientLayout({
  children,
  navbar,
  footer,
}: {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {navbar}
      <main>{children}</main>
      {footer}
      <FloatingActions />
    </>
  );
}
