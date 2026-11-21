'use client';

import { openIdleGallery } from '@/app/lib/idleEvents';

export default function IdleLink({ className, behind }: { className?: string; behind?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={openIdleGallery}
      aria-label="idle: open the painting gallery"
      data-behind={behind}
    >
      idle
    </button>
  );
}
