'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Scripts() {
  const [scripts, setScripts] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const getData = async () => {
    const { data } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
    if (data) setScripts(data);
  };

  useEffect(() => { getData(); }, []);

  const onDelete = async (id: number) => {
    await supabase.from('ideas').delete().eq('id', id);
    setScripts((prev) => prev.filter((s) => s.id !== id));
  };

  const filtered = scripts.filter((s) =>
    s.niche.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">📜 Saved Scripts</h2>
      <p className="text-gray-500 mb-6">{scripts.length} ideas saved</p>

      <input
        className="w-full bg-gray-900 border border-gray-700 p-3 rounded-xl mb-6 outline-none focus:border-blue-500"
        placeholder="🔍 Search by niche..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-blue-500 text-sm font-bold uppercase">{s.niche}</p>
                {s.tone && <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{s.tone}</span>}
              </div>
              <button onClick={() => onDelete(s.id)}
                className="text-red-500 hover:text-red-400 text-sm font-semibold">
                🗑 Delete
              </button>
            </div>
            <p className="text-gray-300 mt-2">{s.content}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-600 text-center py-10">No scripts found.</p>
        )}
      </div>
    </div>
  );
}