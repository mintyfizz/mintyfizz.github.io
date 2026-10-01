import { useEffect, useMemo, useRef, useState } from 'react';
import { CONTACT, CV, copy, projects as selectedProjects, skillGroups } from './content';

const languages = [{id:'en',label:'EN',name:'English'},{id:'fr',label:'FR',name:'Français'},{id:'nl',label:'NL',name:'Nederlands'}];
const sections = ['work','about','journey','contact'];
const categories = ['all','engineering','analytics','applications'];
const local = (value, lang) => typeof value === 'object' ? value[lang] : value;
const translatedTools = {
 'Requirements analysis': {en:'Requirements analysis',fr:'Analyse des besoins',nl:'Behoefteanalyse'},
 'Prototyping': {en:'Prototyping',fr:'Prototypage',nl:'Prototyping'},
 'GDP compliance': {en:'GDP compliance',fr:'Conformité BPD/GDP',nl:'GDP-compliance'}
};
const toolLabel = (tool, lang) => translatedTools[tool]?.[lang] || tool;
const skillLabels = {
 en: ['Requirements gathering','Stakeholder communication','Prototyping','Teamwork'],
 fr: ['Analyse des besoins','Communication métier','Prototypage','Travail en équipe'],
 nl: ['Behoefteanalyse','Stakeholdercommunicatie','Prototyping','Teamwerk']
};

function readPreference(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function initialLanguage() {
  const candidate = new URLSearchParams(location.search).get('lang') || readPreference('ng-language','en');
  return copy[candidate] ? candidate : 'en';
}
function Icon({name='arrow',className=''}) {
 const paths = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  external: <><path d="M7 17 17 7M7 7h10v10" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
  moon: <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  play: <path d="m9 5 11 7-11 7Z" />,
  reset: <><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
  chart: <><path d="M4 3v17h17M8 15v-5m5 5V6m5 9v-7" /></>,
  code: <><path d="m7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" /></>,
  github: <><path d="M9 21v-4c-4-1-5-3-5-6 0-2 1-3 2-4V3l4 2h4l4-2v4c1 1 2 2 2 4 0 3-1 5-5 6v4M9 18c-4 1-4-2-6-2" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>
 };
 return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function useReveal(deps) {
 useEffect(() => {
  const nodes = [...document.querySelectorAll('[data-reveal]')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if(entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  }),{threshold:.06});
  nodes.forEach(node=>{node.classList.add('reveal-ready');observer.observe(node);});
  return ()=>observer.disconnect();
 }, deps);
}

function PipelineLab({ t }) {
 const [step,setStep]=useState(0);
 const [running,setRunning]=useState(false);
 const [finished,setFinished]=useState(false);
 useEffect(()=>{
  if(!running) return;
  const timeout=setTimeout(()=>{
   if(step<2) setStep(step+1); else {setRunning(false);setFinished(true);}
  },1400);
  return ()=>clearTimeout(timeout);
 },[running,step]);
 function selectStep(index){setRunning(false);setFinished(false);setStep(index);}
 function run(){setStep(0);setFinished(false);setRunning(true);}
 function reset(){setRunning(false);setFinished(false);setStep(0);}
 return <div className={`lab-window step-${step} ${running?'is-running':''}`}>
  <div className="window-toolbar"><div className="window-dots" aria-hidden="true"><i/><i/><i/></div><span>{t.labTitle}</span><Icon name="code"/></div>
  <div className="lab-body">
   <div className="lab-topline"><span>{t.labDemo}</span><span>01 — 03</span></div>
   <div className="lab-stage">
    <div className="sculpture" aria-hidden="true"><div className="sculpture-ring ring-a"/><div className="sculpture-ring ring-b"/><div className="sculpture-ring ring-c"/><div className="sculpture-core"/><div className="sculpture-grain"/></div>
    <div className="floating-token token-left" aria-hidden="true"><Icon name="data"/><span>raw_data</span></div>
    <div className="floating-token token-right" aria-hidden="true"><Icon name="chart"/><span>insights</span></div>
   </div>
   <div className="pipeline-tabs" role="tablist" aria-label={t.labTitle}>
    {t.steps.map((label,index)=><button key={index} type="button" role="tab" id={`pipeline-tab-${index}`} aria-selected={step===index} aria-controls="pipeline-panel" tabIndex={step===index?0:-1} onClick={()=>selectStep(index)} onKeyDown={e=>{
     if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) {e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(index+(e.key==='ArrowRight'?1:2))%3;selectStep(next);document.getElementById(`pipeline-tab-${next}`)?.focus();}
    }}><span className="step-number">{index<step||finished?<Icon name="check"/>:String(index+1).padStart(2,'0')}</span>{label}</button>)}
   </div>
   <div id="pipeline-panel" className="lab-explanation" role="tabpanel" aria-labelledby={`pipeline-tab-${step}`} aria-live="polite"><h3>{t.stepTitles[step]}</h3><p>{t.stepDescriptions[step]}</p></div>
   <div className={`mini-dashboard ${step===2?'active':''}`} aria-hidden="true"><div className="dashboard-title">{t.chartLabel}<span>↗</span></div><div className="dashboard-bars">{[35,58,42,72,55,84,65,94,80,100,88,112].map((height,index)=><i key={index} style={{'--bar-height':`${height}px`,'--bar-order':index}}/>)}</div></div>
   <div className="lab-bottom"><span className="lab-status"><i/>{finished?t.complete:t.labStatus[step]}</span><button type="button" className="lab-run" onClick={finished?reset:run} disabled={running}><Icon name={finished?'reset':'play'}/>{finished?t.reset:t.play}</button></div>
  </div>
 </div>;
}

function ProjectVisual({type}) {
 return <div className={`project-art art-${type||'other'}`} aria-hidden="true">
  {type==='trade'?<><div className="globe-model"><div/><div/><div/><div/></div><div className="art-chip chip-one">21</div><div className="art-chip chip-two">1990—2024</div></>:
  type==='pipeline'?<div className="visual-pipeline"><span><Icon name="data"/></span><i/><span><Icon name="code"/></span><i/><span><Icon name="chart"/></span></div>:
  type==='logistics'?<div className="logistics-model"><span>4VISO</span><div><i/><i/><i/></div><b><Icon name="check"/></b></div>:
  type==='nature'?<div className="nature-model"><i/><i/><i/><i/><i/><i/></div>:
  ['stream','telco','music'].includes(type)?<div className="wave-model">{Array.from({length:20},(_,i)=><i key={i} style={{'--height':`${24+Math.sin(i*.7)*25+Math.abs(Math.cos(i*.4))*70}px`,'--delay':`${i*.08}s`}}/>)}</div>:
  <div className="app-model"><Icon name={type==='meal'?'chart':'code'}/><div/><div/><div/></div>}
 </div>;
}

function ProjectCard({project,lang,t,onOpen}) {
 return <button className="project-card" type="button" onClick={()=>onOpen(project)} data-reveal aria-label={`${t.details}: ${project.title} ${local(project.subtitle,lang)}`}>
  <ProjectVisual type={project.visual}/>
  <div className="project-card-body"><span className="project-category">{t.filters[categories.indexOf(project.category)]||'GitHub'} <span>↗</span></span><h3>{project.title}<span>{local(project.subtitle,lang)}</span></h3><p>{local(project.summary,lang)}</p><div className="project-tags">{project.stack.slice(0,3).map(tool=><span key={tool}>{toolLabel(tool,lang)}</span>)}</div><div className="project-card-footer"><span>{local(project.metrics,lang)}</span><span className="round-arrow"><Icon name="arrow"/></span></div></div>
 </button>;
}

function ProjectDialog({project,lang,t,onClose}) {
 const ref=useRef(null);
 useEffect(()=>{const dialog=ref.current;if(!dialog)return;dialog.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;};},[]);
 return <dialog ref={ref} className="project-dialog" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}} aria-labelledby="dialog-title">
  <div className="dialog-content"><button type="button" className="dialog-close icon-button" onClick={onClose} aria-label={t.close}><Icon name="close"/></button><ProjectVisual type={project.visual}/><div className="dialog-copy"><p className="eyebrow">{t.caseStudy} / {project.team?t.team:local(project.metrics,lang)}</p><h2 id="dialog-title">{project.title}<span>{local(project.subtitle,lang)}</span></h2><p className="dialog-lead">{local(project.summary,lang)}</p>
  {['context','approach','outcome'].map(key=>project[key]?<div className="case-section" key={key}><h3>{t[key]}</h3><p>{local(project[key],lang)}</p></div>:null)}
  <h3 className="tools-heading">{t.tools}</h3><div className="project-tags">{project.stack.map(tool=><span key={tool}>{toolLabel(tool,lang)}</span>)}</div><a className="button button-dark" href={project.url||`mailto:${CONTACT.email}?subject=${encodeURIComponent(project.title)}`} target={project.url?'_blank':undefined} rel={project.url?'noreferrer':undefined}>{project.url?t.source:t.discuss}<Icon name="external"/></a></div></div>
 </dialog>;
}

function App() {
 const [lang,setLang]=useState(initialLanguage);
 const [theme,setTheme]=useState(()=>readPreference('ng-theme','latte')==='espresso'?'espresso':'latte');
 const [menuOpen,setMenuOpen]=useState(false);
 const [activeSection,setActiveSection]=useState('');
 const [filter,setFilter]=useState('all');
 const [query,setQuery]=useState('');
 const [skillTab,setSkillTab]=useState(0);
 const [project,setProject]=useState(null);
 const [repos,setRepos]=useState([]);
 const [toast,setToast]=useState('');
 const t=copy[lang];
 const allProjects=useMemo(()=>{
  const existing=new Set(selectedProjects.map(p=>p.id));
  return [...selectedProjects,...repos.filter(r=>!existing.has(r.name)&&r.name!=='mintyfizz.github.io'&&!r.fork&&!r.archived&&!r.disabled).map(r=>({id:r.name,title:r.name.replace(/[-_]/g,' '),subtitle:{en:'GitHub project',fr:'Projet GitHub',nl:'GitHub-project'},summary:{en:copy.en.repoFallback,fr:copy.fr.repoFallback,nl:copy.nl.repoFallback},stack:[r.language||'GitHub',...(r.topics||[]).slice(0,2)],category:r.language==='Python'||r.language==='Jupyter Notebook'?'analytics':'applications',url:r.html_url,metrics:{en:'Public repository',fr:'Dépôt public',nl:'Openbare repository'},visual:'other'}))];
 },[repos]);
 const visibleProjects=useMemo(()=>allProjects.filter(p=>(filter==='all'||p.category===filter)&&[p.title,local(p.subtitle,lang),local(p.summary,lang),...p.stack].join(' ').toLowerCase().includes(query.trim().toLowerCase())),[allProjects,filter,query,lang]);
 useReveal([lang,filter,query,repos]);
 useEffect(()=>{
  document.documentElement.lang=lang;
  document.title=`Nathan Gatse | ${t.disciplines[0]} & ${t.disciplines[1]}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',t.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',t.description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content',document.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',t.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href',`https://mintyfizz.github.io/${lang==='en'?'':`?lang=${lang}`}`);
  const url=new URL(location.href);if(lang==='en')url.searchParams.delete('lang');else url.searchParams.set('lang',lang);history.replaceState(null,'',url);
  try{localStorage.setItem('ng-language',lang);}catch{}
 },[lang,t]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='espresso'?'#1e1714':'#faf7f2');try{localStorage.setItem('ng-theme',theme);}catch{}},[theme]);
 useEffect(()=>{const controller=new AbortController();fetch('https://api.github.com/users/mintyfizz/repos?per_page=100&sort=pushed',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{if(Array.isArray(data))setRepos(data);}).catch(()=>{});return()=>controller.abort();},[]);
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActiveSection(entry.target.id);});},{rootMargin:'-20% 0px -55% 0px'});
  sections.forEach(id=>{const node=document.getElementById(id);if(node)observer.observe(node);});return()=>observer.disconnect();
 },[]);
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(timer);},[toast]);
 useEffect(()=>{if(!menuOpen)return;function escape(e){if(e.key==='Escape'){setMenuOpen(false);document.querySelector('.menu-toggle')?.focus();}}document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[menuOpen]);
 async function copyEmail(){try{await navigator.clipboard.writeText(CONTACT.email);setToast(t.copied);}catch{setToast(t.copyFailed);}}
 function switchLanguage(id){setLang(id);setMenuOpen(false);setToast('');}
 function resetFilters(){setQuery('');setFilter('all');}
 return <>
  <a className="skip-link" href="#main">{t.skip}</a>
  <header className="site-header"><div className="nav-shell"><a className="brand" href="#top" aria-label="Nathan Gatse"><span className="brand-monogram">ng<span>.</span></span><span className="brand-name">Nathan Gatse</span></a>
   <nav className={`main-nav ${menuOpen?'open':''}`} id="primary-navigation" aria-label={t.menu}>{sections.map((section,i)=><a key={section} className={activeSection===section?'active':''} href={`#${section}`} onClick={()=>setMenuOpen(false)} aria-current={activeSection===section?'location':undefined}>{t.nav[i]}</a>)}</nav>
   <div className="nav-controls"><div className="language-picker" role="group" aria-label={t.language}>{languages.map(l=><button type="button" key={l.id} onClick={()=>switchLanguage(l.id)} aria-label={l.name} aria-pressed={lang===l.id} lang={l.id}>{l.label}</button>)}</div><button className="icon-button theme-toggle" type="button" onClick={()=>setTheme(theme==='latte'?'espresso':'latte')} aria-label={`${t.theme}: ${theme==='latte'?t.espresso:t.latte}`} title={`${t.theme}: ${theme==='latte'?t.espresso:t.latte}`}><Icon name={theme==='latte'?'moon':'sun'}/></button><button className="icon-button menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen?t.closeMenu:t.menu} onClick={()=>setMenuOpen(!menuOpen)}><Icon name={menuOpen?'close':'menu'}/></button></div>
  </div></header>
  <main id="main">
   <section className="hero section-width" id="top" aria-labelledby="hero-title">
    <div className="hero-copy"><a className="availability-pill" href="#contact"><span/>{t.availability}<Icon name="external"/></a><p className="eyebrow">{t.heroTop}</p><h1 id="hero-title">{t.heroTitle[0]}<span>{t.heroTitle[1]}</span></h1><p className="hero-description">{t.heroDescription}</p><div className="hero-buttons"><a className="button button-dark" href="#work">{t.workCta}<Icon name="arrow"/></a><a className="button button-glass" href={lang==='fr'?CV.fr:CV.en} download>{t.cvCta}<Icon name="download"/></a></div><div className="hero-location"><Icon name="pin"/>{t.location}<span>·</span><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn<Icon name="external"/></a></div></div>
    <div className="hero-visual"><div className="hero-halo"/><PipelineLab t={t}/></div>
    <a className="scroll-note" href="#work"><span>{t.scroll}</span><Icon name="arrow"/></a>
   </section>
   <div className="discipline-strip"><div className="section-width">{t.disciplines.map((text,i)=><span key={text}>{text}{i!==3&&<i/>}</span>)}</div></div>
   <section className="work-section section-width section-pad" id="work" aria-labelledby="work-title">
    <div className="section-heading" data-reveal><p className="eyebrow">{t.workEyebrow}</p><h2 id="work-title">{t.workTitle}</h2><p>{t.workDescription}</p></div>
    <div className="project-controls"><div className="filter-group" role="group" aria-label={t.workTitle}>{categories.map((key,i)=><button key={key} type="button" className={filter===key?'active':''} aria-pressed={filter===key} onClick={()=>setFilter(key)}>{t.filters[i]}</button>)}</div><div className="search-input"><Icon name="search"/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search} aria-label={t.searchLabel}/>{query&&<button className="icon-button" type="button" onClick={()=>setQuery('')} aria-label={t.clear}><Icon name="close"/></button>}</div></div>
    <div className="projects-grid">{visibleProjects.map(p=><ProjectCard key={p.id} project={p} lang={lang} t={t} onOpen={setProject}/>)}{!visibleProjects.length&&<div className="empty-state"><Icon name="search"/><p>{t.noResults}</p><button type="button" className="button button-glass" onClick={resetFilters}>{t.resetFilters}</button></div>}</div>
    <div className="work-footer"><p aria-live="polite">{visibleProjects.length} {t.projectCount} <span>· {repos.length?t.fresh:t.curated}</span></p><a className="text-link" href={CONTACT.github} target="_blank" rel="noreferrer">{t.githubMore}<Icon name="external"/></a></div>
   </section>
   <section className="about-section" id="about" aria-labelledby="about-title"><div className="section-width section-pad"><div className="about-grid"><div className="about-heading" data-reveal><p className="eyebrow">{t.aboutEyebrow}</p><h2 id="about-title">{t.aboutTitle}</h2><div className="profile-art" aria-hidden="true"><span>ng.</span><div className="profile-orbit"/><p>Congo <span>↗</span> {lang==='fr'?'Belgique':lang==='nl'?'België':'Belgium'}</p></div></div><div className="about-copy" data-reveal>{t.aboutParagraphs.map((p,i)=><p key={i}>{p}</p>)}<a className="text-link" href={CONTACT.linkedin} target="_blank" rel="noreferrer">{t.linkedinCta}<Icon name="external"/></a><div className="language-card"><h3><Icon name="globe"/>{t.languageTitle}</h3><div>{t.languages.map((language,i)=><p key={language}><strong>{language}</strong><span>{t.fluency[i]}</span></p>)}</div></div></div></div>
    <div className="stats-grid" data-reveal>{t.stats.map(stat=><div key={stat.value}><strong>{stat.value}<span>↗</span></strong><p>{stat.label}</p></div>)}</div>
    <div className="skills-card" data-reveal><div><p className="eyebrow">Python · SQL · BI</p><h3>{t.skillsTitle}</h3><p>{t.skillsDescription}</p></div><div className="skills-content"><div className="skill-tabs" role="tablist" aria-label={t.skillsTitle}>{t.skillTabs.map((name,i)=><button key={name} type="button" id={`skill-tab-${i}`} role="tab" aria-selected={skillTab===i} aria-controls="skill-panel" tabIndex={skillTab===i?0:-1} onClick={()=>setSkillTab(i)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;setSkillTab(next);document.getElementById(`skill-tab-${next}`)?.focus();}}}>{name}</button>)}</div><div role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${skillTab}`}><p>{t.skillDescriptions[skillTab]}</p><div className="skill-tags">{[...skillGroups[skillTab],...(skillTab===2?skillLabels[lang]:[])].map(tool=><span key={tool}>{tool}</span>)}</div></div></div></div>
   </div></section>
   <section className="journey-section section-width section-pad" id="journey" aria-labelledby="journey-title"><div className="section-heading" data-reveal><p className="eyebrow">{t.journeyEyebrow}</p><h2 id="journey-title">{t.journeyTitle}</h2></div><div className="journey-grid"><div className="timeline" data-reveal><h3>{t.education}</h3>{[
    {date:t.present,title:t.schoolTitle,place:t.schoolSubtitle,body:t.schoolBody,open:true},
    {date:'2023 — 2024',title:t.kuTitle,place:'KU Leuven',body:t.kuBody},
    {date:'2021 — 2023',title:t.ibTitle,place:'St. John’s International School',body:t.ibBody}
   ].map(item=><details key={item.title} className="timeline-item" open={item.open||undefined}><summary><span className="timeline-date">{item.date}</span><span><strong>{item.title}</strong><small>{item.place}</small></span><span className="expand-icon">+</span></summary><p>{item.body}</p></details>)}</div><div className="experience-column" data-reveal><h3>{t.experience}</h3><article className="experience-card"><span className="timeline-date">2020</span><h4>{t.auditTitle}</h4><p className="experience-place">{t.auditPlace}</p><p>{t.auditBody}</p></article><div className="certifications"><h3>{t.certifications}</h3><div><span className="cert-icon"><Icon name="check"/></span><p><strong>Data Engineer Associate</strong><span>DataCamp · 2026</span></p></div><div><span className="cert-icon"><Icon name="check"/></span><p><strong>Google Data Analytics</strong><span>Google · 2025</span></p></div></div></div></div>
    <div className="cv-section" data-reveal><div><span className="pdf-icon"><Icon name="download"/></span><p className="eyebrow">{t.originalCV}</p><h3>{t.cvTitle}</h3><p>{t.cvDescription}</p></div><div className="cv-downloads"><a href={CV.en} download className="cv-download"><span><strong>{t.englishCV}</strong><small>English · PDF</small></span><Icon name="download"/></a><a href={CV.fr} download className="cv-download"><span><strong>{t.frenchCV}</strong><small>Français · PDF</small></span><Icon name="download"/></a></div></div>
   </section>
   <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section-width contact-inner" data-reveal><p className="eyebrow">{t.contactEyebrow}</p><h2 id="contact-title">{t.contactTitle[0]}<span>{t.contactTitle[1]}</span></h2><p className="contact-description">{t.contactDescription}</p><div className="contact-buttons"><a className="button button-cream" href={`mailto:${CONTACT.email}`}>{t.emailCta}<Icon name="mail"/></a><button className="button button-outline" type="button" aria-label={`${t.copyEmail}: ${CONTACT.email}`} onClick={copyEmail}><Icon name="copy"/>{CONTACT.email}</button></div><div className="contact-bottom"><div><span className="availability-dot"/><p><strong>{t.internship}</strong><span>{t.internshipDetail}</span></p></div><div className="social-links"><a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin"/>LinkedIn<Icon name="external"/></a><a href={CONTACT.github} target="_blank" rel="noreferrer"><Icon name="github"/>GitHub<Icon name="external"/></a></div></div></div></section>
  </main>
  <footer className="site-footer section-width"><a className="brand-monogram" href="#top">ng.</a><span>© {new Date().getFullYear()} Nathan Gatse <span className="footer-note">· {t.footer}</span></span><a href="#top">{t.top}<Icon name="arrow"/></a></footer>
  <div className={`toast ${toast?'visible':''}`} role="status" aria-live="polite">{toast&&<><Icon name="check"/>{toast}</>}</div>
  {project&&<ProjectDialog project={project} lang={lang} t={t} onClose={()=>setProject(null)}/>}
 </>;
}
export default App;
