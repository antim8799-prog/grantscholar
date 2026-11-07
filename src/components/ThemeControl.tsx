import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="group" aria-label="Appearance" className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1 shrink-0">
      {([{ value: 'light', label: 'Light', Icon: Sun }, { value: 'dark', label: 'Dark', Icon: Moon }, { value: 'system', label: 'System', Icon: Monitor }] as const).map(({ value, label, Icon }) => (
        <button key={value} type="button" aria-label={`${label} theme`} title={`${label} theme`} aria-pressed={theme === value} onClick={() => setTheme(value)} className={`rounded-lg p-2 transition-colors ${theme === value ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
