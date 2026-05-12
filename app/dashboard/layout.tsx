import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Navigation items array to keep the code clean
  const navItems = [
    { name: 'Brainstorm', href: '/dashboard/brainstorm' },
    { name: 'Scripts', href: '/dashboard/scripts' },
    { name: 'Calendar', href: '/dashboard/calendar' },
    { name: 'Analytics', href: '/dashboard/analytics' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 border-r border-gray-800">
        <h1 className="text-2xl font-bold mb-10 text-blue-500">
          AI Planner
        </h1>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="block p-3 rounded-lg hover:bg-gray-900 transition-colors text-gray-300 hover:text-white"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col bg-black">
        {/* Navbar */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            Dashboard
          </h2>

          <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all">
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}