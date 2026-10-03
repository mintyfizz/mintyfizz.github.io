import { useEffect, useRef, useState } from 'react';
import { CONTACT, CV, copy, projects as selectedProjects, skillGroups } from './content';

const languages = [{id:'en',label:'EN',name:'English'},{id:'fr',label:'FR',name:'Français'},{id:'nl',label:'NL',name:'Nederlands'}];
const sections = ['work','about','journey','contact'];
const categories = ['all','engineering','analytics','applications'];
const portfolioProjects = selectedProjects;
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
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" /></>,
  github: <><path d="M9 21v-4c-4-1-5-3-5-6 0-2 1-3 2-4V3l4 2h4l4-2v4c1 1 2 2 2 4 0 3-1 5-5 6v4M9 18c-4 1-4-2-6-2" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>
 };
 return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function ProjectCard({project,index,lang,t,onOpen}) {
 return <button className="project-card" type="button" onClick={event=>{event.currentTarget.focus();onOpen(project);}} aria-label={`${t.details}: ${project.title} ${local(project.subtitle,lang)}`}>
  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
  <div className="project-card-body"><span className="project-category">{t.filters[categories.indexOf(project.category)]||'GitHub'} <span>↗</span></span><h3>{project.title}<span>{local(project.subtitle,lang)}</span></h3><p>{local(project.summary,lang)}</p><div className="project-tags">{project.stack.slice(0,3).map(tool=><span key={tool}>{toolLabel(tool,lang)}</span>)}</div><div className="project-card-footer"><span>{local(project.metrics,lang)}</span><span className="round-arrow"><Icon name="arrow"/></span></div></div>
 </button>;
}

function ProjectDialog({project,lang,t,onClose}) {
 const ref=useRef(null);
 const opener=useRef(document.activeElement);
 useEffect(()=>{const dialog=ref.current;if(!dialog)return;dialog.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;opener.current?.focus({preventScroll:true});};},[]);
 return <dialog ref={ref} className="project-dialog" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}} aria-labelledby="dialog-title">
  <div className="dialog-content"><button type="button" className="dialog-close icon-button" onClick={onClose} aria-label={t.close}><Icon name="close"/></button><div className="dialog-copy"><p className="eyebrow">{t.caseStudy} / {project.team?t.team:local(project.metrics,lang)}</p><h2 id="dialog-title">{project.title}<span>{local(project.subtitle,lang)}</span></h2><p className="dialog-lead">{local(project.summary,lang)}</p>
  {['context','approach','outcome'].map(key=>project[key]?<div className="case-section" key={key}><h3>{t[key]}</h3><p>{local(project[key],lang)}</p></div>:null)}
  <h3 className="tools-heading">{t.tools}</h3><div className="project-tags">{project.stack.map(tool=><span key={tool}>{toolLabel(tool,lang)}</span>)}</div><a className="button button-dark" href={project.url||`mailto:${CONTACT.email}?subject=${encodeURIComponent(project.title)}`} target={project.url?'_blank':undefined} rel={project.url?'noreferrer':undefined}>{project.url?t.source:t.discuss}<Icon name="external"/></a></div></div>
 </dialog>;
}

function App() {
 const [lang,setLang]=useState(initialLanguage);
 const [theme,setTheme]=useState(()=>readPreference('ng-theme','latte')==='espresso'?'espresso':'latte');
 const [menuOpen,setMenuOpen]=useState(false);
 const [activeSection,setActiveSection]=useState('');
 const [project,setProject]=useState(null);
 const t=copy[lang];
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

 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActiveSection(entry.target.id);});},{rootMargin:'-20% 0px -55% 0px'});
  sections.forEach(id=>{const node=document.getElementById(id);if(node)observer.observe(node);});return()=>observer.disconnect();
 },[]);

 useEffect(()=>{if(!menuOpen)return;function escape(e){if(e.key==='Escape'){setMenuOpen(false);document.querySelector('.menu-toggle')?.focus();}}document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[menuOpen]);
 function switchLanguage(id){setLang(id);setMenuOpen(false);}
 return <>
  <a className="skip-link" href="#main">{t.skip}</a>
  <header className="site-header"><div className="nav-shell"><a className="brand" href="#top" aria-label="Nathan Gatse"><span className="brand-monogram">ng<span>.</span></span><span className="brand-name">Nathan Gatse</span></a>
   <nav className={`main-nav ${menuOpen?'open':''}`} id="primary-navigation" aria-label={t.menu}>{sections.map((section,i)=><a key={section} className={activeSection===section?'active':''} href={`#${section}`} onClick={()=>setMenuOpen(false)} aria-current={activeSection===section?'location':undefined}>{t.nav[i]}</a>)}</nav>
   <div className="nav-controls"><div className="language-picker" role="group" aria-label={t.language}>{languages.map(l=><button type="button" key={l.id} onClick={()=>switchLanguage(l.id)} aria-label={l.name} aria-pressed={lang===l.id} lang={l.id}>{l.label}</button>)}</div><button className="icon-button theme-toggle" type="button" onClick={()=>setTheme(theme==='latte'?'espresso':'latte')} aria-label={`${t.theme}: ${theme==='latte'?t.espresso:t.latte}`} title={`${t.theme}: ${theme==='latte'?t.espresso:t.latte}`}><Icon name={theme==='latte'?'moon':'sun'}/></button><button className="icon-button menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen?t.closeMenu:t.menu} onClick={()=>setMenuOpen(!menuOpen)}><Icon name={menuOpen?'close':'menu'}/></button></div>
  </div></header>
  <main id="main">
   <section className="hero section-width" id="top" aria-labelledby="hero-title">
    <div className="hero-copy"><a className="availability-pill" href="#contact"><span/>{t.availability}<Icon name="external"/></a><h1 id="hero-title">{t.heroTitle.join(' ')}</h1><p className="hero-role">{t.heroTop}</p><p className="hero-description">{t.heroDescription}</p><div className="hero-buttons"><a className="button button-dark" href="#work">{t.workCta}<Icon name="arrow"/></a><a className="button button-glass" href={lang==='fr'?CV.fr:CV.en} download>{t.cvCta}<Icon name="download"/></a></div><div className="hero-location"><Icon name="pin"/>{t.location}<span>·</span><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn<Icon name="external"/></a></div></div>
   </section>

   <section className="work-section section-width section-pad" id="work" aria-labelledby="work-title">
    <div className="section-heading"><p className="eyebrow">{t.workEyebrow}</p><h2 id="work-title">{t.workTitle}</h2><p>{t.workDescription}</p></div>
    <div className="projects-grid">{portfolioProjects.map((p,index)=><ProjectCard key={p.id} project={p} index={index} lang={lang} t={t} onOpen={setProject}/>)}</div>
    <div className="work-footer"><a className="text-link" href={CONTACT.github} target="_blank" rel="noreferrer">{t.githubMore}<Icon name="external"/></a></div>
   </section>
   <section className="about-section" id="about" aria-labelledby="about-title"><div className="section-width section-pad"><div className="about-grid"><div className="about-heading"><p className="eyebrow">{t.aboutEyebrow}</p><h2 id="about-title">{t.aboutTitle}</h2></div><div className="about-copy">{t.aboutParagraphs.map((p,i)=><p key={i}>{p}</p>)}<a className="text-link" href={CONTACT.linkedin} target="_blank" rel="noreferrer">{t.linkedinCta}<Icon name="external"/></a><div className="language-card"><h3><Icon name="globe"/>{t.languageTitle}</h3><div>{t.languages.map((language,i)=><p key={language}><strong>{language}</strong><span>{t.fluency[i]}</span></p>)}</div></div></div></div>
    <div className="skills-section"><h3>{t.skillsTitle}</h3><div className="skills-grid">{t.skillTabs.map((name,i)=><div key={name}><h4>{name}</h4><p>{t.skillDescriptions[i]}</p><div className="skill-tags">{(i===2?skillLabels[lang]:skillGroups[i]).map(tool=><span key={tool}>{tool}</span>)}</div></div>)}</div></div>
   </div></section>
   <section className="journey-section section-width section-pad" id="journey" aria-labelledby="journey-title"><div className="section-heading"><p className="eyebrow">{t.journeyEyebrow}</p><h2 id="journey-title">{t.journeyTitle}</h2></div><div className="journey-grid"><div className="timeline"><h3>{t.education}</h3>{[
    {date:t.present,title:t.schoolTitle,place:t.schoolSubtitle,body:t.schoolBody},
    {date:'2023 — 2024',title:t.kuTitle,place:'KU Leuven',body:t.kuBody},
    {date:'2021 — 2023',title:t.ibTitle,place:'St. John’s International School',body:t.ibBody}
   ].map(item=><article key={item.title} className="timeline-item"><span className="timeline-date">{item.date}</span><h4>{item.title}</h4><p className="school-place">{item.place}</p><p>{item.body}</p></article>)}</div><div className="experience-column"><h3>{t.experience}</h3><article className="experience-card"><span className="timeline-date">2020</span><h4>{t.auditTitle}</h4><p className="experience-place">{t.auditPlace}</p><p>{t.auditBody}</p></article><div className="certifications"><h3>{t.certifications}</h3><div><span className="cert-icon"><Icon name="check"/></span><p><strong>Data Engineer Associate</strong><span>DataCamp · 2026</span></p></div><div><span className="cert-icon"><Icon name="check"/></span><p><strong>Google Data Analytics</strong><span>Google · 2025</span></p></div></div></div></div>
    <div className="cv-section"><div><h3>{t.cvTitle}</h3><p>{t.cvDescription}</p></div><div className="cv-downloads"><a href={CV.en} download className="cv-download"><span><strong>{t.englishCV}</strong><small>English · PDF</small></span><Icon name="download"/></a><a href={CV.fr} download className="cv-download"><span><strong>{t.frenchCV}</strong><small>Français · PDF</small></span><Icon name="download"/></a></div></div>
   </section>
   <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section-width contact-inner"><p className="eyebrow">{t.contactEyebrow}</p><h2 id="contact-title">{t.contactTitle[0]}{t.contactTitle[1]&&<span>{t.contactTitle[1]}</span>}</h2><p className="contact-description">{t.contactDescription}</p><div className="contact-links"><a className="contact-email" href={`mailto:${CONTACT.email}`}><Icon name="mail"/>{CONTACT.email}</a><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn<Icon name="external"/></a><a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub<Icon name="external"/></a></div><p className="internship-note">{t.internshipDetail}</p></div></section>
  </main>
  <footer className="site-footer section-width"><a className="brand-monogram" href="#top">ng.</a><span>© {new Date().getFullYear()} Nathan Gatse</span><a href="#top">{t.top}<Icon name="arrow"/></a></footer>

  {project&&<ProjectDialog project={project} lang={lang} t={t} onClose={()=>setProject(null)}/>}
 </>;
}
export default App;
