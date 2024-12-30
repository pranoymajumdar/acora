import { Outlet } from 'react-router';
import { GridPattern } from '~/components/ui/grid-pattern';
import { cn } from '~/lib/utils';

export default function AuthLayout() {
  return (
    <main className="flex h-screen items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]'
        )}
      />
      <Outlet />
    </main>
  );
}
