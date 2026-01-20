import "../globals.css";

export const metadata = {
  metadataBase: new URL('https://emmmxx.xyz'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  );
}
