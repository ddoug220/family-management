import { useState } from 'react';
import type { FamilyStore } from '../hooks/useFamilyStore';
import type { Complexity } from '../types';

type ParentPageProps = {
  store: FamilyStore;
};

const COMPLEXITIES: Complexity[] = ['Low', 'Medium', 'High'];

export function ParentPage({ store }: ParentPageProps) {
  const {
    state,
    addChore,
    updateChore,
    removeChore,
    addReward,
    updateReward,
    removeReward,
    setKidName,
    setSpinCost,
    resetChores,
    resetPoints,
  } = store;

  const [kidDraft, setKidDraft] = useState(state.kidName);
  const [costDraft, setCostDraft] = useState(String(state.spinCost));
  const [choreTitle, setChoreTitle] = useState('');
  const [choreLevel, setChoreLevel] = useState<Complexity>('Low');
  const [rewardTitle, setRewardTitle] = useState('');

  return (
    <section className="page page--parent">
      <header className="page__hero">
        <p className="eyebrow">Grown-ups</p>
        <h1>The list and the wheel.</h1>
        <p className="lede">
          Changes stay on this device. No accounts, no cloud. Reset chores when you want a fresh
          day.
        </p>
      </header>

      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          setKidName(kidDraft);
          setSpinCost(Number(costDraft));
        }}
      >
        <label>
          Kid’s name
          <input
            value={kidDraft}
            onChange={(event) => setKidDraft(event.target.value)}
            maxLength={24}
          />
        </label>
        <label>
          Tickets per spin
          <input
            value={costDraft}
            onChange={(event) => setCostDraft(event.target.value)}
            inputMode="numeric"
            min={1}
          />
        </label>
        <button type="submit" className="solid-btn">
          Save house rules
        </button>
      </form>

      <section className="stack">
        <h2>Chores</h2>
        <ul className="editor">
          {state.chores.map((chore) => (
            <li key={chore.id}>
              <input
                aria-label={`Title for ${chore.title}`}
                defaultValue={chore.title}
                onBlur={(event) => updateChore(chore.id, event.target.value, chore.points)}
              />
              <input
                aria-label={`Points for ${chore.title}`}
                className="editor__pts"
                defaultValue={chore.points}
                inputMode="numeric"
                onBlur={(event) => updateChore(chore.id, chore.title, Number(event.target.value))}
              />
              <button type="button" className="ghost-btn" onClick={() => removeChore(chore.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          className="add-row"
          onSubmit={(event) => {
            event.preventDefault();
            addChore(choreTitle, choreLevel);
            setChoreTitle('');
          }}
        >
          <input
            value={choreTitle}
            onChange={(event) => setChoreTitle(event.target.value)}
            placeholder="New chore"
            aria-label="New chore title"
          />
          <select
            value={choreLevel}
            onChange={(event) => setChoreLevel(event.target.value as Complexity)}
            aria-label="Chore difficulty"
          >
            {COMPLEXITIES.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button type="submit" className="solid-btn">
            Add
          </button>
        </form>
      </section>

      <section className="stack">
        <h2>Wheel prizes</h2>
        <ul className="editor">
          {state.rewards.map((reward) => (
            <li key={reward.id}>
              <input
                aria-label={`Prize ${reward.title}`}
                defaultValue={reward.title}
                onBlur={(event) => updateReward(reward.id, event.target.value)}
              />
              <button type="button" className="ghost-btn" onClick={() => removeReward(reward.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          className="add-row"
          onSubmit={(event) => {
            event.preventDefault();
            addReward(rewardTitle);
            setRewardTitle('');
          }}
        >
          <input
            value={rewardTitle}
            onChange={(event) => setRewardTitle(event.target.value)}
            placeholder="New prize"
            aria-label="New prize title"
          />
          <button type="submit" className="solid-btn">
            Add
          </button>
        </form>
      </section>

      <section className="stack danger-row">
        <button type="button" className="ghost-btn" onClick={resetChores}>
          Unstamp all chores
        </button>
        <button
          type="button"
          className="ghost-btn ghost-btn--warn"
          onClick={() => {
            if (window.confirm('Clear all tickets and prize history on this device?')) {
              resetPoints();
            }
          }}
        >
          Reset tickets
        </button>
      </section>
    </section>
  );
}
