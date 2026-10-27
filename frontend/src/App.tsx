import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, BookOpen, Bookmark, BrainCircuit,
  CheckCircle2, ChevronDown, Clock3, Code2, Command, Database, Flame,
  Gauge, Layers3, LayoutDashboard, Menu, Network, Search, Settings2,
  ShieldCheck, Sparkles, Target, TerminalSquare, Trophy, X
} from "lucide-react";

type Problem = {
  id: number;
  slug: string;
  title: string;
  module: "HLD" | "LLD" | "DSA" | "Frontend" | "OA" | "CS";
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  summary: string;
};

const navigation = [
  { label: "Overview", icon: LayoutDashboard, section: "Workspace" },
  { label: "System design", icon: Network, section: "Practice" },
  { label: "Low-level design", icon: Layers3, section: "Practice" },
  { label: "DSA practice", icon: Code2, section: "Practice" },
  { label: "Frontend lab", icon: TerminalSquare, section: "Practice" },
  { label: "Assessments", icon: Gauge, section: "Practice" },
  { label: "CS fundamentals", icon: Database, section: "Practice" },
  { label: "Learning paths", icon: BookOpen, section: "Learn" },
  { label: "AI mock interviews", icon: BrainCircuit, section: "Learn" },
  { label: "Saved & revision", icon: Bookmark, section: "Personal" }
];

const fallbackProblems: Problem[] = [
  { id: 1, slug: "design-url-shortener", title: "Design a URL Shortener", module: "HLD", category: "Fundamentals & Key-Value", difficulty: "Medium", summary: "Design a service that maps short links to long URLs. Define requirements, APIs, storage, redirects, and scaling trade-offs." },
  { id: 2, slug: "design-parking-lot", title: "Design a Parking Lot", module: "LLD", category: "Object-Oriented Design", difficulty: "Medium", summary: "Model vehicles, parking spaces, floors, tickets, entry/exit flows, and fee calculation." },
  { id: 3, slug: "two-sum", title: "Two Sum", module: "DSA", category: "Arrays & Hashing", difficulty: "Easy", summary: "Given an integer array and a target, return the indices of two distinct elements whose values add up to the target." }
];

const moduleColors: Record<string, string> = {
  HLD: "violet", LLD: "blue", DSA: "green", Frontend: "orange", OA: "pink", CS: "cyan"
};

export default function App() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [problems, setProblems] = useState<Problem[]>(fallbackProblems);
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All modules");
  const [loading, setLoading] = useState(true);
  const [apiState, setApiState] = useState<"connected" | "offline">("offline");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [completed, setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("mock-completed") || "[]") as string[]; }
    catch { return []; }
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/v1/problems")
      .then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json() as Promise<Problem[]>;
      })
      .then((data) => {
        if (!cancelled) { setProblems(data); setApiState("connected"); }
      })
      .catch(() => { if (!cancelled) setApiState("offline"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filteredProblems = useMemo(() => problems.filter((problem) => {
    const matchesQuery = (problem.title + " " + problem.category + " " + problem.summary)
      .toLowerCase().includes(query.toLowerCase());
    const matchesModule = moduleFilter === "All modules" || problem.module === moduleFilter;
    const matchesNav = activeNav === "Overview" ||
      (activeNav === "System design" && problem.module === "HLD") ||
      (activeNav === "Low-level design" && problem.module === "LLD") ||
      (activeNav === "DSA practice" && problem.module === "DSA") ||
      (activeNav === "Frontend lab" && problem.module === "Frontend") ||
      (activeNav === "Assessments" && problem.module === "OA") ||
      (activeNav === "CS fundamentals" && problem.module === "CS") ||
      !["System design", "Low-level design", "DSA practice", "Frontend lab", "Assessments", "CS fundamentals"].includes(activeNav);
    return matchesQuery && matchesModule && matchesNav;
  }), [problems, query, moduleFilter, activeNav]);

  const markComplete = (slug: string) => {
    setCompleted((previous) => {
      const next = previous.includes(slug) ? previous.filter((item) => item !== slug) : [...previous, slug];
      localStorage.setItem("mock-completed", JSON.stringify(next));
      return next;
    });
  };

  const pageTitle = activeNav === "Overview" ? "Your interview workspace" : activeNav;
  const completedCount = completed.length;
  const totalVisible = problems.length;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Command size={19} strokeWidth={2.5} /></div>
          <div className="brand-name">mock<span>.</span><small>INTERVIEW WORKSPACE</small></div>
          <button className="icon-button mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={18} /></button>
        </div>

        <button className="workspace-switcher">
          <div className="workspace-avatar">K</div>
          <div className="workspace-copy"><strong>Personal workspace</strong><span>Local environment</span></div>
          <ChevronDown size={15} />
        </button>

        <nav className="nav-list" aria-label="Main navigation">
          {["Workspace", "Practice", "Learn", "Personal"].map((section) => (
            <div className="nav-section" key={section}>
              <div className="nav-label">{section}</div>
              {navigation.filter((item) => item.section === section).map((item) => {
                const Icon = item.icon;
                return <button key={item.label} className={`nav-item ${activeNav === item.label ? "active" : ""}`}
                  onClick={() => { setActiveNav(item.label); setMobileMenu(false); }}>
                  <Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>
                  {item.label === "AI mock interviews" && <span className="nav-new">AI</span>}
                </button>;
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-top"><span className="streak-icon"><Flame size={16} /></span><span>YOUR MOMENTUM</span></div>
            <div className="streak-value">Build your streak <ArrowDownRight size={17} /></div>
            <p>Small daily practice compounds into interview confidence.</p>
            <div className="week-dots">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span className={i < 2 ? "day-done" : ""} key={i}>{d}</span>)}</div>
          </div>
          <button className="nav-item settings-item" onClick={() => setActiveNav("Settings")}><Settings2 size={17} /><span>Settings</span></button>
          <div className="profile-row"><div className="profile-avatar">SK</div><div className="profile-copy"><strong>My workspace</strong><span>Personal edition</span></div><button className="icon-button" aria-label="Profile options"><ChevronDown size={16} /></button></div>
        </div>
      </aside>

      {mobileMenu && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={19} /></button><div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div></div>
          <div className="topbar-actions">
            <div className="api-status"><span className={`status-dot ${apiState === "connected" ? "online" : ""}`}></span>{apiState === "connected" ? "API connected" : "Demo data"}</div>
            <button className="search-trigger" onClick={() => document.getElementById("global-search")?.focus()}><Search size={15} /><span>Search anything...</span><kbd>⌘ K</kbd></button>
            <button className="icon-button top-settings" aria-label="Settings" onClick={() => setActiveNav("Settings")}><Settings2 size={18} /></button>
            <div className="top-avatar">SK</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"></span> YOUR PERSONAL PREP SPACE</div>
              <h1>{pageTitle}<span className="title-period">.</span></h1>
              <p className="welcome-subtitle">A little progress every day. A lot more confidence on interview day.</p>
            </div>
            <button className="primary-button" onClick={() => setActiveNav("AI mock interviews")}><Sparkles size={16} /> Start a mock interview <ArrowRight size={16} /></button>
          </section>

          <section className="hero-panel">
            <div className="hero-copy">
              <div className="hero-pill"><span></span> YOUR NEXT CHAPTER STARTS HERE</div>
              <h2>Prepare with purpose.<br /><em>Show up with confidence.</em></h2>
              <p>Practice system design, sharpen your coding, and learn to explain your thinking — all in one focused workspace.</p>
              <button className="hero-button" onClick={() => setActiveNav("System design")}>Explore practice <ArrowRight size={16} /></button>
              <div className="hero-footnote"><ShieldCheck size={14} /> Your workspace, your pace, your progress.</div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
              <div className="art-node node-main"><Network size={27} /><span>System design</span></div>
              <div className="art-node node-top"><Code2 size={19} /></div>
              <div className="art-node node-right"><BrainCircuit size={19} /></div>
              <div className="art-node node-bottom"><Database size={19} /></div>
              <div className="art-line line-a"></div><div className="art-line line-b"></div><div className="art-line line-c"></div>
              <div className="floating-tag tag-one"><span className="tag-check"><CheckCircle2 size={13} /></span> Think in systems</div>
              <div className="floating-tag tag-two"><Sparkles size={13} /> Practice smarter</div>
            </div>
            <div className="hero-glow"></div>
          </section>

          <section className="stats-grid" aria-label="Progress overview">
            <article className="stat-card"><div className="stat-icon stat-purple"><Target size={18} /></div><div className="stat-label">Problems in library</div><div className="stat-value">{problems.length}<span className="stat-unit"> seeded</span></div><div className="stat-note">Your practice catalog</div></article>
            <article className="stat-card"><div className="stat-icon stat-green"><CheckCircle2 size={18} /></div><div className="stat-label">Completed</div><div className="stat-value">{completedCount}<span className="stat-unit"> problems</span></div><div className="stat-note">{completedCount ? "Keep the momentum going" : "Your first win is waiting"}</div></article>
            <article className="stat-card"><div className="stat-icon stat-orange"><Clock3 size={18} /></div><div className="stat-label">Practice time</div><div className="stat-value">—<span className="stat-unit"> hrs</span></div><div className="stat-note">Time tracking coming next</div></article>
            <article className="stat-card"><div className="stat-icon stat-blue"><Trophy size={18} /></div><div className="stat-label">Preparation level</div><div className="stat-value">Starting<span className="stat-unit"> out</span></div><div className="stat-note">Build your baseline</div></article>
          </section>

          <section className="section-heading">
            <div><div className="eyebrow">MAKE TODAY COUNT</div><h2>{activeNav === "Overview" ? "Pick up where you want to grow" : `Explore ${activeNav.toLowerCase()}`}</h2><p>Choose a challenge and get into the flow.</p></div>
            <button className="text-button" onClick={() => { setActiveNav("Overview"); setModuleFilter("All modules"); setQuery(""); }}>View overview <ArrowRight size={15} /></button>
          </section>

          <section className="module-grid">
            {[
              { title: "System design", desc: "Think big. Design for scale.", count: "HLD", icon: Network, tone: "purple", target: "System design" },
              { title: "Low-level design", desc: "Model clean, extensible systems.", count: "LLD", icon: Layers3, tone: "blue", target: "Low-level design" },
              { title: "DSA practice", desc: "Build patterns, not just streaks.", count: "CODE", icon: Code2, tone: "green", target: "DSA practice" },
              { title: "AI mock interviews", desc: "Practice explaining your thinking.", count: "AI", icon: BrainCircuit, tone: "orange", target: "AI mock interviews" }
            ].map((module) => {
              const Icon = module.icon;
              return <button className="module-card" key={module.title} onClick={() => setActiveNav(module.target)}>
                <div className={`module-icon ${module.tone}`}><Icon size={20} /></div><span className="module-code">{module.count}</span>
                <h3>{module.title}</h3><p>{module.desc}</p><span className="module-link">Open module <ArrowRight size={14} /></span>
              </button>;
            })}
          </section>

          <section className="problems-section">
            <div className="section-heading problem-heading"><div><div className="eyebrow">YOUR PRACTICE QUEUE</div><h2>{activeNav === "Overview" ? "Start with a challenge" : activeNav}</h2><p>Search, filter and track your practice in one place.</p></div><span className="results-count">{filteredProblems.length} results</span></div>
            <div className="filter-bar">
              <label className="search-box"><Search size={16} /><input id="global-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search problems, topics..." /><kbd>/</kbd></label>
              <label className="filter-select"><span>Module</span><select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}><option>All modules</option><option value="HLD">System design</option><option value="LLD">Low-level design</option><option value="DSA">DSA</option><option value="Frontend">Frontend</option><option value="OA">Assessments</option><option value="CS">CS fundamentals</option></select><ChevronDown size={14} /></label>
            </div>

            <div className="problem-list">
              {loading && <div className="empty-state">Connecting to your practice library…</div>}
              {!loading && filteredProblems.map((problem) => (
                <article className="problem-row" key={problem.slug}>
                  <button className={`problem-check ${completed.includes(problem.slug) ? "checked" : ""}`} onClick={() => markComplete(problem.slug)} aria-label={completed.includes(problem.slug) ? "Mark incomplete" : "Mark complete"}>{completed.includes(problem.slug) && <CheckCircle2 size={15} />}</button>
                  <div className={`problem-module-icon ${moduleColors[problem.module] || "violet"}`}>{problem.module === "HLD" ? <Network size={17} /> : problem.module === "LLD" ? <Layers3 size={17} /> : <Code2 size={17} />}</div>
                  <button className="problem-main" onClick={() => setSelectedProblem(problem)}><strong>{problem.title}</strong><span>{problem.category}</span></button>
                  <span className={`module-badge ${moduleColors[problem.module] || "violet"}`}>{problem.module}</span>
                  <span className={`difficulty ${problem.difficulty.toLowerCase()}`}><span></span>{problem.difficulty}</span>
                  <button className="row-arrow" onClick={() => setSelectedProblem(problem)} aria-label={`Open ${problem.title}`}><ArrowRight size={17} /></button>
                </article>
              ))}
              {!loading && filteredProblems.length === 0 && <div className="empty-state"><Search size={22} /><strong>No matching challenges</strong><span>Try a different search or module filter.</span><button className="text-button" onClick={() => { setQuery(""); setModuleFilter("All modules"); }}>Clear filters</button></div>}
            </div>
            <div className="library-foot"><span><Activity size={14} /> {apiState === "connected" ? "Connected to persistent API library" : "Showing starter data until API is available"}</span><span>Showing {filteredProblems.length} of {totalVisible}</span></div>
          </section>

          <footer className="page-footer"><span>© 2026 MOCK workspace</span><span>Built for focused practice <span className="footer-heart">✦</span></span><span className="footer-status"><span className="status-dot online"></span> Workspace ready</span></footer>
        </div>
      </main>

      {selectedProblem && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProblem(null)}><section className="problem-modal" role="dialog" aria-modal="true" aria-labelledby="problem-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top"><span className={`module-badge ${moduleColors[selectedProblem.module] || "violet"}`}>{selectedProblem.module}</span><button className="icon-button" onClick={() => setSelectedProblem(null)} aria-label="Close problem"><X size={18} /></button></div>
        <h2 id="problem-title">{selectedProblem.title}</h2><p className="modal-category">{selectedProblem.category} · {selectedProblem.difficulty}</p><p className="modal-summary">{selectedProblem.summary}</p>
        <div className="modal-note"><Sparkles size={16} /><span>This is the first workspace slice. Saved attempts, diagram editing, code execution and AI evaluation will be added in later implementation stages.</span></div>
        <div className="modal-actions"><button className="secondary-button" onClick={() => markComplete(selectedProblem.slug)}>{completed.includes(selectedProblem.slug) ? "Mark incomplete" : "Mark as completed"}</button><button className="primary-button" onClick={() => setSelectedProblem(null)}>Got it <ArrowRight size={15} /></button></div>
      </section></div>}
    </div>
  );
}
