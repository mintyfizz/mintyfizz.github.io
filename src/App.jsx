import { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "mintyfizz";
const CONTACT = {
  github: "https://github.com/mintyfizz",
  githubLabel: "@mintyfizz",
  linkedin: "https://linkedin.com/in/thomasgatse",
  linkedinLabel: "in/thomasgatse",
  email: "nathangatse@outlook.com",
};

const LANG_COLORS = {
  Python: "#84a98c",
  "C#": "#b77b55",
  JavaScript: "#d1a45f",
  TypeScript: "#7b90a8",
  HTML: "#a65f45",
  Shell: "#8a9a5b",
};

const STATIC_STATS = {
  repos: "5+",
  stars: "1",
  latestPush: "Unavailable",
};

const PROJECTS = [
  {
    name: "telco-regulator-pipeline",
    url: "https://github.com/mintyfizz/telco-regulator-pipeline",
    category: "Data platform",
    featured: true,
    language: "Python",
    summary:
      "Open-source reference data platform for telecoms sector regulation.",
    longDescription:
      "Synthetic operator submissions, PostgreSQL medallion warehouse, MinIO object storage, dbt marts, and Airflow orchestration calibrated to a Republic of Congo market structure.",
    stack: ["Python", "Airflow", "dbt", "PostgreSQL", "MinIO", "Docker"],
    tags: ["Pipeline", "Warehouse", "Regulatory data"],
    outcome:
      "Flagship project showing generation, ingestion, validation, quality events, and analytics-ready marts.",
    role: "Designed the generator, warehouse layers, validation rules, and orchestration path.",
    stars: 1,
  },
  {
    name: "realtime-data-platform",
    url: "https://github.com/mintyfizz/realtime-data-platform",
    category: "Streaming",
    language: "Python",
    summary:
      "End-to-end real-time pipeline for user-event processing.",
    longDescription:
      "Kafka producers feed user events, Spark Structured Streaming transforms them, results land in Cassandra, and Airflow coordinates the pipeline.",
    stack: ["Kafka", "Spark", "Cassandra", "Airflow", "Docker"],
    tags: ["Streaming", "Distributed systems"],
    outcome: "Demonstrates event-driven processing from producers to analytical storage.",
    role: "Built the containerized data flow and orchestration layer.",
    stars: 0,
  },
  {
    name: "NatuurSpotter",
    url: "https://github.com/mintyfizz/NatuurSpotter",
    category: "Package",
    language: "Python",
    summary:
      "Published Python package for moth observation data and biodiversity reporting.",
    longDescription:
      "Collects and analyses observations from waarnemingen.be, generates biodiversity CSVs, interactive Folium maps, PDF species reports, seasonal charts, and optional LLM interpretation.",
    stack: ["Python", "Folium", "PDF reports", "LLM"],
    tags: ["PyPI", "Biodiversity", "Analytics"],
    outcome: "Turns raw observation data into maps and reports that are easier to inspect.",
    role: "Built the collection, analysis, mapping, and reporting workflows.",
    stars: 0,
  },
  {
    name: "Smart-Meal-Fitness-Tracker",
    url: "https://github.com/mintyfizz/Smart-Meal-Fitness-Tracker",
    category: "Desktop app",
    language: "C#",
    summary:
      "Windows desktop app for tracking meals, activities, weight, and calorie goals.",
    longDescription:
      "WPF / .NET 8 app integrating Supabase for auth and storage, USDA FoodData Central for nutrition data, and Google Gemini for meal recommendations.",
    stack: ["C#", ".NET 8", "WPF", "Supabase", "USDA API", "Gemini AI"],
    tags: ["Desktop", "Product data", "AI"],
    outcome: "Combines structured nutrition data with personal tracking workflows.",
    role: "Implemented the desktop UI, persistence, integrations, and recommendation flow.",
    stars: 0,
  },
  {
    name: "spotify-inspiration-lab-staged",
    url: "https://github.com/mintyfizz/spotify-inspiration-lab-staged",
    category: "Learning",
    language: "C#",
    summary:
      "Console-based C# app modelling core Spotify domain concepts.",
    longDescription:
      "Models songs, albums, artists, playlists, and favourites with seeded demo data and an intentionally staged commit history.",
    stack: ["C#", ".NET 9", "OOP"],
    tags: ["Domain modelling", "Console app"],
    outcome: "Shows object modelling, clean commits, and small-system design practice.",
    role: "Built the domain model and staged the learning path through commits.",
    stars: 0,
  },
];

const PROJECT_FILTERS = [
  { label: "All" },
  { label: "Infrastructure", categories: ["Data platform", "Streaming"] },
  { label: "Analytics", categories: ["Package"], tags: ["Analytics"] },
  { label: "Applications", categories: ["Desktop app"] },
  { label: "Learning", categories: ["Learning"] },
];

const FILTER_LABELS = PROJECT_FILTERS.map((filter) => filter.label);

const ACTIVITY_TABS = [
  { id: "languages", label: "Languages" },
  { id: "recent-pushes", label: "Recent pushes" },
  { id: "contributions", label: "Contributions" },
];

const FALLBACK_RECENT = PROJECTS.slice(0, 4).map((project) => ({
  name: project.name,
  pushedAt: "",
  description: project.summary,
  url: project.url,
}));

function timeAgo(dateStr) {
  if (!dateStr) return "Curated";
  const diff = Math.max(0, Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

function projectMatchesFilter(project, filterLabel) {
  const filter = PROJECT_FILTERS.find(({ label }) => label === filterLabel);
  if (!filter || filter.label === "All") return true;

  return (
    filter.categories?.includes(project.category) ||
    filter.tags?.some((tag) => project.tags.includes(tag))
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3 7 8.35 5.35a1.2 1.2 0 0 0 1.3 0L21 7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SystemMap() {
  const lines = Array.from({ length: 12 }, (_, index) => ({
    y: 52 + index * 17,
    endY: 92 + Math.abs(index - 5) * 5,
  }));

  return (
    <div className="system-map" aria-hidden="true">
      <div className="map-label map-label-top">DATA IN</div>
      <svg viewBox="0 0 620 310" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5b4032" />
            <stop offset="68%" stopColor="#b77b55" />
            <stop offset="100%" stopColor="#d8b18d" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="618" height="308" fill="none" stroke="#4a342b" strokeWidth="1" />
        {[130, 260, 390, 520].map((x) => (
          <path key={x} d={`M${x} 16v278`} stroke="#2a211d" strokeDasharray="2 10" />
        ))}
        {lines.map((line, index) => (
          <path
            key={line.y}
            d={`M26 ${line.y} C160 ${line.y} 210 ${line.endY} 286 ${line.endY} S420 ${150 + (index - 6) * 4} 566 150`}
            stroke="url(#lineGradient)"
            strokeWidth={index === 6 ? 1.5 : 0.8}
            fill="none"
            opacity={0.55 + index * 0.025}
          />
        ))}
        <circle cx="166" cy="92" r="3" fill="#b77b55" />
        <circle cx="248" cy="177" r="3" fill="#84a98c" />
        <circle cx="364" cy="126" r="2.5" fill="#d1a45f" />
        <circle cx="476" cy="166" r="3" fill="#b77b55" />
        <rect x="216" y="52" width="8" height="8" fill="none" stroke="#d8b18d" />
        <rect x="532" y="145" width="7" height="7" fill="#84a98c" />
        {[78, 130, 182].map((y) => (
          <g key={y}>
            <rect x="584" y={y} width="4" height="4" fill="#d8b18d" />
            <circle cx="604" cy={y + 2} r="1.8" fill="#80604e" />
          </g>
        ))}
      </svg>
      <div className="map-label map-label-bottom">TRUSTED DATA OUT</div>
    </div>
  );
}

function SectionTitle({ number, title, action }) {
  return (
    <div className="section-title-row">
      <span className="section-number">{number}</span>
      <h2>{title}</h2>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}

function App() {
  const [githubStats, setGithubStats] = useState(STATIC_STATS);
  const [repoDetails, setRepoDetails] = useState({});
  const [languageStats, setLanguageStats] = useState([
    { lang: "Python", pct: 60 },
    { lang: "C#", pct: 40 },
  ]);
  const [recentRepos, setRecentRepos] = useState(FALLBACK_RECENT);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectName, setSelectedProjectName] = useState(PROJECTS[0].name);
  const [activityTab, setActivityTab] = useState(ACTIVITY_TABS[0].id);

  useEffect(() => {
    let ignore = false;

    async function enrichFromGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) return;

        const [user, repos] = await Promise.all([userRes.json(), reposRes.json()]);
        if (ignore || !Array.isArray(repos)) return;

        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const latest = [...repos]
          .filter((repo) => repo.pushed_at)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0];

        setGithubStats({
          repos: user.public_repos ? String(user.public_repos) : STATIC_STATS.repos,
          stars: String(totalStars),
          latestPush: latest ? timeAgo(latest.pushed_at) : STATIC_STATS.latestPush,
        });

        setRepoDetails(
          Object.fromEntries(
            repos.map((repo) => [
              repo.name,
              {
                stars: repo.stargazers_count || 0,
                pushedAt: repo.pushed_at || "",
                language: repo.language || "",
                description: repo.description || "",
              },
            ]),
          ),
        );

        const languageCounts = repos.reduce((counts, repo) => {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
          return counts;
        }, {});
        const totalLanguageRepos = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
        if (totalLanguageRepos > 0) {
          setLanguageStats(
            Object.entries(languageCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([lang, count]) => ({
                lang,
                pct: Math.max(4, Math.round((count / totalLanguageRepos) * 100)),
              })),
          );
        }

        setRecentRepos(
          [...repos]
            .filter((repo) => repo.pushed_at)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 5)
            .map((repo) => ({
              name: repo.name,
              pushedAt: repo.pushed_at,
              description: repo.description || "Repository activity",
              url: repo.html_url,
            })),
        );
      } catch {
        // Static curated content is the product experience; GitHub data only enriches it.
      }
    }

    enrichFromGitHub();
    return () => {
      ignore = true;
    };
  }, []);

  const visibleProjects = useMemo(() => {
    return PROJECTS.filter((project) => projectMatchesFilter(project, activeFilter));
  }, [activeFilter]);

  const selectedProject = PROJECTS.find((project) => project.name === selectedProjectName) || PROJECTS[0];

  function selectFilter(filter) {
    setActiveFilter(filter);
    const nextProject = PROJECTS.find((project) => projectMatchesFilter(project, filter)) || PROJECTS[0];
    setSelectedProjectName(nextProject.name);
  }

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Nathan Gatse home">
          <span className="brand-mark">NG</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#activity">Activity</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Nathan Gatse</h1>
            <p className="hero-summary">
              Data Science student building reliable data systems and pipelines that turn raw
              submissions into trusted, production-ready assets.
            </p>
            <div className="hero-stats" aria-label="GitHub summary">
              <div>
                <strong>{githubStats.repos}</strong>
                <span>Repositories</span>
              </div>
              <div>
                <strong>{githubStats.stars}</strong>
                <span>Stars</span>
              </div>
              <div>
                <strong>{githubStats.latestPush}</strong>
                <span>Last push</span>
              </div>
            </div>
            <div className="hero-links">
              <a className="text-link strong" href={CONTACT.github} target="_blank" rel="noreferrer">
                <GitHubIcon />
                {CONTACT.githubLabel}
              </a>
              <a className="text-link" href="#projects">
                See project evidence
                <ArrowIcon />
              </a>
            </div>
          </div>
          <SystemMap />
        </section>

        <section className="section section-about" id="about" aria-labelledby="about-title">
          <SectionTitle number="01" title="About" />
          <div className="about-grid">
            <div className="about-copy" id="about-title">
              <p>
                I&apos;m <strong>Nathan</strong>, a Data Science student at{" "}
                <strong>Thomas More University</strong> in Belgium, originally from the Republic of Congo.
              </p>
              <p>
                I learn by building things. The projects on this page are how I push past what class covers
                and figure out how real data systems actually work.
              </p>
              <p>
                Long term, I want to go back home and help build the kind of infrastructure that lets people
                and institutions make better decisions with data. That starts with getting good enough to
                actually do it.
              </p>
            </div>
            <dl className="profile-facts">
              <div>
                <dt>Focus</dt>
                <dd>Data Engineering Analytics Engineering</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>Python SQL Airflow dbt Spark Kafka PostgreSQL MinIO</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>English (fluent) Dutch (basic)</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>Building data systems that deliver clarity and compounding value.</dd>
              </div>
            </dl>
            <div className="certifications" aria-label="Certifications">
              <h3>Certifications</h3>
              <div>
                <span>DataCamp</span>
                <strong>Data Engineer Associate</strong>
              </div>
              <div>
                <span>Google</span>
                <strong>Data Analytics</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-projects" id="projects" aria-labelledby="projects-title">
          <SectionTitle
            number="02"
            title="Projects"
            action={
              <a href={CONTACT.github} target="_blank" rel="noreferrer">
                View all on GitHub <ArrowIcon />
              </a>
            }
          />

          <div className="filters" aria-label="Project filters">
            {FILTER_LABELS.map((filter) => (
              <button
                key={filter}
                className={filter === activeFilter ? "active" : ""}
                type="button"
                onClick={() => selectFilter(filter)}
                aria-pressed={filter === activeFilter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="projects-layout">
            <div className="project-list" aria-label="Project list">
              {visibleProjects.map((project, index) => {
                const live = repoDetails[project.name] || {};
                const isSelected = selectedProject.name === project.name;
                return (
                  <button
                    key={project.name}
                    className={`project-row ${project.featured ? "featured" : ""} ${isSelected ? "selected" : ""}`}
                    type="button"
                    onClick={() => setSelectedProjectName(project.name)}
                    aria-pressed={isSelected}
                  >
                    <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{project.name}</strong>
                      <small>{project.summary}</small>
                    </span>
                    <span className="project-meta">
                      {live.stars || project.stars ? `${live.stars ?? project.stars} star${(live.stars ?? project.stars) === 1 ? "" : "s"}` : project.category}
                    </span>
                  </button>
                );
              })}
            </div>

            <article className="project-detail" aria-live="polite">
              <div className="detail-kicker">{selectedProject.featured ? "Featured project" : selectedProject.category}</div>
              <h3>{selectedProject.name}</h3>
              <p>{selectedProject.longDescription}</p>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{selectedProject.role}</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>{selectedProject.outcome}</dd>
                </div>
              </dl>
              <div className="stack-list">
                {selectedProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a className="text-link strong" href={selectedProject.url} target="_blank" rel="noreferrer">
                Open repository <ArrowIcon />
              </a>
            </article>
          </div>
        </section>

        <section className="section section-activity" id="activity" aria-labelledby="activity-title">
          <SectionTitle number="03" title="Activity" />
          <div className="activity-shell">
            <div className="tabs" role="tablist" aria-label="Activity views">
              {ACTIVITY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={activityTab === tab.id}
                  aria-controls="activity-panel"
                  className={activityTab === tab.id ? "active" : ""}
                  type="button"
                  onClick={() => setActivityTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="activity-panel" id="activity-panel" role="tabpanel" aria-labelledby={`tab-${activityTab}`}>
              {activityTab === "languages" ? (
                <div className="language-bars">
                  {languageStats.map(({ lang, pct }) => (
                    <div className="language-row" key={lang}>
                      <span>
                        <i style={{ background: LANG_COLORS[lang] || "#a68a7a" }} />
                        {lang}
                      </span>
                      <strong>{pct}%</strong>
                      <div>
                        <b style={{ width: `${pct}%`, background: LANG_COLORS[lang] || "#a68a7a" }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {activityTab === "recent-pushes" ? (
                <div className="recent-list">
                  {recentRepos.map((repo) => (
                    <a key={`${repo.name}-${repo.pushedAt}`} href={repo.url} target="_blank" rel="noreferrer">
                      <span>{repo.name}</span>
                      <small>{repo.description}</small>
                      <em>{timeAgo(repo.pushedAt)}</em>
                    </a>
                  ))}
                </div>
              ) : null}

              {activityTab === "contributions" ? (
                <div className="contribution-panel">
                  <img
                    src={`https://ghchart.rshah.org/84a98c/${GITHUB_USER}`}
                    alt="GitHub contribution activity for mintyfizz"
                    loading="lazy"
                  />
                  <a className="text-link" href={CONTACT.github} target="_blank" rel="noreferrer">
                    View more activity on GitHub <ArrowIcon />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section section-contact" id="contact" aria-labelledby="contact-title">
          <SectionTitle number="04" title="Contact" />
          <div className="contact-grid">
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              <GitHubIcon />
              <span>GitHub</span>
              <strong>{CONTACT.githubLabel}</strong>
              <small>github.com/mintyfizz</small>
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon />
              <span>LinkedIn</span>
              <strong>{CONTACT.linkedinLabel}</strong>
              <small>linkedin.com/in/thomasgatse</small>
            </a>
            <a href={`mailto:${CONTACT.email}`}>
              <MailIcon />
              <span>Email</span>
              <strong>{CONTACT.email}</strong>
              <small>Direct project and collaboration notes</small>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>Nathan Gatse</span>
        <span>Built with React, semantic HTML, and a focus on clarity.</span>
      </footer>
    </div>
  );
}

export default App;
