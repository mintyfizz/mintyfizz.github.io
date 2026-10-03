const L = (en, fr, nl) => ({ en, fr, nl })

export default {
  aim: L(
    'Make regional trade dependence easier to investigate across 21 countries in CEMAC, ECOWAS and the Alliance of Sahel States. The observatory connects who a country trades with, how trade compares with its economy, and the conflict and fragility context around it.',
    'Faciliter l’analyse de la dépendance commerciale de 21 pays de la CEMAC, de la CEDEAO et de l’Alliance des États du Sahel. L’observatoire relie les partenaires commerciaux, le poids du commerce dans l’économie et le contexte de conflit et de fragilité.',
    'Handelsafhankelijkheid inzichtelijk maken voor 21 landen in CEMAC, ECOWAS en de Alliantie van Sahelstaten. Het observatorium verbindt handelspartners, het belang van handel voor de economie en de context van conflicten en kwetsbaarheid.'
  ),
  audience: L(
    'Designed for exploratory work by students, researchers and analysts comparing regional economies, partner dependence and exposure. It supports questions and investigation; it does not establish that conflict caused a change in trade.',
    'Conçu pour les étudiants, chercheurs et analystes qui comparent les économies régionales, la dépendance aux partenaires et les facteurs d’exposition. Il permet d’explorer des questions, sans établir qu’un conflit a causé une variation du commerce.',
    'Bedoeld voor verkennend werk door studenten, onderzoekers en analisten die regionale economieën, partnerafhankelijkheid en blootstelling vergelijken. Het helpt vragen onderzoeken, maar toont niet aan dat een conflict een verandering in handel veroorzaakt.'
  ),
  role: L(
    'Personal data-engineering and analytics project covering source selection, Python and PySpark transformations, Delta tables, analytical marts, a JavaScript dashboard and export validation. The repository documents the implementation and its trade-offs.',
    'Projet personnel d’ingénierie et d’analyse de données : choix des sources, transformations Python et PySpark, tables Delta, tables analytiques, tableau de bord JavaScript et validation des exports. Le dépôt documente l’implémentation et ses compromis.',
    'Persoonlijk project in data-engineering en analyse: bronselectie, Python- en PySpark-transformaties, Delta-tabellen, analysetabellen, een JavaScript-dashboard en exportvalidatie. De repository documenteert de implementatie en de afwegingen.'
  ),
  direction: L(
    'The central decision was to build a traceable data product before adding charts. Raw source records enter bronze tables, typed and reconciled data enters silver, and dashboard-ready views enter gold. IMF bilateral totals answer “with whom?”; a separate UN Comtrade product path answers “what?”. Six JSON exports make the result accessible through a static website without requiring visitors to access Databricks.',
    'Le choix central a été de construire des données traçables avant de créer les graphiques. Les données brutes entrent dans la couche bronze, les données typées et rapprochées dans silver, puis les vues destinées au tableau de bord dans gold. Les totaux bilatéraux du FMI répondent à « avec qui ? » ; un flux distinct UN Comtrade répond à « quels produits ? ». Six exports JSON rendent le résultat accessible sur un site statique, sans accès Databricks pour les visiteurs.',
    'De centrale keuze was om eerst traceerbare data op te bouwen en daarna grafieken toe te voegen. Ruwe brongegevens komen in bronze, getypeerde en afgestemde gegevens in silver en dashboardtabellen in gold. Bilaterale IMF-totalen beantwoorden “met wie?”; een apart UN Comtrade-traject beantwoordt “welke producten?”. Zes JSON-exports maken het resultaat toegankelijk via een statische website, zonder Databricks-toegang voor bezoekers.'
  ),
  stages: [
    {
      id: 'source',
      title: L('Acquire the right sources', 'Choisir et extraire les sources', 'De juiste bronnen ophalen'),
      tool: 'Python · IMF IMTS/WEO · UN Comtrade · ACLED · FSI',
      description: L(
        'IMF IMTS provides annual bilateral goods flows for 1990–2024. WEO adds macroeconomic indicators; ACLED and FSI add context. Comtrade national totals use a separate local extraction path because the documented Databricks serverless network could not reach its API.',
        'IMF IMTS fournit les flux bilatéraux annuels de biens de 1990 à 2024. WEO apporte les indicateurs macroéconomiques ; ACLED et FSI complètent le contexte. Les totaux nationaux Comtrade suivent une extraction locale distincte, car le réseau serverless Databricks documenté ne permettait pas d’atteindre son API.',
        'IMF IMTS levert jaarlijkse bilaterale goederenstromen voor 1990–2024. WEO voegt macro-economische indicatoren toe; ACLED en FSI leveren context. Nationale Comtrade-totalen volgen een apart lokaal extractietraject omdat het gedocumenteerde Databricks-serverlessnetwerk de API niet kon bereiken.'
      ),
      input: L('APIs and source files at different frequencies and grains', 'API et fichiers à des fréquences et granularités différentes', 'API’s en bronbestanden met verschillende frequenties en detailniveaus'),
      output: L('Bronze records and a separate Comtrade raw-file path', 'Données bronze et fichiers bruts Comtrade distincts', 'Bronze-records en een apart traject voor ruwe Comtrade-bestanden'),
    },
    {
      id: 'reconcile',
      title: L('Reconcile identities and time', 'Rapprocher les pays et les périodes', 'Landen en perioden afstemmen'),
      tool: 'PySpark · Delta · ISO3',
      description: L(
        'Standardize country codes, cast values and join the 21-country dimension. Dated bloc intervals assign each annual row using its year-end date. For this analytical convention, Mali, Burkina Faso and Niger move to AES in 2024; the dimension records that this is distinct from the legal withdrawal date.',
        'Harmoniser les codes pays, typer les valeurs et joindre la dimension des 21 pays. Des intervalles d’appartenance attribuent le bloc selon la date de fin d’année. Dans cette convention analytique, le Mali, le Burkina Faso et le Niger passent à l’AES en 2024 ; la dimension précise que ce choix diffère de la date de retrait juridique.',
        'Landcodes standaardiseren, waarden typeren en de dimensie met 21 landen koppelen. Gedateerde lidmaatschapsintervallen bepalen het blok op de laatste dag van elk jaar. Binnen deze analytische conventie gaan Mali, Burkina Faso en Niger in 2024 over naar AES; de dimensie onderscheidt dit van de juridische uittredingsdatum.'
      ),
      input: L('Source-specific country names, codes, values and dates', 'Noms, codes, valeurs et dates propres aux sources', 'Bronspecifieke landnamen, codes, waarden en datums'),
      output: L('Country dimensions and typed annual silver facts', 'Dimensions pays et faits annuels typés dans silver', 'Landdimensies en getypeerde jaarlijkse feiten in silver'),
    },
    {
      id: 'model',
      title: L('Build comparable analytical views', 'Construire les vues analytiques', 'Vergelijkbare analysetabellen bouwen'),
      tool: 'PySpark · SQL · gold marts',
      description: L(
        'Aggregate partner flows to country-year totals and join macro, conflict and fragility facts. Derive trade openness as total trade divided by GDP, and retain source-coverage flags. Product composition stays at reporter × year × flow × HS2 sector, rather than being mixed into the bilateral fact.',
        'Agréger les flux par partenaire en totaux pays-année et joindre les faits macroéconomiques, de conflit et de fragilité. Calculer l’ouverture commerciale comme le commerce total divisé par le PIB et conserver les indicateurs de couverture. Les produits restent au grain déclarant × année × flux × secteur SH2, séparé du fait bilatéral.',
        'Partnerstromen aggregeren tot land-jaartotalen en koppelen aan macro-, conflict- en kwetsbaarheidsgegevens. Handelsopenheid berekenen als totale handel gedeeld door het bbp, met behoud van dekkingsindicatoren. Productgegevens blijven op het niveau rapporterend land × jaar × stroom × HS2-sector, apart van de bilaterale feitentabel.'
      ),
      input: L('Annual silver facts, membership intervals and coverage records', 'Faits annuels silver, intervalles d’appartenance et couverture', 'Jaarlijkse silver-feiten, lidmaatschapsintervallen en dekkingsgegevens'),
      output: L('Country-year, bloc-year, partner, product and context marts', 'Tables pays-année, bloc-année, partenaires, produits et contexte', 'Tabellen voor land-jaar, blok-jaar, partners, producten en context'),
    },
    {
      id: 'validate',
      title: L('Check the public data contract', 'Contrôler les données publiées', 'Het publieke datacontract controleren'),
      tool: 'Python · GitHub Actions · JSON',
      description: L(
        'The deployment workflow exports six gold datasets, filters non-country partner codes, checks formula consistency and validates expected table counts. A Nigeria GDP scale check is included to catch unit mistakes. Exporting existing gold tables is automated; rebuilding the upstream lakehouse is a separate operation.',
        'Le workflow de déploiement exporte six jeux de données gold, filtre les codes partenaires qui ne désignent pas des pays, contrôle les formules et vérifie les volumes attendus. Un contrôle de l’échelle du PIB nigérian détecte les erreurs d’unité. L’export des tables gold est automatisé ; la reconstruction du lakehouse en amont est une opération distincte.',
        'De deploymentworkflow exporteert zes gold-datasets, filtert partnercodes die geen landen voorstellen, controleert formules en valideert verwachte aantallen. Een schaalcontrole op het Nigeriaanse bbp helpt eenheidsfouten opsporen. De export van bestaande gold-tabellen is geautomatiseerd; het opnieuw opbouwen van het lakehouse is een afzonderlijke stap.'
      ),
      input: L('Existing Databricks gold tables', 'Tables gold Databricks existantes', 'Bestaande Databricks-gold-tabellen'),
      output: L('Six checked JSON files and audit results', 'Six fichiers JSON contrôlés et résultats d’audit', 'Zes gecontroleerde JSON-bestanden en auditresultaten'),
    },
    {
      id: 'explore',
      title: L('Explore and interpret', 'Explorer et interpréter', 'Verkennen en interpreteren'),
      tool: 'JavaScript · GitHub Pages',
      description: L(
        'Visitors select a country or bloc and a year to explore maps, partner dependence, trade exposure and product sectors. Bloc product charts require at least 50% reporter coverage and 50% flow-value coverage. The conflict panel uses the latest loaded three-year window; FSI uses the latest available observation.',
        'Les visiteurs choisissent un pays ou un bloc et une année pour explorer les cartes, les partenaires, l’exposition commerciale et les produits. Les graphiques de produits par bloc exigent au moins 50 % de couverture des déclarants et 50 % de la valeur des flux. Les conflits utilisent la dernière fenêtre de trois ans chargée ; FSI utilise la dernière observation disponible.',
        'Bezoekers kiezen een land of blok en een jaar om kaarten, partnerafhankelijkheid, handelsblootstelling en productsectoren te onderzoeken. Productgrafieken per blok vereisen minstens 50% dekking van rapporterende landen en 50% van de handelswaarde. Het conflictpaneel gebruikt het laatst geladen venster van drie jaar; FSI gebruikt de laatst beschikbare waarneming.'
      ),
      input: L('Local JSON exports and the visitor’s filters', 'Exports JSON locaux et filtres du visiteur', 'Lokale JSON-exports en de filters van de bezoeker'),
      output: L('Interactive views with explicit coverage and time context', 'Vues interactives avec contexte temporel et de couverture', 'Interactieve weergaven met expliciete tijds- en dekkingscontext'),
    },
  ],
  model: {
    title: L('The data model: several grains, one country key', 'Le modèle : plusieurs granularités, une clé pays', 'Het datamodel: meerdere detailniveaus, één landcode'),
    caption: L("A bilateral row describes a reporter–partner pair in one year; a country-year row joins annual indicators; a product row adds flow direction and HS2 sector. Those grains stay separate to avoid multiplying totals during joins. HHI measures how concentrated trade is among partners; it appears below as total_trade_partner_hhi.", "Une ligne bilatérale décrit un couple déclarant-partenaire sur une année ; une ligne pays-année rassemble les indicateurs annuels ; une ligne produit ajoute le sens du flux et le secteur SH2. Ces granularités restent distinctes pour éviter de multiplier les totaux lors des jointures. Le HHI mesure la concentration du commerce entre partenaires ; il apparaît ci-dessous comme total_trade_partner_hhi.", "Een bilaterale rij beschrijft een rapporterend land en partner in één jaar; een land-jaarrij combineert jaarindicatoren; een productrij voegt stroomrichting en HS2-sector toe. Die detailniveaus blijven apart om vermenigvuldiging van totalen bij joins te voorkomen. HHI meet hoe sterk handel bij bepaalde partners geconcentreerd is; hieronder staat het als total_trade_partner_hhi."),
    entities: [
      { name: 'silver.dim_country', kind: L('One row per project country', 'Une ligne par pays du projet', 'Eén rij per projectland'), fields: ['country_key', 'country_iso3', 'country_name', 'current_primary_bloc_code'] },
      { name: 'silver.dim_bloc_membership', kind: L('One row per country and membership interval', 'Une ligne par pays et intervalle d’appartenance', 'Eén rij per land en lidmaatschapsinterval'), fields: ['country_iso3', 'bloc_code', 'valid_from', 'valid_to', 'membership_basis'] },
      { name: 'silver.fact_trade_partner_annual', kind: L('Reporter × partner × year', 'Déclarant × partenaire × année', 'Rapporterend land × partner × jaar'), fields: ['reporter_iso3', 'counterpart_iso3', 'year', 'exports_fob_usd', 'imports_cif_usd', 'selected_source'] },
      { name: 'gold.dashboard_country_timeseries', kind: L('Country × year', 'Pays × année', 'Land × jaar'), fields: ['country_iso3', 'year', 'analytical_bloc_code', 'trade_openness_pct_gdp', 'total_trade_partner_hhi', 'coverage_level'] },
      { name: 'gold.product_trade_hs2', kind: L('Reporter × year × flow × HS2', 'Déclarant × année × flux × SH2', 'Rapporterend land × jaar × stroom × HS2'), fields: ['reporter_iso3', 'year', 'flow_type', 'hs2_code', 'trade_value_usd', 'quality_flag'] },
    ],
    relationships: [
      L('dim_country.country_iso3 → annual facts: one country can have many years and partners.', 'dim_country.country_iso3 → faits annuels : un pays peut avoir plusieurs années et partenaires.', 'dim_country.country_iso3 → jaarlijkse feiten: één land kan meerdere jaren en partners hebben.'),
      L('dim_bloc_membership → annual facts: match the ISO3 code and test whether 31 December falls inside the validity interval.', 'dim_bloc_membership → faits annuels : joindre le code ISO3 et vérifier que le 31 décembre appartient à l’intervalle de validité.', 'dim_bloc_membership → jaarlijkse feiten: koppel de ISO3-code en controleer of 31 december binnen het geldigheidsinterval valt.'),
      L('Partner facts → country-year mart: aggregate first, then join macro, conflict and fragility on country_iso3 + year.', 'Faits partenaires → table pays-année : agréger d’abord, puis joindre macroéconomie, conflit et fragilité sur country_iso3 + year.', 'Partnerfeiten → land-jaartabel: eerst aggregeren, daarna macro-, conflict- en kwetsbaarheidsgegevens koppelen op country_iso3 + year.'),
      L('HS2 product rows → product coverage: match reporter_iso3 to country_iso3 plus year; only quality_flag = good reaches the product mart.', 'Lignes produits SH2 → couverture : joindre reporter_iso3 à country_iso3 et l’année ; seules les lignes avec quality_flag = good alimentent la table produits.', 'HS2-productrijen → productdekking: koppel reporter_iso3 aan country_iso3 plus year; alleen quality_flag = good bereikt de producttabel.'),
    ],
  },
  decisions: [
    {
      title: L('Choose sources by the question', 'Choisir la source selon la question', 'Bronnen kiezen volgens de vraag'),
      reason: L(
        'IMF IMTS was a practical baseline for annual partner flows when Comtrade access added network and quota friction. Comtrade returned as a separate national-total product source. The bilateral merge also supports replacing IMF reporter-year cells when Comtrade bilateral coverage is marked good, while keeping source attribution.',
        'IMF IMTS constituait une base adaptée aux flux annuels par partenaire, alors que Comtrade ajoutait des contraintes réseau et de quota. Comtrade a été réintroduit comme source distincte de totaux nationaux par produit. La fusion bilatérale peut aussi remplacer des cellules déclarant-année du FMI lorsque la couverture Comtrade est bonne, en conservant la provenance.',
        'IMF IMTS vormde een praktische basis voor jaarlijkse partnerstromen toen Comtrade netwerk- en quotaproblemen opleverde. Comtrade kwam terug als aparte bron voor nationale producttotalen. De bilaterale samenvoeging kan IMF-cellen per land en jaar vervangen wanneer Comtrade-dekking als goed is gemarkeerd, met behoud van bronvermelding.'
      ),
    },
    {
      title: L('Make regional scope explicit', 'Expliciter le périmètre régional', 'De regionale afbakening expliciet maken'),
      reason: L(
        'A country’s current bloc cannot simply be copied across every historical annual record. The country-year model uses dated analytical membership; snapshot panels use current scope. This makes the chosen convention visible and helps distinguish an economic change from a change in the countries being compared.',
        'Le bloc actuel d’un pays ne peut pas être recopié sur toutes ses observations historiques. Le modèle pays-année utilise une appartenance analytique datée ; les instantanés utilisent le périmètre actuel. La convention devient explicite et aide à distinguer une évolution économique d’un changement des pays comparés.',
        'Het huidige blok van een land kan niet zomaar naar alle historische jaargegevens worden gekopieerd. Het land-jaarmodel gebruikt gedateerd analytisch lidmaatschap; momentopnamen gebruiken de huidige afbakening. Zo blijft de gekozen conventie zichtbaar en kan een economische verandering worden onderscheiden van een wijziging in de vergeleken landen.'
      ),
    },
    {
      title: L('Publish a checked snapshot', 'Publier un instantané contrôlé', 'Een gecontroleerde momentopname publiceren'),
      reason: L(
        'Pre-exported JSON makes the dashboard portable and keeps Databricks credentials outside the browser. The trade-off is refresh latency: a deployment exports the existing gold state, rather than fetching every source live. Coverage gates deliberately replace unsupported product charts with an explanation.',
        'Les exports JSON rendent le tableau de bord portable et gardent les identifiants Databricks hors du navigateur. En contrepartie, les données ne sont pas instantanées : un déploiement exporte l’état gold existant, sans réinterroger toutes les sources. Les contrôles de couverture remplacent les graphiques produits insuffisamment étayés par une explication.',
        'Vooraf geëxporteerde JSON maakt het dashboard overdraagbaar en houdt Databricks-inloggegevens buiten de browser. De afweging is actualiteit: een deployment exporteert de bestaande gold-status en haalt niet alle bronnen live op. Dekkingscontroles vervangen onvoldoende onderbouwde productgrafieken bewust door een toelichting.'
      ),
    },
  ],
  walkthrough: {
    title: L('An example investigation: Cameroon in 2024', 'Exemple d’analyse : le Cameroun en 2024', 'Een voorbeeldonderzoek: Kameroen in 2024'),
    steps: [
      L('Select Cameroon and 2024. The dashboard reads the CMR–2024 country-year record and its named partner rows from the JSON exports. This is a concrete filter path in the committed data, not a live API query.', 'Sélectionner le Cameroun et 2024. Le tableau de bord lit la ligne pays-année CMR–2024 et ses partenaires nommés dans les exports JSON. Ce filtre existe dans les données du dépôt ; il ne lance pas de requête API en direct.', 'Selecteer Kameroen en 2024. Het dashboard leest de land-jaarrij CMR–2024 en de bijbehorende benoemde partners uit de JSON-exports. Dit is een concreet filterpad in de opgeslagen data, geen live API-query.'),
      L('Compare the trade profile with partner dependence: trade openness asks how large trade is relative to GDP, while partner shares ask where that trade is concentrated. They answer different questions and should be interpreted together, with the source and export limits in mind.', 'Comparer le profil commercial à la dépendance aux partenaires : l’ouverture mesure le commerce par rapport au PIB, tandis que les parts des partenaires indiquent sa concentration géographique. Ces mesures répondent à des questions différentes et se lisent ensemble, en tenant compte des limites des sources et des exports.', 'Vergelijk het handelsprofiel met partnerafhankelijkheid: handelsopenheid meet de omvang van handel tegenover het bbp, terwijl partneraandelen tonen waar die handel geconcentreerd is. Het zijn verschillende vragen die samen moeten worden gelezen, met aandacht voor bron- en exportbeperkingen.'),
      L('Check what the selected year does not support. The inspected export has no Cameroon 2024 HS2 export rows, so the product panel should show unavailable coverage. FSI remains a latest-available snapshot and conflict remains a three-year window; neither should be read as a complete 2024 measurement.', 'Vérifier ce que l’année sélectionnée ne permet pas d’affirmer. L’export inspecté ne contient aucune ligne SH2 d’exportation pour le Cameroun en 2024 : le panneau produits doit donc signaler l’absence de couverture. FSI reste un instantané de la dernière donnée disponible et les conflits une fenêtre de trois ans ; aucun ne constitue une mesure complète de 2024.', 'Controleer wat het gekozen jaar niet ondersteunt. De onderzochte export bevat geen HS2-uitvoerrijen voor Kameroen in 2024, dus het productpaneel hoort ontbrekende dekking te tonen. FSI blijft de laatst beschikbare momentopname en conflict blijft een venster van drie jaar; geen van beide is een volledige meting voor 2024.'),
    ],
  },
  outcomes: [
    L("An annual comparison framework covers 21 countries over 1990–2024, with 735 country-year records. Availability of individual indicators varies by source and period.", "Un cadre de comparaison annuel couvre 21 pays de 1990 à 2024, soit 735 lignes pays-année. La disponibilité de chaque indicateur varie selon la source et la période.", "Een jaarlijks vergelijkingskader omvat 21 landen over 1990–2024, met 735 land-jaarrecords. De beschikbaarheid van afzonderlijke indicatoren verschilt per bron en periode."),
    L("A reproducible path connects source collection, Delta transformations and analytical tables to six public JSON datasets. The saved exports support dashboard exploration without Databricks access.", "Un parcours reproductible relie la collecte, les transformations Delta et les tables analytiques à six jeux JSON publics. Les exports enregistrés permettent d’explorer le tableau de bord sans accès Databricks.", "Een reproduceerbaar traject verbindt bronverzameling, Delta-transformaties en analysetabellen met zes publieke JSON-datasets. De opgeslagen exports ondersteunen dashboardverkenning zonder Databricks-toegang."),
    L("Documented source choices, regional membership conventions and coverage thresholds make the comparison rules visible and help readers understand which questions the data can support.", "Les choix de sources, conventions d’appartenance régionale et seuils de couverture sont documentés : les règles de comparaison sont visibles et les lecteurs peuvent comprendre quelles questions les données permettent d’explorer.", "Gedocumenteerde bronkeuzes, conventies voor regionaal lidmaatschap en dekkingsdrempels maken de vergelijkingsregels zichtbaar en helpen lezers begrijpen welke vragen de gegevens kunnen ondersteunen."),
  ],
  limitations: [
    L('Coverage is uneven. The recorded audit reports FSI through 2023 and no representative bloc-level HS2 year meeting both 50% thresholds. Conflict uses the latest loaded three-year window. More rows and newer source releases are needed before these panels can support stronger comparisons.', 'La couverture reste inégale. L’audit enregistré signale FSI jusqu’en 2023 et aucune année SH2 représentative par bloc satisfaisant les deux seuils de 50 %. Les conflits utilisent la dernière fenêtre de trois ans chargée. Davantage de données et de nouvelles versions des sources sont nécessaires pour renforcer les comparaisons.', 'De dekking is ongelijk. De vastgelegde audit vermeldt FSI tot en met 2023 en geen representatief HS2-jaar per blok dat beide drempels van 50% haalt. Conflict gebruikt het laatst geladen venster van drie jaar. Meer gegevens en nieuwere bronversies zijn nodig voor sterkere vergelijkingen.'),
    L("Country and bloc concentration views use different aggregation methods, and visible partner lists are truncated. Their values require careful interpretation and are not directly interchangeable. Harmonising definitions and expanding partner coverage are next steps.", "Les vues de concentration par pays et par bloc utilisent des méthodes d’agrégation différentes, et les listes visibles de partenaires sont tronquées. Leurs valeurs demandent une lecture attentive et ne sont pas directement interchangeables. Harmoniser les définitions et étendre la couverture des partenaires sont les prochaines étapes.", "Concentratieweergaven per land en per blok gebruiken verschillende aggregatiemethoden en de zichtbare partnerlijsten zijn afgekapt. Hun waarden vragen om zorgvuldige interpretatie en zijn niet rechtstreeks uitwisselbaar. Het harmoniseren van definities en uitbreiden van partnerdekking zijn volgende stappen."),
    L('This is an exploratory data product, not a causal model or sovereign risk rating. Source periods and aggregation rules must accompany any conclusion. Further work includes harmonizing concentration definitions, reviewing aggregate partner handling and extending source coverage; those improvements are not claimed as complete.', 'Il s’agit d’un outil d’exploration, pas d’un modèle causal ni d’une notation du risque souverain. Toute conclusion doit préciser les périodes des sources et les règles d’agrégation. Les suites possibles comprennent l’harmonisation des définitions de concentration, la révision des partenaires agrégés et l’extension de la couverture ; ces améliorations ne sont pas présentées comme terminées.', 'Dit is een verkennend dataproduct, geen causaal model of kredietbeoordeling van landen. Elke conclusie moet de bronperioden en aggregatieregels vermelden. Vervolgwerk omvat het harmoniseren van concentratiedefinities, het beoordelen van geaggregeerde partners en het uitbreiden van de dekking; die verbeteringen worden niet als afgerond voorgesteld.'),
  ],
  sources: [
    { label: L("Architecture and source scope · README", "Architecture et périmètre des sources · README", "Architectuur en bronafbakening · README"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/README.md' },
    { label: L("Source selection · ADR-001", "Choix des sources · ADR-001", "Bronselectie · ADR-001"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/docs/decisions/ADR-001-extraction-architecture.md' },
    { label: L("Product and partner scope · ADR-003", "Périmètre produits et partenaires · ADR-003", "Product- en partnerafbakening · ADR-003"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/docs/decisions/ADR-003-comtrade-product-structure.md' },
    { label: L("Country and membership dimensions · notebook 08", "Dimensions pays et appartenance · notebook 08", "Land- en lidmaatschapsdimensies · notebook 08"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/08_silver_country_dimensions.ipynb' },
    { label: L("Bilateral fact and source merge · notebook 10", "Faits bilatéraux et fusion des sources · notebook 10", "Bilaterale feiten en bronsamenvoeging · notebook 10"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/10_silver_trade_partner_annual.ipynb' },
    { label: L("Dashboard table schemas · notebook 15", "Schémas des tables du tableau de bord · notebook 15", "Schema’s van dashboardtabellen · notebook 15"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/15_gold_dashboard_panel_marts.ipynb' },
    { label: L("Static export implementation", "Implémentation de l’export statique", "Implementatie van statische exports"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/scripts/export_static.py' },
    { label: L("Dashboard filters and coverage rules", "Filtres et règles de couverture du tableau de bord", "Dashboardfilters en dekkingsregels"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/static/js/app_static.js' },
    { label: L("Data quality review and limits", "Contrôle de qualité et limites des données", "Datakwaliteitscontrole en beperkingen"), url: 'https://github.com/mintyfizz/cemac-ecowas-aes-trade-observatory/blob/0699de1602fb7cdb9526a3de3a164b0eab69578a/docs/dashboard_data_audit.md' },
  ],
}
