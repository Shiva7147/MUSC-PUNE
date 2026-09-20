'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShippingPolicyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/terms-and-conditions#shipping-policy');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <p className="text-sm font-mono text-neutral-400">Redirecting to Terms & Conditions...</p>
      </div>
    </div>
  );
}
