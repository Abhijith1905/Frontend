import React from 'react';

export default function SidebarSection({ title, children }) {
  return (
    <div className="space-y-3">
      {title && (
        <h2 className="px-4 text-xs font-bold tracking-wider text-gray-500 uppercase">
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}