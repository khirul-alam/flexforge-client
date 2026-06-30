import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'FlexForge | Fitness & Gym Management Platform',
  description:
    'Discover fitness classes, book sessions, connect with trainers, and track your fitness journey with FlexForge.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}