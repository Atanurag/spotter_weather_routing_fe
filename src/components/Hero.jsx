import { ShieldCheck, Truck, Wind } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="eyebrow"><ShieldCheck size={15} /> SAFETY-FIRST LOGISTICS</div>
        <h1>Every mile.<br /><em>Better informed.</em></h1>
        <p>Compare route alternatives against forecast conditions at estimated arrival time, so your next decision is grounded in risk — not guesswork.</p>
      </div>
      <div className="hero-art">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="hero-truck"><Truck size={68} strokeWidth={1.2} /></div>
        <div className="art-chip chip-one"><Wind size={15} /> Wind monitored</div>
        <div className="art-chip chip-two"><ShieldCheck size={15} /> Risk scored</div>
      </div>
    </section>
  );
}
