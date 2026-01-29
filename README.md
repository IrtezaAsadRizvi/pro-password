![ProPassword cover](https://i.ibb.co.com/GQz21kTn/propass-snap-git-cover.jpg)

# 🔐 ProPassword - Free Password Generator

**Create strong, unique passwords instantly from your own phrase.**  
Private, fast, and fully client‑side. Nothing is stored or sent.

Create strong, unique passwords instantly from your own phrase. ProPassword runs entirely in the browser, never stores your data, and helps you make secure passwords that are easy to remember and hard to crack.

## ✨ Overview
ProPassword is a privacy‑first, client‑side password generator built with Next.js. It blends randomness with an optional phrase you provide, then measures strength with a pattern‑aware entropy model. The result is fast, reliable password creation that keeps your data on your device.

## 🚀 Key Features
- 🧠 Phrase‑based password generation for memorable yet strong results
- 🎛️ Custom length and character options (uppercase, lowercase, numbers, symbols)
- 📊 Pattern‑aware strength meter with estimated entropy
- 🔒 100% client‑side generation (no server storage or transmission)
- 🌍 Internationalization‑ready with `next-intl`
- ⚡ Static export ready for fast, low‑cost hosting

## 🧩 How It Works
1. Choose length and character types.
2. Optionally add a phrase (trimmed and blended into the password).
3. The generator creates a randomized password and evaluates strength.
4. Copy the result and use it wherever you need a strong password.

## 💡 Why ProPassword
If you need a **free password generator**, **secure password tool**, or a **phrase‑based password generator**, ProPassword is designed for speed, privacy, and strong security fundamentals. It works offline after load, making it ideal for quick, secure password creation without third‑party tracking.

## 🧰 Tech Stack
- **Next.js (App Router)** - modern React routing + static export
- **Tailwind CSS** - rapid, consistent styling
- **next-intl** - localization and i18n
- **Redux Toolkit** - state patterns (where needed)

## 🗂️ Project Structure
- `app/` - routes, layouts, pages, and blog content
- `components/` - UI components (generator, hero, FAQs, etc.)
- `helpers/` - password utilities and strength evaluation
- `messages/` - localization strings
- `public/` - static assets and Open Graph images

## 🛠️ Getting Started
Prerequisites:
- Node.js 18+ recommended
- npm

Install and run:
```bash
npm install
npm run dev
```

Build a static export:
```bash
npm run build
```

Preview the static output:
```bash
npx serve@latest out
```

## 📜 Scripts
- `npm run dev` - local dev server + Tailwind watch
- `npm run build` - build + static export
- `npm run deploy` - build and deploy to Firebase Hosting
- `npm run lint` - lint the codebase

## 📰 SEO & Content
The project includes SEO‑focused content and metadata, plus blog posts about password strength, passphrases, and best practices. These pages are optimized for discoverability while educating users on creating strong, unique passwords.

## 🔐 Privacy
Passwords are generated entirely in the browser. No data is stored or transmitted by the app. If you need to save passwords, use a trusted password manager and clear your clipboard on shared devices.

## 📝 License
MIT License. See `LICENSE` for details.
