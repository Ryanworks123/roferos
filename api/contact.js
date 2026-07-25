import nodemailer from "nodemailer";
import process from "node:process";

const OWNER_EMAIL = process.env.EMAIL_USER;
const ALLOWED_ORIGINS = new Set([
  "https://ryanworks123.github.io",
  "https://roferosryan.vercel.app",
  "http://localhost:5173",
]);
const attempts = new Map();

function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

function isRateLimited(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]) || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 3;
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  if (!ALLOWED_ORIGINS.has(req.headers.origin)) {
    return res.status(403).json({ error: "Origin not allowed." });
  }
  if (!OWNER_EMAIL || !process.env.EMAIL_PASS) {
    return res.status(503).json({ error: "Email service is not configured." });
  }
  if (isRateLimited(req)) {
    return res.status(429).json({ error: "Too many messages. Please try again in a few minutes." });
  }

  const { name = "", email = "", message = "", website = "" } = req.body || {};
  if (website) return res.status(200).json({ ok: true, receiptSent: true });

  const cleanName = String(name).replace(/[\r\n]/g, " ").trim().slice(0, 80);
  const cleanEmail = String(email).trim().toLowerCase().slice(0, 254);
  const cleanMessage = String(message).trim().slice(0, 5000);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  if (!cleanName || !validEmail || cleanMessage.length < 10) {
    return res.status(400).json({ error: "Please provide a valid name, email, and message." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: OWNER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br />");
  let ownerDelivery;
  try {
    ownerDelivery = await transporter.sendMail({
      from: `"Ryan Roferos Portfolio" <${OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: `"${cleanName.replace(/["<>]/g, "")}" <${cleanEmail}>`,
      subject: `Portfolio inquiry from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `<h2>New portfolio inquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
    });
  } catch {
    return res.status(502).json({ error: "Email delivery is temporarily unavailable." });
  }

  let receiptSent = true;
  try {
    await transporter.sendMail({
      from: `"Ryan Roferos" <${OWNER_EMAIL}>`,
      to: cleanEmail,
      replyTo: OWNER_EMAIL,
      subject: "Ryan Roferos received your message",
      text: `Hi ${cleanName},\n\nThank you for contacting me. Your message has been received at ${OWNER_EMAIL}. I will review your inquiry and reply as soon as possible.\n\nRyan Roferos\nFrontend Developer`,
      html: `<p>Hi ${safeName},</p><p>Thank you for contacting me. Your message has been received at <strong>${OWNER_EMAIL}</strong>. I will review your inquiry and reply as soon as possible.</p><p>Ryan Roferos<br />Frontend Developer</p>`,
    });
  } catch {
    receiptSent = false;
  }

  return res.status(200).json({
    ok: Boolean(ownerDelivery.messageId),
    receiptSent,
  });
}
