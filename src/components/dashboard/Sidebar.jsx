// 'use client';

// import Link from 'next/link';
// import { ArrowLeft } from 'lucide-react';
// import { useRole } from '@/hooks/useRole';

// const USER_LINKS = [
//   { href: '/dashboard', label: 'Overview' },
//   { href: '/dashboard/booked-classes', label: 'Booked Classes' },
//   { href: '/dashboard/apply-trainer', label: 'Apply as Trainer' },
//   { href: '/dashboard/favorites', label: 'Favorite Classes' },
// ];

// const TRAINER_LINKS = [
//   { href: '/dashboard', label: 'Overview' },
//   { href: '/dashboard/add-class', label: 'Add Class' },
//   { href: '/dashboard/my-classes', label: 'My Classes' },
//   { href: '/dashboard/add-forum-post', label: 'Add Forum Post' },
//   { href: '/dashboard/my-forum-posts', label: 'My Forum Posts' },
// ];

// const ADMIN_LINKS = [
//   { href: '/dashboard', label: 'Overview' },
//   { href: '/dashboard/manage-users', label: 'Manage Users' },
//   { href: '/dashboard/applied-trainers', label: 'Applied Trainers' },
//   { href: '/dashboard/manage-trainers', label: 'Manage Trainers' },
//   { href: '/dashboard/manage-classes', label: 'Manage Classes' },
//   { href: '/dashboard/add-forum-post', label: 'Add Forum Post' },
//   { href: '/dashboard/transactions', label: 'Transactions' },
//   { href: '/dashboard/forum-manage', label: 'Forum Post Manage' },
// ];

// export default function Sidebar() {
//   const { role } = useRole();

//   const links = role === 'admin' ? ADMIN_LINKS : role === 'trainer' ? TRAINER_LINKS : USER_LINKS;

//   return (
//     <aside className="flex w-64 shrink-0 flex-col border-r bg-white p-4">
//       <Link href="/" className="mb-6 block text-xl font-bold text-orange-500">
//         FlexForge
//       </Link>

//       <nav className="flex flex-1 flex-col gap-2">
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className="rounded-lg px-4 py-2 text-sm hover:bg-orange-50"
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>

//       <Link
//         href="/"
//         className="mt-4 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
//       >
//         <ArrowLeft size={16} />
//         Back to Website
//       </Link>
//     </aside>
//   );
// }
'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { usePathname } from 'next/navigation';

const USER_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/booked-classes', label: 'Booked Classes' },
  { href: '/dashboard/apply-trainer', label: 'Apply as Trainer' },
  { href: '/dashboard/favorites', label: 'Favorite Classes' },
];

const TRAINER_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/add-class', label: 'Add Class' },
  { href: '/dashboard/my-classes', label: 'My Classes' },
  { href: '/dashboard/add-forum-post', label: 'Add Forum Post' },
  { href: '/dashboard/my-forum-posts', label: 'My Forum Posts' },
];

const ADMIN_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/manage-users', label: 'Manage Users' },
  { href: '/dashboard/applied-trainers', label: 'Applied Trainers' },
  { href: '/dashboard/manage-trainers', label: 'Manage Trainers' },
  { href: '/dashboard/manage-classes', label: 'Manage Classes' },
  { href: '/dashboard/add-forum-post', label: 'Add Forum Post' },
  { href: '/dashboard/transactions', label: 'Transactions' },
  { href: '/dashboard/forum-manage', label: 'Forum Post Manage' },
];

export default function Sidebar() {
  const { role } = useRole();
  const pathname = usePathname();

  const links = role === 'admin' ? ADMIN_LINKS : role === 'trainer' ? TRAINER_LINKS : USER_LINKS;

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-white p-4">
      {/* লোগো - শুধু একবার */}
      <div className="mb-8">
        <Link href="/" className="block text-2xl font-bold text-orange-500">
          FlexForge
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'hover:bg-orange-50 text-gray-700'
              }`}
            >
              {link.icon && <link.icon size={18} />}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-6 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        <ArrowLeft size={16} />
        Back to Website
      </Link>
    </aside>
  );
}