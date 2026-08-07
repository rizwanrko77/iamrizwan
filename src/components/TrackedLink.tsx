'use client'

import { sendGAEvent } from '@next/third-parties/google'
import React from 'react'

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | null | undefined>;
}

export default function TrackedLink({ eventName, eventParams, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        sendGAEvent('event', eventName, eventParams || {});
        if (props.onClick) props.onClick(e);
      }}
    >
      {children}
    </a>
  )
}
