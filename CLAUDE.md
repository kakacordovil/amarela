# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🧠 Context

**AmarEla** is a community directory of women-owned services and businesses — a modern "yellow pages" with purpose. The site is in Portuguese (pt-BR).

The implementation is a **static website** (HTML, CSS, JavaScript) with a single Vercel serverless function. No build step is required.

### Architecture

- `index.html` — main page: directory listing with search/filter/pagination + submission form
- `about.html`, `contact.html`, `email-confirmation.html` — secondary pages
- `style.css` — global styles supplementing Tailwind CSS (loaded via CDN)
- `menu.js` — shared mobile hamburger menu logic, included on all pages
- `data/services.json` — directory data, loaded at runtime via `fetch()`
- `api/submit.js` — Vercel serverless function that handles form submissions

### Submission flow

When a user submits the form, `api/submit.js` uses the GitHub API (Octokit) to create a branch, commit the new entry to `data/services.json`, and open a PR for maintainer review. New entries only go live after the PR is merged.

### Data format

Each entry in `data/services.json`:
```json
{
  "name": "Full Name",
  "service": "Service description",
  "category": "Category name",
  "location": "City, Country",
  "atendimento": "Online or Presencial",
  "link": "https://..."
}
```

Categories are hardcoded in the `<select>` in `index.html` — update both when adding a new one.

### Running locally

No build needed. Use any static file server:
```bash
python -m http.server 8000
# or
npx serve .
```

To test form submission locally, use `npx vercel dev` with `GITHUB_TOKEN` set.

---

## 🎯 Your Role

You are helping improve the project in a practical and incremental way.

Focus on:
- improving design
- improving usability
- improving code quality

---

## 🛠️ How to Work

When making changes:

1. Keep things simple
2. Prefer small improvements over large rewrites
3. Explain what you are doing
4. Suggest improvements before implementing complex changes

---

## 🎨 Design Improvements

You should:
- modernize layout and spacing
- improve typography
- enhance visual hierarchy
- make components more consistent

Avoid:
- overly complex animations
- unnecessary visual noise

---

## 📱 Responsiveness

Always ensure:
- layout works on mobile
- buttons are easy to tap
- text is readable on small screens

---

## ♿ Accessibility

- Use semantic HTML
- Add alt attributes
- Improve contrast
- Ensure navigation is clear

---

## 🧹 Code Guidelines

- Keep code readable and simple
- Avoid duplication
- Organize CSS better when possible
- Do not introduce unnecessary dependencies

---

## 🚫 What NOT to do

- Do not convert to React or other frameworks
- Do not overcomplicate architecture
- Do not break existing functionality
- Do not change the `services.json` structure without updating the rendering logic in `index.html`
- Do not introduce npm dependencies to the frontend
- Do not add a Tailwind build pipeline — CDN usage is intentional

---

## 🚀 Suggestions You Can Make

You are encouraged to suggest:

- UI redesign ideas
- UX improvements
- Better structure for CSS
- Performance improvements
- Accessibility fixes

---

## 💬 Communication Style

- Be clear and practical
- Explain changes simply
- Suggest before implementing big changes
- Think like a developer improving a real project

---

## 🧩 Goal

Help evolve AmarEla into a more modern, accessible and polished platform — without losing its simplicity.