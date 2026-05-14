'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const TONES = ['Viral', 'Educational', 'Funny', 'Inspirational', 'Controversial'];
const HOOK_COUNTS = [3, 5, 10];
const LANGUAGES = ['English', 'Spanish', 'Hindi', 'French'];
const ACCENT_COLORS = [
  { name: 'Blue', value: 'blue' },
  { name: 'Purple', value: 'purple' },
  { name: 'Green', value: 'green' },
  { name: 'Red', value: 'red' },
];

export default function Settings() {
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('Viral');
  const [hookCount, setHookCount] = useState(3);
  const [language, setLanguage] = useState('English');
  const [accent, setAccent] = useState('blue');
  const [saved, setSaved] = useState(false);
  const [clearing, setClearing] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    const s = localStorage.getItem('settings');
    if (s) {
      const parsed = JSON.parse(s);
      setName(parsed.name || '');
      setNiche(parsed.niche || '');
      setTone(parsed.tone || 'Viral');
      setHookCount(parsed.hookCount || 3);
      setLanguage(parsed.language || 'English');
      setAccent(parsed.accent || 'blue');
    }
  }, []);

  const onSave = () => {
    localStorage.setItem('settings', JSON.stringify({ name, niche, tone, hookCount, language, accent }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const onReset = () => {
    localStorage.removeItem('settings');
    setName(''); setNiche(''); setTone('Viral');
    setHookCount(3); setLanguage('English'); setAccent('blue');
  };

  const onClearIdeas = async () => {
    if (!confirm('Are you sure? This will delete ALL saved ideas permanently.')) return;
    setClearing(true);
    await supabase.from('ideas').delete().neq('id', 0);
    setClearing(false);
    alert('All ideas cleared!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">⚙️ Settings</h2>
      <p className="text-gray-500 mb-8">Customize your experience</p>

      {/* Profile */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
        <h3 className="text-lg font-bold mb-4">👤 Profile</h3>
        <div className="flex flex-col gap-3">
          <input
            className="bg-black border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            placeholder="Your name (e.g. Alex)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-black border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
            placeholder="Your main niche (e.g. Minecraft)"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
        <h3 className="text-lg font-bold mb-4">⚙️ Preferences</h3>

        <p className="text-gray-400 text-sm mb-2">Default Tone</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {TONES.map((t) => (
            <button key={t} onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                tone === t ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>
              {t}
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-sm mb-2">Hooks to Generate</p>
        <div className="flex gap-2 mb-4">
          {HOOK_COUNTS.map((c) => (
            <button key={c} onClick={() => setHookCount(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                hookCount === c ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>
              {c}
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-sm mb-2">Language</p>
        <div className="flex gap-2 flex-wrap">
          {LANGUAGES.map((l) => (
            <button key={l} onClick={() => setLanguage(l)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                language === l ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>
              {l}
            </button>
          ))}
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
        <h3 className="text-lg font-bold mb-4">🎨 Appearance</h3>
        <p className="text-gray-400 text-sm mb-2">Accent Color</p>
        <div className="flex gap-3">
          {ACCENT_COLORS.map((c) => (
            <button key={c.value} onClick={() => setAccent(c.value)}
              className={`w-10 h-10 rounded-full border-2 transition ${
                accent === c.value ? 'border-white scale-110' : 'border-transparent'
              } bg-${c.value}-600`}>
            </button>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <button onClick={onSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl mb-6 transition">
        {saved ? '✅ Saved!' : '💾 Save Settings'}
      </button>

      {/* Danger Zone */}
      <section className="bg-gray-900 p-6 rounded-xl border border-red-900 mb-6">
        <h3 className="text-lg font-bold mb-4 text-red-500">🗑️ Danger Zone</h3>
        <div className="flex flex-col gap-3">
          <button onClick={onClearIdeas} disabled={clearing}
            className="bg-red-900 hover:bg-red-800 text-red-300 font-bold py-3 rounded-lg transition disabled:opacity-50">
            {clearing ? 'Clearing...' : 'Clear All Saved Ideas'}
          </button>
          <button onClick={onReset}
            className="bg-gray-800 hover:bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition">
            Reset All Settings
          </button>
        </div>
      </section>
    </div>
  );
}