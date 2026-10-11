type TicketStubProps = {
  points: number;
  kidName: string;
};

export function TicketStub({ points, kidName }: TicketStubProps) {
  return (
    <div className="ticket" aria-live="polite">
      <div className="ticket__notch ticket__notch--left" />
      <div className="ticket__notch ticket__notch--right" />
      <p className="ticket__label">{kidName}’s tickets</p>
      <p className="ticket__value">{points}</p>
    </div>
  );
}
