# MICPOT Contact Form — Server Hookup Guide

This guide explains exactly what to change in the frontend and what to build on the server to make the contact form submit safely.

## Frontend changes (required)

1) Replace the fake submit handler in `scripts/main.js`.
- File: `scripts/main.js`
- Function: `setupContactForm`
- Remove the current block that sets `"contact.form.status.success"` and calls `form.reset()`.
- Replace it with a real `fetch()` request to your server endpoint.

**Example replacement block (inside the submit handler):**

```js
const payload = {
  name: nameValue,
  company: fields.company?.value.trim() || "",
  email: emailValue,
  message: messageValue
};

try {
  const response = await fetch("contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    setStatus("error", "contact.form.status.server");
    return;
  }

  setStatus("success", "contact.form.status.success");
  form.reset();
} catch (error) {
  setStatus("error", "contact.form.status.server");
}
```

2) Add a server error translation key (so you can show a real failure state).
- File: `scripts/translations.js`
- Add a new key for both languages:
  - `contact.form.status.server`

Suggested copy:
- EN: `"We could not send your message. Please try again in a moment."`
- PL: `"Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę."`

3) Optional: remove the “company missing” warning if you don’t want to block submission.
- File: `scripts/main.js`
- Remove this block:
  ```js
  if (!fields.company?.value.trim()) {
    setStatus("warning", "contact.form.status.company");
    return;
  }
  ```

4) Optional: add a non‑JS fallback submit (recommended).
- File: `contact.html`
- Add: `action="contact.php"` and `method="post"` to the form.
- Keep `novalidate` if you want to keep custom validation.

## Server endpoint (required)

Create `contact.php` (or a different endpoint and update the `fetch()` URL).

**Minimum responsibilities:**
- Validate required fields (name, email, message)
- Validate email format
- Enforce message length
- Sanitize strings (strip tags, trim, limit length)
- Send email using SMTP (PHPMailer recommended)
- Return JSON

**Example response:**
```json
{ "ok": true }
```
On error:
```json
{ "ok": false, "message": "Validation failed" }
```

## Security checklist (recommended)

- **Rate‑limit** by IP (simple file‑based or memory‑based throttling)
- **Honeypot** field (hidden input that must stay empty)
- **CSRF** token if you allow cross‑origin usage (same‑origin typically ok)
- **SMTP** with credentials stored outside web root
- **Header hardening** (set `Content-Type: application/json`)

## Minimal PHP structure (outline)

1) Parse request JSON:
- `file_get_contents("php://input")`
- `json_decode(...)`

2) Validate:
- required fields
- email format (`filter_var`)
- message length

3) Sanitize:
- `trim()`
- `strip_tags()`
- `mb_substr()` to cap length

4) Send:
- PHPMailer SMTP
- From: a real inbox on your domain
- Reply‑To: the user’s email

5) Return JSON:
- `http_response_code(200)` with `{ "ok": true }`  
- `http_response_code(400)` with `{ "ok": false, "message": "..." }`

## What to remove later (explicit list)

- Remove the fake success line in `setupContactForm`.
- Remove any placeholder translation copy about “server not connected.”
- Remove any temporary warning logic you don’t want (company warning).

## Deployment notes

- Keep `contact.php` outside public editing tools if possible.
- Use environment variables or a `.env` file for SMTP credentials.
- Confirm outbound SMTP is enabled on your hosting (cpanel usually provides SMTP settings).

