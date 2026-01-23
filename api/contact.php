<?php
declare(strict_types=1);

// Minimal, same-origin contact endpoint for static sites on shared hosting (Plesk/cPanel).
// - Accepts JSON (fetch) or form POST (non-JS fallback)
// - Validates + sanitizes
// - Honeypot + basic IP rate-limit
// - Sends via PHP mail() (swap to SMTP/PHPMailer for best deliverability)

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void {
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false, 'message' => 'method_not_allowed']);
}

// Parse input (JSON preferred; form POST fallback).
$contentType = strtolower((string)($_SERVER['CONTENT_TYPE'] ?? ''));
$data = null;
if (str_contains($contentType, 'application/json')) {
  $raw = file_get_contents('php://input');
  $data = json_decode((string)$raw, true);
  if (!is_array($data)) $data = [];
} else {
  $data = $_POST;
  if (!is_array($data)) $data = [];
}

// Honeypot: if filled, silently accept (do nothing) to avoid tipping off bots.
$honeypot = trim((string)($data['website'] ?? ''));
if ($honeypot !== '') {
  respond(200, ['ok' => true]);
}

// Basic IP rate-limit (5 requests / 10 minutes).
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
$limitMax = 5;
$limitWindowSeconds = 10 * 60;
$rlFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'micpot_contact_rl_' . sha1($ip) . '.json';
$now = time();
$events = [];
if (is_file($rlFile)) {
  $prev = json_decode((string)@file_get_contents($rlFile), true);
  if (is_array($prev)) $events = $prev;
}
$events = array_values(array_filter($events, fn($t) => is_int($t) && ($now - $t) < $limitWindowSeconds));
if (count($events) >= $limitMax) {
  respond(429, ['ok' => false, 'message' => 'rate_limited']);
}
$events[] = $now;
@file_put_contents($rlFile, json_encode($events));

// Helpers
function clean(string $value, int $maxLen): string {
  $v = trim($value);
  $v = strip_tags($v);
  if (function_exists('mb_substr')) {
    $v = mb_substr($v, 0, $maxLen);
  } else {
    $v = substr($v, 0, $maxLen);
  }
  return $v;
}

$name = clean((string)($data['name'] ?? ''), 80);
$company = clean((string)($data['company'] ?? ''), 120);
$email = clean((string)($data['email'] ?? ''), 160);
$message = clean((string)($data['message'] ?? ''), 1200);

if ($name === '' || $email === '' || $message === '') {
  respond(400, ['ok' => false, 'message' => 'missing_required']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(400, ['ok' => false, 'message' => 'invalid_email']);
}
if (strlen($message) < 20) {
  respond(400, ['ok' => false, 'message' => 'message_too_short']);
}

// Configure recipients/sender (IMPORTANT: set From to a mailbox that exists on your server/domain).
$to = 'office@micpot.pl';                 // TODO: change to your real inbox
$from = 'no-reply@micpot.pl';     // TODO: create this mailbox (or change to an existing one)

$subject = 'MICPOT inquiry: ' . $name;
$lines = [
  'New contact form inquiry',
  '---',
  'Name: ' . $name,
  'Company: ' . ($company !== '' ? $company : '-'),
  'Email: ' . $email,
  'IP: ' . $ip,
  '---',
  $message,
  '',
];
$body = implode("\n", $lines);

$headers = [
  'From: ' . $from,
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
];

// Some hosts require an envelope sender (-f). If mail fails, try enabling this:
// $ok = mail($to, $subject, $body, implode("\r\n", $headers), '-f ' . $from);
$ok = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$ok) {
  respond(500, ['ok' => false, 'message' => 'mail_failed']);
}

respond(200, ['ok' => true]);

