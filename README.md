# 🚗 CHE Driver Dashboard

**Driver Efficiency & Feedback Dashboard** for the College of Human Ecology (CHE), University of the Philippines Los Baños.

Built with **Next.js + TypeScript + Recharts**, deployable to **Vercel** in one click.

---

## Features

- 📊 **Radar chart** per driver — 7 metrics at a glance
- 📈 **Rating trend line** across trips
- 🏆 **Driver ranking** with medal indicators  
- 📋 **Metric breakdowns** with color-coded progress bars
- 💬 **Passenger feedback** feed
- 📁 **CSV import** — paste your Google Forms export, dashboard updates instantly
- 🟢 **Sample data** pre-loaded so it works out of the box

---

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Deploy to Vercel (Free)

1. Push this repo to GitHub
2. Go to vercel.com → Add New Project
3. Import your GitHub repo
4. Click **Deploy** — no config needed, auto-detects Next.js

---

## Using Your Google Forms Data

1. Open your Google Form responses → click the Google Sheets icon
2. In the spreadsheet: **File → Download → CSV**
3. In the dashboard sidebar: click **Upload CSV**
4. Dashboard updates instantly — no server, no database needed

### Expected CSV Column Order

```
Timestamp, Email, Full Name, Organization, Client Category, Driver Name,
Car Used, Date of Trip, Destination,
Responsiveness, Reliability, Punctuality, Road Discipline,
Knowledge of Routes, Vehicle Cleanliness, Driving Comfort, Feedback
```

Ratings should be numeric (1–5).

---

## Tech Stack

Next.js 15 · TypeScript · Recharts · Lucide React · Tailwind CSS · Vercel
