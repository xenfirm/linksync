# 🚀 LinkSync - Turn Your Bio Into a Lead Machine

LinkSync is a high-conversion "Link in Bio" platform designed specifically for creators, freelancers, and small businesses who want to transform Instagram profile visits into direct WhatsApp leads.

## 🌟 Key Features

- **Dynamic Bio Page**: A premium, responsive landing page for all your important links.
- **Lead Capture System (Pro)**: Integrated form to collect name and phone number before redirecting to WhatsApp.
- **WhatsApp Integration**: Sticky primary CTA to start instant conversations.
- **Analytics Dashboard**: Track total leads, link clicks, and conversion rates.
- **Secure Authentication**: Robust system with centralized `useAuth`, password recovery, and protected routes.
- **Internal Admin Bypass**: Built-in developer mode to test Pro features without active payments.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), TypeScript, Lucide Icons.
- **Styling**: Vanilla CSS (Custom design system).
- **Backend**: Supabase (PostgreSQL, Auth, Storage).
- **Payments**: Razorpay (Edge Function integration).
- **Emails**: Resend (Transactional notifications).

---

## 🏗️ Architecture & Security

LinkSync follows a **Zero-Trust Frontend** architecture. All sensitive logic and data protection are enforced at the database and serverless level.

### 🛡️ Row Level Security (RLS)
- **Profiles**: Publicly viewable; updatable only by the owner.
- **Links**: Publicly viewable; managed only by the owner.
- **Leads**: Publicly submittable (for Pro users); viewable ONLY by Pro owners or Admins.

### ⚡ Edge Functions
- `create-order`: Generates secure Razorpay orders.
- `verify-payment`: Validates HMAC signatures and upgrades user plans via Service Role.
- `send-lead-email`: Sends instant email alerts when a new lead is captured.
- `send-auth-email`: Custom transactional emails for password resets.

---

## ⚙️ Setup & Configuration

### 1. Environment Variables (`.env.local`)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 2. Supabase Secrets
Set these for your Edge Functions using the CLI:
```bash
npx supabase secrets set RAZORPAY_KEY_ID=xxx
npx supabase secrets set RAZORPAY_KEY_SECRET=xxx
npx supabase secrets set RESEND_API_KEY=xxx
```

### 3. Database Schema
Run the contents of `supabase-schema.sql` in your Supabase SQL Editor to initialize tables, indexes, and RLS policies.

---

## 👨‍💻 Developer Tips

### Admin Bypass
To unlock Pro features for testing without paying:
```sql
UPDATE profiles SET is_admin = true WHERE user_id = 'your_user_id';
```
*Look for the "Admin Mode" badge in your dashboard to confirm activation.*

### Local Development
```bash
npm install
npm run dev
```

---

## 📄 License
Internal Project - All Rights Reserved.
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Made with](https://img.shields.io/badge/made%20with-React-blue)