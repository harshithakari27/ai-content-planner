'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    { name: '💡 Brainstorm', href: '/dashboard/brainstorm' },
    { name: '📜 Scripts Library', href: '/dashboard/scripts' },
    { name: '📊 Analytics', href: '/dashboard/analytics' },
    { name: '⚙️ Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 border-r border-gray-800 p-6">
        <h1 className="text-xl font-bold mb-10 text-blue-500">AI PLANNER</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}
              className={`block p-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}