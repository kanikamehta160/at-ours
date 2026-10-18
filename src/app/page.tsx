import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell home-page">
      <p className="wordmark">At Ours<span aria-hidden="true">✳</span></p>
      <header className="page-intro">
        <p className="eyebrow">Good company. Less organising.</p>
        <h1>Plans that feel like us.</h1>
        <p className="supporting-line">At Ours helps small groups make fair plans that actually happen.</p>
      </header>
      <p>Start with the shape of your get-together: who’s coming, when and what feels right. For now, you can create and review a plan request.</p>
      <Link href="/plan/new" className="primary-action">Make us a plan <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
