const L = (en, fr, nl) => ({ en, fr, nl })

export default {
  aim: L(
    'Help pharmaceutical logistics teams understand a shipment’s planned route, the requirements attached to it and the issues that need attention. The team project explored how shipment tracking and Good Distribution Practice (GDP) audit workflows could be brought together in a working prototype.',
    'Aider les équipes de logistique pharmaceutique à comprendre le trajet prévu d’une expédition, les exigences associées et les points nécessitant une intervention. Ce projet d’équipe explorait la réunion du suivi des expéditions et des processus d’audit des Bonnes Pratiques de Distribution (BPD / GDP) dans un prototype fonctionnel.',
    'Teams in de farmaceutische logistiek helpen om de geplande route van een zending, de bijbehorende eisen en aandachtspunten te begrijpen. Het teamproject onderzocht hoe zendingopvolging en auditworkflows voor Good Distribution Practice (GDP) in een werkend prototype konden worden samengebracht.'
  ),
  audience: L(
    'Operational coordinators who follow shipments, and quality or compliance colleagues who need a clear view of the supporting information and unresolved issues.',
    'Coordinateurs opérationnels chargés du suivi des expéditions et collègues qualité ou conformité ayant besoin d’une vue claire des justificatifs et des points non résolus.',
    'Operationele coördinatoren die zendingen opvolgen, en kwaliteits- of compliancemedewerkers die inzicht nodig hebben in onderbouwende informatie en openstaande punten.'
  ),
  role: L(
    'Team contribution in a client-facing consulting project: requirements analysis, prototyping and direct collaboration with the client team to translate compliance requirements into product features. This describes my contribution to a shared project, not sole ownership of the implementation.',
    'Contribution à un projet de conseil en équipe : analyse des besoins, prototypage et collaboration directe avec l’équipe cliente pour traduire les exigences de conformité en fonctionnalités produit. Il s’agit de ma participation à un travail collectif, sans attribution exclusive de sa réalisation.',
    'Bijdrage aan een adviesproject in teamverband: behoeftenanalyse, prototyping en directe samenwerking met het klantenteam om compliance-eisen naar productfuncties te vertalen. Dit beschrijft mijn bijdrage aan een gezamenlijk project, niet de volledige implementatie als individueel werk.'
  ),
  direction: L(
    'Start with the decisions people need to make: what is being moved, through which steps, under which conditions, and what should happen when a problem appears? The direction was to organise the experience around a shipment route and its supporting evidence. A shared overview helps users spot priorities, while a detailed view keeps the context needed to investigate them. The prototype makes requirements discussable through a concrete workflow.',
    'Partir des décisions à prendre : quel produit est transporté, par quelles étapes, dans quelles conditions et que faire en cas de problème ? L’approche consistait à organiser l’expérience autour du trajet d’une expédition et de ses justificatifs. Une vue d’ensemble aide à repérer les priorités, tandis qu’une vue détaillée conserve le contexte nécessaire à leur examen. Le prototype rend les exigences concrètes et discutables à travers un parcours utilisateur.',
    'Beginnen bij de beslissingen die gebruikers moeten nemen: wat wordt vervoerd, via welke stappen, onder welke voorwaarden en wat moet er gebeuren als er een probleem ontstaat? De richting was een ervaring rond de verzendroute en de bijbehorende onderbouwing. Een gedeeld overzicht helpt prioriteiten te herkennen, terwijl een detailweergave de context voor onderzoek bewaart. Het prototype maakt eisen bespreekbaar via een concrete gebruikersworkflow.'
  ),
  stages: [
    {
      id: 'requirements', title: L('Understand the operational need', 'Comprendre le besoin opérationnel', 'De operationele behoefte begrijpen'), tool: L('Requirements · collaboration','Besoins · collaboration','Eisen · samenwerking'),
      description: L(
        'Discuss the shipment-tracking and audit tasks with the client team. Translate broad requirements into actions a user should be able to perform, information they need to see and situations they need to review.',
        'Échanger avec l’équipe cliente sur le suivi des expéditions et les tâches d’audit. Traduire les besoins généraux en actions utilisateur, en informations à consulter et en situations à examiner.',
        'De opvolging van zendingen en audittaken met het klantenteam bespreken. Algemene eisen vertalen naar gebruikershandelingen, benodigde informatie en situaties die beoordeeld moeten worden.'
      ),
      input: L('Stakeholder needs and compliance-related requirements.', 'Besoins des parties prenantes et exigences de conformité.', 'Behoeften van betrokkenen en compliance-eisen.'),
      output: L('A functional workflow that can be discussed and prototyped.', 'Un parcours fonctionnel à discuter et à prototyper.', 'Een functionele workflow om te bespreken en te prototypen.')
    },
    {
      id: 'plan', title: L('Describe the shipment plan', 'Décrire le plan d’expédition', 'Het verzendplan beschrijven'), tool: L('Prototype · guided workflow','Prototype · parcours guidé','Prototype · begeleide workflow'),
      description: L(
        'Guide the user through the route, cargo conditions and participants involved in moving the shipment. Review the plan as a whole before progressing, so that its operational context stays visible.',
        'Guider l’utilisateur dans la définition du trajet, des conditions de transport et des intervenants. Examiner le plan dans son ensemble avant de poursuivre, afin de conserver une vision du contexte opérationnel.',
        'De gebruiker begeleiden bij de route, vervoersvoorwaarden en betrokken partijen. Het volledige plan bekijken voordat de gebruiker verdergaat, zodat de operationele context zichtbaar blijft.'
      ),
      input: L('A shipment to organise and its handling needs.', 'Une expédition à organiser et ses besoins de manutention.', 'Een te organiseren zending en de vereiste behandeling.'),
      output: L('A structured route overview ready for review.', 'Une vue structurée du trajet, prête à être examinée.', 'Een gestructureerd routeoverzicht dat kan worden beoordeeld.')
    },
    {
      id: 'review', title: L('Review requirements and evidence', 'Examiner les exigences et justificatifs', 'Eisen en onderbouwing beoordelen'), tool: L('Quality review · traceability','Contrôle qualité · traçabilité','Kwaliteitscontrole · traceerbaarheid'),
      description: L(
        'Bring required conditions and the available supporting information into the same view. Make incomplete or unresolved items visible so that the responsible people can decide what needs checking before proceeding.',
        'Rassembler les conditions requises et les informations justificatives dans une même vue. Rendre visibles les éléments incomplets ou non résolus pour permettre aux responsables de déterminer les contrôles à effectuer.',
        'Vereiste voorwaarden en beschikbare onderbouwing in dezelfde weergave samenbrengen. Onvolledige of openstaande punten zichtbaar maken, zodat verantwoordelijken kunnen bepalen wat nog gecontroleerd moet worden.'
      ),
      input: L('The route plan and information supporting its requirements.', 'Le plan de trajet et les informations justifiant ses exigences.', 'Het routeplan en informatie die de eisen onderbouwt.'),
      output: L('Reviewable readiness information and explicit attention points.', 'Des informations de préparation vérifiables et des points d’attention explicites.', 'Beoordeelbare informatie over de gereedheid en expliciete aandachtspunten.')
    },
    {
      id: 'follow', title: L('Follow progress and exceptions', 'Suivre l’avancement et les exceptions', 'Voortgang en afwijkingen volgen'), tool: L('Operational overview · alerts','Vue opérationnelle · alertes','Operationeel overzicht · meldingen'),
      description: L(
        'Use an overview to find shipments that need attention, then open the shipment context to understand a delay, status change or recorded condition. Keep the operational issue connected to the route rather than leaving it as an isolated notification.',
        'Utiliser une vue d’ensemble pour repérer les expéditions nécessitant une intervention, puis consulter leur contexte pour comprendre un retard, un changement de statut ou une condition enregistrée. Relier le problème au trajet concerné, au-delà d’une notification isolée.',
        'Via een overzicht zendingen vinden die aandacht vragen en vervolgens de context openen om een vertraging, statuswijziging of geregistreerde toestand te begrijpen. Het probleem aan de route gekoppeld houden, zodat het meer is dan een losse melding.'
      ),
      input: L('Recorded shipment updates and operational attention points.', 'Mises à jour enregistrées et points d’attention opérationnels.', 'Geregistreerde zendingsupdates en operationele aandachtspunten.'),
      output: L('A focused view of the shipment and the issue to investigate.', 'Une vue ciblée de l’expédition et du point à examiner.', 'Een gerichte weergave van de zending en het te onderzoeken probleem.')
    },
    {
      id: 'document', title: L('Support a later review', 'Faciliter un examen ultérieur', 'Een latere beoordeling ondersteunen'), tool: L('Reporting · audit preparation','Reporting · préparation d’audit','Rapportage · auditvoorbereiding'),
      description: L(
        'Bring the shipment context, recorded events and supporting information together for a review or reporting conversation. The aim is to help people explain what happened and what was checked; approval and regulatory judgement remain human responsibilities.',
        'Réunir le contexte de l’expédition, les événements enregistrés et les justificatifs pour un examen ou un échange de reporting. L’objectif est d’aider à expliquer les faits et les contrôles réalisés ; l’approbation et le jugement réglementaire restent des responsabilités humaines.',
        'De zendingscontext, geregistreerde gebeurtenissen en onderbouwende informatie samenbrengen voor een beoordeling of rapportagegesprek. Het doel is uit te leggen wat er gebeurde en wat gecontroleerd werd; goedkeuring en regelgevende beoordeling blijven menselijke verantwoordelijkheden.'
      ),
      input: L('The shipment’s recorded history and available evidence.', 'L’historique enregistré et les justificatifs disponibles.', 'De vastgelegde zendingshistoriek en beschikbare onderbouwing.'),
      output: L('An organised basis for review and audit preparation.', 'Une base organisée pour l’examen et la préparation d’audit.', 'Een geordende basis voor beoordeling en auditvoorbereiding.')
    }
  ],
  model: {
    title: L('A conceptual view of the workflow', 'Une vue conceptuelle du processus', 'Een conceptuele kijk op de workflow'),
    caption: L(
      'These are functional concepts used to explain the project. This diagram is not a database schema and does not disclose internal fields, customer data or implementation details.',
      'Ces concepts fonctionnels servent à expliquer le projet. Ce schéma ne représente pas une base de données et ne divulgue ni champs internes, ni données clientes, ni détails d’implémentation.',
      'Deze functionele concepten verduidelijken het project. Het diagram is geen databaseschema en onthult geen interne velden, klantgegevens of implementatiedetails.'
    ),
    entities: [
      { name: L('Shipment plan','Plan d’expédition','Verzendplan'), kind: L('Shipment plan — the route and intended conditions', 'Plan d’expédition — trajet et conditions prévues', 'Verzendplan — route en beoogde voorwaarden'), fields: [] },
      { name: L('Participants','Intervenants','Betrokkenen'), kind: L('Participants — the people and organisations involved', 'Intervenants — personnes et organisations impliquées', 'Betrokkenen — mensen en organisaties in het proces'), fields: [] },
      { name: L('Requirements & evidence','Exigences et justificatifs','Eisen en onderbouwing'), kind: L('Requirements and evidence — what needs checking', 'Exigences et justificatifs — ce qui doit être examiné', 'Eisen en onderbouwing — wat gecontroleerd moet worden'), fields: [] },
      { name: L('Events & exceptions','Événements et exceptions','Gebeurtenissen en afwijkingen'), kind: L('Progress and exceptions — what happened during the route', 'Avancement et exceptions — faits survenus pendant le trajet', 'Voortgang en afwijkingen — wat tijdens de route gebeurde'), fields: [] },
      { name: L('Review','Examen','Beoordeling'), kind: L('Review — the context for a documented assessment', 'Examen — contexte d’une évaluation documentée', 'Beoordeling — context voor een vastgelegde evaluatie'), fields: [] }
    ],
    relationships: [
      L('A shipment plan connects a route, its participants and the conditions to review.', 'Un plan d’expédition relie un trajet, ses intervenants et les conditions à examiner.', 'Een verzendplan verbindt een route, de betrokkenen en de te beoordelen voorwaarden.'),
      L('Recorded progress and exceptions add context to that plan over time.', 'L’avancement et les exceptions enregistrés enrichissent le contexte du plan au fil du temps.', 'Geregistreerde voortgang en afwijkingen voegen in de loop van de tijd context aan het plan toe.'),
      L('A review brings the plan, events and available evidence together for people to assess.', 'Un examen réunit le plan, les événements et les justificatifs disponibles pour leur évaluation.', 'Een beoordeling brengt het plan, gebeurtenissen en beschikbare onderbouwing samen voor menselijke evaluatie.')
    ]
  },
  decisions: [
    {
      title: L('Organise around the shipment journey', 'Organiser autour du parcours de l’expédition', 'De zendingsreis centraal stellen'),
      reason: L('A route provides a common reference for operations and quality colleagues. Connecting its steps, conditions and review information helps users understand where an issue belongs and what context is needed to assess it.', 'Le trajet fournit un repère commun aux équipes opérationnelles et qualité. Relier ses étapes, conditions et informations de contrôle aide à situer un problème et à comprendre le contexte nécessaire à son examen.', 'Een route biedt operationele en kwaliteitsmedewerkers een gemeenschappelijk referentiepunt. Door stappen, voorwaarden en beoordelingsinformatie te verbinden, wordt duidelijk waar een probleem hoort en welke context nodig is om het te beoordelen.')
    },
    {
      title: L('Move from overview to detail', 'Passer de la synthèse au détail', 'Van overzicht naar detail gaan'),
      reason: L('A coordinator first needs to know what deserves attention. Once a shipment is selected, the detailed context supports investigation. This separates prioritisation from the deeper review without losing the connection between them.', 'Un coordinateur doit d’abord identifier les priorités. Une fois l’expédition sélectionnée, son contexte détaillé facilite l’examen. Cette organisation distingue la priorisation de l’analyse approfondie tout en maintenant leur lien.', 'Een coördinator moet eerst weten wat aandacht verdient. Na selectie van een zending ondersteunt de gedetailleerde context het onderzoek. Zo worden prioriteiten stellen en grondig beoordelen gescheiden, terwijl hun samenhang behouden blijft.')
    },
    {
      title: L('Use the prototype to clarify requirements', 'Utiliser le prototype pour préciser les besoins', 'Het prototype gebruiken om eisen te verduidelijken'),
      reason: L('Concrete screens and actions give the team and client a shared basis for discussion. They make questions about missing information, responsibilities and the next action easier to identify than a list of abstract features alone.', 'Des écrans et actions concrets donnent à l’équipe et au client une base commune de discussion. Ils facilitent l’identification des informations manquantes, des responsabilités et de l’action suivante au-delà d’une liste abstraite de fonctionnalités.', 'Concrete schermen en handelingen geven het team en de klant een gezamenlijke basis voor overleg. Daarmee worden ontbrekende informatie, verantwoordelijkheden en de volgende actie beter zichtbaar dan met alleen een abstracte lijst functies.')
    }
  ],
  walkthrough: {
    title: L('An illustrative operational journey', 'Un parcours opérationnel illustratif', 'Een illustratieve operationele gebruikersreis'),
    steps: [
      L('A coordinator prepares a temperature-sensitive shipment. They describe the intended route and handling needs, then review which supporting information is available for the journey.', 'Un coordinateur prépare une expédition sensible à la température. Il décrit le trajet et les besoins de transport, puis examine les justificatifs disponibles pour ce parcours.', 'Een coördinator bereidt een temperatuurgevoelige zending voor. Die beschrijft de route en behandelingsvereisten en bekijkt vervolgens welke onderbouwing beschikbaar is.'),
      L('An operational update requires attention. From the overview, the coordinator opens the shipment context, checks the recorded information and identifies the point that needs follow-up.', 'Une mise à jour opérationnelle demande une intervention. Depuis la vue d’ensemble, le coordinateur ouvre le contexte de l’expédition, consulte les informations enregistrées et identifie le point à suivre.', 'Een operationele update vraagt aandacht. Vanuit het overzicht opent de coördinator de zendingscontext, controleert de vastgelegde informatie en identificeert wat opvolging nodig heeft.'),
      L('During a later review, colleagues use the shipment history and available evidence to discuss what happened and what was checked. This is an illustrative scenario, not a disclosed client shipment or a measured production outcome.', 'Lors d’un examen ultérieur, les collègues utilisent l’historique et les justificatifs pour discuter des faits et des contrôles. Ce scénario est illustratif : il ne décrit ni une expédition cliente réelle ni un résultat de production mesuré.', 'Bij een latere beoordeling gebruiken collega’s de zendingshistoriek en beschikbare onderbouwing om te bespreken wat er gebeurde en wat gecontroleerd werd. Dit is een illustratief scenario, geen klantzending of gemeten productieresultaat.')
    ]
  },
  outcomes: [
    L('Contributed to a working team prototype supporting shipment tracking and GDP audit workflows, as described in my CV.', 'Participation à un prototype fonctionnel d’équipe consacré au suivi des expéditions et aux processus d’audit BPD / GDP, comme indiqué dans mon CV.', 'Bijgedragen aan een werkend teamprototype voor zendingopvolging en GDP-auditworkflows, zoals beschreven in mijn cv.'),
    L('Translated compliance-related requirements into product features through requirements analysis, prototyping and direct client collaboration.', 'Traduction des exigences de conformité en fonctionnalités produit par l’analyse des besoins, le prototypage et la collaboration directe avec le client.', 'Compliance-eisen naar productfuncties vertaald via behoeftenanalyse, prototyping en directe samenwerking met de klant.'),
    L('The case demonstrates how business requirements can become a coherent operational workflow, with a clear relationship between planning, monitoring and review.', 'Le cas illustre le passage des besoins métier à un processus opérationnel cohérent, reliant planification, suivi et examen.', 'De case laat zien hoe bedrijfsbehoeften kunnen uitmonden in een samenhangende operationele workflow die planning, opvolging en beoordeling verbindt.')
  ],
  limitations: [
    L('This public case study is intentionally anonymised and explains the functional direction. Client identity, private implementation details and operational data are not disclosed.', 'Cette étude publique est volontairement anonymisée et présente l’orientation fonctionnelle. L’identité du client, les détails privés d’implémentation et les données opérationnelles ne sont pas divulgués.', 'Deze openbare case is bewust geanonimiseerd en beschrijft de functionele richting. De klantidentiteit, private implementatiedetails en operationele gegevens worden niet gedeeld.'),
    L('The evidence supports a team prototype and my requirements/prototyping contribution. It does not establish independently measured time savings, production adoption or sole authorship of the full system.', 'Les éléments disponibles attestent un prototype d’équipe et ma contribution à l’analyse et au prototypage. Ils ne démontrent ni gains de temps mesurés indépendamment, ni adoption en production, ni réalisation individuelle de tout le système.', 'De beschikbare informatie onderbouwt een teamprototype en mijn bijdrage aan analyse en prototyping. Ze toont geen onafhankelijk gemeten tijdwinst, productiegebruik of individuele realisatie van het volledige systeem aan.'),
    L('Organising evidence can support review, but software screens and status indicators do not themselves certify regulatory compliance. Qualified people must assess the information and make the relevant decisions.', 'Organiser les justificatifs facilite l’examen, mais les écrans et indicateurs logiciels ne certifient pas à eux seuls la conformité réglementaire. Des personnes qualifiées doivent évaluer les informations et prendre les décisions appropriées.', 'Onderbouwing ordenen kan beoordelingen ondersteunen, maar softwareschermen en statusindicatoren bewijzen op zichzelf geen naleving van regelgeving. Bevoegde personen moeten de informatie beoordelen en de relevante beslissingen nemen.')
  ],
  sources: [
    { label: L('English CV · team project','CV anglais · projet d’équipe','Engels cv · teamproject'), url: '/cv/Nathan_Gatse_CV_EN_F.pdf' },
    { label: L('French CV · team project','CV français · projet d’équipe','Frans cv · teamproject'), url: '/cv/Nathan_Gatse_CV_FR.pdf' }
  ]
}
