import Link from 'next/link';
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-4">
      <TbError404 size={120} className="text-orange-500" />
      
      <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
      
      <p className="max-w-md text-lg text-gray-500">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-4 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600 transition-all active:scale-95 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}