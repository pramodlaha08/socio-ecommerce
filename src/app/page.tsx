import { ThemeSwitcher } from '@/components/theme/theme-switcher';

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-7xl flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Socio Commerce
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your social commerce platform
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          A scalable e-commerce experience built with a modern, themeable UI foundation.
        </p>
      </div>

      <div className="mt-10">
        <ThemeSwitcher />
      </div>
    </section>
  );
}
