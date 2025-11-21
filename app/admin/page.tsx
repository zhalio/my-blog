"use client";
import { useEffect } from 'react';
import Script from 'next/script';

export default function AdminPage() {
  useEffect(() => {
    // Ensure the CMS is initialized only on the client side
    // This component is client-side only due to "use client"
  }, []);

  return (
    <>
      <Script 
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://unpkg.com/decap-cms-locales@^3.0.0/dist/decap-cms-locales.js" 
        strategy="afterInteractive"
      />
    </>
  );
}
