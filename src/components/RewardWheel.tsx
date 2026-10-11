import type { Reward } from '../types';

const SLICE_COLORS = ['#c4492c', '#d4a017', '#23403a', '#7a3e1d', '#2f6b4f', '#e8d4a8'];
const SLICE_INK = ['#fff6e4', '#1f2a22', '#fff6e4', '#fff6e4', '#fff6e4', '#1f2a22'];

type RewardWheelProps = {
  rewards: Reward[];
  rotation: number;
  spinning: boolean;
  durationMs: number;
  onSpin: () => void;
  canSpin: boolean;
};

function polar(cx: number, cy: number, radius: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
}

function slicePath(index: number, count: number): string {
  const slice = 360 / count;
  const start = index * slice;
  const end = start + slice;
  const [x1, y1] = polar(100, 100, 94, start);
  const [x2, y2] = polar(100, 100, 94, end);
  const large = slice > 180 ? 1 : 0;
  return `M 100 100 L ${x1} ${y1} A 94 94 0 ${large} 1 ${x2} ${y2} Z`;
}

function shortLabel(title: string): string {
  if (title.length <= 18) return title;
  return `${title.slice(0, 16)}…`;
}

export function RewardWheel({
  rewards,
  rotation,
  spinning,
  durationMs,
  onSpin,
  canSpin,
}: RewardWheelProps) {
  const count = rewards.length;

  return (
    <div className="wheel">
      <div className="wheel__peg" aria-hidden="true" />
      <div className="wheel__frame">
        <div
          className="wheel__rotor"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${durationMs}ms cubic-bezier(0.12, 0.72, 0.08, 1)`
              : 'none',
          }}
        >
          <svg viewBox="0 0 200 200" role="img" aria-label="Prize wheel">
            <circle cx="100" cy="100" r="98" fill="#1f2a22" />
            {count === 0 ? (
              <circle cx="100" cy="100" r="94" fill="#e8d4a8" />
            ) : count === 1 ? (
              <circle cx="100" cy="100" r="94" fill={SLICE_COLORS[0]} />
            ) : (
              rewards.map((reward, index) => (
                <path
                  key={reward.id}
                  d={slicePath(index, count)}
                  fill={SLICE_COLORS[index % SLICE_COLORS.length]}
                />
              ))
            )}
            {rewards.map((reward, index) => {
              const slice = 360 / Math.max(count, 1);
              const mid = index * slice + slice / 2;
              const [tx, ty] = polar(100, 100, count === 1 ? 0 : 58, mid);
              const flip = mid > 90 && mid < 270;
              return (
                <text
                  key={`${reward.id}-label`}
                  x={tx}
                  y={ty}
                  fill={SLICE_INK[index % SLICE_INK.length]}
                  fontSize={count > 8 ? 6.5 : 7.4}
                  fontFamily="Fraunces, Georgia, serif"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${mid + (flip ? 180 : 0)} ${tx} ${ty})`}
                >
                  {shortLabel(reward.title)}
                </text>
              );
            })}
            {Array.from({ length: 16 }, (_, index) => {
              const deg = (index / 16) * 360;
              const [cx, cy] = polar(100, 100, 97, deg);
              return <circle key={deg} cx={cx} cy={cy} r="1.6" fill="#d4a017" />;
            })}
          </svg>
        </div>
        <button
          type="button"
          className="wheel__hub"
          onClick={onSpin}
          disabled={!canSpin || spinning}
        >
          {spinning ? '…' : 'SPIN'}
        </button>
      </div>
    </div>
  );
}
