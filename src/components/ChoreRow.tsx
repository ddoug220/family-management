import type { Chore } from '../types';
import { CheckIcon } from './Icons';

type ChoreRowProps = {
  chore: Chore;
  onDone: (id: string) => void;
};

export function ChoreRow({ chore, onDone }: ChoreRowProps) {
  return (
    <li className={chore.completed ? 'chore chore--done' : 'chore'}>
      <button
        type="button"
        className="chore__stamp"
        onClick={() => onDone(chore.id)}
        disabled={chore.completed}
        aria-pressed={chore.completed}
        aria-label={chore.completed ? `${chore.title}, done` : `Mark ${chore.title} done`}
      >
        {chore.completed ? <CheckIcon className="chore__mark" /> : null}
      </button>
      <div className="chore__body">
        <p className="chore__title">{chore.title}</p>
        <p className="chore__meta">
          {chore.completed ? 'Stamped for today' : 'Tap the circle when it’s done'}
        </p>
      </div>
      <span className="chore__points">
        {chore.points}
        <small>pts</small>
      </span>
    </li>
  );
}
