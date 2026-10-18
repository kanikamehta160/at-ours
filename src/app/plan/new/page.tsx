import type { Metadata } from "next";
import Link from "next/link";
import { PlanRequestForm } from "@/components/plan-request-form";

export const metadata: Metadata = { title: "Make us a plan | At Ours" };

export default function NewPlanPage() {
  return (
    <main className="page-shell">
      <Link href="/" className="wordmark">At Ours<span aria-hidden="true">✳</span></Link>
      <header className="page-intro">
        <p className="eyebrow">A little less back-and-forth</p>
        <h1>Make us a plan</h1>
        <p className="supporting-line">Tell us the shape of it. We’ll work out the rest later.</p>
      </header>
      <div className="form-surface"><PlanRequestForm /></div>
      <p className="privacy-note">Just a request, for now. Nothing is saved or sent. Refreshing clears your details.</p>
    </main>
  );
}
