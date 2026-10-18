import type { Mood, PlanRequest } from "@/features/planning/domain/plan-request";

const moodLabels: Record<Mood, string> = {
  relaxed: "Relaxed", social: "Social", adventurous: "Adventurous", "surprise-me": "Surprise me",
};

export function PlanRequestSummary({ request, onEdit }: { request: PlanRequest; onEdit: () => void }) {
  const rows = [
    ["Group name", request.groupName],
    ["Group size", String(request.groupSize)],
    ["Date", request.date],
    ["Start time", request.startTime],
    ["End time", request.endTime],
    ["Starting area", request.startingArea],
    ["Budget per person", new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(request.budgetPerPerson)],
    ["Mood", moodLabels[request.mood]],
    ...(request.hardNo ? [["Hard no", request.hardNo]] : []),
  ];
  return (
    <section aria-labelledby="confirmation-title" className="space-y-6">
      <h2 id="confirmation-title" tabIndex={-1} ref={(element) => element?.focus()}
        className="summary-title">
        Plan request summary
      </h2>
      <p>Your request is ready to review. It has not been saved or sent anywhere. Refreshing clears it.</p>
      <dl className="summary-list">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-2">
            <dt className="font-semibold">{label}</dt>
            <dd className="min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]">{value}</dd>
          </div>
        ))}
      </dl>
      <button type="button" onClick={onEdit} className="secondary-action">Edit request</button>
    </section>
  );
}
