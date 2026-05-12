
export default function AnalyticsPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Performance</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Total Ideas', 'Generated Scripts', 'Scheduled Posts'].map((label, i) => (
          <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
        ))}
      </div>
    </div>
  )
}