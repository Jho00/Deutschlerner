const VERBS = {
  "können": {
    ru: "мочь",
    cue: "возможность или способность",
    present: ["kann", "kannst", "kann", "können", "könnt", "können"],
    past: ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"],
  },
  "müssen": {
    ru: "быть должным",
    cue: "необходимость или обязанность",
    present: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    past: ["musste", "musstest", "musste", "mussten", "musstet", "mussten"],
  },
  "dürfen": {
    ru: "иметь право",
    cue: "разрешение или запрет",
    present: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    past: ["durfte", "durftest", "durfte", "durften", "durftet", "durften"],
  },
  "sollen": {
    ru: "следовать указанию",
    cue: "чужое поручение, правило или ожидание",
    present: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    past: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
  },
  "wollen": {
    ru: "хотеть",
    cue: "намерение или желание",
    present: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    past: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
  },
  "mögen": {
    ru: "любить, нравиться",
    cue: "предпочтение или симпатия",
    present: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
    past: ["mochte", "mochtest", "mochte", "mochten", "mochtet", "mochten"],
  },
};

const PERSONS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
const TENSE_LABELS = { present: "Präsens", past: "Präteritum" };
const MOECHTE_FORMS = ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"];

const CONTEXTS = [
  { verb: "können", person: 0, subject: "Ich", rest: "ohne Probleme länger arbeiten", presentRu: "Я могу без проблем работать дольше.", pastRu: "Я мог без проблем работать дольше." },
  { verb: "können", person: 1, subject: "Du", rest: "sehr gut schwimmen", presentRu: "Ты умеешь очень хорошо плавать.", pastRu: "Ты умел очень хорошо плавать." },
  { verb: "können", person: 2, subject: "Er", rest: "das Problem allein lösen", presentRu: "Он может решить проблему один.", pastRu: "Он мог решить проблему один." },
  { verb: "können", person: 3, subject: "Wir", rest: "euch später helfen", presentRu: "Мы можем помочь вам позже.", pastRu: "Мы могли помочь вам позже." },
  { verb: "können", person: 4, subject: "Ihr", rest: "das Fenster mit diesem Schlüssel öffnen", presentRu: "Вы можете открыть окно этим ключом.", pastRu: "Вы могли открыть окно этим ключом." },
  { verb: "können", person: 5, subject: "Sie", rest: "den Text ohne Wörterbuch lesen", presentRu: "Вы можете прочитать текст без словаря.", pastRu: "Вы могли прочитать текст без словаря." },

  { verb: "müssen", person: 0, subject: "Ich", rest: "früh aufstehen", presentRu: "Мне нужно рано вставать.", pastRu: "Мне пришлось рано встать." },
  { verb: "müssen", person: 1, subject: "Du", rest: "den Termin absagen", presentRu: "Тебе нужно отменить встречу.", pastRu: "Тебе пришлось отменить встречу." },
  { verb: "müssen", person: 2, subject: "Anna", rest: "ihren Ausweis mitbringen", presentRu: "Анне нужно принести удостоверение.", pastRu: "Анне пришлось принести удостоверение." },
  { verb: "müssen", person: 3, subject: "Wir", rest: "in der Bibliothek leise sprechen", presentRu: "В библиотеке нам нужно говорить тихо.", pastRu: "В библиотеке нам пришлось говорить тихо." },
  { verb: "müssen", person: 4, subject: "Ihr", rest: "die Aufgabe beenden", presentRu: "Вам нужно закончить задание.", pastRu: "Вам пришлось закончить задание." },
  { verb: "müssen", person: 5, subject: "Die Gäste", rest: "draußen warten", presentRu: "Гостям нужно ждать снаружи.", pastRu: "Гостям пришлось ждать снаружи." },

  { verb: "dürfen", person: 0, subject: "Ich", rest: "hier bis acht Uhr parken", presentRu: "Мне разрешено парковаться здесь до восьми.", pastRu: "Мне можно было парковаться здесь до восьми." },
  { verb: "dürfen", person: 1, subject: "Du", rest: "mein Fahrrad nehmen", presentRu: "Тебе можно взять мой велосипед.", pastRu: "Тебе можно было взять мой велосипед." },
  { verb: "dürfen", person: 2, subject: "Das Kind", rest: "länger aufbleiben", presentRu: "Ребёнку можно подольше не ложиться спать.", pastRu: "Ребёнку можно было подольше не ложиться спать." },
  { verb: "dürfen", person: 3, subject: "Wir", rest: "im Hof Fußball spielen", presentRu: "Нам можно играть в футбол во дворе.", pastRu: "Нам можно было играть в футбол во дворе." },
  { verb: "dürfen", person: 4, subject: "Ihr", rest: "den Raum betreten", presentRu: "Вам можно войти в комнату.", pastRu: "Вам можно было войти в комнату." },
  { verb: "dürfen", person: 5, subject: "Die Besucher", rest: "im Museum keine Fotos machen", presentRu: "Посетителям нельзя фотографировать в музее.", pastRu: "Посетителям нельзя было фотографировать в музее." },

  { verb: "sollen", person: 0, subject: "Ich", rest: "den Arzt anrufen", presentRu: "Мне поручено позвонить врачу.", pastRu: "Мне было поручено позвонить врачу." },
  { verb: "sollen", person: 1, subject: "Du", rest: "mehr Wasser trinken", presentRu: "Тебе сказали пить больше воды.", pastRu: "Тебе велели пить больше воды." },
  { verb: "sollen", person: 2, subject: "Max", rest: "das Paket abholen", presentRu: "Максу поручено забрать посылку.", pastRu: "Максу поручили забрать посылку." },
  { verb: "sollen", person: 3, subject: "Wir", rest: "um neun Uhr kommen", presentRu: "Нам велено прийти в девять.", pastRu: "Нам велели прийти в девять." },
  { verb: "sollen", person: 4, subject: "Ihr", rest: "den Text laut lesen", presentRu: "Вам поручено прочитать текст вслух.", pastRu: "Вам поручили прочитать текст вслух." },
  { verb: "sollen", person: 5, subject: "Die Schüler", rest: "ihre Handys ausschalten", presentRu: "Ученикам велено выключить телефоны.", pastRu: "Ученикам велели выключить телефоны." },

  { verb: "wollen", person: 0, subject: "Ich", rest: "Deutsch lernen", presentRu: "Я хочу учить немецкий.", pastRu: "Я хотел учить немецкий." },
  { verb: "wollen", person: 1, subject: "Du", rest: "nach Berlin fahren", presentRu: "Ты хочешь поехать в Берлин.", pastRu: "Ты хотел поехать в Берлин." },
  { verb: "wollen", person: 2, subject: "Mia", rest: "ein neues Buch kaufen", presentRu: "Миа хочет купить новую книгу.", pastRu: "Миа хотела купить новую книгу." },
  { verb: "wollen", person: 3, subject: "Wir", rest: "am Wochenende wandern", presentRu: "На выходных мы хотим пойти в поход.", pastRu: "На выходных мы хотели пойти в поход." },
  { verb: "wollen", person: 4, subject: "Ihr", rest: "einen Film sehen", presentRu: "Вы хотите посмотреть фильм.", pastRu: "Вы хотели посмотреть фильм." },
  { verb: "wollen", person: 5, subject: "Meine Freunde", rest: "zusammen kochen", presentRu: "Мои друзья хотят готовить вместе.", pastRu: "Мои друзья хотели готовить вместе." },

  { verb: "mögen", person: 0, subject: "Ich", rest: "schwarzen Kaffee", presentRu: "Мне нравится чёрный кофе.", pastRu: "Мне нравился чёрный кофе." },
  { verb: "mögen", person: 1, subject: "Du", rest: "klassische Musik", presentRu: "Тебе нравится классическая музыка.", pastRu: "Тебе нравилась классическая музыка." },
  { verb: "mögen", person: 2, subject: "Paul", rest: "scharfes Essen", presentRu: "Паулю нравится острая еда.", pastRu: "Паулю нравилась острая еда." },
  { verb: "mögen", person: 3, subject: "Wir", rest: "lange Spaziergänge", presentRu: "Нам нравятся долгие прогулки.", pastRu: "Нам нравились долгие прогулки." },
  { verb: "mögen", person: 4, subject: "Ihr", rest: "diese Serie", presentRu: "Вам нравится этот сериал.", pastRu: "Вам нравился этот сериал." },
  { verb: "mögen", person: 5, subject: "Die Kinder", rest: "den neuen Spielplatz", presentRu: "Детям нравится новая площадка.", pastRu: "Детям нравилась новая площадка." },
];

const EXTRA_KOENNEN_MUESSEN = [
  { verb: "können", person: 0, subject: "Ich", rest: "gut mit Stress umgehen", presentRu: "Я умею хорошо справляться со стрессом.", pastRu: "Я умел хорошо справляться со стрессом." },
  { verb: "können", person: 0, subject: "Ich", rest: "den Bericht allein fertigstellen", presentRu: "Я могу закончить отчёт самостоятельно.", pastRu: "Я мог закончить отчёт самостоятельно." },
  { verb: "können", person: 1, subject: "Du", rest: "mir den Weg erklären", presentRu: "Ты можешь объяснить мне дорогу.", pastRu: "Ты мог объяснить мне дорогу." },
  { verb: "können", person: 1, subject: "Du", rest: "dieses Wort richtig aussprechen", presentRu: "Ты умеешь правильно произносить это слово.", pastRu: "Ты умел правильно произносить это слово." },
  { verb: "können", person: 2, subject: "Laura", rest: "drei Sprachen sprechen", presentRu: "Лаура умеет говорить на трёх языках.", pastRu: "Лаура умела говорить на трёх языках." },
  { verb: "können", person: 2, subject: "Mein Bruder", rest: "das Fahrrad reparieren", presentRu: "Мой брат умеет чинить велосипед.", pastRu: "Мой брат умел чинить велосипед." },
  { verb: "können", person: 3, subject: "Wir", rest: "die Datei gemeinsam bearbeiten", presentRu: "Мы можем вместе редактировать файл.", pastRu: "Мы могли вместе редактировать файл." },
  { verb: "können", person: 3, subject: "Wir", rest: "uns am Bahnhof treffen", presentRu: "Мы можем встретиться на вокзале.", pastRu: "Мы могли встретиться на вокзале." },
  { verb: "können", person: 4, subject: "Ihr", rest: "die Antwort schnell finden", presentRu: "Вы можете быстро найти ответ.", pastRu: "Вы могли быстро найти ответ." },
  { verb: "können", person: 4, subject: "Ihr", rest: "von hier den Bahnhof sehen", presentRu: "Отсюда вы можете увидеть вокзал.", pastRu: "Отсюда вы могли увидеть вокзал." },
  { verb: "können", person: 5, subject: "Die Teilnehmer", rest: "online mitmachen", presentRu: "Участники могут присоединиться онлайн.", pastRu: "Участники могли присоединиться онлайн." },
  { verb: "können", person: 5, subject: "Meine Eltern", rest: "lange Strecken fahren", presentRu: "Мои родители могут ездить на большие расстояния.", pastRu: "Мои родители могли ездить на большие расстояния." },
  { verb: "können", person: 0, subject: "Ich", rest: "das Geräusch kaum hören", presentRu: "Я почти не могу расслышать этот звук.", pastRu: "Я почти не мог расслышать этот звук." },
  { verb: "können", person: 1, subject: "Du", rest: "die Kiste allein tragen", presentRu: "Ты можешь нести коробку самостоятельно.", pastRu: "Ты мог нести коробку самостоятельно." },
  { verb: "können", person: 2, subject: "Der Computer", rest: "große Dateien öffnen", presentRu: "Компьютер может открывать большие файлы.", pastRu: "Компьютер мог открывать большие файлы." },
  { verb: "können", person: 2, subject: "Niemand", rest: "diese Frage sofort beantworten", presentRu: "Никто не может сразу ответить на этот вопрос.", pastRu: "Никто не мог сразу ответить на этот вопрос." },
  { verb: "können", person: 3, subject: "Wir", rest: "den Bus noch erreichen", presentRu: "Мы ещё можем успеть на автобус.", pastRu: "Мы ещё могли успеть на автобус." },
  { verb: "können", person: 4, subject: "Ihr", rest: "die Übung wiederholen", presentRu: "Вы можете повторить упражнение.", pastRu: "Вы могли повторить упражнение." },
  { verb: "können", person: 5, subject: "Die Kinder", rest: "schon bis zehn zählen", presentRu: "Дети уже умеют считать до десяти.", pastRu: "Дети уже умели считать до десяти." },
  { verb: "können", person: 5, subject: "Unsere Nachbarn", rest: "uns den Schlüssel bringen", presentRu: "Наши соседи могут принести нам ключ.", pastRu: "Наши соседи могли принести нам ключ." },

  { verb: "müssen", person: 0, subject: "Ich", rest: "meine E-Mails beantworten", presentRu: "Мне нужно ответить на письма.", pastRu: "Мне пришлось ответить на письма." },
  { verb: "müssen", person: 0, subject: "Ich", rest: "die Rechnung noch bezahlen", presentRu: "Мне ещё нужно оплатить счёт.", pastRu: "Мне ещё нужно было оплатить счёт." },
  { verb: "müssen", person: 1, subject: "Du", rest: "deine Schuhe ausziehen", presentRu: "Тебе нужно снять обувь.", pastRu: "Тебе пришлось снять обувь." },
  { verb: "müssen", person: 1, subject: "Du", rest: "den Computer neu starten", presentRu: "Тебе нужно перезагрузить компьютер.", pastRu: "Тебе пришлось перезагрузить компьютер." },
  { verb: "müssen", person: 2, subject: "Die Studentin", rest: "die Prüfung wiederholen", presentRu: "Студентке нужно пересдать экзамен.", pastRu: "Студентке пришлось пересдать экзамен." },
  { verb: "müssen", person: 2, subject: "Der Fahrer", rest: "bei Rot anhalten", presentRu: "Водитель должен остановиться на красный свет.", pastRu: "Водителю пришлось остановиться на красный свет." },
  { verb: "müssen", person: 3, subject: "Wir", rest: "noch Lebensmittel einkaufen", presentRu: "Нам ещё нужно купить продукты.", pastRu: "Нам ещё нужно было купить продукты." },
  { verb: "müssen", person: 3, subject: "Wir", rest: "die Anleitung genau lesen", presentRu: "Нам нужно внимательно прочитать инструкцию.", pastRu: "Нам пришлось внимательно прочитать инструкцию." },
  { verb: "müssen", person: 4, subject: "Ihr", rest: "eure Namen eintragen", presentRu: "Вам нужно вписать свои имена.", pastRu: "Вам пришлось вписать свои имена." },
  { verb: "müssen", person: 4, subject: "Ihr", rest: "vor dem Eingang warten", presentRu: "Вам нужно ждать перед входом.", pastRu: "Вам пришлось ждать перед входом." },
  { verb: "müssen", person: 5, subject: "Alle Besucher", rest: "einen Ausweis zeigen", presentRu: "Все посетители должны показать удостоверение.", pastRu: "Всем посетителям пришлось показать удостоверение." },
  { verb: "müssen", person: 5, subject: "Die Pflanzen", rest: "regelmäßig Wasser bekommen", presentRu: "Растениям нужно регулярно получать воду.", pastRu: "Растениям нужно было регулярно получать воду." },
  { verb: "müssen", person: 0, subject: "Ich", rest: "vor der Reise meinen Koffer packen", presentRu: "Мне нужно собрать чемодан перед поездкой.", pastRu: "Мне пришлось собрать чемодан перед поездкой." },
  { verb: "müssen", person: 1, subject: "Du", rest: "nicht auf mich warten", presentRu: "Тебе не нужно меня ждать.", pastRu: "Тебе не нужно было меня ждать." },
  { verb: "müssen", person: 2, subject: "Das Team", rest: "eine Entscheidung treffen", presentRu: "Команде нужно принять решение.", pastRu: "Команде пришлось принять решение." },
  { verb: "müssen", person: 2, subject: "Man", rest: "beim Ausfüllen des Formulars genau aufpassen", presentRu: "При заполнении бланка нужно быть внимательным.", pastRu: "При заполнении бланка нужно было быть внимательным." },
  { verb: "müssen", person: 3, subject: "Wir", rest: "den Raum aufräumen", presentRu: "Нам нужно убрать комнату.", pastRu: "Нам пришлось убрать комнату." },
  { verb: "müssen", person: 4, subject: "Ihr", rest: "eure Tickets zeigen", presentRu: "Вам нужно показать билеты.", pastRu: "Вам пришлось показать билеты." },
  { verb: "müssen", person: 5, subject: "Die Reisenden", rest: "in Köln umsteigen", presentRu: "Пассажирам нужно сделать пересадку в Кёльне.", pastRu: "Пассажирам пришлось сделать пересадку в Кёльне." },
  { verb: "müssen", person: 5, subject: "Meine Kinder", rest: "früh ins Bett gehen", presentRu: "Моим детям нужно рано ложиться спать.", pastRu: "Моим детям пришлось рано лечь спать." },
];

const EXTRA_DUERFEN_SOLLEN = [
  { verb: "dürfen", person: 0, subject: "Ich", rest: "das Fenster öffnen", presentRu: "Мне можно открыть окно.", pastRu: "Мне можно было открыть окно." },
  { verb: "dürfen", person: 0, subject: "Ich", rest: "meinen Hund mitbringen", presentRu: "Мне можно взять с собой собаку.", pastRu: "Мне можно было взять с собой собаку." },
  { verb: "dürfen", person: 1, subject: "Du", rest: "hier ohne Reservierung sitzen", presentRu: "Тебе можно сидеть здесь без бронирования.", pastRu: "Тебе можно было сидеть здесь без бронирования." },
  { verb: "dürfen", person: 1, subject: "Du", rest: "das Wörterbuch benutzen", presentRu: "Тебе можно пользоваться словарём.", pastRu: "Тебе можно было пользоваться словарём." },
  { verb: "dürfen", person: 2, subject: "Lena", rest: "allein nach Hause gehen", presentRu: "Лене можно пойти домой одной.", pastRu: "Лене можно было пойти домой одной." },
  { verb: "dürfen", person: 2, subject: "Der Gast", rest: "noch eine Frage stellen", presentRu: "Гостю можно задать ещё один вопрос.", pastRu: "Гостю можно было задать ещё один вопрос." },
  { verb: "dürfen", person: 3, subject: "Wir", rest: "diese Abkürzung verwenden", presentRu: "Нам можно использовать это сокращение.", pastRu: "Нам можно было использовать это сокращение." },
  { verb: "dürfen", person: 3, subject: "Wir", rest: "den Garten betreten", presentRu: "Нам можно войти в сад.", pastRu: "Нам можно было войти в сад." },
  { verb: "dürfen", person: 4, subject: "Ihr", rest: "euch einen Platz aussuchen", presentRu: "Вам можно выбрать себе место.", pastRu: "Вам можно было выбрать себе место." },
  { verb: "dürfen", person: 4, subject: "Ihr", rest: "die Küche mitbenutzen", presentRu: "Вам можно пользоваться общей кухней.", pastRu: "Вам можно было пользоваться общей кухней." },
  { verb: "dürfen", person: 5, subject: "Die Kinder", rest: "nicht auf der Fahrbahn spielen", presentRu: "Детям нельзя играть на проезжей части.", pastRu: "Детям нельзя было играть на проезжей части." },
  { verb: "dürfen", person: 5, subject: "Unsere Freunde", rest: "bei uns übernachten", presentRu: "Нашим друзьям можно переночевать у нас.", pastRu: "Нашим друзьям можно было переночевать у нас." },
  { verb: "dürfen", person: 0, subject: "Ich", rest: "eine Pause machen", presentRu: "Мне можно сделать перерыв.", pastRu: "Мне можно было сделать перерыв." },
  { verb: "dürfen", person: 1, subject: "Du", rest: "die Notizen fotografieren", presentRu: "Тебе можно сфотографировать записи.", pastRu: "Тебе можно было сфотографировать записи." },
  { verb: "dürfen", person: 2, subject: "Man", rest: "hier nicht rauchen", presentRu: "Здесь нельзя курить.", pastRu: "Здесь нельзя было курить." },
  { verb: "dürfen", person: 2, subject: "Der Hund", rest: "im Zug mitfahren", presentRu: "Собаке можно ехать с нами в поезде.", pastRu: "Собаке можно было ехать с нами в поезде." },
  { verb: "dürfen", person: 3, subject: "Wir", rest: "früher gehen", presentRu: "Нам можно уйти раньше.", pastRu: "Нам можно было уйти раньше." },
  { verb: "dürfen", person: 4, subject: "Ihr", rest: "eure Taschen hier nicht lassen", presentRu: "Вам нельзя оставлять сумки здесь.", pastRu: "Вам нельзя было оставлять сумки здесь." },
  { verb: "dürfen", person: 5, subject: "Die Gäste", rest: "sich am Buffet bedienen", presentRu: "Гостям можно брать блюда со шведского стола.", pastRu: "Гостям можно было брать блюда со шведского стола." },
  { verb: "dürfen", person: 5, subject: "Die Fahrräder", rest: "nicht vor dem Eingang stehen", presentRu: "Велосипеды нельзя оставлять перед входом.", pastRu: "Велосипеды нельзя было оставлять перед входом." },

  { verb: "sollen", person: 0, subject: "Ich", rest: "meiner Schwester helfen", presentRu: "Мне поручено помочь сестре.", pastRu: "Мне поручили помочь сестре." },
  { verb: "sollen", person: 0, subject: "Ich", rest: "mehr Pausen machen", presentRu: "Мне рекомендовано делать больше перерывов.", pastRu: "Мне рекомендовали делать больше перерывов." },
  { verb: "sollen", person: 1, subject: "Du", rest: "das Licht ausschalten", presentRu: "Тебе велено выключить свет.", pastRu: "Тебе велели выключить свет." },
  { verb: "sollen", person: 1, subject: "Du", rest: "dich beim Empfang melden", presentRu: "Тебе велено отметиться на стойке регистрации.", pastRu: "Тебе велели отметиться на стойке регистрации." },
  { verb: "sollen", person: 2, subject: "Eva", rest: "ihrem Chef antworten", presentRu: "Еве поручено ответить начальнику.", pastRu: "Еве поручили ответить начальнику." },
  { verb: "sollen", person: 2, subject: "Der Techniker", rest: "das Gerät prüfen", presentRu: "Технику поручено проверить устройство.", pastRu: "Технику поручили проверить устройство." },
  { verb: "sollen", person: 3, subject: "Wir", rest: "die Ergebnisse vergleichen", presentRu: "Нам поручено сравнить результаты.", pastRu: "Нам поручили сравнить результаты." },
  { verb: "sollen", person: 3, subject: "Wir", rest: "diesen Abschnitt übersetzen", presentRu: "Нам поручено перевести этот раздел.", pastRu: "Нам поручили перевести этот раздел." },
  { verb: "sollen", person: 4, subject: "Ihr", rest: "langsam und deutlich sprechen", presentRu: "Вам велено говорить медленно и отчётливо.", pastRu: "Вам велели говорить медленно и отчётливо." },
  { verb: "sollen", person: 4, subject: "Ihr", rest: "die Fenster schließen", presentRu: "Вам велено закрыть окна.", pastRu: "Вам велели закрыть окна." },
  { verb: "sollen", person: 5, subject: "Die Kinder", rest: "ihr Zimmer aufräumen", presentRu: "Детям велено убрать свою комнату.", pastRu: "Детям велели убрать свою комнату." },
  { verb: "sollen", person: 5, subject: "Die Bewerber", rest: "das Formular unterschreiben", presentRu: "Кандидатам велено подписать бланк.", pastRu: "Кандидатам велели подписать бланк." },
  { verb: "sollen", person: 0, subject: "Ich", rest: "die Unterlagen schicken", presentRu: "Мне поручено отправить документы.", pastRu: "Мне было поручено отправить документы." },
  { verb: "sollen", person: 1, subject: "Du", rest: "nicht so spät schlafen gehen", presentRu: "Тебе сказали не ложиться так поздно.", pastRu: "Тебе велели не ложиться так поздно." },
  { verb: "sollen", person: 2, subject: "Der Zug", rest: "laut Fahrplan pünktlich ankommen", presentRu: "По расписанию поезд должен прибыть вовремя.", pastRu: "По расписанию поезд должен был прибыть вовремя." },
  { verb: "sollen", person: 2, subject: "Man", rest: "die Anleitung zuerst lesen", presentRu: "Сначала полагается прочитать инструкцию.", pastRu: "Сначала было велено прочитать инструкцию." },
  { verb: "sollen", person: 3, subject: "Wir", rest: "die Nachbarn informieren", presentRu: "Нам поручено предупредить соседей.", pastRu: "Нам поручили предупредить соседей." },
  { verb: "sollen", person: 4, subject: "Ihr", rest: "die Beispiele abschreiben", presentRu: "Вам поручено переписать примеры.", pastRu: "Вам поручили переписать примеры." },
  { verb: "sollen", person: 5, subject: "Die Gäste", rest: "an der Rezeption warten", presentRu: "Гостям велено ждать у стойки регистрации.", pastRu: "Гостям велели ждать у стойки регистрации." },
  { verb: "sollen", person: 5, subject: "Meine Kollegen", rest: "den Plan überarbeiten", presentRu: "Моим коллегам поручено переработать план.", pastRu: "Моим коллегам поручили переработать план." },
];

const EXTRA_WOLLEN_MOEGEN = [
  { verb: "wollen", person: 0, subject: "Ich", rest: "später im Ausland arbeiten", presentRu: "Я хочу позже работать за границей.", pastRu: "Я хотел позже работать за границей." },
  { verb: "wollen", person: 0, subject: "Ich", rest: "ein Instrument spielen lernen", presentRu: "Я хочу научиться играть на музыкальном инструменте.", pastRu: "Я хотел научиться играть на музыкальном инструменте." },
  { verb: "wollen", person: 1, subject: "Du", rest: "deine Aussprache verbessern", presentRu: "Ты хочешь улучшить произношение.", pastRu: "Ты хотел улучшить произношение." },
  { verb: "wollen", person: 1, subject: "Du", rest: "uns bald besuchen", presentRu: "Ты хочешь вскоре навестить нас.", pastRu: "Ты хотел вскоре навестить нас." },
  { verb: "wollen", person: 2, subject: "Jonas", rest: "früher nach Hause gehen", presentRu: "Йонас хочет уйти домой пораньше.", pastRu: "Йонас хотел уйти домой пораньше." },
  { verb: "wollen", person: 2, subject: "Meine Schwester", rest: "Ärztin werden", presentRu: "Моя сестра хочет стать врачом.", pastRu: "Моя сестра хотела стать врачом." },
  { verb: "wollen", person: 3, subject: "Wir", rest: "ein kleines Fest organisieren", presentRu: "Мы хотим устроить небольшой праздник.", pastRu: "Мы хотели устроить небольшой праздник." },
  { verb: "wollen", person: 3, subject: "Wir", rest: "das Problem gemeinsam lösen", presentRu: "Мы хотим решить проблему вместе.", pastRu: "Мы хотели решить проблему вместе." },
  { verb: "wollen", person: 4, subject: "Ihr", rest: "eine Wohnung mieten", presentRu: "Вы хотите снять квартиру.", pastRu: "Вы хотели снять квартиру." },
  { verb: "wollen", person: 4, subject: "Ihr", rest: "die Ausstellung besuchen", presentRu: "Вы хотите посетить выставку.", pastRu: "Вы хотели посетить выставку." },
  { verb: "wollen", person: 5, subject: "Die Kinder", rest: "Eis essen", presentRu: "Дети хотят поесть мороженого.", pastRu: "Дети хотели поесть мороженого." },
  { verb: "wollen", person: 5, subject: "Unsere Gäste", rest: "noch ein wenig bleiben", presentRu: "Наши гости хотят остаться ещё ненадолго.", pastRu: "Наши гости хотели остаться ещё ненадолго." },
  { verb: "wollen", person: 0, subject: "Ich", rest: "keine Zeit verlieren", presentRu: "Я не хочу терять время.", pastRu: "Я не хотел терять время." },
  { verb: "wollen", person: 1, subject: "Du", rest: "das Fenster schließen", presentRu: "Ты хочешь закрыть окно.", pastRu: "Ты хотел закрыть окно." },
  { verb: "wollen", person: 2, subject: "Das Unternehmen", rest: "neue Mitarbeiter einstellen", presentRu: "Компания хочет нанять новых сотрудников.", pastRu: "Компания хотела нанять новых сотрудников." },
  { verb: "wollen", person: 2, subject: "Niemand", rest: "darüber sprechen", presentRu: "Никто не хочет об этом говорить.", pastRu: "Никто не хотел об этом говорить." },
  { verb: "wollen", person: 3, subject: "Wir", rest: "einen neuen Kurs anfangen", presentRu: "Мы хотим начать новый курс.", pastRu: "Мы хотели начать новый курс." },
  { verb: "wollen", person: 4, subject: "Ihr", rest: "am See zelten", presentRu: "Вы хотите пожить в палатке у озера.", pastRu: "Вы хотели пожить в палатке у озера." },
  { verb: "wollen", person: 5, subject: "Die Studenten", rest: "ein Projekt vorstellen", presentRu: "Студенты хотят представить проект.", pastRu: "Студенты хотели представить проект." },
  { verb: "wollen", person: 5, subject: "Meine Eltern", rest: "das Haus renovieren", presentRu: "Мои родители хотят отремонтировать дом.", pastRu: "Мои родители хотели отремонтировать дом." },

  { verb: "mögen", person: 0, subject: "Ich", rest: "frisches Brot", presentRu: "Мне нравится свежий хлеб.", pastRu: "Мне нравился свежий хлеб." },
  { verb: "mögen", person: 0, subject: "Ich", rest: "ruhige Abende", presentRu: "Мне нравятся спокойные вечера.", pastRu: "Мне нравились спокойные вечера." },
  { verb: "mögen", person: 1, subject: "Du", rest: "grünen Tee", presentRu: "Тебе нравится зелёный чай.", pastRu: "Тебе нравился зелёный чай." },
  { verb: "mögen", person: 1, subject: "Du", rest: "moderne Architektur", presentRu: "Тебе нравится современная архитектура.", pastRu: "Тебе нравилась современная архитектура." },
  { verb: "mögen", person: 2, subject: "Nina", rest: "italienisches Essen", presentRu: "Нине нравится итальянская еда.", pastRu: "Нине нравилась итальянская еда." },
  { verb: "mögen", person: 2, subject: "Mein Vater", rest: "alte Filme", presentRu: "Моему отцу нравятся старые фильмы.", pastRu: "Моему отцу нравились старые фильмы." },
  { verb: "mögen", person: 3, subject: "Wir", rest: "kleine Cafés", presentRu: "Нам нравятся маленькие кафе.", pastRu: "Нам нравились маленькие кафе." },
  { verb: "mögen", person: 3, subject: "Wir", rest: "klare Erklärungen", presentRu: "Нам нравятся понятные объяснения.", pastRu: "Нам нравились понятные объяснения." },
  { verb: "mögen", person: 4, subject: "Ihr", rest: "lange Zugfahrten", presentRu: "Вам нравятся долгие поездки на поезде.", pastRu: "Вам нравились долгие поездки на поезде." },
  { verb: "mögen", person: 4, subject: "Ihr", rest: "diesen Stadtteil", presentRu: "Вам нравится этот район.", pastRu: "Вам нравился этот район." },
  { verb: "mögen", person: 5, subject: "Die Kinder", rest: "Tiergeschichten", presentRu: "Детям нравятся истории о животных.", pastRu: "Детям нравились истории о животных." },
  { verb: "mögen", person: 5, subject: "Meine Freunde", rest: "Brettspiele", presentRu: "Моим друзьям нравятся настольные игры.", pastRu: "Моим друзьям нравились настольные игры." },
  { verb: "mögen", person: 0, subject: "Ich", rest: "den Geruch von Regen", presentRu: "Мне нравится запах дождя.", pastRu: "Мне нравился запах дождя." },
  { verb: "mögen", person: 1, subject: "Du", rest: "deine neue Lehrerin", presentRu: "Тебе нравится твоя новая учительница.", pastRu: "Тебе нравилась твоя новая учительница." },
  { verb: "mögen", person: 2, subject: "Der Hund", rest: "kaltes Wetter", presentRu: "Собаке нравится холодная погода.", pastRu: "Собаке нравилась холодная погода." },
  { verb: "mögen", person: 2, subject: "Niemand", rest: "unnötige Konflikte", presentRu: "Никому не нравятся ненужные конфликты.", pastRu: "Никому не нравились ненужные конфликты." },
  { verb: "mögen", person: 3, subject: "Wir", rest: "Musik beim Lernen", presentRu: "Нам нравится музыка во время учёбы.", pastRu: "Нам нравилась музыка во время учёбы." },
  { verb: "mögen", person: 4, subject: "Ihr", rest: "scharfe Soßen", presentRu: "Вам нравятся острые соусы.", pastRu: "Вам нравились острые соусы." },
  { verb: "mögen", person: 5, subject: "Viele Menschen", rest: "sonnige Tage", presentRu: "Многим людям нравятся солнечные дни.", pastRu: "Многим людям нравились солнечные дни." },
  { verb: "mögen", person: 5, subject: "Meine Großeltern", rest: "klassische Konzerte", presentRu: "Моим бабушке и дедушке нравятся классические концерты.", pastRu: "Моим бабушке и дедушке нравились классические концерты." },
];

const ALL_CONTEXTS = [
  ...CONTEXTS,
  ...EXTRA_KOENNEN_MUESSEN,
  ...EXTRA_DUERFEN_SOLLEN,
  ...EXTRA_WOLLEN_MOEGEN,
];

const QUESTIONS = ALL_CONTEXTS.flatMap((context, index) => ["present", "past"].map((tense, tenseIndex) => ({
  ...context,
  id: `${context.verb}-${index}-${tense}`,
  tense,
  answer: VERBS[context.verb][tense][context.person],
  rest: tense === "past" && context.verb === "sollen" ? `damals ${context.pastRest || context.rest}` : (tense === "past" ? (context.pastRest || context.rest) : (context.presentRest || context.rest)),
  translation: tense === "present"
    ? context.presentRu
    : context.verb === "sollen"
      ? `Тогда ${context.pastRu.charAt(0).toLocaleLowerCase("ru-RU")}${context.pastRu.slice(1)}`
      : context.pastRu,
  type: (index + tenseIndex) % 3 === 0 ? "choice" : "input",
})));

const DEFAULT_PROGRESS = {
  attempts: 0,
  correct: 0,
  streak: 0,
  bestStreak: 0,
  masteredIds: [],
  byVerb: Object.fromEntries(Object.keys(VERBS).map((verb) => [verb, { attempts: 0, correct: 0 }])),
};

const els = {
  modalView: document.querySelector("#modal-view"),
  exerciseCard: document.querySelector("#exercise-card"),
  summary: document.querySelector("#session-summary"),
  questionCounter: document.querySelector("#question-counter"),
  questionType: document.querySelector("#question-type"),
  sessionTrackFill: document.querySelector("#session-track-fill"),
  sessionScore: document.querySelector("#session-score"),
  sessionTotal: document.querySelector("#session-total"),
  tenseBadge: document.querySelector("#tense-badge"),
  verbBadge: document.querySelector("#verb-badge"),
  contextCue: document.querySelector("#context-cue"),
  sentence: document.querySelector("#sentence"),
  translation: document.querySelector("#translation"),
  answerForm: document.querySelector("#answer-form"),
  answerLabel: document.querySelector("#answer-label"),
  inputRow: document.querySelector(".input-row"),
  answerInput: document.querySelector("#answer-input"),
  choiceGrid: document.querySelector("#choice-grid"),
  feedback: document.querySelector("#feedback"),
  feedbackIcon: document.querySelector("#feedback-icon"),
  feedbackTitle: document.querySelector("#feedback-title"),
  feedbackText: document.querySelector("#feedback-text"),
  nextButton: document.querySelector("#next-button"),
  verbFilter: document.querySelector("#verb-filter"),
  streakValue: document.querySelector("#streak-value"),
  masteredCount: document.querySelector("#mastered-count"),
  masteryTotal: document.querySelector("#mastery-total"),
  bankCount: document.querySelector("#bank-count"),
  masteryPercent: document.querySelector("#mastery-percent"),
  masteryRing: document.querySelector("#mastery-ring"),
  headerProgress: document.querySelector("#header-progress"),
  headerRing: document.querySelector("#header-ring"),
  verbProgressList: document.querySelector("#verb-progress-list"),
  summaryScore: document.querySelector("#summary-score"),
  summaryTotal: document.querySelector("#summary-total"),
  summaryCopy: document.querySelector("#summary-copy"),
  bankDialog: document.querySelector("#bank-dialog"),
  bankList: document.querySelector("#bank-list"),
  bankTense: document.querySelector("#bank-tense"),
  bankVerb: document.querySelector("#bank-verb"),
  referenceDialog: document.querySelector("#reference-dialog"),
  referenceGrid: document.querySelector("#reference-grid"),
  progressDialog: document.querySelector("#progress-dialog"),
  progressDetails: document.querySelector("#progress-details"),
};

let progress = loadProgress();
let selectedTense = "mixed";
let selectedVerb = "all";
let sessionQuestions = [];
let currentIndex = 0;
let sessionScore = 0;
let answered = false;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem("modal-deutsch-progress-v1"));
    if (!saved) return structuredClone(DEFAULT_PROGRESS);
    return {
      ...structuredClone(DEFAULT_PROGRESS),
      ...saved,
      masteredIds: Array.isArray(saved.masteredIds) ? saved.masteredIds : [],
      byVerb: { ...structuredClone(DEFAULT_PROGRESS.byVerb), ...(saved.byVerb || {}) },
    };
  } catch {
    return structuredClone(DEFAULT_PROGRESS);
  }
}

function saveProgress() {
  try {
    localStorage.setItem("modal-deutsch-progress-v1", JSON.stringify(progress));
  } catch {
    // Тренировка продолжит работать, даже если браузер запретил локальное хранение.
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getPool() {
  return QUESTIONS.filter((question) =>
    (selectedTense === "mixed" || question.tense === selectedTense) &&
    (selectedVerb === "all" || question.verb === selectedVerb)
  );
}

function buildSessionPool() {
  const pool = getPool();
  const target = Math.min(10, pool.length);
  const unseen = shuffle(pool.filter((question) => !progress.masteredIds.includes(question.id)));
  const seen = shuffle(pool.filter((question) => progress.masteredIds.includes(question.id)));
  return [...unseen, ...seen].slice(0, target);
}

function startSession({ focus = true } = {}) {
  sessionQuestions = buildSessionPool();
  currentIndex = 0;
  sessionScore = 0;
  answered = false;
  els.exerciseCard.hidden = false;
  els.summary.hidden = true;
  renderQuestion();
  if (focus && window.matchMedia("(min-width: 821px)").matches) els.answerInput.focus({ preventScroll: true });
}

function renderQuestion() {
  const question = sessionQuestions[currentIndex];
  if (!question) return finishSession();
  answered = false;

  const total = sessionQuestions.length;
  const position = currentIndex + 1;
  els.questionCounter.textContent = `Задание ${position} из ${total}`;
  els.questionType.textContent = question.type === "choice" ? "Выберите форму глагола" : "Вставьте форму глагола";
  els.sessionTrackFill.style.width = `${(position / total) * 100}%`;
  els.sessionScore.textContent = sessionScore;
  els.sessionTotal.textContent = total;
  els.tenseBadge.textContent = TENSE_LABELS[question.tense].toUpperCase();
  els.tenseBadge.classList.toggle("is-past", question.tense === "past");
  els.verbBadge.textContent = `${question.verb} · ${VERBS[question.verb].ru}`;
  els.contextCue.textContent = VERBS[question.verb].cue;
  els.sentence.innerHTML = `${question.subject} <span class="gap">_____</span> ${question.rest}.`;
  els.translation.textContent = question.translation;
  els.feedback.hidden = true;
  els.feedback.classList.remove("is-wrong");
  els.answerInput.value = "";
  els.answerInput.disabled = false;
  els.choiceGrid.replaceChildren();

  const isChoice = question.type === "choice";
  els.answerLabel.textContent = isChoice ? "Выберите ответ" : "Ваша форма";
  els.answerLabel.htmlFor = isChoice ? "choice-grid" : "answer-input";
  els.inputRow.hidden = isChoice;
  els.choiceGrid.hidden = !isChoice;
  els.choiceGrid.style.display = isChoice ? "grid" : "none";

  if (isChoice) {
    const options = choiceOptions(question);
    options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.dataset.letter = String.fromCharCode(65 + index);
      button.textContent = option;
      button.addEventListener("click", () => submitAnswer(option));
      els.choiceGrid.append(button);
    });
  }

  window.requestAnimationFrame(() => {
    const target = isChoice ? els.choiceGrid.querySelector("button") : els.answerInput;
    if (!els.modalView.hidden && target && window.matchMedia("(min-width: 821px)").matches) target.focus({ preventScroll: true });
  });
}

function choiceOptions(question) {
  const forms = Object.values(VERBS).map((verb) => verb[question.tense][question.person]);
  const uniqueDistractors = [...new Set(forms.filter((form) => form !== question.answer))];
  const distractors = question.verb === "mögen" && question.tense === "past"
    ? [MOECHTE_FORMS[question.person], ...shuffle(uniqueDistractors).slice(0, 2)]
    : shuffle(uniqueDistractors).slice(0, 3);
  return shuffle([question.answer, ...distractors]);
}

function normalizeAnswer(value) {
  return value.trim().toLocaleLowerCase("de-DE").replace(/[.!?]+$/, "");
}

function submitAnswer(rawAnswer) {
  if (answered) return;
  const question = sessionQuestions[currentIndex];
  const value = normalizeAnswer(rawAnswer);
  if (!value) {
    els.answerInput.focus();
    els.answerInput.setCustomValidity("Введите форму глагола");
    els.answerInput.reportValidity();
    return;
  }
  els.answerInput.setCustomValidity("");
  answered = true;
  const isCorrect = value === normalizeAnswer(question.answer);

  progress.attempts += 1;
  progress.byVerb[question.verb].attempts += 1;
  if (isCorrect) {
    sessionScore += 1;
    progress.correct += 1;
    progress.streak += 1;
    progress.bestStreak = Math.max(progress.bestStreak, progress.streak);
    progress.byVerb[question.verb].correct += 1;
    if (!progress.masteredIds.includes(question.id)) progress.masteredIds.push(question.id);
  } else {
    progress.streak = 0;
  }
  saveProgress();

  els.answerInput.disabled = true;
  els.choiceGrid.querySelectorAll("button").forEach((button) => { button.disabled = true; });
  els.feedback.hidden = false;
  els.feedback.classList.toggle("is-wrong", !isCorrect);
  els.feedbackIcon.textContent = isCorrect ? "✓" : "!";
  els.feedbackTitle.textContent = isCorrect ? "Верно" : `Правильный ответ: ${question.answer}`;
  const confusedMoechte = question.verb === "mögen" && question.tense === "past" && value === MOECHTE_FORMS[question.person];
  els.feedbackText.textContent = confusedMoechte
    ? `${question.answer} — прошедшая форма mögen. ${MOECHTE_FORMS[question.person]} — форма вежливого желания: «хотел(а) / хотели бы».`
    : question.verb === "sollen" && question.tense === "past"
      ? `${question.answer} совпадает с формой Konjunktiv II; здесь слово damals указывает на Präteritum.`
      : `${question.verb} + ${PERSONS[question.person]} в ${TENSE_LABELS[question.tense]} → ${question.answer}.`;
  els.sentence.querySelector(".gap").textContent = question.answer;
  els.sessionScore.textContent = sessionScore;
  renderProgress();
  els.nextButton.focus({ preventScroll: true });
}

function nextQuestion() {
  if (!answered) return;
  currentIndex += 1;
  if (currentIndex >= sessionQuestions.length) finishSession();
  else renderQuestion();
}

function finishSession() {
  els.exerciseCard.hidden = true;
  els.summary.hidden = false;
  els.summaryScore.textContent = sessionScore;
  els.summaryTotal.textContent = sessionQuestions.length;
  const ratio = sessionQuestions.length ? sessionScore / sessionQuestions.length : 0;
  els.summaryCopy.textContent = ratio === 1
    ? "Без ошибок. Формы уже работают автоматически."
    : ratio >= .7
      ? "Хороший результат. Повторите ошибки в следующей десятке."
      : "Нормальный этап обучения. Загляните в таблицу форм и попробуйте ещё раз.";
}

function renderProgress() {
  const mastered = progress.masteredIds.length;
  const mastery = Math.round((mastered / QUESTIONS.length) * 100);
  els.streakValue.textContent = progress.streak;
  els.masteredCount.textContent = mastered;
  els.masteryTotal.textContent = QUESTIONS.length;
  els.bankCount.textContent = QUESTIONS.length;
  els.masteryPercent.textContent = `${mastery}%`;
  els.headerProgress.textContent = `${mastery}%`;
  els.masteryRing.style.background = `conic-gradient(var(--orange) ${mastery}%, #e7edf7 0)`;
  els.headerRing.style.background = `conic-gradient(var(--orange) ${mastery}%, #e8edf7 0)`;

  els.verbProgressList.replaceChildren();
  Object.entries(VERBS).forEach(([verb, data]) => {
    const verbTotal = QUESTIONS.filter((question) => question.verb === verb).length;
    const masteredForVerb = QUESTIONS.filter((question) => question.verb === verb && progress.masteredIds.includes(question.id)).length;
    const percent = Math.round((masteredForVerb / verbTotal) * 100);
    const row = document.createElement("div");
    row.className = "verb-progress";
    row.innerHTML = `<div class="verb-row-head"><strong>${verb}</strong><span>${masteredForVerb}/${verbTotal}</span></div><div class="verb-bar"><span style="width:${percent}%"></span></div>`;
    row.title = `${data.ru}: освоено ${masteredForVerb} из ${verbTotal}`;
    els.verbProgressList.append(row);
  });
}

function renderBank() {
  const tense = els.bankTense.value;
  const verb = els.bankVerb.value;
  const filtered = QUESTIONS.filter((question) =>
    (tense === "all" || question.tense === tense) &&
    (verb === "all" || question.verb === verb)
  );
  els.bankList.replaceChildren();

  if (!filtered.length) {
    els.bankList.innerHTML = '<div class="bank-empty">Для этого фильтра заданий нет.</div>';
    return;
  }

  filtered.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bank-item";
    const done = progress.masteredIds.includes(question.id);
    button.innerHTML = `<span class="bank-number">${String(index + 1).padStart(2, "0")}</span><span class="bank-copy"><strong>${question.subject} _____ ${question.rest}.</strong><small>${question.verb} · ${TENSE_LABELS[question.tense]}</small></span><span class="bank-status ${done ? "is-done" : ""}">${done ? "✓" : "·"}</span>`;
    button.addEventListener("click", () => openQuestionFromBank(question));
    els.bankList.append(button);
  });
}

function openQuestionFromBank(question) {
  const remaining = shuffle(QUESTIONS.filter((item) => item.id !== question.id)).slice(0, 9);
  sessionQuestions = [question, ...remaining];
  currentIndex = 0;
  sessionScore = 0;
  els.exerciseCard.hidden = false;
  els.summary.hidden = true;
  els.bankDialog.close();
  renderQuestion();
  document.querySelector("#practice").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderReference() {
  els.referenceGrid.replaceChildren();
  Object.entries(VERBS).forEach(([verb, data]) => {
    const card = document.createElement("section");
    card.className = "reference-verb";
    const rows = PERSONS.map((person, index) => `<tr><th>${person}</th><td>${data.present[index]}</td><td>${data.past[index]}</td></tr>`).join("");
    card.innerHTML = `<div class="reference-verb-head"><strong>${verb}</strong><span>${data.ru}</span></div><table class="reference-table"><thead><tr><th>Лицо</th><th>Präsens</th><th>Präteritum</th></tr></thead><tbody>${rows}</tbody></table>`;
    els.referenceGrid.append(card);
  });
}

function renderProgressDialog() {
  const accuracy = progress.attempts ? Math.round((progress.correct / progress.attempts) * 100) : 0;
  els.progressDetails.innerHTML = `
    <div class="progress-stat-grid">
      <div class="progress-stat"><strong>${progress.masteredIds.length}</strong><small>освоено</small></div>
      <div class="progress-stat"><strong>${accuracy}%</strong><small>точность</small></div>
      <div class="progress-stat"><strong>${progress.bestStreak}</strong><small>лучшая серия</small></div>
    </div>
    <p class="progress-explainer">Сделано попыток: ${progress.attempts}. Прогресс хранится только в этом браузере и останется после перезагрузки страницы.</p>`;
}

function setTense(tense) {
  if (!["mixed", "present", "past"].includes(tense)) throw new Error("Неизвестный режим времени");
  selectedTense = tense;
  document.querySelectorAll("[data-tense]").forEach((button) => button.classList.toggle("is-active", button.dataset.tense === tense));
  startSession({ focus: false });
}

function setVerb(verb) {
  if (verb !== "all" && !VERBS[verb]) throw new Error("Неизвестный модальный глагол");
  selectedVerb = verb;
  els.verbFilter.value = verb;
  startSession({ focus: false });
}

function setupDialogs() {
  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  });
}

function setupControls() {
  document.querySelectorAll("[data-tense]").forEach((button) => button.addEventListener("click", () => setTense(button.dataset.tense)));
  els.verbFilter.addEventListener("change", () => setVerb(els.verbFilter.value));
  document.querySelectorAll("[data-new-session]").forEach((button) => button.addEventListener("click", () => startSession()));
  document.querySelectorAll("[data-open-bank]").forEach((button) => button.addEventListener("click", () => { renderBank(); els.bankDialog.showModal(); }));
  document.querySelectorAll("[data-open-reference]").forEach((button) => button.addEventListener("click", () => els.referenceDialog.showModal()));
  document.querySelectorAll("[data-open-progress]").forEach((button) => button.addEventListener("click", () => { renderProgressDialog(); els.progressDialog.showModal(); }));
  document.querySelectorAll("[data-scroll-practice]").forEach((button) => button.addEventListener("click", () => document.querySelector("#practice").scrollIntoView({ behavior: "smooth" })));
  els.answerForm.addEventListener("submit", (event) => { event.preventDefault(); submitAnswer(els.answerInput.value); });
  els.nextButton.addEventListener("click", nextQuestion);
  els.bankTense.addEventListener("change", renderBank);
  els.bankVerb.addEventListener("change", renderBank);
  document.querySelector("#reset-progress").addEventListener("click", () => {
    if (!window.confirm("Сбросить все результаты и серии?")) return;
    progress = structuredClone(DEFAULT_PROGRESS);
    saveProgress();
    renderProgress();
    renderProgressDialog();
    startSession({ focus: false });
  });
  document.addEventListener("keydown", (event) => {
    const inExercise = event.target === document.body || els.exerciseCard.contains(event.target);
    if (event.key === "Enter" && answered && !els.modalView.hidden && inExercise && !document.querySelector("dialog[open]")) {
      event.preventDefault();
      nextQuestion();
    }
  });
}

function populateFilters() {
  Object.entries(VERBS).forEach(([verb, data]) => {
    const option = document.createElement("option");
    option.value = verb;
    option.textContent = `${verb} — ${data.ru}`;
    els.bankVerb.append(option);
  });
}

function registerWebMCP() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "get_learning_progress",
      title: "Показать прогресс",
      description: "Возвращает текущий прогресс изучения модальных глаголов без изменения состояния.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        return {
          mastered: progress.masteredIds.length,
          total: QUESTIONS.length,
          attempts: progress.attempts,
          correct: progress.correct,
          streak: progress.streak,
          bestStreak: progress.bestStreak,
        };
      },
    },
    {
      name: "start_practice_session",
      title: "Начать тренировку",
      description: "Начинает новую видимую сессию по выбранному времени и модальному глаголу.",
      inputSchema: {
        type: "object",
        properties: {
          tense: { type: "string", enum: ["mixed", "present", "past"] },
          verb: { type: "string", enum: ["all", ...Object.keys(VERBS)] },
        },
        required: ["tense", "verb"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !["mixed", "present", "past"].includes(input.tense)) throw new Error("Некорректное время");
        if (input.verb !== "all" && !VERBS[input.verb]) throw new Error("Некорректный глагол");
        selectedTense = input.tense;
        selectedVerb = input.verb;
        els.verbFilter.value = input.verb;
        document.querySelectorAll("[data-tense]").forEach((button) => button.classList.toggle("is-active", button.dataset.tense === input.tense));
        openModalPractice();
        startSession({ focus: false });
        return { status: "started", tense: selectedTense, verb: selectedVerb, questions: sessionQuestions.length };
      },
    },
    {
      name: "answer_current_question",
      title: "Ответить на задание",
      description: "Отправляет ответ на текущее видимое задание и обновляет сохранённый прогресс.",
      inputSchema: {
        type: "object",
        properties: { answer: { type: "string", minLength: 1, maxLength: 30 } },
        required: ["answer"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input.answer !== "string" || !input.answer.trim()) throw new Error("Ответ не может быть пустым");
        if (answered) throw new Error("На текущее задание уже дан ответ");
        const question = sessionQuestions[currentIndex];
        const correct = normalizeAnswer(input.answer) === normalizeAnswer(question.answer);
        openModalPractice();
        submitAnswer(input.answer);
        return { status: "checked", correct, expected: question.answer, position: currentIndex + 1 };
      },
    },
  ];

  tools.forEach((tool) => {
    try { void Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch { /* unsupported implementation */ }
  });
}

populateFilters();
renderReference();
renderProgress();
setupDialogs();
setupControls();
startSession({ focus: false });
registerWebMCP();
