const NOUN_CASES = {
  nom: { label: "Nominativ", articles: { der: "der", die: "die", das: "das" } },
  acc: { label: "Akkusativ", articles: { der: "den", die: "die", das: "das" } },
  dat: { label: "Dativ", articles: { der: "dem", die: "der", das: "dem" } },
  gen: { label: "Genitiv", articles: { der: "des", die: "der", das: "des" } },
};

// Сильные и смешанные формы для слов в предложениях с Genitiv.
// Для слабых форм используется окончание из словаря.
const GENITIVE_SUFFIXES = {
  Auto: "s", Ausflug: "s", Baby: "s", Bahnhof: "s", Beispiel: "s",
  Bild: "es", Brief: "es", Buch: "es", Café: "s", Datum: "s",
  Einkaufszentrum: "s", Esel: "s", Fahrrad: "s", Fest: "es", Film: "s",
  Fehler: "s", Fleisch: "es", Flughafen: "s", Fuchs: "es", Gast: "es",
  Gebäude: "s", Geschäft: "s", Gürtel: "s", Hähnchen: "s", Handy: "s",
  Handschuh: "s", Hemd: "es", Hotel: "s", Huhn: "s",
  Hund: "es", Jahr: "es", Kaffee: "s", Kakao: "s", Kaninchen: "s", Kaufhaus: "es",
  Kind: "es", Kino: "s", Kleid: "es", Konzert: "s", Krankenhaus: "es",
  Krokodil: "s", Kühlschrank: "s", Kurs: "es", Laden: "s", Lehrer: "s",
  Lied: "es", Mantel: "s", Mineralwasser: "s", Monat: "s", Motorrad: "s",
  Museum: "s", Nachname: "ns", Name: "ns", Ofen: "s", Pferd: "es",
  Postamt: "s", Pullover: "s", Punkt: "es", Rathaus: "es", Reis: "es",
  Restaurant: "s", Rock: "es", Rucksack: "s", Satz: "es", Schaf: "s",
  Schal: "s", Schüler: "s", Schwein: "s", Schwimmbad: "s", Sohn: "es",
  Spiel: "s", Stoff: "es", Stuhl: "s", Supermarkt: "s", Tag: "es",
  Tee: "s", Text: "es", Theater: "s", Thema: "s", Tiger: "s",
  Tisch: "es", Training: "s", Treffen: "s", "T-Shirt": "s", Unterricht: "s",
  Urlaub: "s", Vater: "s", Vorname: "ns", Wasser: "s", Wolf: "s",
  Wort: "es", Zebra: "s", Zoo: "s",
};

const SUBJECT_RULE = "Здесь существительное — подлежащее.";
const GENITIVE_RULE = "Существительное уточняет, кому или чему принадлежит названный признак.";

const NOUN_CONTEXTS = [
  {
    verb: "beginnen", case: "nom", before: "", after: " beginnt um neun.", rule: SUBJECT_RULE,
    ru: "{nom} начинается в девять.",
    words: "Reise Ausflug Tour Besprechung Unterricht Kurs Prüfung Sprechstunde Konzert Film Party Fest Training Spiel Treffen Pause".split(" "),
  },
  {
    verb: "öffnen", case: "nom", before: "", after: " öffnet um neun.", rule: SUBJECT_RULE,
    ru: "{nom} открывается в девять.",
    words: "Restaurant Café Bäckerei Konditorei Imbiss Geschäft Laden Supermarkt Apotheke Bank Postamt Rathaus Museum Kino Bibliothek Schwimmbad Kaufhaus Einkaufszentrum Zoo Markt Praxis".split(" "),
  },
  {
    verb: "liegen", case: "nom", before: "", after: " liegt auf dem Tisch.", rule: SUBJECT_RULE,
    ru: "{nom} на столе.",
    words: "Teller Tasse Glas Flasche Gabel Messer Löffel Serviette Speisekarte Rechnung Schlüssel Handtuch Hemd Schal Tasche Geldbörse Brille Uhr Ring Buch Heft Kugelschreiber Bleistift Wörterbuch Brief Formular Zeitung Zeitschrift Geschenk Handy Kamera Kassenbon".split(" "),
  },
  {
    verb: "schlafen", case: "nom", before: "", after: " schläft schon.", rule: SUBJECT_RULE,
    ru: "{nom} уже спит.",
    words: "Kind Junge Mädchen Baby Sohn Tochter Bruder Schwester Großmutter Großvater Nachbar Nachbarin Gast Hund Katze Kaninchen Hamster Meerschweinchen Pferd Huhn".split(" "),
  },
  {
    verb: "sein", case: "nom", before: "", after: " war dieses Jahr besonders kalt.", rule: SUBJECT_RULE,
    ru: "В этом году особенно холодно было {time}.",
    words: "Januar Februar März April Mai Juni Juli August September Oktober November Dezember Frühling Sommer Herbst Winter".split(" "),
  },
  {
    verb: "vorkommen", case: "nom", before: "", after: " kommt im Text vor.", rule: SUBJECT_RULE,
    ru: "В тексте встречается «{nom}».",
  },
  {
    verb: "essen", case: "acc", before: "Ich esse ", after: ".", rule: "После essen прямое дополнение стоит в Akkusativ.",
    ru: "Я ем {acc}.",
    words: "Apfel Birne Banane Orange Erdbeere Traube Kirsche Pfirsich Ananas Kartoffel Tomate Gurke Karotte Salat Bohne Pilz Brot Brötchen Käse Ei Wurst Schinken Hähnchen Fisch Fleisch Reis Nudel Suppe Kuchen Torte Keks Schokolade Eis".split(" "),
  },
  {
    verb: "trinken", case: "acc", before: "Ich trinke ", after: ".", rule: "После trinken прямое дополнение стоит в Akkusativ.",
    ru: "Я пью {acc}.",
    words: "Wasser Milch Tee Kaffee Saft Limonade Bier Wein Kakao Mineralwasser".split(" "),
  },
  {
    verb: "kaufen", case: "acc", before: "Ich kaufe ", after: ".", rule: "После kaufen прямое дополнение стоит в Akkusativ.",
    ru: "Я покупаю {acc}.",
    words: "Apfel Birne Banane Zitrone Brot Käse Zucker Hemd Bluse Hose Weste Rock Kleid Jacke Mantel Pullover T-Shirt Mütze Hut Schal Gürtel Anzug Tasche Rucksack Geldbörse Brille Uhr Ring Stoff Knopf Kugelschreiber Bleistift Wörterbuch Computer Spiel Ball".split(" "),
  },
  {
    verb: "lesen", case: "acc", before: "Ich lese ", after: ".", rule: "После lesen прямое дополнение стоит в Akkusativ.",
    ru: "Я читаю {acc}.",
    words: "Speisekarte Buch Wörterbuch Satz Text Frage Antwort Beispiel Brief Zeitung Zeitschrift Nachricht E-Mail Einladung Geschichte Fahrplan".split(" "),
  },
  {
    verb: "nehmen", case: "acc", before: "Wir nehmen ", after: ".", rule: "После nehmen прямое дополнение стоит в Akkusativ.",
    ru: "Мы отправимся {transport}.",
    words: "Auto Bus Bahn Zug Straßenbahn U-Bahn S-Bahn Taxi Fahrrad Motorrad Fähre Flugzeug Schiff".split(" "),
  },
  {
    verb: "suchen", case: "acc", before: "Wir suchen ", after: ".", rule: "После suchen прямое дополнение стоит в Akkusativ.",
    ru: "Мы ищем {acc}.",
    words: "Adresse Eingang Ausgang Hotel Apotheke Postamt Bahnhof Spielplatz Parkplatz Haltestelle Schule Supermarkt Arzt Ärztin Reiseführer".split(" "),
  },
  {
    verb: "füttern", case: "acc", before: "Wir füttern ", after: " gerade.", rule: "После füttern прямое дополнение стоит в Akkusativ.",
    ru: "Мы сейчас кормим {acc}.",
    words: "Hund Katze Kaninchen Hamster Meerschweinchen Pferd Kuh Schwein Schaf Ziege Huhn Hahn Ente Gans Esel Bär Löwe Elefant Affe Giraffe Zebra Hase".split(" "),
  },
  {
    verb: "berichten", case: "acc", before: "Wir berichten über ", after: ".", rule: "В конструкции über etwas berichten предлог über требует Akkusativ.",
    ru: "Мы делаем доклад на тему «{nom}».",
  },
  {
    verb: "helfen", case: "dat", before: "Ich helfe ", after: ".", rule: "Глагол helfen требует Dativ.",
    ru: "Я помогаю {dat}.",
    words: "Mutter Vater Großmutter Großvater Kind Junge Mädchen Mann Frau Freund Freundin Nachbar Nachbarin Gast Kollege Kollegin Kunde Kundin Schüler Schülerin Student Studentin Tourist Touristin Patient Patientin".split(" "),
  },
  {
    verb: "danken", case: "dat", before: "Ich danke ", after: " für die Hilfe.", rule: "Глагол danken требует Dativ.",
    ru: "Я благодарю {acc} за помощь.",
    words: "Mutter Vater Sohn Tochter Bruder Schwester Freund Freundin Nachbar Nachbarin Chef Chefin Kollege Kollegin Arzt Ärztin Lehrer Lehrerin Fahrer Fahrerin".split(" "),
  },
  {
    verb: "folgen", case: "dat", before: "Wir folgen ", after: ".", rule: "Глагол folgen требует Dativ.",
    ru: "Мы следуем {route}.",
    words: "Weg Straße Bus Auto Zug Fahrrad Mann Frau Junge Mädchen Hund Katze Reiseführer Tourist Touristin Fahrer Fahrerin".split(" "),
  },
  {
    verb: "fahren", case: "dat", before: "Ich fahre mit ", after: ".", rule: "Предлог mit требует Dativ.",
    ru: "Я еду {transport}.",
    words: "Auto Bus Bahn Zug Straßenbahn U-Bahn S-Bahn Taxi Fahrrad Motorrad Schiff Fähre".split(" "),
  },
  {
    verb: "warten", case: "dat", before: "Ich warte vor ", after: ".", rule: "Предлог vor при ответе на вопрос «где?» требует Dativ.",
    ru: "Я жду {place}.",
    words: "Haus Wohnung Zimmer Tür Eingang Bahnhof Garage Hotel Restaurant Café Bäckerei Apotheke Bank Rathaus Museum Kino Bibliothek Krankenhaus Schule Kaufhaus".split(" "),
  },
  {
    verb: "gehören", case: "dat", before: "Die Tasche gehört ", after: ".", rule: "Глагол gehören требует Dativ.",
    ru: "Сумка принадлежит {dat}.",
    words: "Kind Bruder Schwester Tante Onkel Cousin Cousine Gast Freund Freundin Nachbar Nachbarin Student Studentin Tourist Touristin Arzt Ärztin Patient Patientin".split(" "),
  },
  {
    verb: "beschäftigen", case: "dat", before: "Wir beschäftigen uns mit ", after: ".", rule: "Предлог mit требует Dativ.",
    ru: "Мы занимаемся темой «{nom}».",
  },
  {
    verb: "kennen", case: "gen", before: "Ich kenne die Adresse ", after: ".", rule: "Адрес кого или чего? Здесь зависимое существительное стоит в Genitiv.",
    ru: "Я знаю адрес {gen}.",
    words: "Hotel Pension Jugendherberge Bahnhof Flughafen Restaurant Café Bäckerei Geschäft Laden Supermarkt Postamt Rathaus Museum Kino Theater Bibliothek Krankenhaus Schwimmbad Kaufhaus Einkaufszentrum Zoo Firma Gebäude".split(" "),
  },
  {
    verb: "mögen", case: "gen", before: "Ich mag die Farbe ", after: ".", rule: GENITIVE_RULE,
    ru: "Мне нравится цвет {gen}.",
    words: "Hemd Bluse Hose Rock Kleid Jacke Mantel Pullover T-Shirt Schal Gürtel Handschuh Tasche Rucksack Stuhl Tisch Stoff Auto Fahrrad Motorrad Handy".split(" "),
  },
  {
    verb: "beschreiben", case: "gen", before: "Ich beschreibe den Anfang ", after: ".", rule: "Начало чего? Здесь зависимое существительное стоит в Genitiv.",
    ru: "Я описываю начало {gen}.",
    words: "Reise Urlaub Ausflug Tour Fahrt Geschichte Kurs Unterricht Film Konzert Treffen Fest Spiel Training Jahr Woche Monat Tag".split(" "),
  },
  {
    verb: "sehen", case: "gen", before: "Wir sehen die Spuren ", after: ".", rule: GENITIVE_RULE,
    ru: "Мы видим следы {gen}.",
    words: "Hund Katze Maus Kaninchen Pferd Kuh Schwein Schaf Ziege Huhn Ente Gans Esel Bär Löwe Tiger Elefant Affe Zebra Wolf Fuchs Hase Krokodil Auto Fahrrad Motorrad".split(" "),
  },
  {
    verb: "erklären", case: "gen", before: "Ich erkläre die Bedeutung ", after: ".", rule: "Значение чего? Здесь зависимое существительное стоит в Genitiv.",
    ru: "Я объясняю смысл {gen}.",
    words: "Wort Satz Text Buch Name Vorname Nachname Farbe Frage Antwort Beispiel Fehler Punkt Thema Datum Bild Lied Geschichte Brief".split(" "),
  },
  {
    verb: "kontrollieren", case: "gen", before: "Ich kontrolliere die Temperatur ", after: ".", rule: GENITIVE_RULE,
    ru: "Я проверяю температуру {gen}.",
    words: "Wasser Milch Tee Kaffee Kakao Mineralwasser Suppe Hähnchen Reis Fleisch Ofen Kühlschrank Patient Patientin Kind Baby".split(" "),
  },
  {
    verb: "verstehen", case: "gen", before: "Ich verstehe die Frage ", after: ".", rule: "Вопрос кого? Здесь зависимое существительное стоит в Genitiv.",
    ru: "Я понимаю вопрос {gen}.",
    words: "Lehrer Lehrerin Schüler Schülerin Student Studentin Kind Mutter Vater Sohn Tochter Nachbar Nachbarin Gast Kollege Kollegin Patient Patientin Kunde Kundin Tourist Touristin".split(" "),
  },
];

function articleFor(noun, caseId) {
  return NOUN_CASES[caseId].articles[noun.article];
}

function nounForm(noun, caseId) {
  if (caseId === "nom") return noun.word;
  if (caseId === "dat" && noun.word === "Herz") return "Herzen";
  const suffix = caseId === "gen" ? (GENITIVE_SUFFIXES[noun.word] ?? noun.oblique) : noun.oblique;
  return noun.word + suffix;
}

function templateMatches(template, noun) {
  return !template.words || template.words.includes(noun.word);
}

function shuffleNounItems(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function buildCaseDeck(nouns) {
  return shuffleNounItems(nouns).map((noun) => {
    const matches = NOUN_CONTEXTS.filter((template) => templateMatches(template, noun));
    const specific = matches.filter((template) => template.words);
    const candidates = specific.length ? specific : matches;
    const template = candidates[Math.floor(Math.random() * candidates.length)];
    return { noun, template };
  });
}

const NOUN_TEST_WORD_COUNT = 20;
const NOUN_TEST_CASE_COUNTS = { nom: 2, acc: 3, dat: 3, gen: 2 };

function buildNounTest() {
  const usedWords = new Set();
  const caseQuestions = [];

  for (const [caseId, count] of Object.entries(NOUN_TEST_CASE_COUNTS)) {
    const templates = shuffleNounItems(NOUN_CONTEXTS.filter((template) => template.case === caseId));
    for (const template of templates.slice(0, count)) {
      const candidates = NOUNS.filter((noun) => !usedWords.has(noun.word) && templateMatches(template, noun));
      const noun = candidates[Math.floor(Math.random() * candidates.length)];
      usedWords.add(noun.word);
      caseQuestions.push({ noun, template });
    }
  }

  const words = shuffleNounItems(NOUNS.filter((noun) => !usedWords.has(noun.word)));
  const wordQuestions = words.slice(0, NOUN_TEST_WORD_COUNT).map((noun) => ({ noun, template: null }));
  return [...wordQuestions, ...shuffleNounItems(caseQuestions)];
}
