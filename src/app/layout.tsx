import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Insta AI',
  description: 'Matt Mayfield instagram caption ai',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'antialiased bg-gray-100 h-screen flex flex-col',
        )}
      >
        <Header />
        <main className="container h-screen flex items-stretch flex-col">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
    <div className="container flex justify-between h-14 max-w-5xl mx-auto items-center animate-in fade-in slide-in-from-top-4 duration-1000 ease-in-out">
      <div className="mr-4 flex items-center space-x-2 text-lg font-medium leading-none">
        <CircleIcon className="h-6 w-6" />
        <span className="font-bold">insta/ai</span>
      </div>
      <button>
        <CoffeeIcon className="h-6 w-6" />
        <span className="sr-only">Coffe icon</span>
      </button>
    </div>
  </header>
);
const CircleIcon = (props: { className: string }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

const CoffeeIcon = (props: { className: string }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
};
