import { useEffect, useRef, useState } from 'react';
import trade from './cases/trade';
import readiness from './cases/readiness';
import nature from './cases/nature';
import logistics from './cases/logistics';
import { CONTACT } from './content';
import './case-study.css';

const cases = {
  'cemac-ecowas-aes-trade-observatory': trade,
  'cemac-data-observatory': readiness,
  'pharmaceutical-logistics-platform': logistics,
  NatuurSpotter: nature,
};
const text = (value, lang) => typeof value === 'object' ? value[lang] : value;
const backLabels = { en: 'Back to projects', fr: 'Retour aux projets', nl: 'Terug naar projecten' };
const labels = {
  en: { overview:'Purpose & direction', architecture:'How it works', decisions:'Design choices', example:'In practice', results:'Results & limits', aim:'The aim', audience:'Who it serves', role:'My contribution', direction:'The direction taken', select:'Select a step to explore its input, transformation and output.', input:'Input', output:'Output', model:'Data structure', relationships:'How the parts connect', outcomes:'What it delivers', limits:'What to keep in mind', sources:'Explore the evidence', sourceNote:'Source links point to the code version used for this case study.', discuss:'Discuss this project', close:'Close case study', language:'Language', caseStudy:'Project case study', monthly:'Date-based collection → monthly analysis', map:'Daily records → geographic view', species:'Independent lookups by species', step:'Step', reading:'Purpose. System. Decisions.' },
  fr: { overview:'Objectif et direction', architecture:'Fonctionnement', decisions:'Choix de conception', example:'En pratique', results:'Résultats et limites', aim:'L’objectif', audience:'Pour qui', role:'Ma contribution', direction:'La direction choisie', select:'Sélectionnez une étape pour explorer son entrée, sa transformation et sa sortie.', input:'Entrée', output:'Sortie', model:'Structure des données', relationships:'Les liens entre les éléments', outcomes:'Ce que le projet apporte', limits:'Les points à garder en tête', sources:'Explorer les sources', sourceNote:'Les liens renvoient à la version du code utilisée pour cette étude de cas.', discuss:'Discuter de ce projet', close:'Fermer l’étude de cas', language:'Langue', caseStudy:'Étude de projet', monthly:'Collecte quotidienne → analyse mensuelle', map:'Données quotidiennes → vue géographique', species:'Recherches indépendantes par espèce', step:'Étape', reading:'Objectif. Système. Décisions.' },
  nl: { overview:'Doel en richting', architecture:'Hoe het werkt', decisions:'Ontwerpkeuzes', example:'In de praktijk', results:'Resultaten en grenzen', aim:'Het doel', audience:'Voor wie', role:'Mijn bijdrage', direction:'De gekozen richting', select:'Selecteer een stap om de invoer, verwerking en uitvoer te bekijken.', input:'Invoer', output:'Uitvoer', model:'Gegevensstructuur', relationships:'Hoe de onderdelen samenhangen', outcomes:'Wat het oplevert', limits:'Waar je rekening mee houdt', sources:'Bekijk de bronnen', sourceNote:'Bronlinks verwijzen naar de codeversie die voor deze casestudy is gebruikt.', discuss:'Bespreek dit project', close:'Casestudy sluiten', language:'Taal', caseStudy:'Projectcasestudy', monthly:'Dagelijkse verzameling → maandanalyse', map:'Daggegevens → geografisch overzicht', species:'Onafhankelijke opzoekingen per soort', step:'Stap', reading:'Doel. Systeem. Keuzes.' },
};

function Workflow({ study, projectId, lang, ui }) {
  const [active, setActive] = useState(0);
  const buttons = useRef([]);
  const current = study.stages[active];
  const groups = projectId === 'NatuurSpotter'
    ? [{label:ui.monthly,indices:[0,1,2]}, {label:ui.map,indices:[3]}, {label:ui.species,indices:[4,5],parallel:true}]
    : [{indices:study.stages.map((_,i)=>i)}];
  function navigate(event, index) {
    const keys = ['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const count = study.stages.length;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + count) % count;
    setActive(next);
    buttons.current[next]?.focus();
  }
  return <div className="workflow">
    <p className="diagram-instruction">{ui.select}</p>
    <div className="workflow-layout">
      <div role="tablist" aria-label={ui.architecture} aria-orientation="vertical" className="workflow-groups">
        {groups.map((group, g) => <div className="workflow-group" key={g} role="presentation">
          {group.label && <p className="workflow-branch" role="presentation">{group.label}</p>}
          <div className={`workflow-track ${group.parallel ? 'parallel' : ''}`} role="presentation">
            {group.indices.map(index => {
              const stage = study.stages[index];
              return <button key={stage.id} ref={node => { buttons.current[index] = node; }} id={`stage-${stage.id}`} type="button" role="tab" aria-selected={active === index} aria-controls="stage-detail" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
                <span className="step-index" aria-hidden="true">{index + 1}</span>
                <span className="step-copy"><strong>{text(stage.title, lang)}</strong><span className="step-tool">{text(stage.tool, lang)}</span></span>
              </button>;
            })}
          </div>
        </div>)}
      </div>
      <div className="stage-detail" id="stage-detail" role="tabpanel" aria-labelledby={`stage-${current.id}`} tabIndex={0}>
        <h4>{text(current.title, lang)}</h4>
        <p>{text(current.description, lang)}</p>
        <dl className="stage-io">
          <div><dt>{ui.input}</dt><dd>{text(current.input, lang)}</dd></div>
          <div><dt>{ui.output}</dt><dd>{text(current.output, lang)}</dd></div>
        </dl>
      </div>
    </div>
  </div>;
}

export default function CaseStudy({ project, lang, onLanguage, onClose }) {
  const ref = useRef(null);
  const opener = useRef(document.activeElement);
  const heading = useRef(null);
  const study = cases[project.id];
  const ui = labels[lang];

  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    heading.current?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, []);

  function jump(id) {
    const section = ref.current.querySelector(`#case-${id}`);
    section?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    section?.focus({ preventScroll: true });
  }

  return <dialog ref={ref} className="project-dialog" onCancel={event => { event.preventDefault(); onClose(); }} aria-labelledby="case-title">
    <div className="case-toolbar">
      <div className="case-toolbar-inner">
        <button type="button" className="case-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h15" /></svg>
          {backLabels[lang]}
        </button>
        <div className="language-picker case-languages" role="group" aria-label={ui.language}>
          {[{ id: 'en', name: 'English' }, { id: 'fr', name: 'Français' }, { id: 'nl', name: 'Nederlands' }].map(language => <button key={language.id} type="button" aria-label={language.name} aria-pressed={lang === language.id} lang={language.id} onClick={() => onLanguage(language.id)}>{language.id.toUpperCase()}</button>)}
        </div>
      </div>
    </div>
    <article className="case-content">
      <header className="case-hero">
        <p className="case-meta">{text(project.metrics, lang)}</p>
        <h2 id="case-title" ref={heading} tabIndex={-1}>{text(project.title, lang)}<span>{text(project.subtitle, lang)}</span></h2>
        <p className="case-aim">{text(study.aim, lang)}</p>
      </header>
      <div className="case-layout">
        <nav className="case-nav" aria-label={ui.caseStudy}>
          {['overview', 'architecture', 'decisions', 'example', 'results'].map(id => <button key={id} onClick={() => jump(id)} type="button">{ui[id]}</button>)}
        </nav>
        <div className="case-body">
          <section id="case-overview" className="case-block" tabIndex={-1}>
            <h3>{ui.overview}</h3>
            <dl className="case-facts">
              <div><dt>{ui.audience}</dt><dd>{text(study.audience, lang)}</dd></div>
              <div><dt>{ui.role}</dt><dd>{text(study.role, lang)}</dd></div>
            </dl>
            <div className="case-direction"><h4>{ui.direction}</h4><p>{text(study.direction, lang)}</p></div>
          </section>
          <section id="case-architecture" className="case-block" tabIndex={-1}>
            <h3>{ui.architecture}</h3>
            <Workflow study={study} projectId={project.id} lang={lang} ui={ui} />
            <figure className="data-model">
              <figcaption><span className="case-meta">{ui.model}</span><h4>{text(study.model.title, lang)}</h4><p>{text(study.model.caption, lang)}</p></figcaption>
              <div className="model-entities">
                {study.model.entities.map((entity, index) => <div className="model-entity" key={index}>
                  <h5>{text(entity.name, lang)}</h5><p>{text(entity.kind, lang)}</p>
                  {entity.fields.length > 0 && <ul>{entity.fields.map((field, fieldIndex) => <li key={fieldIndex}><code>{text(field, lang)}</code></li>)}</ul>}
                </div>)}
              </div>
              <div className="model-relationships"><h5>{ui.relationships}</h5><ul>{study.model.relationships.map((relation, index) => <li key={index}>{text(relation, lang)}</li>)}</ul></div>
            </figure>
          </section>
          <section id="case-decisions" className="case-block" tabIndex={-1}>
            <h3>{ui.decisions}</h3>
            <div className="case-decisions">{study.decisions.map((decision, index) => <article key={index}><h4>{text(decision.title, lang)}</h4><p>{text(decision.reason, lang)}</p></article>)}</div>
          </section>
          <section id="case-example" className="case-block" tabIndex={-1}>
            <h3>{ui.example}</h3>
            <div className="case-example"><h4>{text(study.walkthrough.title, lang)}</h4><ol>{study.walkthrough.steps.map((step, index) => <li key={index}><p>{text(step, lang)}</p></li>)}</ol></div>
          </section>
          <section id="case-results" className="case-block" tabIndex={-1}>
            <h3>{ui.results}</h3>
            <div className="case-results">
              <div><h4>{ui.outcomes}</h4><ul>{study.outcomes.map((outcome, index) => <li key={index}>{text(outcome, lang)}</li>)}</ul></div>
              <div><h4>{ui.limits}</h4><ul>{study.limitations.map((limit, index) => <li key={index}>{text(limit, lang)}</li>)}</ul></div>
            </div>
          </section>
          <footer className="case-sources">
            <h3>{ui.sources}</h3>{project.url && <p>{ui.sourceNote}</p>}
            <div>{study.sources.map((source, index) => <a key={index} href={source.url} target="_blank" rel="noreferrer">{text(source.label, lang)}<span aria-hidden="true">↗</span></a>)}</div>
            <a className="text-link case-contact" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(text(project.title, lang))}`}>{ui.discuss}<span aria-hidden="true">↗</span></a>
          </footer>
        </div>
      </div>
    </article>
  </dialog>;
}
