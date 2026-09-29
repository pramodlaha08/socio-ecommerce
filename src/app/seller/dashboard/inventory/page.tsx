'use client';

import { useEffect, useState } from 'react';

import { SellerSidebar } from '@/features/sellers/components/seller-sidebar';
import { SellerInventoryPage } from '@/features/sellers';

interface SellerSession {
  sellerRole?: string;
  role?: string;
}

export default function SellerInventoryRoute() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [isSuperSeller, setIsSuperSeller] =
    useState(false);

  useEffect(() => {
    const storedSeller =
      localStorage.getItem(
        'socio-seller',
      );

    if (!storedSeller) {
      return;
    }

    try {
      const seller =
        JSON.parse(
          storedSeller,
        ) as SellerSession;

      setIsSuperSeller(
        seller.sellerRole ===
          'super_seller' ||
          seller.role ===
            'super_seller',
      );
    } catch {
      setIsSuperSeller(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <SellerSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
        isSuperSeller={
          isSuperSeller
        }
      />

      <div className="min-w-0 flex-1">
        <SellerInventoryPage />
      </div>
    </div>
  );
}
