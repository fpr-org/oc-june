'use client';

import React, { useEffect, useState, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<LoadingBarRef>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    ref.current?.continuousStart();
    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <LoadingBar
      color="#03045e" // Using the primary color
      ref={ref}
      shadow={true}
      height={3}
    />
  );
}
