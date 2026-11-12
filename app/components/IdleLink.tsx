'use client';

import { openIdleGallery } from '@/app/lib/idleEvents';

export default function IdleLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openIdleGallery}>
      idle
    </button>
  );
}
