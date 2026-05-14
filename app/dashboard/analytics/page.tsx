'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Analytics() {
  const [scripts, setScripts] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
      if (data) setScripts(data);
    };
    getData();
  }, []);

  const totalIdeas = scripts.length;
  const uniqueNiches = new Set(scripts.map((s) => s.niche.toLowerCase())).size;

  const nicheCounts = scripts.reduce((acc: any, s) => {
    acc[s.niche] = (acc[s.niche] || 0) + 1;
    return acc;
  }, {});

  const topNiches = Object.entries(nicheCounts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 5);

  const maxCount = topNiches[0]?.[1] as number || 1;

  const toneCounts = scripts.reduce((acc: any, s) => {
    if (s.tone) acc[s.tone] = (acc[s.tone] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">📊 Analytics</h2>
      <p className="text-gray-500 mb-8">Your content creation stats</p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-500 text-sm mb-1">Total Ideas</p>
          <p className="text-4xl font-black text-blue-500">{totalIdeas}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-500 text-sm mb-1">Unique Niches</p>
          <p className="text-4xl font-black text-purple-500">{uniqueNiches}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">🏆 Top Niches</h3>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
        {topNiches.length === 0 && <p className="text-gray-600">No data yet — go brainstorm!</p>}
        {topNiches.map(([niche, count]) => (
          <div key={niche} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300 capitalize">{niche}</span>
              <span className="text-gray-500">{count as number} ideas</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${((count as number) / maxCount) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">🎭 Tone Breakdown</h3>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(toneCounts).map(([tone, count]) => (
          <div key={tone} className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
            <p className="text-gray-400 text-sm">{tone}</p>
            <p className="text-2xl font-black text-white">{count as number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}