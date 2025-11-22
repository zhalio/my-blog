import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { ScrollToTopButton } from "@/components/layout/scroll-to-top-button"
import { NextIntlClientProvider } from 'next-intl';
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { VantaProvider } from "@/components/effects/vanta-context";
import { VantaBackground } from "@/components/effects/vanta-background";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Home'});
 
  return {
    metadataBase: new URL('https://emmmxx.xyz'),
    title: t('title'),
    description: t('description')
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  // No RTL languages currently supported
  const isRtl = false;

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="YOUR-WEBSITE-ID"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <SmoothScroll>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <VantaProvider>
                  <VantaBackground />
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    {/* Main Content */}
                    <main className="flex-1">
                      {children}
                    </main>
                    <ScrollToTopButton />
                  </div>
                </VantaProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}