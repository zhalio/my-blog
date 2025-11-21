/* eslint-disable @next/next/no-sync-scripts */
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Manager',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <link href="/config.yml" type="text/yaml" rel="cms-config-url" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
