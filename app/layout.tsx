import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeSlide',
  description: 'Create and share markdown slides.',
  keywords: ['CodeSlide', 'markdown slides', 'presentation', 'React'],
  authors: [{ name: 'FranciscoOssian', url: 'https://foln.dev' }],
  alternates: { canonical: 'https://github.com/FranciscoOssian/CodeSlide' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://codeslide.foln.dev',
    title: 'CodeSlide',
    description: 'Create and share markdown slides.',
    siteName: 'CodeSlide',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
