import { useState } from 'react';
import { ClipboardIcon, KeyIcon, WheelIcon } from './components/Icons';
import { useFamilyStore } from './hooks/useFamilyStore';
import { ChoresPage } from './pages/ChoresPage';
import { ParentPage } from './pages/ParentPage';
import { WheelPage } from './pages/WheelPage';
import type { TabId } from './types';

const TABS: { id: TabId; label: string; icon: typeof ClipboardIcon }[] = [
  { id: 'chores', label: 'Chores', icon: ClipboardIcon },
  { id: 'wheel', label: 'Wheel', icon: WheelIcon },
  { id: 'parent', label: 'Grown-ups', icon: KeyIcon },
];

export default function App() {
  const store = useFamilyStore();
  const [tab, setTab] = useState<TabId>('chores');

  return (
    <div className="shell">
      <main className="shell__main">
        {tab === 'chores' ? <ChoresPage store={store} /> : null}
        {tab === 'wheel' ? <WheelPage store={store} /> : null}
        {tab === 'parent' ? <ParentPage store={store} /> : null}
      </main>
      <nav className="dock" aria-label="Main">
        {TABS.map((item) => {
          const Icon = item.icon;
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={selected ? 'dock__btn dock__btn--on' : 'dock__btn'}
              onClick={() => setTab(item.id)}
              aria-current={selected ? 'page' : undefined}
            >
              <Icon className="dock__icon" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
