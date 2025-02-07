import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

interface SiteConfig {
  title: string;
  description: string;
  url: string;
}

const siteConfig: SiteConfig = {
  title: 'TechStore',
  description: 'Premium Electronics and Tech Gadgets Store',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: `${siteConfig.url}/images/og.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='en' className={openSans.className}>
      <body className='min-h-screen bg-gray-50 font-sans antialiased'>
        <Header />
        <main className='relative flex min-h-screen flex-col pt-20'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
