"use client";

import { useState, useSyncExternalStore, type SubmitEvent } from "react";
import { planRequestSchema, type PlanRequest } from "@/features/planning/domain/plan-request";
import { PlanRequestSummary } from "./plan-request-summary";

type PlanRequestField = keyof PlanRequest;
type FieldErrors = Partial<Record<PlanRequestField, string>>;
type FormState = { status: "editing"; errors: FieldErrors; focusForm?: boolean } | { status: "confirmed"; request: PlanRequest };

const labels: Record<PlanRequestField, string> = {
  groupName: "Group name", groupSize: "Group size", date: "Date",
  startTime: "Start time", endTime: "End time", startingArea: "Starting area",
  budgetPerPerson: "Budget per person in GBP", mood: "Mood", hardNo: "Hard no (optional)",
};

function isField(value: PropertyKey | undefined): value is PlanRequestField {
  return typeof value === "string" && Object.hasOwn(labels, value);
}

const controlClass = "form-control";

// Without hydration, native submission must not put private values in the URL.
const subscribe = () => () => {};
const hydratedSnapshot = () => true;
const serverSnapshot = () => false;

export function PlanRequestForm() {
  const hydrated = useSyncExternalStore(subscribe, hydratedSnapshot, serverSnapshot);
  const [state, setState] = useState<FormState>({ status: "editing", errors: {} });

  const [draft, setDraft] = useState<Partial<Record<PlanRequestField, string>>>({});

  if (state.status === "confirmed") {
    return <PlanRequestSummary request={state.request} onEdit={() => {
      setState({ status: "editing", errors: {}, focusForm: true });
    }} />;
  }

  const errors = state.errors;
  function fieldProps(field: PlanRequestField) {
    return {
      id: field, name: field, defaultValue: draft[field] ?? "",
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
      className: controlClass,
    };
  }
  function error(field: PlanRequestField) {
    return errors[field] ? <p id={`${field}-error`} className="field-error">{errors[field]}</p> : null;
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (field: PlanRequestField) => {
      const entry = data.get(field);
      return typeof entry === "string" ? entry : "";
    };
    const input = {
      groupName: value("groupName"), groupSize: value("groupSize"),
      date: value("date"), startTime: value("startTime"), endTime: value("endTime"),
      startingArea: value("startingArea"), budgetPerPerson: value("budgetPerPerson"),
      mood: value("mood"), hardNo: value("hardNo"),
    };
    setDraft(input);
    const result = planRequestSchema.safeParse(input);
    if (result.success) {
      setState({ status: "confirmed", request: result.data });
      return;
    }
    const nextErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (isField(field) && !nextErrors[field]) nextErrors[field] = issue.message;
    }
    setState({ status: "editing", errors: nextErrors });
  }

  return (
    <form aria-label="Create a plan request" noValidate autoComplete="off" onSubmit={submit} className="space-y-6">
      {!hydrated && <p role="status">JavaScript is required to validate this request privately in your browser.</p>}
      {Object.keys(errors).length > 0 && (
        <section aria-labelledby="errors-title" aria-live="assertive" aria-atomic="true" tabIndex={-1} ref={(element) => element?.focus()}
          className="error-summary">
          <h2 id="errors-title" className="font-semibold">Please correct the following fields</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}><a href={`#${field}`} onClick={(event) => {
                event.preventDefault();
                document.getElementById(field)?.focus();
              }} className="text-link">
                {isField(field) ? labels[field] : field}: {message}
              </a></li>
            ))}
          </ul>
        </section>
      )}
      <fieldset disabled={!hydrated} className="min-w-0 space-y-5">
        <legend className="mb-4 text-xl font-semibold">Plan details</legend>
        <p>All fields are required except hard no.</p>
        <div>
          <label htmlFor="groupName" className="mb-1 block font-medium">Group name</label>
          <input {...fieldProps("groupName")} type="text" required ref={(element) => { if (state.focusForm) element?.focus(); }} />
          {error("groupName")}
        </div>
        <div>
          <label htmlFor="groupSize" className="mb-1 block font-medium">Group size</label>
          <input {...fieldProps("groupSize")} type="number" inputMode="numeric" min={2} max={6} step={1} required />
          {error("groupSize")}
        </div>
        <div>
          <label htmlFor="date" className="mb-1 block font-medium">Date</label>
          <input {...fieldProps("date")} type="date" required />
          {error("date")}
        </div>
        <div className="grid min-w-0 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="startTime" className="mb-1 block font-medium">Start time</label>
            <input {...fieldProps("startTime")} type="time" step={60} required />
            {error("startTime")}
          </div>
          <div>
            <label htmlFor="endTime" className="mb-1 block font-medium">End time</label>
            <input {...fieldProps("endTime")} type="time" step={60} required />
            {error("endTime")}
          </div>
        </div>
        <div>
          <label htmlFor="startingArea" className="mb-1 block font-medium">Starting area</label>
          <input {...fieldProps("startingArea")} type="text" required />
          {error("startingArea")}
        </div>
        <div>
          <label htmlFor="budgetPerPerson" className="mb-1 block font-medium">Budget per person in GBP</label>
          <input {...fieldProps("budgetPerPerson")} type="number" inputMode="decimal" min={1} max={1000} step="any" required />
          {error("budgetPerPerson")}
        </div>
        <div>
          <label htmlFor="mood" className="mb-1 block font-medium">Mood</label>
          <select {...fieldProps("mood")} required>
            <option value="" disabled>Choose a mood</option>
            <option value="relaxed">Relaxed</option>
            <option value="social">Social</option>
            <option value="adventurous">Adventurous</option>
            <option value="surprise-me">Surprise me</option>
          </select>
          {error("mood")}
        </div>
        <div>
          <label htmlFor="hardNo" className="mb-1 block font-medium">Hard no (optional)</label>
          <textarea {...fieldProps("hardNo")} rows={3} />
          {error("hardNo")}
        </div>
        <button type="submit" className="primary-action">
          Create plan request
        </button>
      </fieldset>
    </form>
  );
}
