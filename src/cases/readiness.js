const L = (en, fr, nl) => ({ en, fr, nl })
const source = 'https://github.com/mintyfizz/cemac-data-observatory/blob/0b49355ce8752960ffb64c7926d39bb2da625036/'

export default {
  aim: L(
    'Make digital development in Central Africa easier to examine: how do the six CEMAC countries compare with Rwanda and Kenya, and how does that difference evolve over time?',
    'Faciliter l’analyse du développement numérique en Afrique centrale : comment les six pays de la CEMAC se situent-ils par rapport au Rwanda et au Kenya, et comment cet écart évolue-t-il ?',
    'De digitale ontwikkeling in Centraal-Afrika inzichtelijk maken: hoe verhouden de zes CEMAC-landen zich tot Rwanda en Kenia, en hoe verandert dat verschil door de jaren heen?'
  ),
  audience: L(
    'Analysts, researchers and readers who need to explore country trends alongside regional comparisons, with the original indicator and year still visible.',
    'Les analystes, chercheurs et lecteurs qui souhaitent explorer les tendances nationales et les comparaisons régionales, en conservant l’indicateur et l’année de référence.',
    'Analisten, onderzoekers en lezers die trends per land naast regionale vergelijkingen willen onderzoeken, met behoud van de oorspronkelijke indicator en het referentiejaar.'
  ),
  role: L(
    'A personal data-engineering project spanning Python extraction, a PostgreSQL warehouse, dbt modelling and tests, Prefect orchestration, and a local Metabase setup.',
    'Un projet personnel d’ingénierie des données couvrant l’extraction Python, un entrepôt PostgreSQL, la modélisation et les tests dbt, l’orchestration Prefect et une installation locale de Metabase.',
    'Een persoonlijk data-engineeringproject met Python-extractie, een PostgreSQL-datawarehouse, dbt-modellen en tests, Prefect-orkestratie en een lokale Metabase-opstelling.'
  ),
  direction: L(
    'The direction was to build a repeatable comparison pipeline. Ten World Bank indicators cover connectivity, electricity, the economy, public spending and demographics across eight countries. Each series keeps its own unit. Prefect runs extraction before dbt and includes a Monday 06:00 Europe/Brussels schedule when its serving process is running.',
    'L’approche consiste à construire un pipeline de comparaison reproductible. Dix indicateurs de la Banque mondiale couvrent la connectivité, l’électricité, l’économie, les dépenses publiques et la démographie de huit pays. Chaque série conserve son unité. Prefect exécute l’extraction avant dbt ; une planification le lundi à 06 h 00, fuseau Europe/Brussels, est prévue lorsque le processus de service fonctionne.',
    'De gekozen richting was een herhaalbare vergelijkingspipeline. Tien Wereldbankindicatoren beschrijven connectiviteit, elektriciteit, economie, overheidsuitgaven en demografie in acht landen. Elke reeks behoudt haar eigen eenheid. Prefect voert de extractie vóór dbt uit en bevat een planning op maandag om 06.00 uur in Europe/Brussels, zolang het uitvoerende proces draait.'
  ),
  stages: [
    {
      id: 'extract',
      title: L('Collect public observations', 'Collecter les observations publiques', 'Openbare waarnemingen ophalen'),
      tool: 'World Bank API · Python',
      description: L(
        'Request each indicator for all eight countries, follow API pagination, and normalise the response. Missing values, years or country codes are skipped. Prefect submits one task per indicator with retries.',
        'Interroger chaque indicateur pour les huit pays, parcourir les pages de l’API et normaliser la réponse. Les valeurs, années ou codes pays manquants sont écartés. Prefect soumet une tâche par indicateur avec de nouvelles tentatives en cas d’échec.',
        'Elke indicator voor alle acht landen opvragen, de API-pagina’s doorlopen en de antwoorden normaliseren. Ontbrekende waarden, jaren of landcodes worden overgeslagen. Prefect start één taak per indicator en probeert opnieuw bij fouten.'
      ),
      input: L('10 configured indicator codes × 8 country codes', '10 codes d’indicateur × 8 codes pays configurés', '10 ingestelde indicatorcodes × 8 landcodes'),
      output: L('Normalised country–indicator–year observations', 'Observations normalisées par pays, indicateur et année', 'Genormaliseerde waarnemingen per land, indicator en jaar')
    },
    {
      id: 'load',
      title: L('Load without duplicating rows', 'Charger sans créer de doublons', 'Laden zonder dubbele rijen'),
      tool: 'PostgreSQL · psycopg',
      description: L(
        'Batch observations into raw.observations. The primary key is country_code + indicator_code + year. An existing key updates the value and loaded_at timestamp, so rerunning a refresh does not append duplicate observations.',
        'Charger les observations par lots dans raw.observations. La clé primaire combine country_code, indicator_code et year. Une clé existante met à jour la valeur et l’horodatage loaded_at : relancer le chargement ne crée donc pas de doublons.',
        'Waarnemingen in batches naar raw.observations laden. De primaire sleutel bestaat uit country_code, indicator_code en year. Bij een bestaande sleutel worden de waarde en loaded_at bijgewerkt, zodat een nieuwe uitvoering geen dubbele waarnemingen toevoegt.'
      ),
      input: L('Normalised API records', 'Enregistrements normalisés de l’API', 'Genormaliseerde API-records'),
      output: L('One stored row per country, indicator and year', 'Une ligne stockée par pays, indicateur et année', 'Eén opgeslagen rij per land, indicator en jaar')
    },
    {
      id: 'model',
      title: L('Add meaning and validate structure', 'Enrichir et valider la structure', 'Betekenis toevoegen en structuur toetsen'),
      tool: 'dbt · SQL',
      description: L(
        'Staging views enforce numeric values and attach country and indicator metadata from seed files. The fact model joins the two dimensions. dbt checks required values, unique dimension keys, accepted categories and fact-to-dimension relationships.',
        'Les vues de préparation imposent des valeurs numériques et exploitent les métadonnées pays et indicateurs des fichiers de référence. Le modèle de faits joint les deux dimensions. dbt vérifie les valeurs obligatoires, l’unicité des clés de dimension, les catégories autorisées et les relations entre faits et dimensions.',
        'Staging-views zetten waarden om naar een numeriek type en gebruiken land- en indicatormetadata uit referentiebestanden. Het feitenmodel koppelt beide dimensies. dbt controleert verplichte waarden, unieke dimensiesleutels, toegestane categorieën en relaties tussen feiten en dimensies.'
      ),
      input: L('Raw observations + country and indicator reference tables', 'Observations brutes + référentiels pays et indicateurs', 'Ruwe waarnemingen + referentietabellen voor landen en indicatoren'),
      output: L('fct_observations with names, groups, categories and units', 'fct_observations avec noms, groupes, catégories et unités', 'fct_observations met namen, groepen, categorieën en eenheden')
    },
    {
      id: 'compare',
      title: L('Compare the same indicator and year', 'Comparer un même indicateur et une même année', 'Dezelfde indicator en hetzelfde jaar vergelijken'),
      tool: 'dbt · Analytical SQL',
      description: L(
        'Calculate separate arithmetic means for CEMAC and the two benchmark countries using available observations. Subtract the CEMAC mean from the benchmark mean. Join those yearly comparisons to country records, then rank each country–indicator series by year to identify its latest observation.',
        'Calculer des moyennes arithmétiques distinctes pour la CEMAC et les deux pays de comparaison à partir des observations disponibles. Soustraire la moyenne CEMAC à celle des pays de comparaison. Joindre ces résultats annuels aux lignes pays, puis classer chaque série pays–indicateur par année pour repérer sa dernière observation.',
        'Afzonderlijke rekenkundige gemiddelden voor CEMAC en de twee vergelijkingslanden berekenen op basis van beschikbare waarnemingen. Het CEMAC-gemiddelde aftrekken van het vergelijkingsgemiddelde. Deze jaarvergelijkingen koppelen aan de landenrecords en elke land-indicatorreeks op jaar rangschikken om de recentste waarneming te herkennen.'
      ),
      input: L('Country values grouped by indicator and year', 'Valeurs pays regroupées par indicateur et année', 'Landwaarden gegroepeerd per indicator en jaar'),
      output: L('Group means, country counts, gap and recency flag', 'Moyennes, nombres de pays, écart et indicateur de récence', 'Groepsgemiddelden, aantallen landen, verschil en actualiteitsmarkering')
    },
    {
      id: 'explore',
      title: L('Make the results explorable', 'Rendre les résultats explorables', 'De resultaten verkenbaar maken'),
      tool: 'Metabase · Docker Compose',
      description: L(
        'Expose the curated marts to Metabase through a read-only database role. The final comparison table supports country trends and group comparisons. A separate one-row health mart records load time, observation count, country and indicator coverage, and the available year range.',
        'Exposer les tables analytiques à Metabase au moyen d’un rôle de base de données en lecture seule. La table finale permet d’explorer les tendances nationales et les comparaisons entre groupes. Une table de suivi à une ligne indique le chargement, le nombre d’observations, la couverture pays et indicateurs et la plage d’années disponible.',
        'De analysetabellen via een databaseaccount met alleen leesrechten beschikbaar maken voor Metabase. De uiteindelijke vergelijkingstabel ondersteunt landentrends en groepsvergelijkingen. Een aparte statustabel met één rij toont de laadtijd, het aantal waarnemingen, de dekking van landen en indicatoren en de beschikbare jaren.'
      ),
      input: L('Curated comparison and pipeline-health marts', 'Tables de comparaison et de suivi du pipeline', 'Samengestelde vergelijkings- en statustabellen'),
      output: L('Tables ready for dashboard questions and freshness cards', 'Tables prêtes pour les analyses et cartes de suivi du tableau de bord', 'Tabellen voor dashboardvragen en actualiteitskaarten')
    }
  ],
  model: {
    title: L('A country × indicator × year model', 'Un modèle pays × indicateur × année', 'Een model per land × indicator × jaar'),
    caption: L(
      'Grain means what one row represents. Here, a fact row is one measured indicator for one country in one year. The final mart preserves that grain; it adds comparisons and recency rather than combining the indicators into a score.',
      'Le grain désigne ce que représente une ligne. Ici, une ligne de faits correspond à un indicateur mesuré pour un pays et une année. La table finale conserve ce grain et ajoute des comparaisons et la récence, sans agréger les indicateurs en un score.',
      'Het detailniveau bepaalt wat één rij voorstelt. Hier is een feitenrij één gemeten indicator voor één land in één jaar. De eindtabel behoudt dat niveau en voegt vergelijkingen en actualiteit toe, zonder indicatoren tot één score samen te voegen.'
    ),
    entities: [
      { name: 'dim_countries', kind: L('One row per country', 'Une ligne par pays', 'Eén rij per land'), fields: ['country_code', 'country_name', 'country_group', 'is_cemac', 'is_benchmark'] },
      { name: 'dim_indicators', kind: L('One row per indicator', 'Une ligne par indicateur', 'Eén rij per indicator'), fields: ['indicator_code', 'indicator_name', 'category', 'unit', 'is_higher_better'] },
      { name: 'fct_observations', kind: L('Country × indicator × year', 'Pays × indicateur × année', 'Land × indicator × jaar'), fields: ['country_code', 'indicator_code', 'year', 'value', 'loaded_at'] },
      { name: 'mart_group_averages_yearly', kind: L('Indicator × year', 'Indicateur × année', 'Indicator × jaar'), fields: ['indicator_code', 'year', 'cemac_avg_value', 'benchmark_avg_value', 'cemac_country_count', 'benchmark_country_count', 'gap_benchmark_minus_cemac'] },
      { name: 'cemac_digital_readiness', kind: L('Country × indicator × year, enriched', 'Pays × indicateur × année, enrichi', 'Land × indicator × jaar, verrijkt'), fields: ['country_code', 'indicator_code', 'year', 'country_value', 'cemac_avg_value', 'benchmark_avg_value', 'gap_benchmark_minus_cemac', 'recency_rank', 'is_latest_observation'] }
    ],
    relationships: [
      L('dim_countries 1 → many fct_observations, joined on country_code.', 'dim_countries 1 → plusieurs fct_observations, jointure sur country_code.', 'dim_countries 1 → meerdere fct_observations, gekoppeld via country_code.'),
      L('dim_indicators 1 → many fct_observations, joined on indicator_code.', 'dim_indicators 1 → plusieurs fct_observations, jointure sur indicator_code.', 'dim_indicators 1 → meerdere fct_observations, gekoppeld via indicator_code.'),
      L('fct_observations → yearly group means, grouped by indicator_code + year.', 'fct_observations → moyennes annuelles par groupe, agrégation par indicator_code + year.', 'fct_observations → jaarlijkse groepsgemiddelden, gegroepeerd op indicator_code + year.'),
      L('Each country fact joins its yearly group comparison on indicator_code + year to form cemac_digital_readiness.', 'Chaque fait pays rejoint sa comparaison annuelle sur indicator_code + year pour former cemac_digital_readiness.', 'Elke feitenrij wordt via indicator_code + year aan de jaarlijkse groepsvergelijking gekoppeld om cemac_digital_readiness te vormen.')
    ]
  },
  decisions: [
    {
      title: L('Use a comparison group, preserve the units', 'Choisir un groupe de comparaison et conserver les unités', 'Een vergelijkingsgroep kiezen en eenheden behouden'),
      reason: L(
        'Rwanda and Kenya give the six-country CEMAC view an external reference. Internet use, electricity access and GDP remain separate series because they measure different things. The implemented gap is benchmark mean minus CEMAC mean for the same indicator and year; it is not a weighted readiness index.',
        'Le Rwanda et le Kenya apportent une référence externe aux six pays de la CEMAC. Internet, électricité et PIB restent des séries distinctes car ils mesurent des réalités différentes. L’écart implémenté est la moyenne du groupe de comparaison moins celle de la CEMAC, pour un même indicateur et une même année ; ce n’est pas un indice pondéré de maturité numérique.',
        'Rwanda en Kenia bieden een externe referentie voor de zes CEMAC-landen. Internetgebruik, elektriciteitstoegang en bbp blijven afzonderlijke reeksen omdat ze verschillende zaken meten. Het berekende verschil is het vergelijkingsgemiddelde min het CEMAC-gemiddelde voor dezelfde indicator en hetzelfde jaar; het is geen gewogen index voor digitale ontwikkeling.'
      )
    },
    {
      title: L('Match the infrastructure to the scale', 'Adapter l’infrastructure à l’échelle du projet', 'De infrastructuur op de schaal afstemmen'),
      reason: L(
        'PostgreSQL in Docker keeps the analytical stack local and avoids a cloud account for this small public-data project. It supports the joins, window functions and aggregations the models need. Docker Compose supplies the services; Python runs the extraction and Prefect serving process outside those containers.',
        'PostgreSQL dans Docker maintient la pile analytique en local et évite un compte cloud pour ce projet de données publiques de taille limitée. Il fournit les jointures, fonctions de fenêtre et agrégations nécessaires. Docker Compose fournit les services ; Python exécute l’extraction et le processus de service Prefect en dehors de ces conteneurs.',
        'PostgreSQL in Docker houdt de analytische omgeving lokaal en vermijdt een cloudaccount voor dit kleinschalige project met openbare gegevens. Het ondersteunt de benodigde joins, vensterfuncties en aggregaties. Docker Compose levert de diensten; Python voert de extractie en het Prefect-uitvoeringsproces buiten deze containers uit.'
      )
    },
    {
      title: L('Make refreshes repeatable and transformations inspectable', 'Rendre les mises à jour reproductibles et les transformations lisibles', 'Verversingen herhaalbaar en transformaties controleerbaar maken'),
      reason: L(
        'A composite database key prevents duplicate observations during reruns. Separating raw, staging and marts makes each transformation traceable. Prefect waits for extraction tasks before invoking dbt build as a subprocess, so a failed extraction or dbt build surfaces as a failed pipeline run.',
        'Une clé composite empêche les doublons lors des réexécutions. La séparation raw, staging et marts permet de suivre les transformations. Prefect attend la fin des tâches d’extraction avant d’appeler dbt build comme sous-processus : un échec d’extraction ou de dbt est ainsi remonté comme un échec du pipeline.',
        'Een samengestelde databasesleutel voorkomt dubbele waarnemingen bij herhaalde uitvoeringen. De scheiding tussen raw, staging en marts maakt elke transformatie navolgbaar. Prefect wacht op de extractietaken voordat het dbt build als subprocess start, zodat een mislukte extractie of dbt-build zichtbaar wordt als een mislukte pipeline-uitvoering.'
      )
    }
  ],
  walkthrough: {
    title: L('Follow one observation through the pipeline', 'Suivre une observation dans le pipeline', 'Eén waarneming door de pipeline volgen'),
    steps: [
      L(
        'The repository’s unit-test fixture represents Cameroon (CMR), internet users (IT.NET.USER.ZS), year 2022, value 45.9. This is a test example, not a verified country statistic. The extractor turns the year into an integer and maps the API record into the raw-table fields.',
        'Le jeu de test du dépôt représente le Cameroun (CMR), les internautes (IT.NET.USER.ZS), l’année 2022 et la valeur 45,9. Il s’agit d’un exemple de test, pas d’une statistique nationale vérifiée. L’extracteur convertit l’année en entier et mappe la réponse de l’API vers les champs de la table brute.',
        'Het testvoorbeeld in de repository gebruikt Kameroen (CMR), internetgebruikers (IT.NET.USER.ZS), jaar 2022 en waarde 45,9. Dit is testdata, geen geverifieerd landencijfer. De extractor zet het jaar om naar een geheel getal en koppelt het API-record aan de velden van de ruwe tabel.'
      ),
      L(
        'The loader inserts or updates the CMR + IT.NET.USER.ZS + 2022 key. dbt then adds the country name, CEMAC group, digital category and percent unit from the reference tables. The observation stays one fact row rather than becoming a separate country-specific column.',
        'Le chargeur insère ou met à jour la clé CMR + IT.NET.USER.ZS + 2022. dbt ajoute ensuite le nom du pays, le groupe CEMAC, la catégorie numérique et l’unité en pourcentage à partir des référentiels. L’observation reste une ligne de faits et ne devient pas une colonne propre à ce pays.',
        'De loader voegt de sleutel CMR + IT.NET.USER.ZS + 2022 toe of werkt die bij. dbt voegt vervolgens de landnaam, CEMAC-groep, digitale categorie en procentuele eenheid toe uit de referentietabellen. De waarneming blijft één feitenrij in plaats van een aparte kolom voor dit land.'
      ),
      L(
        'For that same indicator and year, SQL computes group means from whichever countries have observations. The final mart attaches both means and their difference to Cameroon’s row. Its latest flag is true only if 2022 is the newest available year in that country–indicator series; missing countries are not treated as zero.',
        'Pour ce même indicateur et cette même année, SQL calcule les moyennes à partir des pays disposant d’observations. La table finale rattache les deux moyennes et leur écart à la ligne du Cameroun. La ligne est marquée comme la plus récente seulement si 2022 est la dernière année disponible pour cette série pays–indicateur ; les pays sans données ne sont pas assimilés à zéro.',
        'Voor dezelfde indicator en hetzelfde jaar berekent SQL groepsgemiddelden over de landen waarvoor waarnemingen bestaan. De eindtabel voegt beide gemiddelden en hun verschil toe aan de rij van Kameroen. De actualiteitsmarkering is alleen waar als 2022 het recentste beschikbare jaar voor die land-indicatorreeks is; ontbrekende landen tellen niet als nul.'
      )
    ]
  },
  outcomes: [
    L("A repeatable pipeline connects a public API to analytical tables for ten configured indicators and eight countries, with an entry point for scheduled refreshes.", "Un pipeline reproductible relie une API publique à des tables analytiques pour dix indicateurs configurés et huit pays, avec un point d’entrée pour les mises à jour planifiées.", "Een herhaalbare pipeline verbindt een openbare API met analysetabellen voor tien ingestelde indicatoren en acht landen, met een startpunt voor geplande verversingen."),
    L('Reusable country, indicator, observation, yearly-comparison and health models that keep the analytical logic in versioned SQL.', 'Des modèles réutilisables de pays, indicateurs, observations, comparaisons annuelles et suivi, avec une logique analytique conservée dans du SQL versionné.', 'Herbruikbare modellen voor landen, indicatoren, waarnemingen, jaarvergelijkingen en status, met de analytische logica in SQL onder versiebeheer.'),
    L("Data checks cover required values, key relationships and extraction behaviour. Metabase accesses the analytical tables through a read-only role, giving exploration a separate access boundary.", "Les contrôles couvrent les valeurs obligatoires, les relations entre clés et le comportement de l’extraction. Metabase accède aux tables analytiques par un rôle en lecture seule, avec un accès distinct pour l’exploration.", "Datacontroles behandelen verplichte waarden, sleutelrelaties en extractiegedrag. Metabase benadert de analysetabellen via een account met alleen leesrechten, zodat verkenning een afzonderlijke toegangsgrens heeft.")
  ],
  limitations: [
    L('Coverage is uneven: missing values are skipped, averages are unweighted and the participating country count can change by year. Latest observations may refer to different years. A gap is descriptive and should not be read as a causal finding or a universal better/worse score.', 'La couverture est inégale : les valeurs manquantes sont écartées, les moyennes ne sont pas pondérées et le nombre de pays peut varier selon l’année. Les dernières observations peuvent concerner des années différentes. Un écart est descriptif, sans établir de causalité ni fournir un score universel de performance.', 'De dekking is ongelijk: ontbrekende waarden worden overgeslagen, gemiddelden zijn ongewogen en het aantal deelnemende landen kan per jaar verschillen. De recentste waarnemingen kunnen uit verschillende jaren komen. Een verschil is beschrijvend en bewijst geen oorzaak of universeel beter/slechter-resultaat.'),
    L('Refreshes overwrite revised source values; historical World Bank revisions are not preserved. The extractor requests available history without a fixed 30-year filter. Snapshot history, governance indicators and DHIS2 are listed as future work.', 'Les mises à jour remplacent les valeurs révisées par la source ; les anciennes versions de la Banque mondiale ne sont pas conservées. L’extracteur demande l’historique disponible sans filtre fixe de 30 ans. Les snapshots, les indicateurs de gouvernance et DHIS2 figurent dans les évolutions prévues.', 'Verversingen overschrijven gewijzigde bronwaarden; eerdere Wereldbankversies worden niet bewaard. De extractor vraagt beschikbare historie op zonder vaste filter van dertig jaar. Historische snapshots, governance-indicatoren en DHIS2 staan op de ontwikkellijst.'),
    L("Weekly refreshes require an active runner. Packaging deployment and aligning freshness monitoring with the refresh schedule are the next operational improvements.", "Les mises à jour hebdomadaires nécessitent un processus d’exécution actif. Préparer le déploiement et aligner le suivi de fraîcheur sur ce rythme constituent les prochaines améliorations opérationnelles.", "Wekelijkse verversingen vereisen een actief uitvoeringsproces. Het verpakken van de deployment en het afstemmen van actualiteitscontroles op de planning zijn de volgende operationele verbeteringen.")
  ],
  sources: [
    { label: L("Project scope and roadmap", "Périmètre et évolutions prévues", "Projectscope en ontwikkelplan"), url: `${source}README.md` },
    { label: L("Countries and indicators", "Pays et indicateurs", "Landen en indicatoren"), url: `${source}extract/config.py` },
    { label: L("World Bank extraction", "Extraction de la Banque mondiale", "Wereldbankextractie"), url: `${source}extract/world_bank.py` },
    { label: L("Insert and update loading", "Chargement par insertion et mise à jour", "Laden met invoegen en bijwerken"), url: `${source}extract/load.py` },
    { label: L("PostgreSQL schema", "Schéma PostgreSQL", "PostgreSQL-schema"), url: `${source}sql/init/01_create_schemas.sql` },
    { label: L("Fact model", "Modèle de faits", "Feitenmodel"), url: `${source}dbt_project/models/marts/fct_observations.sql` },
    { label: L("Yearly comparisons", "Comparaisons annuelles", "Jaarvergelijkingen"), url: `${source}dbt_project/models/marts/mart_group_averages_yearly.sql` },
    { label: L("Dashboard model", "Modèle du tableau de bord", "Dashboardmodel"), url: `${source}dbt_project/models/marts/cemac_digital_readiness.sql` },
    { label: L("dbt data tests", "Tests de données dbt", "dbt-datatests"), url: `${source}dbt_project/models/marts/_models.yml` },
    { label: L("Prefect orchestration", "Orchestration Prefect", "Prefect-orkestratie"), url: `${source}flows/digital_readiness.py` },
    { label: L("Weekly schedule", "Planification hebdomadaire", "Wekelijkse planning"), url: `${source}flows/serve.py` },
    { label: L("Illustrative test data", "Données de test illustratives", "Illustratieve testdata"), url: `${source}tests/test_world_bank.py` },
    { label: L("Freshness configuration", "Configuration du suivi de fraîcheur", "Configuratie van actualiteitscontroles"), url: `${source}dbt_project/models/staging/_sources.yml` },
    { label: L("Local service architecture", "Architecture des services locaux", "Architectuur van lokale diensten"), url: `${source}docker-compose.yml` }
  ]
}
