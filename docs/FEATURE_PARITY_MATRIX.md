# Feature Parity Matrix

**Baseline:** User-provided `SCALEMOCK_COMPLETE_FEATURE_AUDIT.md.pdf`, dated October 27, 2026.
**Important:** This is a feature implementation backlog based on that audit, not proof that every listed item exists in the live product. Mark unknown behavior `Needs verification` until observed directly.

Statuses: `Not started`, `In progress`, `Implemented`, `Verified`, `Needs verification`.

## 1. Global application shell

- [ ] App name, favicon, branding and page metadata (original branding)
- [ ] Global sidebar/navigation
- [ ] Practice navigation: HLD, LLD, frontend, OA, CS fundamentals
- [ ] Sheets navigation: HLD and LLD
- [ ] AI mock interview navigation
- [ ] Learn / course navigation
- [ ] Premium/subscription-area equivalent for a personal app (no paywall required)
- [ ] Referral area: optional; only build if wanted for personal use
- [ ] Theme switcher; retain choice across sessions
- [ ] Profile/settings menu
- [ ] Global search
- [ ] Breadcrumbs and back navigation
- [ ] Responsive desktop/tablet/mobile layout
- [ ] Keyboard-accessible navigation and clear focus states
- [ ] Helpful loading, empty, failed, and offline states
- [ ] Accessible labels, color contrast and reduced-motion support
- [ ] App version/build information and diagnostics

## 2. Dashboard and personal progress

- [ ] Summary of total problems attempted/completed by module
- [ ] Recent activity
- [ ] Continue where I left off
- [ ] Saved/bookmarked problems
- [ ] Problems marked for review
- [ ] Weak-topic summary based on actual attempts
- [ ] Course progress by module and chapter
- [ ] Mock interview history and results
- [ ] Assessment history and scores
- [ ] Recently used notes
- [ ] Recommended next task (explain why it is recommended)
- [ ] Date/time and duration tracking
- [ ] Filters for time range and module
- [ ] Data export and backup status

## 3. HLD / System Design problem bank

Audit target: 150 problems, 16 categories. Exact complete inventory not included in the audit.

Categories from audit:
1. Fundamentals & Key-Value
2. Unique IDs & Key Generation
3. Caching & CDN
4. Rate Limiting & Throttling
5. Locking, Concurrency & Inventory
6. Payments & Idempotency
7. Messaging & Real-time
8. Search, Indexing & Autocomplete
9. Geo & Location
10. Storage & File Systems
11. Social & Feeds
12. Collaboration & Media
13. Booking & Reservation
14. Coordination & Scheduling
15. Observability & Infra
16. AI/ML Infrastructure

Per-problem requirements:
- [ ] Title, slug, unique ID, short summary
- [ ] Full original problem statement
- [ ] Difficulty
- [ ] Topic/category
- [ ] Company tags only where supported by source/provenance
- [ ] Functional requirements
- [ ] Non-functional requirements and measurable targets
- [ ] Constraints, traffic/scale assumptions and clarifying questions
- [ ] Capacity/back-of-envelope estimation worksheet
- [ ] Architecture canvas
- [ ] Save/restore diagram and its viewport
- [ ] Add, select, move, rename and delete components
- [ ] Connect/disconnect components; label relationships
- [ ] Component property editor
- [ ] Diagram undo/redo and auto-layout (where supported by chosen library)
- [ ] Diagram validation/accessibility
- [ ] Design notes and assumptions
- [ ] Proposed architecture and data model
- [ ] APIs and data flows
- [ ] Bottlenecks, failure modes and mitigations
- [ ] Trade-offs
- [ ] Submit design for rubric-based feedback
- [ ] Save draft, autosave, resume, reset with confirmation
- [ ] Mark completed / revisit / star
- [ ] Attempt history and prior feedback
- [ ] Filter by category, difficulty, company tag and completion
- [ ] Problem sheet views: 25 / 75 / 150 (audit says these sheet options exist)
- [ ] Sort by topic and difficulty
- [ ] Suggested time per problem
- [ ] Free/Premium gates are not required for a private clone; keep everything locally unlocked

Audit sample problems include URL shortener and Pastebin. Generate original statements and solutions rather than copying full third-party content.

## 4. LLD / Object-oriented design

Audit target: 150 problems.

- [ ] Problem statement and functional requirements
- [ ] Core entities/classes and responsibilities
- [ ] Class diagram/UML canvas
- [ ] Interfaces, inheritance, composition and relationships
- [ ] Java, C++ and Python coding option (validate actual support before claiming full parity)
- [ ] Code editor and test harness
- [ ] SOLID review checklist
- [ ] Pattern selection and rationale
- [ ] Modularity, coupling/cohesion and extensibility review
- [ ] Edge cases and error handling
- [ ] Evaluation report with evidence from submitted design/code
- [ ] Save/resume, attempts, bookmarks, review status
- [ ] Company/topic/difficulty filtering when tags are sourced
- [ ] Sheet sizes 25 / 75 / 150
- [ ] Suggested time and completion status

Audit examples: parking lot, elevator, library, games, expense splitting, hotel booking, movie tickets, chess, vending machine.

## 5. DSA / coding practice

The audit mentions coding in mock interviews, but does not fully specify a standalone DSA module. Treat details below as product requirements for this build, not verified ScaleMock behavior.

- [ ] Topic and difficulty browsing
- [ ] Problem description and examples
- [ ] Constraints and hidden/public test cases
- [ ] Monaco-style code editor
- [ ] Language selection
- [ ] Run sample tests
- [ ] Submit to isolated runner
- [ ] Per-test pass/fail status
- [ ] Compilation/runtime errors clearly presented
- [ ] Time and memory reporting only if supplied by runner
- [ ] Complexity notes and self-assessment
- [ ] Progressive hints
- [ ] Original editorial / solution explanations
- [ ] Attempt snapshots and code history
- [ ] Mark solved / attempted / revisit
- [ ] Bookmark and notes
- [ ] Wrong-answer/mistake notebook
- [ ] Search and filters
- [ ] Keyboard shortcuts and editor settings

## 6. Frontend machine coding

Audit target: 102 React challenges; audit claims editor/live preview and filters. Only nine titles were enumerated in the audit.

- [ ] Challenge list, unique detail page and difficulty
- [ ] Topic/company filters where supported
- [ ] Requirements, expected interactions and visual acceptance checklist
- [ ] Code editor
- [ ] Live preview in isolated sandbox/iframe
- [ ] Reset starter code
- [ ] Save code locally
- [ ] Run/reload preview
- [ ] Console/runtime diagnostics
- [ ] Responsive viewport presets
- [ ] Interaction checks
- [ ] Visual correctness checklist
- [ ] Code quality review
- [ ] Performance review where measurable
- [ ] Accessibility checklist
- [ ] Autosave and restore
- [ ] Attempt history and completion state
- [ ] Original challenge content; audit did not provide all 102 titles

## 7. Online assessments (OA)

Audit target: 125+ company-oriented assessments; audit generally describes 2–3 timed problems per assessment.

- [ ] Assessment directory
- [ ] Company/type/difficulty filters only for grounded labels
- [ ] Assessment description and number of questions
- [ ] Start confirmation and timer
- [ ] Attempt state persists on refresh
- [ ] Clear rules for timer expiration
- [ ] Coding questions with test cases
- [ ] Navigate between questions
- [ ] Per-question state and code preservation
- [ ] Submit one question and/or final assessment (define explicitly)
- [ ] Submission confirmation
- [ ] Final score and per-question status
- [ ] Explanation/review screen after completion
- [ ] Attempt history and comparison
- [ ] Time spent per question
- [ ] Retry policy configuration
- [ ] Assessment data provenance; never present synthetic content as an actual company test

## 8. CS fundamentals

Audit target: 80 questions, 20 in each subject; all 80 reportedly free in audited platform.

Domains:
- [ ] Computer Networks (20 target)
- [ ] Operating Systems (20 target)
- [ ] DBMS (20 target)
- [ ] OOP (20 target)

Quiz behavior:
- [ ] Question with 4–5 options as audit describes
- [ ] Single/multiple answer support set per question
- [ ] Select and change answer before submission
- [ ] Progress counter
- [ ] Optional timer and time tracking
- [ ] Finish and scoring screen
- [ ] Review correct answer
- [ ] Explanation
- [ ] Topic/domain score breakdown
- [ ] Reattempt wrong questions
- [ ] Bookmark and revision status
- [ ] Persist answers and results
- [ ] Detailed explanation/community discussion is audit-reported as Premium; community behavior requires verification and may be omitted for personal use

## 9. HLD course

Audit-reported target: 7 modules, 67+ chapters, 40–60 hours. The complete chapter list is not contained in the audit. Build a course CMS/content model and populate original lessons.

Audit modules:
1. Foundations & Mindset
2. Networking & Communication
3. Data Layer
4. Scalability & Reliability Patterns
5. Architect's Toolkit
6. Case Studies
7. Interview Playbook

Topic examples from audit:
- Design approach and estimation
- CAP theorem / consistency
- DNS, HTTP/HTTPS, REST, gRPC, WebSockets
- Load-balancing strategies
- SQL/NoSQL, ACID, sharding, replication
- Consistency, consistent hashing, caching and invalidation
- Queues, CDNs, rate limiting, microservices, circuit breakers, retry/backoff, bulkheads, graceful degradation
- Redis, Kafka, Cassandra, Elasticsearch, Kubernetes, Terraform

- [ ] Course landing page and outcomes
- [ ] Module/chapter tree
- [ ] Lesson pages supporting text, diagrams and code snippets
- [ ] Interactive diagrams where appropriate
- [ ] Worked case studies
- [ ] Next/previous chapter
- [ ] Mark lesson complete / revisit
- [ ] Progress per chapter/module/course
- [ ] Notes and bookmarks attached to chapter
- [ ] Search across course
- [ ] Estimated reading/time label
- [ ] Resume last viewed chapter
- [ ] Content versioning/export

Audit claims 38 worked designs; use an original case-study set. Examples mentioned: URL shortener, Pastebin, chat, video streaming, recommender, ad serving, email.

## 10. LLD course

Audit describes an OOP-focused course but the precise chapter list is not verified.

Suggested original sections:
- [ ] OOP fundamentals
- [ ] SOLID principles
- [ ] Design patterns
- [ ] Code organization
- [ ] Extensibility and maintainability
- [ ] Refactoring and testing
- [ ] Case studies
- [ ] Interview mastery/trade-offs

Lesson capabilities:
- [ ] Articles and diagrams
- [ ] Code examples with syntax highlighting
- [ ] Chapter navigation, completion and bookmarks
- [ ] Personal notes
- [ ] Progress and resume
- [ ] Practice links from lesson to problems

## 11. AI mock interviews — shared session lifecycle

Audit reports three live tracks: DSA (45 min), HLD (60 min), LLD (45 min). Frontend (45 min) and Behavioral/Leadership (30 min) are reported as coming soon/under development.

- [ ] Choose track and difficulty
- [ ] Company/role option only when implemented
- [ ] Explicit duration and session rules
- [ ] Generate or select prompt
- [ ] Interviewer asks question and follow-ups
- [ ] User can ask clarifying questions
- [ ] Text interaction baseline
- [ ] Optional speech input/output
- [ ] Session timer and time remaining
- [ ] Code editor for DSA / LLD where appropriate
- [ ] Diagram canvas for HLD / LLD where appropriate
- [ ] Session pause/resume policy
- [ ] End interview confirmation
- [ ] Persist transcript and artifacts
- [ ] Structured evaluation report
- [ ] Strengths, improvement areas and evidence
- [ ] Suggested follow-up study plan
- [ ] Previous sessions and comparisons
- [ ] AI failures/timeouts handled without losing work
- [ ] API key never exposed in the browser
- [ ] Voice provider, model, pricing and accuracy are configurable/transparent
- [ ] Do not fabricate real interviewer identity or employer affiliation; use fictional personas clearly labeled as simulated

### DSA rubric

- [ ] Problem understanding
- [ ] Clarifying questions
- [ ] Approach selection
- [ ] Correctness
- [ ] Edge cases
- [ ] Complexity analysis
- [ ] Testing
- [ ] Communication

### HLD rubric

- [ ] Functional requirements
- [ ] Non-functional requirements
- [ ] Architecture
- [ ] Scalability
- [ ] Reliability
- [ ] Bottlenecks and failure handling
- [ ] Trade-offs
- [ ] Communication

### LLD rubric

- [ ] Object modelling
- [ ] Interfaces/classes and relationships
- [ ] Patterns and reasoning
- [ ] SOLID
- [ ] Modularity
- [ ] Extensibility
- [ ] Tests and edge cases
- [ ] Communication

- [ ] Frontend track (audit reports coming soon; verify before treating as confirmed)
- [ ] Behavioral/leadership track (audit reports coming soon; verify before treating as confirmed)

## 12. Practice sheets and problem tracking

- [ ] HLD/LLD sheet views (25 / 75 / 150 targets from audit)
- [ ] Completion checkbox per problem
- [ ] Star/bookmark
- [ ] Mark for review
- [ ] Difficulty badge/label
- [ ] Company tags when grounded
- [ ] Suggested time per problem
- [ ] Topic-order / easy-to-hard ordering
- [ ] Filter completion state
- [ ] Persistent progress
- [ ] Search
- [ ] Keyboard accessible controls
- [ ] Bulk clear/reset with confirmation
- [ ] Import/export sheet progress

## 13. Profile, storage and settings

Audit claims browser localStorage/IndexedDB persistence and no cloud sync, but that finding requires direct verification. This project should choose an explicit source of truth.

- [ ] Single-user mode by default
- [ ] Optional local passcode/session lock
- [ ] Profile preferences
- [ ] Theme preference
- [ ] Editor preferences (font size, tabs, theme)
- [ ] AI provider and model settings (secrets stored server-side/environment only)
- [ ] Export all user data
- [ ] Backup and restore
- [ ] Database migration procedure
- [ ] Delete data/reset progress with confirmation
- [ ] Clear error if database unavailable
- [ ] No silent loss of progress
- [ ] Document how to move to a new machine

## 14. AI design review and feedback

- [ ] Defined rubrics and scoring guidance per track
- [ ] Feedback tied to specific artifacts/transcript evidence
- [ ] Explain trade-offs and alternative designs
- [ ] Separate objective checks from subjective model assessment
- [ ] Display uncertainty and avoid false precision
- [ ] Preserve submitted version that feedback is based on
- [ ] Rerun/review previous submissions
- [ ] Export report as Markdown/JSON
- [ ] Avoid unsupported claims that a diagram was parsed correctly

## 15. Security and reliability requirements

- [ ] API keys in environment variables
- [ ] `.env` ignored by Git
- [ ] No secrets in committed example configs
- [ ] CORS restricted to local app origin
- [ ] Input size limits
- [ ] Validation and structured errors
- [ ] Backups for database and user files
- [ ] Tests for persistence and migrations
- [ ] Arbitrary code never executes inside FastAPI process
- [ ] If code runner is local, use a restricted container/sandbox, resource/time limits and network disabled by default
- [ ] Dependency and license review
- [ ] Logs avoid personal notes, secrets, and full transcripts by default

## 16. Audit uncertainty / verification backlog

These details were not established fully by the provided audit and must not be treated as confirmed parity:
- Exact chapter-by-chapter HLD course list
- Exact chapter-by-chapter LLD course list
- All 150 HLD problem titles/statements
- All 150 LLD problem titles/statements
- All 102 frontend challenge titles/statements
- Full list and exact content of 125+ assessments
- Exact pricing and checkout behavior
- Full AI evaluation rubric and underlying model
- Voice service/provider/model details
- Whether named interviewer personas are actually available
- Community/discussion behavior
- Mobile app/offline support
- Analytics implementation
- Cloud sync behavior and exact browser storage behavior
- Video editorials per problem
- Customizable interview preferences
- Referral flow
- Actual landing-page user/success claims

## 17. Completion definition

A checkbox is not complete merely because a screen exists. A module is verified only when:
1. Its key flow works end-to-end.
2. Data persists after refresh/restart.
3. Loading/empty/error states are handled.
4. It has automated tests for core behavior.
5. It is keyboard-accessible and usable on a narrow screen.
6. The relevant checklist entries are verified against real behavior.
