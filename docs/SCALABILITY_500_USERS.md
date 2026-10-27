# Scalability Plan: 500 Active Users

## Capacity target and assumptions

"500 active users" can mean 500 registered users, 500 daily active users, or 500 simultaneous users. Until measured usage is available, use a conservative initial engineering target:

- 500 registered users with persistent individual accounts
- Up to 500 simultaneous authenticated sessions as a burst target
- Normal interactive API traffic around 25–75 requests/second, with short bursts above that
- AI and code execution are separate, rate-limited workloads and must not block normal API requests
- Availability target for an initial personal/small-group deployment: best effort, with health checks, backups, and documented recovery rather than a premature multi-region design

This is a planning target, not a performance guarantee. Load tests must validate it against the actual hosting tier, schema, queries, and traffic mix.

## Recommended deployment architecture

Start with a modular monolith. It is simpler to operate and is sufficient for this scale when the database, API workers, and expensive workloads are isolated.

```text
Browser / PWA
     |
 CDN / HTTPS / WAF (managed platform)
     |
 Reverse proxy / load balancer
     |
 React static assets --------------------------+
     |                                         |
     +----> FastAPI API replicas                |
                 |                              |
                 +---- PostgreSQL (managed)     |
                 |        |                     |
                 |        +-- automated backups|
                 |                              |
                 +---- Redis (cache, limits,    |
                 |      short-lived state)      |
                 |                              |
                 +---- Job queue ---------------+
                           |
                    Background workers
                    /        |        \
                AI jobs   email/jobs  reports
                           |
                    Isolated code runner
                    (separate service/sandbox)

User uploads/exports/diagram snapshots -> object storage
Metrics/logs/traces -> monitoring service
Secrets -> hosting provider's secret manager
```

## Suggested starting topology

These are initial sizing hypotheses, not vendor guarantees; benchmark before increasing capacity.

- Frontend: static build behind CDN; no application server needed for static assets.
- API: 2 instances/replicas where the hosting platform supports it, each initially around 1–2 vCPU and 1–2 GB RAM. For a low-cost start, one instance is possible but is a single point of failure.
- PostgreSQL: managed PostgreSQL, start around 2 vCPU / 4 GB RAM if available and affordable; use connection pooling and automated backups. Size by observed query latency, connection usage, and storage growth.
- Redis: small managed instance for rate limiting, cache, short-lived coordination, and job broker only if the selected queue supports it reliably. Durable user data must remain in PostgreSQL.
- Worker: one separate worker process to start; scale independently based on queue depth and job duration.
- Code execution: separate isolated runner service or trusted sandbox provider. Never execute submitted code inside a FastAPI worker.
- Object storage: store large exports, attachments and optional artifacts outside PostgreSQL.
- Monitoring: platform metrics plus structured application logs, error reporting, uptime checks, and alerts.

Do not introduce Kubernetes, microservices, multi-region writes, or sharding for 500 users unless measurements demonstrate a concrete need.

## Application requirements for this load

### API and application
- Keep FastAPI routes stateless between requests so multiple replicas can serve the same user.
- Store sessions/tokens securely; do not rely on in-process session state.
- Use async I/O for network-bound calls where appropriate, but do not assume async makes CPU-heavy tasks cheap.
- Add pagination to every potentially large list.
- Set request body size limits and sensible timeouts.
- Use connection pooling; ensure total pool sizes across all replicas cannot exceed PostgreSQL connection capacity.
- Avoid N+1 queries; inspect and index common list/detail/search queries.
- Add idempotency to operations that may be retried, such as final submissions and billing-like actions.
- Keep long-running AI, report generation, and code execution out of request-response handlers; enqueue jobs and return a job/session ID.
- Provide health/readiness endpoints and graceful shutdown.

### PostgreSQL
- PostgreSQL is the source of truth for accounts, problems, attempts, notes, course progress, mock interview transcripts and settings.
- Use Alembic migrations and a documented rollback/recovery strategy.
- Add indexes based on actual query patterns: user_id, module/category, difficulty, status, created_at, and foreign-key columns where used.
- Use transactions for related updates, such as assessment submission and result persistence.
- Use cursor pagination for long histories if offset pagination becomes expensive.
- Do not store every keystroke as a new database row; debounce autosave and batch updates.
- Apply retention controls for large transcripts and logs if needed.
- Test backup restoration, not just backup creation.

### Redis and caching
- Cache only data that is safe to recompute: public problem metadata, category lists and frequently requested course content.
- Use a bounded TTL and explicit invalidation when content changes.
- Keep personal notes, completed progress and final scores in PostgreSQL.
- Apply per-user and per-IP rate limits, especially to AI and code execution.
- Redis loss should not destroy user data; the app must degrade safely if caching is unavailable.

### Search
- Start with PostgreSQL full-text search and indexes for problem/course search.
- Add a dedicated search engine only if measured relevance or throughput needs justify it.
- Always paginate and cap search result sizes.

## AI interview and evaluation capacity

AI cost and provider limits are likely to become a bigger constraint than normal CRUD traffic.

- Put AI requests behind a provider adapter and background queue.
- Configure provider/model, timeouts, retry limits and maximum tokens using environment variables.
- Set per-user session quotas and per-minute request limits.
- Limit parallel generations globally and per user.
- Stream responses only when the provider and frontend support it safely.
- Persist transcript events incrementally so a provider timeout does not lose the session.
- Use exponential backoff with jitter for retryable provider failures; do not retry non-idempotent work blindly.
- Avoid sending the entire interview history on every turn; summarize older context and keep relevant recent turns.
- Log token usage and estimated cost without logging API keys or unnecessary personal content.
- Provide a clear state for queued, running, completed, failed and retryable jobs.
- Make AI feedback reproducible enough to audit by recording rubric/prompt version and model identifier, but never secrets.
- Do not assume 500 users can all run simultaneous voice interviews under a free-tier API. Load test provider quotas and set concurrency caps.

## Code execution safety and capacity

- Run user-submitted code in a separate service with container/VM isolation, CPU and memory limits, wall-clock timeout, filesystem restrictions and network disabled by default.
- Never mount application secrets or the host Docker socket into a runner.
- Enforce output limits and terminate runaway processes.
- Use a bounded queue and concurrency limit; return a queue position/status rather than letting the API hang.
- Apply per-user submission limits.
- Recycle runner environments between jobs and patch base images regularly.
- Prefer a trusted external judge service if maintaining secure sandboxing is outside project scope.

## Security for 500 users

- HTTPS everywhere outside localhost.
- Secure, HttpOnly, SameSite cookies if using cookie-based sessions; protect state-changing requests against CSRF.
- Password hashing using a modern password-hashing library; never store plaintext passwords.
- Email verification and password reset only if account-based access is enabled.
- Role-based admin access for content editing.
- Validate all input and use parameterized SQL/ORM queries.
- Rate-limit authentication, search, AI and runner endpoints.
- Store secrets in the hosting platform's secret manager; never commit real `.env` files.
- Configure CORS narrowly.
- Protect uploaded files and exports with authorization and expiring links.
- Keep dependencies updated and run vulnerability checks.
- Have a privacy-conscious logging policy; avoid recording passwords, API keys, full code submissions, or sensitive notes unnecessarily.

## Observability and operational readiness

Measure at minimum:
- Request rate, error rate and p50/p95/p99 latency by route
- API CPU/memory and restart count
- PostgreSQL connection count, slow queries, CPU, memory, disk and storage growth
- Redis latency, memory and evictions
- Queue depth, oldest job age, worker failures and retry count
- AI request latency, token usage, failure rate and cost
- Code runner queue delay, timeout rate and resource use
- Browser error rate and failed frontend API calls
- Backup success and last successful restore test

Suggested initial alerts:
- Sustained 5xx error rate above 2%
- p95 latency above 1 second for ordinary API requests for several minutes
- Database connections above 80% of configured capacity
- Queue oldest-job age above the product's acceptable wait
- Repeated backup failures
- Unexpected AI spend or provider quota exhaustion

Tune thresholds to real baseline and service expectations.

## Load-testing plan

Use k6, Locust or an equivalent tool against a staging deployment with synthetic data.

1. Smoke: 5 virtual users for 5 minutes.
2. Ramp: 25, 50, 100, 250 and 500 virtual users in stages.
3. Soak: 100 virtual users for 60 minutes to reveal connection leaks and memory growth.
4. Burst: jump from 50 to 500 virtual users and observe recovery.
5. AI load: separately test queueing and provider concurrency with mocked AI responses before spending on real model calls.
6. Runner load: separately test bounded concurrent submissions in an isolated staging environment.
7. Failure test: stop one API replica, restart Redis in staging, and simulate database/provider timeouts.

Use a realistic mix: browse/search problems, open details, autosave notes/diagrams, submit attempts, review results, and start mock interviews. Do not have every virtual user request the same cached endpoint.

Initial acceptance goals (to be measured, not promised):
- 500 simultaneous authenticated sessions without crashes or lost writes
- p95 under 500 ms for common cached/list/detail API operations under the defined non-AI load
- p95 under 1 second for ordinary database-backed API operations under the defined test mix
- No lost committed user data after an API restart
- AI and code-runner overload produces bounded queues and clear status, not API exhaustion
- No database connection exhaustion or unbounded memory growth during the soak test

AI response time is provider-dependent and is excluded from ordinary API latency goals.

## Cost control

Exact cost depends on region, provider, AI usage and chosen hosting plan. Do not commit to a fixed cost before measuring.

- Prefer managed services with clear quotas and usage alerts.
- Start with one region and one PostgreSQL primary.
- Keep static assets on CDN.
- Set monthly budgets and alerts for AI providers and hosting.
- Limit token count, voice minutes, concurrency and per-user usage.
- Cache stable course/problem metadata.
- Run load tests with mocked AI before live provider tests.
- Add a local development mode that works without AI keys.
- Review cost per completed mock interview and per active user monthly.

## Scaling triggers

Scale based on metrics, not user count alone:
- Add API replicas when CPU/latency remains high after query optimization.
- Increase PostgreSQL resources or improve indexes when query latency/CPU/IO is the bottleneck.
- Add worker replicas when queue age rises while the database/API remain healthy.
- Increase Redis only when memory/latency metrics justify it.
- Add a search engine only when PostgreSQL search is demonstrably insufficient.
- Consider partitioning or sharding only after measured data volume and query patterns require it.

## Definition of done

- [ ] Hosting topology and limits documented
- [ ] Database connection budget calculated across all replicas
- [ ] Migrations and backup/restore verified
- [ ] Rate limits and AI quotas enforced
- [ ] Code execution isolated from API
- [ ] Structured metrics and alerts configured
- [ ] 500-session load test completed in staging
- [ ] Soak test completed without leaks or lost writes
- [ ] Bottlenecks and results documented
- [ ] Capacity and cost assumptions revisited after real usage
