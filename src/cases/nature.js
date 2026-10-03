const L = (en, fr, nl) => ({ en, fr, nl })
const source = 'https://github.com/mintyfizz/NatuurSpotter/blob/4667207538bd6e5e8c26991130fb5688afa1fe4a/'

export default {
  aim: L(
    'Turn public moth observations from West Flanders into a repeatable ecological reporting workflow: collect a month of records, describe the observed species mix, locate reported places, and give readers context about an individual species.',
    'Transformer les observations publiques de papillons de nuit en Flandre-Occidentale en un processus reproductible de restitution écologique : collecter un mois de données, décrire les espèces observées, situer les lieux signalés et présenter le contexte d’une espèce.',
    'Openbare waarnemingen van nachtvlinders in West-Vlaanderen omzetten in een herhaalbare workflow voor ecologische rapportage: een maand aan gegevens verzamelen, de waargenomen soorten beschrijven, gemelde plaatsen situeren en context bij een soort geven.'
  ),
  audience: L(
    'Students, nature enthusiasts and analysts who want to explore citizen-science observations or reuse them in a notebook or a small dashboard.',
    'Étudiants, naturalistes amateurs et analystes souhaitant explorer des observations participatives ou les réutiliser dans un notebook ou un petit tableau de bord.',
    'Studenten, natuurliefhebbers en analisten die burgerwetenschappelijke waarnemingen willen verkennen of hergebruiken in een notebook of een klein dashboard.'
  ),
  role: L(
    'Python package development, web data collection, dataframe transformations, diversity calculations, interactive mapping and PDF reporting; a Node-RED integration connects the exports to a local dashboard.',
    'Développement du package Python, collecte web, transformations de DataFrames, calculs de diversité, cartographie interactive et rapports PDF ; une intégration Node-RED relie les exports à un tableau de bord local.',
    'Ontwikkeling van het Python-pakket, webdataverzameling, dataframebewerkingen, diversiteitsberekeningen, interactieve kaarten en pdf-rapportage; een Node-RED-integratie koppelt de exports aan een lokaal dashboard.'
  ),
  direction: L(
    'The project is organised around reusable Python functions and inspectable files. The daily collection feeds monthly analysis and mapping; separate species lookups feed a PDF and a seasonal chart. This makes the same source useful at three levels: the underlying records, a summary of their distribution, and a visual explanation. It describes what was reported, without treating observation activity as a census of moth populations.',
    'Le projet repose sur des fonctions Python réutilisables et des fichiers consultables. La collecte quotidienne alimente l’analyse mensuelle et la carte ; des recherches par espèce alimentent un PDF et un graphique saisonnier. Une même source devient ainsi exploitable à trois niveaux : les données collectées, leur répartition synthétique et leur présentation visuelle. Le projet décrit les signalements disponibles sans les assimiler à un recensement des populations.',
    'Het project draait om herbruikbare Python-functies en inspecteerbare bestanden. De dagelijkse verzameling voedt de maandanalyse en de kaart; afzonderlijke opzoekingen per soort voeden een pdf en een seizoensgrafiek. Zo wordt dezelfde bron bruikbaar op drie niveaus: de verzamelde gegevens, een samenvatting van hun verdeling en een visuele uitleg. Het beschrijft gemelde waarnemingen, zonder waarnemingsactiviteit gelijk te stellen aan een populatietelling.'
  ),
  stages: [
    {
      id: 'collect', title: L('Collect daily records', 'Collecter les données quotidiennes', 'Daggegevens verzamelen'), tool: 'Requests · BeautifulSoup',
      description: L("Collect dated moth observations for West Flanders, follow all result pages, and remove duplicate records. Each record preserves the species, named place and reported count.", "Collecter les observations datées de papillons de nuit en Flandre-Occidentale, parcourir toutes les pages de résultats et retirer les doublons. Chaque ligne conserve l’espèce, le lieu nommé et le nombre signalé.", "Gedateerde nachtvlinderwaarnemingen voor West-Vlaanderen verzamelen, alle resultaatpagina’s doorlopen en dubbele rijen verwijderen. Elke rij bewaart de soort, de genoemde plaats en het gemelde aantal."),
      input: L('A selected date and public HTML observation tables.', 'Une date choisie et les tableaux HTML publics d’observations.', 'Een gekozen datum en openbare HTML-waarnemingstabellen.'),
      output: L('Rows with date, species, location and sum.', 'Lignes contenant date, species, location et sum.', 'Rijen met date, species, location en sum.')
    },
    {
      id: 'prepare', title: L('Build a monthly dataset', 'Constituer le jeu mensuel', 'Een maanddataset opbouwen'), tool: 'pandas · calendar',
      description: L(
        'biodiversity_analysis() iterates over each calendar day, joins the returned rows, trims species and location text, converts counts to integers, and deduplicates on all four fields. The resulting raw CSV preserves the parsed data used for calculation; it is not an archive of the original HTML.',
        'biodiversity_analysis() parcourt chaque jour du mois, rassemble les lignes, nettoie les espaces des noms et des lieux, convertit les nombres en entiers et dédoublonne sur les quatre champs. Le CSV brut conserve les données extraites utilisées dans les calculs, sans archiver le HTML d’origine.',
        'biodiversity_analysis() doorloopt elke kalenderdag, voegt de rijen samen, verwijdert extra spaties in soort- en plaatsnamen, zet aantallen om naar gehele getallen en ontdubbelt op alle vier velden. De ruwe CSV bewaart de verwerkte brongegevens voor de berekeningen, niet de oorspronkelijke HTML.'
      ),
      input: L('A month, a year and daily observation rows.', 'Un mois, une année et les lignes quotidiennes.', 'Een maand, een jaar en dagelijkse waarnemingsrijen.'),
      output: L('biodiversity_raw_YYYY-MM.csv and raw_df.', 'biodiversity_raw_YYYY-MM.csv et raw_df.', 'biodiversity_raw_YYYY-MM.csv en raw_df.')
    },
    {
      id: 'analyse', title: L('Describe the observed diversity', 'Décrire la diversité observée', 'De waargenomen diversiteit beschrijven'), tool: 'pandas · math',
      description: L(
        'Counts are grouped by species. Richness counts distinct species labels; the dominant species share measures concentration. With pᵢ equal to a species’ share of the summed reported counts, Shannon is −Σ pᵢ ln(pᵢ) and Simpson diversity is 1 − Σ pᵢ². The daily frequency is the total count divided by all calendar days in the month.',
        'Les nombres signalés sont regroupés par espèce. La richesse compte les libellés distincts ; la part de l’espèce dominante mesure la concentration. Si pᵢ représente la part d’une espèce dans le total signalé, Shannon vaut −Σ pᵢ ln(pᵢ) et la diversité de Simpson 1 − Σ pᵢ². La fréquence quotidienne divise ce total par tous les jours du mois.',
        'Gemelde aantallen worden per soort gegroepeerd. Soortenrijkdom telt unieke soortnamen; het aandeel van de meest gemelde soort meet de concentratie. Met pᵢ als het aandeel van een soort in het opgetelde aantal is Shannon −Σ pᵢ ln(pᵢ) en Simpsondiversiteit 1 − Σ pᵢ². De dagfrequentie deelt het totaal door alle kalenderdagen van de maand.'
      ),
      input: L('The monthly dataframe and the number of calendar days.', 'Le DataFrame mensuel et le nombre de jours du mois.', 'Het maandelijkse dataframe en het aantal kalenderdagen.'),
      output: L('One summary row, saved as biodiversity_summary_YYYY-MM.csv and returned as summary_df.', 'Une ligne de synthèse, enregistrée dans biodiversity_summary_YYYY-MM.csv et renvoyée dans summary_df.', 'Eén samenvattingsrij, opgeslagen als biodiversity_summary_YYYY-MM.csv en teruggegeven als summary_df.')
    },
    {
      id: 'map', title: L('Map reported places', 'Cartographier les lieux signalés', 'Gemelde plaatsen in kaart brengen'), tool: 'Geoapify · Folium',
      description: L("A parallel branch converts named municipalities from a selected day into map locations and colours the markers by species. Unclear or unmatched places are omitted. The map represents reported places rather than precise observation coordinates.", "Une branche parallèle convertit les communes nommées pour une journée choisie en points sur la carte et colore les marqueurs par espèce. Les lieux imprécis ou non trouvés sont omis. La carte situe les lieux signalés plutôt que les coordonnées exactes des observations.", "Een parallelle tak zet gemeentenamen van een gekozen dag om in kaartlocaties en kleurt de markers per soort. Onduidelijke of niet-gevonden plaatsen worden weggelaten. De kaart toont gemelde plaatsen in plaats van exacte waarnemingscoördinaten."),
      input: L('Daily records and a configured Geoapify key.', 'Données quotidiennes et clé Geoapify configurée.', 'Daggegevens en een ingestelde Geoapify-sleutel.'),
      output: L('An interactive observations_map_YYYY-MM-DD.html file.', 'Un fichier interactif observations_map_YYYY-MM-DD.html.', 'Een interactief observations_map_YYYY-MM-DD.html-bestand.')
    },
    {
      id: 'species', title: L('Add species context', 'Ajouter le contexte de l’espèce', 'Soortcontext toevoegen'), tool: 'Wikipedia · Wikimedia · fpdf2',
      description: L(
        'species_info() combines a description from Dutch Wikipedia, an image from Wikimedia Commons, Waarnemingen rarity metadata and up to ten recent regional observation rows. Translation to English is attempted with a fallback to the original description. Bundled fonts and image conversion support PDF generation.',
        'species_info() réunit une description de Wikipédia en néerlandais, une image de Wikimedia Commons, le statut de rareté de Waarnemingen et jusqu’à dix observations régionales récentes. Une traduction anglaise est tentée, avec repli sur le texte original. Des polices incluses et la conversion des images facilitent la génération PDF.',
        'species_info() combineert een beschrijving uit de Nederlandstalige Wikipedia, een afbeelding van Wikimedia Commons, zeldzaamheidsinformatie van Waarnemingen en maximaal tien recente regionale waarnemingen. Vertaling naar het Engels wordt geprobeerd, met de brontekst als terugval. Meegeleverde lettertypen en beeldconversie ondersteunen de pdf-generatie.'
      ),
      input: L('A scientific or common species name.', 'Le nom scientifique ou commun d’une espèce.', 'Een wetenschappelijke of gewone soortnaam.'),
      output: L('A species PDF with description, image, rarity and recent records.', 'Un PDF par espèce : description, image, rareté et données récentes.', 'Een soorten-pdf met beschrijving, afbeelding, zeldzaamheid en recente gegevens.')
    },
    {
      id: 'season', title: L('Explore seasonal patterns', 'Explorer les variations saisonnières', 'Seizoenspatronen verkennen'), tool: 'Matplotlib · Together (optional)',
      description: L(
        'A separate annual species query classifies records into meteorological seasons, sums their counts and displays a bar chart. If the optional Together dependency and key are available, the seasonal totals and highest/lowest season are sent to a language model for a short interpretation. This text is generated context, not a validated ecological finding.',
        'Une requête annuelle distincte classe les observations d’une espèce par saison météorologique, additionne les nombres et affiche un graphique en barres. Si la dépendance Together et sa clé sont disponibles, les totaux et les saisons extrêmes sont envoyés à un modèle de langue pour une courte interprétation. Ce texte est un commentaire généré, pas une conclusion écologique validée.',
        'Een afzonderlijke jaarquery deelt de waarnemingen van een soort in meteorologische seizoenen in, telt de aantallen op en toont een staafdiagram. Als de optionele Together-afhankelijkheid en sleutel beschikbaar zijn, ontvangt een taalmodel de seizoenstotalen en hoogste en laagste seizoen voor een korte interpretatie. Die tekst is gegenereerde context, geen gevalideerde ecologische conclusie.'
      ),
      input: L('A species and year; optional Together configuration.', 'Une espèce, une année et, éventuellement, la configuration Together.', 'Een soort en jaar; optioneel een Together-configuratie.'),
      output: L('A displayed chart and optional printed interpretation; no chart file is automatically saved.', 'Un graphique affiché et une interprétation facultative imprimée dans la console ; aucun fichier graphique n’est automatiquement enregistré.', 'Een getoonde grafiek en optionele tekst in de console; er wordt niet automatisch een grafiekbestand opgeslagen.')
    }
  ],
  model: {
    title: L('Data contracts, from records to outputs', 'Contrats de données, des lignes aux résultats', 'Datacontracten, van rijen naar resultaten'),
    caption: L(
      'These are the actual dataframe and dictionary shapes in the Python implementation. They describe transformations and file outputs, not relational database tables. Field names are kept exactly as written in the source.',
      'Ces structures correspondent aux DataFrames et dictionnaires du code Python. Elles décrivent des transformations et des fichiers de sortie, pas des tables relationnelles. Les noms de champs sont conservés tels qu’ils apparaissent dans le code.',
      'Dit zijn de werkelijke structuren van dataframes en dictionaries in de Python-code. Ze beschrijven transformaties en bestandsuitvoer, geen relationele databasetabellen. De veldnamen zijn identiek aan die in de broncode.'
    ),
    entities: [
      { name: 'raw_df', kind: L('Parsed observation rows', 'Lignes d’observation extraites', 'Uitgelezen waarnemingsrijen'), fields: ['date', 'species', 'location', 'sum'] },
      { name: 'summary_df', kind: L('One row per requested month', 'Une ligne par mois demandé', 'Eén rij per opgevraagde maand'), fields: ['year', 'month', 'totalObservations', 'species_richness', 'observation_frequency', 'unique_locations', 'most_observed_species', 'most_observed_count', 'top_species_share', 'shannon_diversity', 'simpson_diversity'] },
      { name: 'map points', kind: L('Geocoded place dictionaries', 'Dictionnaires de lieux géocodés', 'Dictionaries met gegeocodeerde plaatsen'), fields: ['date', 'species', 'location', 'lat', 'lng'] },
      { name: 'season dataframe', kind: L('Annual records for one species', 'Données annuelles d’une espèce', 'Jaargegevens van één soort'), fields: ['date', 'count', 'season'] },
      { name: 'recent observations', kind: L('Species report table', 'Tableau du rapport par espèce', 'Tabel voor het soortenrapport'), fields: ['date', 'number', 'location'] }
    ],
    relationships: [
      L('Daily rows → monthly raw_df → grouped species counts → summary_df. totalObservations sums the sum column; it does not count rows.', 'Lignes quotidiennes → raw_df mensuel → nombres regroupés par espèce → summary_df. totalObservations additionne la colonne sum ; il ne compte pas les lignes.', 'Dagrijen → maandelijkse raw_df → aantallen per soort → summary_df. totalObservations telt de kolom sum op; het telt geen rijen.'),
      L('Daily rows → zero, one or several map points per row. The map branch retains date, species and place, but does not carry the count into its markers.', 'Lignes quotidiennes → zéro, un ou plusieurs points par ligne. La branche cartographique conserve date, espèce et lieu, mais ne transmet pas le nombre aux marqueurs.', 'Dagrijen → nul, één of meerdere kaartpunten per rij. De kaarttak bewaart datum, soort en plaats, maar neemt het aantal niet mee in de markers.'),
      L('Species name → source species identifier → annual seasonal records or recent report rows. These lookups are independent of the monthly raw export.', 'Nom d’espèce → identifiant dans la source → données saisonnières annuelles ou lignes récentes du rapport. Ces recherches sont indépendantes de l’export brut mensuel.', 'Soortnaam → soort-ID in de bron → jaarlijkse seizoensgegevens of recente rapportrijen. Deze opzoekingen staan los van de maandelijkse ruwe export.')
    ]
  },
  decisions: [
    {
      title: L('Keep detail beside the summary', 'Conserver le détail avec la synthèse', 'Detail naast de samenvatting bewaren'),
      reason: L('Both dataframes are returned and both CSVs are saved. A reader can inspect which species and places produced a metric, reuse the detail in another analysis, or feed the supplied Node-RED dashboard without scraping again.', 'Les deux DataFrames sont renvoyés et les deux CSV enregistrés. On peut examiner les espèces et lieux derrière un indicateur, réutiliser le détail dans une autre analyse ou alimenter le tableau de bord Node-RED fourni sans relancer la collecte.', 'Beide dataframes worden teruggegeven en beide CSV’s opgeslagen. Een lezer kan nagaan welke soorten en plaatsen achter een maatstaf zitten, de gegevens hergebruiken of het meegeleverde Node-RED-dashboard voeden zonder opnieuw te scrapen.')
    },
    {
      title: L('Protect the species lookup', 'Fiabiliser la recherche d’espèce', 'De soortopzoeking beschermen'),
      reason: L('Scientific names are searched directly instead of being translated. A regression test checks that Agrotis segetum reaches the search unchanged; other tests cover repeated pagination, escaped map text and temporary-image cleanup.', 'Les noms scientifiques sont recherchés directement, sans traduction. Un test de régression vérifie qu’Agrotis segetum arrive inchangé dans la recherche ; d’autres couvrent les pages répétées, le texte échappé des cartes et le nettoyage des images temporaires.', 'Wetenschappelijke namen worden direct opgezocht zonder vertaling. Een regressietest controleert dat Agrotis segetum ongewijzigd in de zoekopdracht terechtkomt; andere tests behandelen herhaalde pagina’s, ontsnapte kaarttekst en het opruimen van tijdelijke afbeeldingen.')
    },
    {
      title: L('Make interpretation optional', 'Rendre l’interprétation facultative', 'Interpretatie optioneel maken'),
      reason: L('The seasonal calculation and chart run before the optional AI call. Without a Together key or dependency, the function skips the interpretation. Numeric results therefore remain available independently of a language model.', 'Le calcul saisonnier et le graphique précèdent l’appel IA facultatif. Sans clé ou dépendance Together, la fonction ignore l’interprétation. Les résultats numériques restent donc disponibles indépendamment du modèle de langue.', 'De seizoensberekening en grafiek komen vóór de optionele AI-aanroep. Zonder Together-sleutel of -afhankelijkheid wordt de interpretatie overgeslagen. De numerieke resultaten blijven dus onafhankelijk van een taalmodel beschikbaar.')
    }
  ],
  walkthrough: {
    title: L('A small example: what the metrics mean', 'Un exemple simple pour comprendre les indicateurs', 'Een klein voorbeeld: wat de maatstaven betekenen'),
    steps: [
      L('Illustrative input, not a measured result: imagine a June export containing two species with reported totals of 6 and 4. The package sums 10 reported individuals/counts; the number of records can be different.', 'Exemple illustratif, pas un résultat mesuré : imaginons un export de juin contenant deux espèces avec des totaux signalés de 6 et 4. Le package additionne 10 individus ou unités signalés ; le nombre de lignes peut être différent.', 'Illustratieve invoer, geen gemeten resultaat: stel dat een juni-export twee soorten bevat met gemelde totalen van 6 en 4. Het pakket telt 10 gemelde individuen/aantallen op; het aantal rijen kan anders zijn.'),
      L('Richness is 2 and the leading species share is 0.60. With proportions 0.6 and 0.4, Shannon is about 0.673 and Simpson diversity is 0.48. For June’s 30 days, observation_frequency is 10 ÷ 30 ≈ 0.333.', 'La richesse est de 2 et la part dominante de 0,60. Avec les proportions 0,6 et 0,4, Shannon vaut environ 0,673 et Simpson 0,48. Sur les 30 jours de juin, observation_frequency vaut 10 ÷ 30 ≈ 0,333.', 'De soortenrijkdom is 2 en het grootste soortaandeel 0,60. Met verhoudingen 0,6 en 0,4 is Shannon ongeveer 0,673 en Simpsondiversiteit 0,48. Voor de 30 dagen van juni is observation_frequency 10 ÷ 30 ≈ 0,333.'),
      L('The CSVs explain the reported composition. A map for one date can help locate the named municipalities, while a species PDF adds background. None of these outputs establishes how many moths actually live in the region or whether their population is increasing.', 'Les CSV décrivent la composition signalée. Une carte sur une date situe les communes nommées et un PDF apporte le contexte d’une espèce. Aucun de ces résultats n’établit combien de papillons vivent réellement dans la région ni si leur population augmente.', 'De CSV’s beschrijven de gemelde samenstelling. Een kaart voor één datum situeert de genoemde gemeenten, terwijl een soorten-pdf achtergrond biedt. Geen van deze resultaten bepaalt hoeveel nachtvlinders er werkelijk in de regio leven of of hun populatie groeit.')
    ]
  },
  outcomes: [
    L("Reusable Python functions produce raw and summary CSVs, interactive HTML maps, species PDFs and seasonal charts. These outputs support both further analysis and a visual explanation of the observations.", "Des fonctions Python réutilisables produisent des CSV détaillés et de synthèse, des cartes HTML interactives, des PDF par espèce et des graphiques saisonniers. Ces résultats permettent de poursuivre l’analyse et de présenter les observations visuellement.", "Herbruikbare Python-functies leveren ruwe en samenvattende CSV’s, interactieve HTML-kaarten, soorten-pdf’s en seizoensgrafieken. Deze uitvoer ondersteunt verdere analyse en een visuele uitleg van de waarnemingen."),
    L("A local Node-RED dashboard connects the monthly summaries and maps, bringing diversity indicators and species rankings into one place for exploration.", "Un tableau de bord local Node-RED relie les synthèses mensuelles et les cartes, réunissant les indicateurs de diversité et les classements d’espèces pour faciliter l’exploration.", "Een lokaal Node-RED-dashboard verbindt maandsamenvattingen en kaarten, zodat diversiteitsindicatoren en soortenranglijsten op één plek kunnen worden verkend."),
    L("Regression tests cover empty months, missing map data, repeated result pages, scientific-name lookup and PDF image handling, helping protect the workflow as it evolves.", "Des tests de régression couvrent les mois vides, l’absence de données cartographiques, les pages répétées, la recherche par nom scientifique et les images des PDF, afin de préserver le fonctionnement au fil des évolutions.", "Regressietests behandelen lege maanden, ontbrekende kaartgegevens, herhaalde resultaatpagina’s, wetenschappelijke soortnamen en afbeeldingen in pdf’s, om de workflow bij verdere ontwikkeling te beschermen.")
  ],
  limitations: [
    L('Citizen-science records depend on where, when and how much people observe. Diversity and seasonal totals describe the collected records; there is no correction for observation effort or detection probability, so population trends cannot be inferred directly.', 'Les données participatives dépendent des lieux, dates et efforts d’observation. La diversité et les totaux saisonniers décrivent les données collectées ; aucune correction de l’effort ou de la probabilité de détection ne permet d’en déduire directement des tendances de population.', 'Burgerwetenschappelijke gegevens hangen af van waar, wanneer en hoeveel mensen waarnemen. Diversiteit en seizoenstotalen beschrijven de verzamelde gegevens; zonder correctie voor waarnemingsinspanning of detectiekans kunnen populatietrends er niet rechtstreeks uit worden afgeleid.'),
    L('Map coordinates come from municipality-name geocoding, not the original observation GPS position. A bounding box is only a rough geographic check, and unspecific or unmatched places are omitted. Marker count and placement must therefore be read cautiously.', 'Les coordonnées proviennent du géocodage des communes, pas du GPS des observations. Le rectangle de contrôle reste approximatif ; les lieux imprécis ou non trouvés sont omis. Le nombre et la position des marqueurs demandent donc une lecture prudente.', 'Kaartcoördinaten komen uit geocodering van gemeentenamen, niet uit de oorspronkelijke GPS-positie. De geografische begrenzing is grof en onduidelijke of niet-gevonden plaatsen worden weggelaten. Het aantal en de positie van markers vragen daarom om zorgvuldige interpretatie.'),
    L("The workflow depends on source-page structure and external services, and the local dashboard needs configuration before reuse. Further work focuses on adapting to source changes and strengthening checks for incomplete or zero-count inputs.", "Le processus dépend de la structure des pages sources et de services externes ; le tableau de bord local doit être configuré avant réutilisation. Les prochaines améliorations concernent l’adaptation aux changements des sources et les contrôles des entrées incomplètes ou aux nombres nuls.", "De workflow hangt af van de structuur van bronpagina’s en externe diensten, en het lokale dashboard moet vóór hergebruik worden geconfigureerd. Vervolgwerk richt zich op bronwijzigingen en sterkere controles voor onvolledige invoer of invoer met uitsluitend nulwaarden.")
  ],
  sources: [
    { label: L("Collection and monthly calculations", "Collecte et calculs mensuels", "Verzameling en maandberekeningen"), url: source + 'src/natuurspotter/core.py#L550-L666' },
    { label: L("Biodiversity formulas and CSV structure", "Formules de biodiversité et structure CSV", "Biodiversiteitsformules en CSV-structuur"), url: source + 'src/natuurspotter/core.py#L1175-L1345' },
    { label: L("Geocoding and interactive maps", "Géocodage et cartes interactives", "Geocodering en interactieve kaarten"), url: source + 'src/natuurspotter/core.py#L668-L921' },
    { label: L("PDF species reports", "Rapports PDF par espèce", "Soortenrapporten in pdf"), url: source + 'src/natuurspotter/core.py#L430-L548' },
    { label: L("Seasonal analysis and optional interpretation", "Analyse saisonnière et interprétation facultative", "Seizoensanalyse en optionele interpretatie"), url: source + 'src/natuurspotter/core.py#L1026-L1173' },
    { label: L("Node-RED dashboard integration", "Intégration du tableau de bord Node-RED", "Integratie met het Node-RED-dashboard"), url: source + 'integrations/node-red/node_red_flow.json' },
    { label: L("Regression tests", "Tests de régression", "Regressietests"), url: source + 'tests/test_core_regressions.py' },
    { label: L("Package configuration", "Configuration du package", "Pakketconfiguratie"), url: source + 'pyproject.toml' }
  ]
}
