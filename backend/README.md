# Booking delivery setup

Frontend remains on Vercel. /api/contact forwards validated-size JSON to a PHP 8.1+ HTTPS endpoint. The endpoint validates fields, rejects bot honeypots, limits sends to 20/hour, and sends plain-text email through Resend. No visitor details are written to disk. Success is returned only after the provider accepts the email.

1. Host backend/contact.php on a PHP host with cURL. Do not place it in public/ on Vercel.
2. Set server environment variables CONTACT_PROXY_TOKEN (random shared secret), RESEND_API_KEY, BOOKING_EMAIL=varun.nimbolkar@gmail.com (confirmed recipient), BOOKING_FROM (verified sending domain/address). Keep secrets outside web-accessible files.
3. Set PHP_CONTACT_URL and the same CONTACT_PROXY_TOKEN in Vercel, then redeploy. The form stays unavailable with a direct-email fallback until these are set.
4. Send one owner-authorized test enquiry and confirm arrival and Reply-To before announcing email delivery as live. Verify 422 validation, 401 auth, and 429 rate limits on the PHP host. Configure a WAF rate limit at /api/contact as well.
5. Review the 20/hour global limit for expected volume. PHP must preserve a writable system temp directory; multiple hosts require shared rate-limit storage.

Confirmed recipient: varun.nimbolkar@gmail.com. PHP hosting is available; deployment details and verified email-provider credentials are still pending. No email has been sent during implementation.
