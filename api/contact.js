export default async function handler(req, res) {
 res.setHeader('Cache-Control', 'no-store');
 const url = process.env.PHP_CONTACT_URL;
 const token = process.env.CONTACT_PROXY_TOKEN;
 const ready = Boolean(url?.startsWith('https://') && token);
 if (req.method === 'GET') return res.status(200).json({ ready });
 if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'Method not allowed.' }); }
 if (!ready) return res.status(503).json({ error: 'Online enquiries are not yet available. Please email varun.nimbolkar@gmail.com.' });
 if (!req.headers['content-type']?.includes('application/json')) return res.status(415).json({ error: 'Use a JSON request.' });
 const payload = req.body;
 if (!payload || typeof payload !== 'object' || Buffer.byteLength(JSON.stringify(payload)) > 12000) return res.status(400).json({ error: 'Invalid enquiry.' });
 try {
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000), redirect: 'error' });
  const result = await response.json();
  if (!response.ok || result.ok !== true) return res.status(response.status >= 400 && response.status < 500 ? response.status : 502).json({ error: response.status === 422 ? 'Please check the required fields and email address.' : response.status === 429 ? 'Please wait before sending another enquiry.' : 'Unable to send right now. Please try again.' });
  return res.status(200).json({ ok: true });
 } catch { return res.status(502).json({ error: 'Unable to send right now. Please try again.' }); }
}
