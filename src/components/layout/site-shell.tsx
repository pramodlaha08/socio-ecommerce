import type { ReactNode } from 'react';

import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type SiteShellProps = {
  readonly children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}
