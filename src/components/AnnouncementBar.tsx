'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

export default function AnnouncementBar() {
  const { announcement, setAnnouncement } = useSettingsStore();

  if (!announcement.enabled) return null;

  return (
    <div className="bg-blue-600 text-white text-center py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-sm font-medium">
          {announcement.link ? (
            <Link
              href={announcement.link}
              className="hover:underline"
            >
              {announcement.message}
            </Link>
          ) : (
            announcement.message
          )}
        </p>
      </div>
      <button
        onClick={() => setAnnouncement({ enabled: false, message: '', link: undefined })}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-blue-700 rounded transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
