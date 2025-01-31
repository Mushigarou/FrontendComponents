import '@/globals.css';
import { ReactQueryProvider } from '@/utils/react-query-provider';
import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'test',
  description:
    'test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="h-full"
      lang="en"
      suppressHydrationWarning>
      <body
        className={`flex flex-col min-h-screen antialiased plus-jakarta-sans-regular`}>
        <main className="flex-grow flex-col flex relative">
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
