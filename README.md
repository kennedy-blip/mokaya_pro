# 🎓 Mokaya Pro — Data Science Academy (DS 301)

> **A complete school Data Science course in one web app.**
> Lecturer: **Kennedy Blip — Mokaya** • Meru, Kenya 🇰🇪
> 10 Units • 38 Topics • Live Coding Playground • 12 Mini Projects • Capstone Final Project • Quiz • Library

This repository is the **classroom**. Everything a student needs — curriculum, previews, tutorial links, references, small projects, coding languages and one full final project — lives in this web app, deployed live on **Vercel**.

---

## 🚀 Deploy to Vercel (60 seconds)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → select this repo.
3. Framework preset: **Other** (static site). Click **Deploy**.
4. Your course is live at `https://<your-project>.vercel.app` 🎉

No build step, no environment variables, no database required. It is a zero-build static app (HTML + CSS + vanilla JS) — exactly the workflow taught in **Unit 9**.

Local preview:

```bash
npm run dev   # http://localhost:3000
```

---

## 📚 Course Structure (DS 301)

| Unit | Title | Weeks | Topics | Languages |
|------|-------|-------|--------|-----------|
| 1 | Foundations & Python for Data Science | 1–2 | 4 | Python |
| 2 | Data Wrangling with Pandas & NumPy | 3–4 | 4 | Python |
| 3 | Data Visualisation & Exploratory Analysis | 5–6 | 4 | Python |
| 4 | Statistics & Probability for ML | 7–8 | 4 | Python (+ R bonus) |
| 5 | Machine Learning Fundamentals | 9–10 | 5 | Python |
| 6 | Deep Learning & Neural Networks | 11–12 | 4 | Python |
| 7 | NLP, LLMs & Generative AI | 13 | 3 | Python |
| 8 | SQL, Databases & Big Data | 14 | 3 | SQL, Python |
| 9 | MLOps, Deployment & Vercel | 15 | 3 | Python, JavaScript |
| 10 | Capstone: Final Project & Career Launch | 16 | 4 | All |

**Every topic includes:** a preview, learning objectives, tutorial/reference links, a code example, and a small project task.

**Grading:** Assignments 20% • Mini Projects 20% • Quiz 10% • Final Capstone 50%

---

## ✨ App Features (what students get)

- **🏠 Dashboard** — progress tracking (saved on device), class snapshot chart, course roadmap, featured projects.
- **📚 My Course** — all 10 units as expandable accordions with subjects, outcomes, previews, difficulty & language badges, and filters (Python / SQL / JavaScript).
- **🔍 Global search** — find any topic or project instantly.
- **💻 Code Playground** — run **real Python** in the browser via [Pyodide](https://pyodide.org/) (WebAssembly), real JavaScript, a mini SQL engine over the course database, and R guidance. Includes language comparison table and challenges.
- **🛠️ Mini Projects** — 12 projects (one per subtopic), each with skills, difficulty, time estimate, **live Vercel demo link** and GitHub link.
- **🎓 Final Project (Capstone)** — *"Mokaya Insights: Student Performance Predictor"*:
  - Live prediction with sliders (real multiple linear regression trained in-browser via OLS)
  - Train/test evaluation (R², MAE, RMSE), EDA charts (Chart.js)
  - CSV upload & parsing, sample CSV download, 120-student dataset preview
  - Unit-by-unit breakdown + 10-item submission checklist (50% of grade)
- **📖 Library & References** — 24 books, docs, practice platforms, datasets, videos and tools, categorised.
- **📝 Quiz** — 20 questions across all units with explanations, instant scoring and best-score tracking.
- **👨‍🏫 About Lecturer** — timetable, grading, office hours, academic integrity rules, and how the app itself was built/deployed.

Progress (completed topics, quiz best score, capstone checklist) is stored in `localStorage` — private to each student's device.

---

## 🗂️ Repository Structure

```
.
├── index.html            # App shell (navbar, sidebar, router mount)
├── vercel.json           # Vercel config (clean URLs, SPA rewrite, security headers)
├── package.json          # Metadata + local dev script
├── css/
│   └── styles.css        # Full design system (responsive, no framework)
├── js/
│   ├── course-data.js    # THE CURRICULUM: units, topics, projects, resources, quiz, sample data
│   └── app.js            # Router + all views + playground + capstone ML + quiz logic
└── README.md             # This file
```

**To customise the course** (add a topic, change a tutorial link, add a quiz question), edit only `js/course-data.js` — the UI updates automatically.

---

## 🧑‍🏫 For the Lecturer

- **Timetable:** Tue & Thu 09:00–11:00 EAT • Lab Fri 14:00–16:00 • Office Wed 10:00–12:00
- **Contact:** lecturer@mokaya-pro.ac.ke
- **Teaching flow:** Dashboard → Unit (in class) → Topic modal (preview + tutorials) → Playground (live coding) → Mini Project (homework) → Quiz (assessment) → Final Project (capstone).
- **Mini project demo links** currently point to the course app itself as placeholders — replace `demo` URLs in `js/course-data.js` with each student's (or the class's) Vercel deployments as projects are completed.

## 📄 License

For classroom use by Mokaya Pro students. Tutorial/book links belong to their respective authors — all are free or library-available resources cited for educational purposes.
