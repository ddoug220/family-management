import { ChoreRow } from '../components/ChoreRow';
import { TicketStub } from '../components/TicketStub';
import type { FamilyStore } from '../hooks/useFamilyStore';

type ChoresPageProps = {
  store: FamilyStore;
};

export function ChoresPage({ store }: ChoresPageProps) {
  const { state, doneCount, finishChore } = store;
  const remaining = state.chores.length - doneCount;

  return (
    <section className="page">
      <header className="page__hero">
        <p className="eyebrow">Today’s list</p>
        <h1>Hey {state.kidName}.</h1>
        <p className="lede">
          {remaining === 0
            ? 'Everything is stamped. Take those tickets to the wheel.'
            : `${remaining} chore${remaining === 1 ? '' : 's'} left. Stamp one to earn tickets.`}
        </p>
        <TicketStub points={state.points} kidName={state.kidName} />
      </header>

      {state.chores.length === 0 ? (
        <p className="empty">A grown-up still needs to add chores.</p>
      ) : (
        <ol className="chore-list">
          {state.chores.map((chore) => (
            <ChoreRow key={chore.id} chore={chore} onDone={finishChore} />
          ))}
        </ol>
      )}
    </section>
  );
}
