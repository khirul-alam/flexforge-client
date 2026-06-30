import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-10 text-gray-300">
      <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-xl font-bold text-white">FlexForge</h2>
          <p className="mt-2 text-sm">Forge your strongest self.</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/all-classes">All Classes</Link></li>
            <li><Link href="/community-forum">Community Forum</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Social Media</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" aria-label="X (Twitter)">X (Twitter)</a></li>
            <li><a href="#" aria-label="Instagram">Instagram</a></li>
            <li><a href="#" aria-label="Facebook">Facebook</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Contact</h3>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <p className="text-sm">contact@flexforge.com</p>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FlexForge. All rights reserved.
      </p>
    </footer>
  );
}