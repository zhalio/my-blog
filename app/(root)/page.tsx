// Root redirect for static export
export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/zh" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = '/zh'`
          }}
        />
      </head>
      <body>
        <p>Redirecting to /zh...</p>
      </body>
    </html>
  );
}