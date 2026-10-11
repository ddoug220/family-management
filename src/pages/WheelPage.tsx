import { RewardWheel } from '../components/RewardWheel';
import { TicketStub } from '../components/TicketStub';
import type { FamilyStore } from '../hooks/useFamilyStore';

type WheelPageProps = {
  store: FamilyStore;
};

export function WheelPage({ store }: WheelPageProps) {
  const {
    state,
    rotation,
    spinning,
    latestWin,
    spinMessage,
    ticketsNeeded,
    spin,
    spinDurationMs,
    dismissWin,
  } = store;
  const canSpin = state.points >= state.spinCost && state.rewards.length > 0 && !spinning;

  return (
    <section className="page page--wheel">
      <header className="page__hero">
        <p className="eyebrow">Prize booth</p>
        <h1>Spend tickets. Spin once.</h1>
        <p className="lede">
          A spin costs <strong>{state.spinCost}</strong> tickets.
          {ticketsNeeded > 0
            ? ` You need ${ticketsNeeded} more.`
            : ' The pointer at the top names the prize.'}
        </p>
        <TicketStub points={state.points} kidName={state.kidName} />
      </header>

      <RewardWheel
        rewards={state.rewards}
        rotation={rotation}
        spinning={spinning}
        durationMs={spinDurationMs}
        onSpin={spin}
        canSpin={canSpin}
      />

      {spinMessage ? (
        <p className="banner banner--warn" role="status">
          {spinMessage}
        </p>
      ) : null}

      {latestWin ? (
        <div className="banner banner--win" role="status">
          <p className="banner__kicker">The wheel stopped on</p>
          <p className="banner__prize">{latestWin}</p>
          <button type="button" className="text-btn" onClick={dismissWin}>
            Got it
          </button>
        </div>
      ) : null}

      {state.wins.length > 0 ? (
        <aside className="wins">
          <h2>Recent prizes</h2>
          <ul>
            {state.wins.slice(0, 4).map((win) => (
              <li key={win.id}>{win.rewardTitle}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </section>
  );
}
