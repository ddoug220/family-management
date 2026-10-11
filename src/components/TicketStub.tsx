import { TicketIcon } from './Icons';

type TicketStubProps = {
  points: number;
  kidName: string;
};

export function TicketStub({ points, kidName }: TicketStubProps) {
  return (
    <div className="ticket" aria-live="polite">
      <div className="ticket__copy">
        <p className="ticket__label">{kidName}’s tickets</p>
        <p className="ticket__value">{points}</p>
      </div>
      <TicketIcon className="ticket__icon" />
    </div>
  );
}
