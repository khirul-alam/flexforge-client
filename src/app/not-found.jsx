import Link from 'next/link';
import Image from 'next/image';
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      {/* <Image
        src="/public/images/404-illustration.jpg"
        alt="Page not found"
        width={288}
        height={288}
        className="w-72"
      /> */}
      <TbError404 />
      <h1 className="text-3xl font-bold">Oops! Page Not Found</h1>
      <p className="text-gray-500">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
      >
        Back to Home
      </Link>
    </div>
  );
}