// Строка словаря: артикль и слово | перевод | окончание в Akkusativ и Dativ, если оно есть.
const NOUN_GROUPS = [
  {
    id: "food", label: "Еда",
    entries: `
der Apfel | яблоко
die Birne | груша
die Banane | банан
die Orange | апельсин
die Zitrone | лимон
die Erdbeere | клубника
die Traube | виноградина, гроздь
die Kirsche | вишня
der Pfirsich | персик
die Ananas | ананас
die Kartoffel | картофель
die Tomate | помидор
die Gurke | огурец
die Karotte | морковь
die Zwiebel | луковица
der Salat | салат
der Kohl | капуста
die Bohne | фасоль
die Erbse | горошина
der Pilz | гриб
das Brot | хлеб
das Brötchen | булочка
die Butter | сливочное масло
der Käse | сыр
das Ei | яйцо
die Wurst | колбаса
der Schinken | ветчина
das Hähnchen | курица, цыплёнок
der Fisch | рыба
das Fleisch | мясо
der Reis | рис
die Nudel | макаронина
die Suppe | суп
das Mehl | мука
der Zucker | сахар
das Salz | соль
der Pfeffer | перец (приправа)
das Öl | масло (растительное)
der Honig | мёд
die Marmelade | варенье
`,
  },
  {
    id: "cafe", label: "Кафе и напитки",
    entries: `
das Wasser | вода
die Milch | молоко
der Tee | чай
der Kaffee | кофе
der Saft | сок
die Limonade | лимонад
das Bier | пиво
der Wein | вино
der Kakao | какао
das Mineralwasser | минеральная вода
das Frühstück | завтрак
das Mittagessen | обед
das Abendessen | ужин
die Mahlzeit | приём пищи
die Speisekarte | меню
die Rechnung | счёт
die Bestellung | заказ
die Portion | порция
der Nachtisch | десерт
die Vorspeise | закуска
der Teller | тарелка
die Tasse | чашка
das Glas | стакан
die Flasche | бутылка
die Gabel | вилка
das Messer | нож
der Löffel | ложка
die Schüssel | миска
die Serviette | салфетка
die Kanne | кувшин
das Restaurant | ресторан
das Café | кафе
die Bäckerei | пекарня
die Konditorei | кондитерская
der Imbiss | закусочная
der Kuchen | пирог
die Torte | торт
der Keks | печенье
die Schokolade | шоколад
das Eis | мороженое
`,
  },
  {
    id: "home", label: "Дом и мебель",
    entries: `
das Haus | дом
die Wohnung | квартира
das Zimmer | комната
die Küche | кухня
das Bad | ванная
der Korridor | коридор
das Wohnzimmer | гостиная
das Schlafzimmer | спальня
der Balkon | балкон
der Garten | сад
die Tür | дверь
das Fenster | окно
die Wand | стена
der Boden | пол
die Decke | потолок, одеяло
die Treppe | лестница
das Dach | крыша
der Eingang | вход
der Schlüssel | ключ
das Schloss | замок
der Tisch | стол
der Stuhl | стул
der Sessel | кресло
das Sofa | диван
das Bett | кровать
der Schrank | шкаф
das Regal | полка, стеллаж
die Lampe | лампа
der Spiegel | зеркало
der Teppich | ковёр
der Kühlschrank | холодильник
der Herd | плита
der Ofen | печь, духовка
die Waschmaschine | стиральная машина
die Dusche | душ
das Handtuch | полотенце
das Kissen | подушка
die Seife | мыло
die Bürste | щётка
der Besen | веник
`,
  },
  {
    id: "shopping", label: "Одежда и покупки",
    entries: `
das Hemd | рубашка
die Bluse | блузка
die Hose | брюки
die Weste | жилет
der Rock | юбка
das Kleid | платье
die Jacke | куртка
der Mantel | пальто
der Pullover | свитер
das T-Shirt | футболка
der Schuh | туфля, ботинок
die Socke | носок
der Strumpf | чулок
die Mütze | шапка
der Hut | шляпа
der Schal | шарф
der Gürtel | ремень
der Handschuh | перчатка
der Stiefel | сапог
der Anzug | костюм
die Tasche | сумка
der Rucksack | рюкзак
die Geldbörse | кошелёк
die Brille | очки
die Uhr | часы
der Ring | кольцо
die Größe | размер
die Farbe | цвет
der Stoff | ткань
der Knopf | пуговица
das Geschäft | магазин
der Laden | магазин
die Kasse | касса
der Preis | цена
der Rabatt | скидка
der Kassenbon | кассовый чек
das Angebot | предложение
der Verkäufer | продавец
die Verkäuferin | продавщица
die Umkleidekabine | примерочная
`,
  },
  {
    id: "people", label: "Семья и люди",
    entries: `
die Familie | семья
die Mutter | мама
der Vater | папа
die Großmutter | бабушка
der Großvater | дедушка
das Kind | ребёнок
der Sohn | сын
die Tochter | дочь
der Bruder | брат
die Schwester | сестра
die Oma | бабушка
der Opa | дедушка
der Enkel | внук
die Enkelin | внучка
der Onkel | дядя
die Tante | тётя
der Cousin | двоюродный брат
die Cousine | двоюродная сестра
der Neffe | племянник | n
die Nichte | племянница
der Mann | мужчина, муж
die Frau | женщина, жена
der Junge | мальчик | n
das Mädchen | девочка
das Baby | младенец
der Freund | друг
die Freundin | подруга
der Nachbar | сосед | n
die Nachbarin | соседка
der Gast | гость
der Mensch | человек | en
die Person | человек, лицо
der Herr | господин | n
der Name | имя | n
der Vorname | личное имя | n
der Nachname | фамилия | n
das Alter | возраст
der Geburtstag | день рождения
die Hochzeit | свадьба
das Paar | пара
`,
  },
  {
    id: "work", label: "Работа и услуги",
    entries: `
die Arbeit | работа
der Beruf | профессия
die Firma | фирма
das Büro | офис
der Chef | начальник
die Chefin | начальница
der Kollege | коллега | n
die Kollegin | коллега
der Mitarbeiter | сотрудник
die Mitarbeiterin | сотрудница
die Aufgabe | задание
der Termin | назначенная встреча
die Besprechung | совещание
die Pause | перерыв
die Bewerbung | заявление о приёме на работу
der Lebenslauf | резюме
das Praktikum | стажировка
der Lohn | зарплата
der Feierabend | конец рабочего дня
der Arbeitsplatz | рабочее место
der Kellner | официант
die Kellnerin | официантка
der Koch | повар
die Köchin | повар
der Fahrer | водитель
die Fahrerin | водитель
der Mechaniker | механик
die Mechanikerin | механик
der Friseur | парикмахер
die Friseurin | парикмахер
der Kunde | клиент | n
die Kundin | клиентка
das Paket | посылка
der Brief | письмо
die Post | почта
das Formular | бланк
die Unterschrift | подпись
der Stempel | печать, штамп
das Konto | счёт
der Schalter | окошко обслуживания
`,
  },
  {
    id: "study", label: "Учёба и языки",
    entries: `
die Schule | школа
die Klasse | класс
der Lehrer | учитель
die Lehrerin | учительница
der Schüler | ученик
die Schülerin | ученица
der Student | студент | en
die Studentin | студентка
der Kurs | курс
der Unterricht | урок, занятия
das Buch | книга
das Heft | тетрадь
der Kugelschreiber | шариковая ручка
der Bleistift | карандаш
das Papier | бумага
die Tafel | доска
das Lineal | линейка
der Radiergummi | ластик
das Wörterbuch | словарь
der Computer | компьютер
das Wort | слово
der Satz | предложение
die Frage | вопрос
die Antwort | ответ
der Text | текст
das Beispiel | пример
die Übung | упражнение
die Prüfung | экзамен
die Hausaufgabe | домашнее задание
der Test | тест
die Sprache | язык
die Aussprache | произношение
die Grammatik | грамматика
der Fehler | ошибка
die Note | оценка
der Punkt | точка, балл
das Thema | тема
die Lektion | урок
das Blatt | лист бумаги
das Zeugnis | табель, аттестат
`,
  },
  {
    id: "transport", label: "Транспорт",
    entries: `
das Auto | автомобиль
der Bus | автобус
die Bahn | железная дорога, поезд
der Zug | поезд
die Straßenbahn | трамвай
die U-Bahn | метро
die S-Bahn | городская электричка
das Fahrrad | велосипед
das Motorrad | мотоцикл
das Taxi | такси
die Haltestelle | остановка
der Bahnhof | вокзал
der Bahnsteig | платформа
das Gleis | железнодорожный путь
der Fahrplan | расписание движения
die Fahrkarte | билет на транспорт
das Ticket | билет
die Verspätung | опоздание, задержка
die Abfahrt | отправление
die Ankunft | прибытие
die Fahrt | поездка
der Weg | путь
die Straße | улица, дорога
die Kreuzung | перекрёсток
die Ampel | светофор
die Brücke | мост
der Tunnel | тоннель
der Parkplatz | парковка
die Garage | гараж
die Tankstelle | заправка
der Verkehr | дорожное движение
der Stau | пробка
der Unfall | авария
das Rad | колесо
der Reifen | шина
der Motor | двигатель
der Sitz | сиденье
das Lenkrad | руль
der Führerschein | водительское удостоверение
das Kennzeichen | номерной знак
`,
  },
  {
    id: "travel", label: "Путешествия",
    entries: `
die Reise | путешествие
der Urlaub | отпуск
der Ausflug | экскурсия, выезд
die Tour | тур, поездка
der Flug | авиарейс
das Flugzeug | самолёт
der Flughafen | аэропорт
der Koffer | чемодан
das Gepäck | багаж
der Reisepass | заграничный паспорт
der Pass | паспорт
das Visum | виза
die Grenze | граница
das Land | страна
die Hauptstadt | столица
der Stadtplan | план города
die Karte | карта
das Hotel | гостиница
die Pension | небольшой гостевой дом
die Jugendherberge | молодёжный хостел
die Rezeption | стойка регистрации
die Reservierung | бронирование
die Übernachtung | ночёвка
der Aufenthalt | пребывание
das Einzelzimmer | одноместный номер
das Doppelzimmer | двухместный номер
der Zimmerschlüssel | ключ от номера
die Unterkunft | жильё на время поездки
der Campingplatz | кемпинг
das Zelt | палатка
der Strand | пляж
die Insel | остров
das Meer | море
der Hafen | порт
das Schiff | корабль
die Fähre | паром
der Tourist | турист | en
die Touristin | туристка
der Reiseführer | путеводитель, экскурсовод
die Sehenswürdigkeit | достопримечательность
`,
  },
  {
    id: "city", label: "Город и места",
    entries: `
die Stadt | город
das Dorf | деревня
der Platz | площадь, место
das Zentrum | центр
die Ecke | угол
der Markt | рынок
der Supermarkt | супермаркет
die Apotheke | аптека
die Bank | банк
das Postamt | почтовое отделение
das Rathaus | ратуша
das Museum | музей
das Kino | кинотеатр
das Theater | театр
die Bibliothek | библиотека
die Kirche | церковь
die Moschee | мечеть
die Universität | университет
das Krankenhaus | больница
die Polizei | полиция
die Feuerwehr | пожарная служба
der Park | парк
der Spielplatz | детская площадка
das Schwimmbad | бассейн
der Sportplatz | спортивная площадка
das Stadion | стадион
der Zoo | зоопарк
das Kaufhaus | универмаг
das Einkaufszentrum | торговый центр
der Ausgang | выход
der Stadtteil | район города
die Adresse | адрес
die Hausnummer | номер дома
der Aufzug | лифт
der Stock | этаж
die Etage | этаж
das Gebäude | здание
der Bürgersteig | тротуар
die Fußgängerzone | пешеходная зона
der Brunnen | фонтан, колодец
`,
  },
  {
    id: "health", label: "Здоровье и тело",
    entries: `
der Arzt | врач
die Ärztin | врач
der Patient | пациент | en
die Patientin | пациентка
die Praxis | врачебный кабинет
die Sprechstunde | часы приёма
die Krankheit | болезнь
die Gesundheit | здоровье
die Erkältung | простуда
der Husten | кашель
der Schnupfen | насморк
das Fieber | жар
der Schmerz | боль
der Kopf | голова
der Hals | шея, горло
der Rücken | спина
der Bauch | живот
der Arm | рука (от плеча)
das Bein | нога
der Fuß | стопа
die Hand | кисть руки
der Finger | палец руки
das Auge | глаз
das Ohr | ухо
die Nase | нос
der Mund | рот
der Zahn | зуб
das Gesicht | лицо
das Haar | волос
das Herz | сердце
das Medikament | лекарство
die Tablette | таблетка
das Rezept | рецепт
der Verband | повязка
das Pflaster | пластырь
die Untersuchung | осмотр, обследование
der Notfall | экстренный случай
die Hilfe | помощь
die Ruhe | покой, тишина
der Schlaf | сон
`,
  },
  {
    id: "nature", label: "Природа и погода",
    entries: `
die Sonne | солнце
der Mond | луна
der Stern | звезда
der Himmel | небо
die Wolke | облако
der Regen | дождь
der Schnee | снег
der Wind | ветер
der Nebel | туман
der Sturm | буря
das Wetter | погода
die Temperatur | температура
der Grad | градус
die Hitze | жара
die Kälte | холод
der Frühling | весна
der Sommer | лето
der Herbst | осень
der Winter | зима
die Jahreszeit | время года
der Baum | дерево
die Blume | цветок
die Pflanze | растение
das Gras | трава
der Wald | лес
die Wiese | луг
das Feld | поле
der Berg | гора
das Tal | долина
der Hügel | холм
der Teich | пруд
der Fluss | река
der Bach | ручей
das Ufer | берег
der Stein | камень
der Sand | песок
die Erde | земля
die Luft | воздух
das Feuer | огонь
der Ast | ветка
`,
  },
  {
    id: "animals", label: "Животные",
    entries: `
das Tier | животное
das Haustier | домашнее животное
der Hund | собака
die Katze | кошка
die Maus | мышь
das Kaninchen | кролик
der Hamster | хомяк
der Vogel | птица
der Spatz | воробей
das Meerschweinchen | морская свинка
das Pferd | лошадь
die Kuh | корова
das Schwein | свинья
das Schaf | овца
die Ziege | коза
das Huhn | курица
der Hahn | петух
die Ente | утка
die Gans | гусь
der Esel | осёл
der Bär | медведь | en
der Löwe | лев | n
der Tiger | тигр
der Elefant | слон | en
der Affe | обезьяна | n
die Giraffe | жираф
das Zebra | зебра
der Wolf | волк
der Fuchs | лиса
der Hase | заяц | n
der Frosch | лягушка
die Schlange | змея
die Schildkröte | черепаха
das Krokodil | крокодил
die Biene | пчела
die Fliege | муха
die Mücke | комар
der Schmetterling | бабочка
die Spinne | паук
der Käfer | жук
`,
  },
  {
    id: "time", label: "Время и распорядок",
    entries: `
der Tag | день
die Woche | неделя
der Monat | месяц
das Jahr | год
die Stunde | час
die Minute | минута
die Sekunde | секунда
die Zeit | время
das Datum | дата
der Kalender | календарь
der Morgen | утро
der Vormittag | время до полудня
der Mittag | полдень
der Nachmittag | время после полудня
der Abend | вечер
die Nacht | ночь
die Mitternacht | полночь
das Wochenende | выходные
der Werktag | рабочий день
der Feiertag | праздничный день
der Montag | понедельник
der Dienstag | вторник
der Mittwoch | среда
der Donnerstag | четверг
der Freitag | пятница
der Samstag | суббота
der Sonntag | воскресенье
der Januar | январь
der Februar | февраль
der März | март
der April | апрель
der Mai | май
der Juni | июнь
der Juli | июль
der August | август
der September | сентябрь
der Oktober | октябрь
der November | ноябрь
der Dezember | декабрь
der Alltag | повседневная жизнь
`,
  },
  {
    id: "leisure", label: "Досуг и общение",
    entries: `
die Freizeit | свободное время
das Hobby | хобби
der Sport | спорт
der Fußball | футбол
der Basketball | баскетбол
das Tennis | теннис
die Musik | музыка
das Lied | песня
das Konzert | концерт
der Film | фильм
die Serie | сериал
das Foto | фотография
das Bild | картина, изображение
die Kamera | камера
die Zeitung | газета
die Zeitschrift | журнал
das Radio | радио
der Fernseher | телевизор
das Internet | интернет
die Nachricht | сообщение, новость
das Telefon | телефон
das Handy | мобильный телефон
die E-Mail | электронное письмо
das Gespräch | разговор
die Einladung | приглашение
der Besuch | визит
das Treffen | встреча
die Party | вечеринка
das Fest | праздник
das Geschenk | подарок
das Spiel | игра
der Ball | мяч
die Mannschaft | команда
das Training | тренировка
das Schwimmen | плавание
der Tanz | танец
der Verein | клуб, объединение
das Mitglied | участник, член клуба
der Spaß | веселье, удовольствие
die Geschichte | история
`,
  },
];

const NOUNS = NOUN_GROUPS.flatMap(({ id, entries }) =>
  entries.trim().split("\n").map((entry) => {
    const [headword, translation, oblique = ""] = entry.split(" | ");
    const [article, word] = headword.split(" ");
    return { word, article, translation, oblique, group: id };
  })
);
