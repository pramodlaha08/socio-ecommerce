import { ThemeSwitcher } from '@/components/theme/theme-switcher';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-foreground">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Socio Commerce</p>

        <h1 className="text-4xl font-bold tracking-tight">Theme System</h1>

        <p className="mt-3 text-muted-foreground">Select a theme and watch the entire UI change.</p>
      </div>

      <ThemeSwitcher />

      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-md">
        <h2 className="text-lg font-semibold">Premium UI Foundation</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          This card automatically uses the active theme variables.
        </p>

        <button
          type="button"
          className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Primary Action
        </button>
      </div>
    </main>
  );
}
