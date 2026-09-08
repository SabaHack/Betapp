import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'BETAPP Seller Dashboard',
  description: 'Manage your properties and inquiries',
};

export default function SaaSLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-luxury-dark text-white">
        <Sidebar />
        <main className="md:ml-64 min-h-screen">{children}</main>
      </body>
    </html>
  );
}