import { useEffect, useState, useRef, type FormEvent, type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { SiteFooter } from './SiteFooter';
import { ArrowUpRight } from './Icons';

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
 return <label className={wide ? 'enquiry-field enquiry-wide' : 'enquiry-field'}><span>{label}</span>{children}</label>;
}
export function ContactPage() {
 const [ready, setReady] = useState(false);
 const [status, setStatus] = useState('');
 const [sending, setSending] = useState(false);
 const [step, setStep] = useState(0);
 const [furthest, setFurthest] = useState(0);
 const formRef = useRef<HTMLFormElement>(null);
 const advance = () => { const current = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`); const fields = Array.from(current?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input,select,textarea') || []); const invalid = fields.find(field => !field.checkValidity()); if (invalid) { invalid.reportValidity(); return; } const next = Math.min(step + 1, 3); setStep(next); setFurthest(Math.max(furthest, next)); };
 useEffect(() => { document.title = 'Book Varun — Varun Nimbolkar'; const controller = new AbortController(); fetch('/api/contact', { signal: controller.signal }).then(r => r.json()).then(data => setReady(data.ready === true)).catch(() => {}); return () => controller.abort(); }, []);
 const submit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); if (!ready || sending) return;
  const form = event.currentTarget;
  setSending(true); setStatus('');
  try {
   const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
   const result = await response.json();
   if (!response.ok || result.ok !== true) throw new Error(result.error || 'Your enquiry could not be sent. Please try again.');
   setStatus('Thank you. Your enquiry has been sent.'); form.reset(); setStep(0); setFurthest(0);
  } catch (error) { setStatus(error instanceof Error ? error.message : 'Unable to send. Please try again.'); }
  finally { setSending(false); }
 };
 return <div className="contact-page"><Navbar/><main id="top">
  <section className="booking-intro"><span className="home-kicker">BOOKINGS & COLLABORATIONS</span><h1>Let’s make<br/><em>something sound.</em></h1><p>For the stage, the studio, or a story waiting to be told.<br/>Bring your vision. Let’s find its sound.</p></section>
  <section className="booking-layout booking-journey-layout" aria-labelledby="enquiry-title"><aside className="booking-aside"><img src="/images/contact-varun.jpg" alt="Varun Nimbolkar performing on sitar under red stage lights" width="1600" height="1067"/><p>Every project starts with a conversation.</p><a className="booking-social booking-email" href="mailto:varun.nimbolkar@gmail.com">varun.nimbolkar@gmail.com <ArrowUpRight width={18} height={18}/></a></aside>
  <div className="booking-form-wrap"><div className="journey-progress"><span>{String(step+1).padStart(2,'0')} <span>/ 04</span></span><div className="journey-checkpoints" aria-label="Enquiry progress">{['The idea','The details','The story','Your details'].map((label,index)=><button key={label} type="button" className={index<=step?'reached':''} aria-label={`Step ${index+1}: ${label}`} aria-current={index===step?'step':undefined} disabled={index>furthest} onClick={()=>setStep(index)}><span>{index<step?'✓':index+1}</span></button>)}</div></div>
  <form onSubmit={submit} className="booking-form booking-journey" ref={formRef}>
  <div className="journey-step" data-step="0" hidden={step!==0}><h2 id="enquiry-title">Let’s start with the basics.</h2><p>Tell us what you’re reaching out for.</p><Field label="I’m enquiring about *" wide><select name="type" required defaultValue=""><option value="" disabled>Select an enquiry</option><option>Live performance</option><option>Studio / sitar session</option><option>Composition / film</option><option>Collaboration</option><option>Press / interview</option><option>Other</option></select></Field></div>
  <div className="journey-step" data-step="1" hidden={step!==1}><h2>Set the scene.</h2><p>What practical details do you already know?</p><div className="journey-fields"><Field label="Date (if known)"><input name="date" type="date"/></Field><Field label="City / venue"><input name="location" maxLength={200}/></Field><Field label="Budget range (optional)"><input name="budget" placeholder="Amount and currency" maxLength={100}/></Field><Field label="Organisation / artist"><input name="organisation" autoComplete="organization" maxLength={160}/></Field></div></div>
  <div className="journey-step" data-step="2" hidden={step!==2}><h2>Tell us the story.</h2><p>The occasion, audience, format and anything else that matters.</p><Field label="Tell us about the project *" wide><textarea name="message" rows={6} required minLength={20} maxLength={5000} placeholder="What are you imagining?"/></Field></div>
  <div className="journey-step" data-step="3" hidden={step!==3}><h2>How can we reach you?</h2><p>Leave your details and we’ll continue the conversation.</p><div className="journey-fields"><Field label="Your name *"><input name="name" autoComplete="name" required maxLength={100}/></Field><Field label="Email address *"><input name="email" type="email" autoComplete="email" required maxLength={254}/></Field><Field label="Phone / WhatsApp"><input name="phone" type="tel" autoComplete="tel" maxLength={40}/></Field></div><label className="enquiry-consent enquiry-wide"><input name="consent" type="checkbox" required value="yes"/>You may use these details to respond to this enquiry.</label><div className="enquiry-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>{!ready && <p className="enquiry-notice enquiry-wide">Online enquiries are being connected. For now, please <a href="mailto:varun.nimbolkar@gmail.com">email varun.nimbolkar@gmail.com</a>.</p>}<p role="status" aria-live="polite">{status}</p></div>
  <div className="journey-actions">{step>0&&<button type="button" className="journey-back" onClick={()=>setStep(step-1)}>← Back</button>}{step<3?<button type="button" className="enquiry-submit" onClick={advance}>Next →</button>:<button className="enquiry-submit" disabled={!ready||sending}>{sending?'Sending…':'Send enquiry →'}</button>}</div>
  </form></div></section>
 </main><SiteFooter/></div>;
}
