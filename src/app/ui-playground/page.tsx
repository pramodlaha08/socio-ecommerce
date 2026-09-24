'use client';
import * as React from 'react';

import { DatePicker } from '@/components/common/date-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UIPlaygroundPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [dateTime, setDateTime] = React.useState<Date | undefined>();

  async function handleDelete() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setDeleteDialogOpen(false);
  }
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Page Header */}

        <section>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Development</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">UI Playground</h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Temporary development page for testing shadcn/ui components, variants, spacing,
            typography, and the application theme system.
          </p>
        </section>

        {/* Theme */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Themes</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Test the global theme system across all UI components.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <ThemeSwitcher />
            </CardContent>
          </Card>
        </section>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast.success('Product added to cart.')}>Success</Button>

          <Button onClick={() => toast.error('Something went wrong.')}>Error</Button>

          <Button onClick={() => toast.warning('Only a few items are left.')}>Warning</Button>

          <Button onClick={() => toast.info('Your order is being processed.')}>Info</Button>
          <Button onClick={() => toast.loading('Processing your order...')}>Loading</Button>
        </div>
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Confirmation Dialog</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Reusable confirmation dialog for destructive and important actions.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Delete Confirmation</CardTitle>

              <CardDescription>
                Test the reusable confirmation pattern with loading state.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="rounded-sm p-5"
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Vendor
              </Button>
            </CardContent>
          </Card>
        </section>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Delete vendor?"
          description="This action cannot be undone. The vendor and its associated data will be permanently deleted."
          confirmText="Delete Vendor"
          cancelText="Keep Vendor"
          variant="destructive"
          loading={loading}
          onConfirm={handleDelete}
        />
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Date Picker</h2>

            <p className="text-sm text-muted-foreground">
              AD and BS calendar with optional time support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Date only</p>

              <DatePicker value={date} onChange={setDate} />

              <p className="text-xs text-muted-foreground">
                {date ? date.toString() : 'No date selected'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Date and time</p>

              <DatePicker value={dateTime} onChange={setDateTime} includeTime />

              <p className="text-xs text-muted-foreground">
                {dateTime ? dateTime.toString() : 'No date and time selected'}
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Buttons</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Test the available shadcn button variants and sizes.
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-wrap items-center gap-3 pt-6">
              <Button>Default</Button>

              <Button variant="secondary">Secondary</Button>

              <Button variant="outline">Outline</Button>

              <Button variant="ghost">Ghost</Button>

              <Button variant="destructive">Destructive</Button>

              <Button variant="link">Link</Button>
            </CardContent>
          </Card>
        </section>

        {/* Button Sizes */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Button Sizes</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Test button sizing before using buttons throughout the application.
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-wrap items-center gap-3 pt-6">
              <Button size="sm">Small</Button>

              <Button size="default">Default</Button>

              <Button size="lg">Large</Button>

              <Button size="icon" aria-label="Icon button">
                +
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Cards</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Cards will be used heavily across products, checkout, orders, dashboards, and account
              pages.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>

                <CardDescription>A standard application card.</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the default card appearance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Card</CardTitle>

                <CardDescription>Example of how a product section could look.</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Wireless Headphones</p>

                    <p className="mt-1 text-sm text-muted-foreground">Premium audio</p>
                  </div>

                  <Badge>New</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Card</CardTitle>

                <CardDescription>Card with an action.</CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full">View Product</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Inputs</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Test form controls and their relationship with labels.
            </p>
          </div>

          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>

                <Input id="product-name" placeholder="Enter product name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input id="email" type="email" placeholder="you@example.com" />
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Badges</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Useful for product status, order status, categories, and labels.
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Badge>Default</Badge>

              <Badge variant="secondary">Secondary</Badge>

              <Badge variant="outline">Outline</Badge>

              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>
        </section>

        {/* Semantic Colors */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Semantic Colors</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Verify that our custom semantic color system works with the shadcn foundation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <p className="font-semibold">Primary</p>
              <p className="mt-1 text-sm opacity-80">bg-primary</p>
            </div>

            <div className="rounded-xl bg-secondary p-6 text-secondary-foreground">
              <p className="font-semibold">Secondary</p>
              <p className="mt-1 text-sm opacity-80">bg-secondary</p>
            </div>

            <div className="rounded-xl bg-accent p-6 text-accent-foreground">
              <p className="font-semibold">Accent</p>
              <p className="mt-1 text-sm opacity-80">bg-accent</p>
            </div>

            <div className="rounded-xl bg-muted p-6 text-muted-foreground">
              <p className="font-semibold">Muted</p>
              <p className="mt-1 text-sm opacity-80">bg-muted</p>
            </div>
          </div>
        </section>

        {/* Status Colors */}

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Status Colors</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Custom status tokens for future product and order interfaces.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-success p-6 text-success-foreground">
              <p className="font-semibold">Success</p>
              <p className="mt-1 text-sm opacity-80">bg-success</p>
            </div>

            <div className="rounded-xl bg-warning p-6 text-warning-foreground">
              <p className="font-semibold">Warning</p>
              <p className="mt-1 text-sm opacity-80">bg-warning</p>
            </div>

            <div className="rounded-xl bg-destructive p-6 text-destructive-foreground">
              <p className="font-semibold">Destructive</p>
              <p className="mt-1 text-sm opacity-80">bg-destructive</p>
            </div>

            <div className="rounded-xl bg-info p-6 text-info-foreground">
              <p className="font-semibold">Info</p>
              <p className="mt-1 text-sm opacity-80">bg-info</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
