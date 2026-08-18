import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../providers/LanguageProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FarmSheild - Digital Farm Management Portal',
  description: 'Livestock tracking, treatment recording, withdrawal period calculation, and MRL compliance alerts for farmers, veterinarians, and admins.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
        <LanguageProvider>
          <div className="flex-1 flex flex-col">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
