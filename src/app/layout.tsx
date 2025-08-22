// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google'
import NavBar from './components/nav/NavBar';
import Link from 'next/link';

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'], // ensures Bengali characters load
  weight: ['400', '700'], // pick what you need
})

export const metadata: Metadata = {
  title: 'আসগর আলী লবী',
  description: 'শহীদ জিয়ার সৈনিক, জনগণের সেবক',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: {
      url: '/apple-icon.png',
      type: 'image/png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn"> 
      <head>

      </head>
      <body className={`text-gray-900 ${notoSerifBengali.className}`}>
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t py-8 text-sm text-gray-500">
          <div className="mx-auto max-w-6xl px-4 flex justify-between">
            <span>© {new Date().getFullYear()} মোহাম্মদ আসগর আলী লবী</span>
            <Link className="hover:text-blue-600" href="/peoples-voice">সমস্যা জানান</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}