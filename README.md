# MOCK — Personal Interview Preparation Platform

A private, local-first interview preparation platform inspired by the *functionality* of modern interview-prep products.

## Product goal

Build a comprehensive personal platform covering system design, coding practice, frontend machine coding, company-style assessments, CS fundamentals, courses, AI mock interviews, notes, and progress analytics.

This project uses its own code, design, and original/import-authorized learning content. It does not copy ScaleMock's proprietary source code, branding, or copyrighted content.

## Feature parity baseline

The current working baseline is the user-provided 42-page ScaleMock audit (October 27, 2026). The audit is a secondary description and does not expose every original lesson, question, interaction, or rubric; unknowns must be marked as not yet verified.

### Modules to implement

- [ ] Dashboard and preparation overview
- [ ] HLD / system design problems and practice sheets
- [ ] Interactive architecture canvas, notes, requirements and capacity estimates
- [ ] LLD / object-oriented design problems, class diagrams and coding
- [ ] DSA problem bank, editor, test cases, complexity and explanations
- [ ] Frontend React machine-coding challenges with live preview
- [ ] Timed online assessment sessions and results
- [ ] CS fundamentals quizzes: OS, DBMS, networks and OOP
- [ ] HLD course with modules, chapters, diagrams and case studies
- [ ] LLD course with OOP, SOLID, patterns, refactoring and case studies
- [ ] AI DSA interview workflow
- [ ] AI HLD interview workflow
- [ ] AI LLD interview workflow
- [ ] Interview reports, attempt history and comparison
- [ ] Practice sheets, completion state, stars/bookmarks and difficulty filters
- [ ] Company/topic/difficulty search and filtering
- [ ] Personal notes and mistake notebook
- [ ] Revision queue and preparation recommendations
- [ ] Theme, settings, export and backup
- [ ] Optional speech-to-text and text-to-speech interview interaction
- [ ] Safe code execution integration
- [ ] Local persistence and a documented backup/restore flow

## Audit-derived scale targets

These numbers are targets from the supplied audit, not an independently verified live inventory:

- HLD: 150 problems across 16 categories
- LLD: 150 problems
- Frontend machine coding: 102 challenges
- Online assessments: 125+ assessments
- CS fundamentals: 80 questions (20 per domain)
- HLD course: 7 modules and 67+ chapters claimed by the audit
- HLD case studies: 38 worked designs claimed by the audit
- LLD case studies: 38+ problems claimed by the audit
- AI mock interview tracks: DSA, HLD and LLD

Create original questions and course material, or import content the user is authorized to use. Do not fabricate company provenance or claim an assessment is an actual company test without evidence.

## Scalability target

The initial deployment is designed and load-tested toward 500 simultaneous authenticated sessions (a conservative interpretation of “500 active users”), with ordinary API traffic separated from AI and code-execution workloads. This is a target, not a guarantee: actual capacity must be validated by load tests against the selected hosting plans. See [the 500-user scalability plan](docs/SCALABILITY_500_USERS.md) for topology, sizing assumptions, security, observability, load tests, and cost controls.

## Engineering principles

- Local-first, single-user by default
- Modular monolith to keep development manageable
- Persist user-created work; avoid browser-only storage as the sole source of truth
- Never execute arbitrary submitted code in the API process
- Keep API credentials in environment variables, never in source control
- Every module should have loading, empty, error, completion, and recovery states
- Include keyboard navigation, responsive layouts, accessible labels and clear confirmation for destructive actions
- Maintain a feature matrix and verify each feature end-to-end before marking it complete

## Suggested stack

- Frontend: React + TypeScript + Vite
- UI: Tailwind CSS + accessible component primitives
- API: FastAPI
- Database: PostgreSQL + SQLAlchemy + Alembic
- Coding editor: Monaco Editor
- Architecture canvas: React Flow or an appropriately licensed diagramming library
- Code execution: isolated local runner or an external judge service
- AI: provider abstraction configured through environment variables
- Testing: frontend component tests, API tests and end-to-end browser tests

## Run locally

Requirements: Docker Desktop with Docker Compose, or Python 3.12 and Node.js 20+ for running services separately.

### Recommended: Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/Keerthi421/MOCK.git
   cd MOCK
   ```
2. Optionally copy `.env.example` to `.env` and change the local PostgreSQL password. The example/default password is for local development only.
3. Start the stack:
   ```bash
   docker compose up --build
   ```
4. Open the frontend at `http://localhost:5173`.
5. Check the API health endpoint at `http://localhost:8000/health` and API docs at `http://localhost:8000/docs`.

The first API startup creates the starter schema and inserts a few original sample problems. This is a development bootstrap, not the production migration strategy. Do not expose this stack to the public internet as-is: authentication, production migrations, hardened secrets, rate limiting, and operational monitoring are not yet complete.

### Run backend tests

From the repository root, install the development dependencies and run:

```bash
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements-dev.txt
cd backend
pytest
```

Tests use the SQLite fallback unless `DATABASE_URL` is set. They verify the health route, seeded problem list, and module filtering.

### Run frontend without Docker

```bash
cd frontend
npm install
npm run dev
```

The Vite development proxy expects the API at `http://localhost:8000` when run outside Docker.

## Development status

The repository was empty at project start. This README establishes the target scope and implementation checklist; it does not claim that the features have already been implemented.
