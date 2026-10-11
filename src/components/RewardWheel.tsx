import type { Reward } from '../types';

const SLICE_COLORS = ['#4b4ae3', '#1f2437', '#e39b12', '#8b8cf5', '#3d4458', '#f4c44a'];
const SLICE_INK = ['#ffffff', '#ffffff', '#161513', '#161513', '#ffffff', '#161513'];

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
  if (title.length <= 20) return title;
  return `${title.slice(0, 18)}…`;
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
            <circle cx="100" cy="100" r="99" fill="#e3e0d8" />
            {count === 0 ? (
              <circle cx="100" cy="100" r="94" fill="#ececff" />
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
                  fontSize={count > 8 ? 6.8 : 7.6}
                  fontFamily="Plus Jakarta Sans, Segoe UI, sans-serif"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${mid + (flip ? 180 : 0)} ${tx} ${ty})`}
                >
                  {shortLabel(reward.title)}
                </text>
              );
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
