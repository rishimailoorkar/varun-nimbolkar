import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { SiteFooter } from './SiteFooter';
import { ArrowUpRight, Download } from './Icons';

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
 return <label className={wide ? 'enquiry-field enquiry-wide' : 'enquiry-field'}><span>{label}</span>{children}</label>;
}
export function ContactPage() {
 const [ready, setReady] = useState(false);
 const [status, setStatus] = useState('');
 const [sending, setSending] = useState(false);
 useEffect(() => { document.title = 'Book Varun — Varun Nimbolkar'; const controller = new AbortController(); fetch('/api/contact', { signal: controller.signal }).then(r => r.json()).then(data => setReady(data.ready === true)).catch(() => {}); return () => controller.abort(); }, []);
 const submit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); if (!ready || sending) return;
  const form = event.currentTarget;
  setSending(true); setStatus('');
  try {
   const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
   const result = await response.json();
   if (!response.ok || result.ok !== true) throw new Error(result.error || 'Your enquiry could not be sent. Please try again.');
   setStatus('Thank you. Your enquiry has been sent.'); form.reset();
  } catch (error) { setStatus(error instanceof Error ? error.message : 'Unable to send. Please try again.'); }
  finally { setSending(false); }
 };
 return <div className="contact-page"><Navbar/><main id="top">
  <section className="booking-intro"><span className="home-kicker">BOOKINGS & COLLABORATIONS</span><h1>Let’s make<br/><em>something sound.</em></h1><p>For the stage, the studio, or a story waiting to be told.<br/>Bring your vision. Let’s find its sound.</p></section>
  <section className="booking-layout" aria-labelledby="enquiry-title"><aside className="booking-aside"><img src="/images/contact-varun.jpg" alt="Varun Nimbolkar performing on sitar under red stage lights" width="1600" height="1067"/><span className="home-kicker">PUNE, INDIA</span><h2>Classical roots.<br/>Electric possibilities.</h2><p>Live performances, sitar sessions, original compositions and creative collaborations.</p><a className="booking-download" href="/varun-nimbolkar-epk.pdf" download><Download width={20} height={20}/>Download press kit</a><a className="booking-social booking-email" href="mailto:varun.nimbolkar@gmail.com">varun.nimbolkar@gmail.com <ArrowUpRight width={18} height={18}/></a><a className="booking-social" href="https://www.instagram.com/varun_nimbolkar/" target="_blank" rel="noopener noreferrer">Connect on Instagram <ArrowUpRight width={18} height={18}/></a></aside>
  <div className="booking-form-wrap"><span className="home-kicker">TELL US WHAT YOU HAVE IN MIND</span><h2 id="enquiry-title">Start a conversation.</h2><form onSubmit={submit} className="booking-form">
   <Field label="Your name *"><input name="name" autoComplete="name" required maxLength={100}/></Field>
   <Field label="Email address *"><input name="email" type="email" autoComplete="email" required maxLength={254}/></Field>
   <Field label="Organisation / artist"><input name="organisation" autoComplete="organization" maxLength={160}/></Field>
   <Field label="Phone / WhatsApp"><input name="phone" type="tel" autoComplete="tel" maxLength={40}/></Field>
   <Field label="I’m enquiring about *"><select name="type" required defaultValue=""><option value="" disabled>Select an enquiry</option><option>Live performance</option><option>Studio / sitar session</option><option>Composition / film</option><option>Collaboration</option><option>Press / interview</option><option>Other</option></select></Field>
   <Field label="Date (if known)"><input name="date" type="date"/></Field>
   <Field label="City / venue"><input name="location" maxLength={200}/></Field>
   <Field label="Budget range (optional)"><input name="budget" placeholder="Amount and currency" maxLength={100}/></Field>
   <Field label="Tell us about the project *" wide><textarea name="message" rows={5} required minLength={20} maxLength={5000} placeholder="The occasion, audience, format, timings, and anything you’d like us to know."/></Field>
   <div className="enquiry-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <label className="enquiry-consent enquiry-wide"><input name="consent" type="checkbox" required value="yes"/>You may use these details to respond to this enquiry.</label>
   {!ready && <p className="enquiry-notice enquiry-wide">Online enquiries are being connected. For now, please <a href="mailto:varun.nimbolkar@gmail.com">email varun.nimbolkar@gmail.com</a>.</p>}
   <div className="enquiry-wide"><button className="enquiry-submit" disabled={!ready || sending}>{sending ? 'Sending…' : 'Send enquiry'}<ArrowUpRight width={20} height={20}/></button><p role="status" aria-live="polite">{status}</p></div>
  </form></div></section>
 </main><SiteFooter/></div>;
}
