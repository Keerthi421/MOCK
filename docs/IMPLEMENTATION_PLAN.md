# Implementation Plan

This plan turns the feature matrix into vertical slices. Keep the application runnable after every slice; don't generate every empty page first.

## Slice 0 — Repository foundation
- Vite + React + TypeScript app
- FastAPI API service
- PostgreSQL via Docker Compose, SQLAlchemy and Alembic
- Typed API client and shared error format
- Environment configuration and safe example env file
- Ruff/pytest, ESLint/TypeScript checks, frontend tests
- Responsive app shell, sidebar, theme toggle and not-found page
- README run instructions
**Acceptance:** fresh clone can be started from documented steps; health check and frontend load; no secrets are committed.

## Slice 1 — Content model and persistence
- Modules, categories, problems, lessons, attempts, bookmarks, notes, progress
- Seed metadata only; do not invent copyrighted ScaleMock text
- Repository/service/API layers and migrations
- Search/filter API with pagination
**Acceptance:** create/list/update a personal problem; progress and bookmark survive a service restart.

## Slice 2 — HLD workspace
- HLD index with category/difficulty/search/filter
- Detail page with requirements, assumptions and estimations
- Diagram canvas with editable components and labeled edges
- Autosaved diagram state and text notes
- Submission snapshot and rubric-feedback record
**Acceptance:** reload a problem and recover exact notes/diagram; older attempt remains unchanged when a new attempt is submitted.

## Slice 3 — LLD workspace
- Problem list and detail view
- Class/entity model and diagram
- Code editor and local tests
- Pattern/SOLID self-review and feedback report
**Acceptance:** save design and code, reopen them, and view past attempts.

## Slice 4 — Coding practice
- DSA question pages and topic lists
- Monaco editor and language selection
- Safe-runner adapter interface
- Public examples, submission queue and judge result schema
- Mistake notebook and revision state
**Acceptance:** sample problem can be run/tested in an isolated environment; timeouts and runtime errors are shown; API remains responsive.

## Slice 5 — Frontend machine coding
- Challenge list/detail
- Isolated live preview
- Starter code, reset and autosave
- Requirements checklist and attempt history
**Acceptance:** user code cannot access app secrets or parent page; reload restores working state.

## Slice 6 — Timed OA and CS quizzes
- OA session state machine: scheduled/active/submitted/expired
- Persist timer anchor on server/database to resist refresh resets
- Question navigation and answer preservation
- MCQ quiz engine, review and score breakdown
**Acceptance:** refresh does not reset an OA timer; expired session follows documented submission rules.

## Slice 7 — Course engine
- Course/module/chapter content schema
- Markdown lesson renderer with code blocks and diagrams
- Progress, bookmarks and personal notes
- Search and resume
**Acceptance:** navigation between chapters and completion state persist.

## Slice 8 — AI features
- Server-side provider abstraction
- Prompt versioning and rubric definitions
- HLD submission review
- DSA/LLD mock interview session state, transcript and evaluation
- Token/time limits, cancellation and failure recovery
- Optional voice pipeline only after text interviews are solid
**Acceptance:** no provider key appears in frontend bundle/network requests; report records input/version/provider metadata without secrets; failed calls don't erase transcript.

## Slice 9 — Dashboard, analytics, backup
- Activity overview computed from actual data
- Weak-topic signals based on attempts, with explanation
- Export/import for user-created data
- PostgreSQL backup/restore guide
**Acceptance:** dashboard numbers match database fixtures; backup can restore to a clean instance.

## Slice 10 — Hardening
- Automated end-to-end tests for each module
- Responsive and keyboard accessibility audit
- Dependency/license review
- Security review of code runner and preview sandbox
- Performance smoke test and empty/loading/error states
- Complete feature verification pass
**Acceptance:** every item marked Verified in FEATURE_PARITY_MATRIX has an automated or documented manual verification.

## Data/content policy

The initial public repository is empty. Implement schemas and reusable tools first. Populate sample data with original material. Where a feature depends on ScaleMock content not contained in the provided audit, mark it as a content gap rather than inventing that it has been faithfully replicated.
