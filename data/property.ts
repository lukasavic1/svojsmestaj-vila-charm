import type {
  AmenityItem,
  Photo,
  PropertySiteData,
  Unit,
} from "@/types/property";
import type { LocalizedString, LocalizedStringList } from "@/types/locale";

const L = (sr: string, en: string, ru: string): LocalizedString => ({
  sr,
  en,
  ru,
});
const LL = (
  sr: string[],
  en: string[],
  ru: string[]
): LocalizedStringList => ({ sr, en, ru });

const photo = (
  file: string,
  alt: LocalizedString,
  caption: LocalizedString
): Photo => ({
  src: `/images/${file}`,
  alt,
  caption,
});

const amenity = (
  icon: AmenityItem["icon"],
  sr: string,
  en: string,
  ru: string
): AmenityItem => ({
  icon,
  label: L(sr, en, ru),
});

const availabilityNotes = {
  sideHeading: L("Detalji boravka", "Stay details", "Детали проживания"),
  sideFacts: [
    {
      label: L("Prijava", "Check-in", "Заезд"),
      value: L("od 12:00", "from 12:00", "с 12:00"),
    },
    {
      label: L("Odjava", "Check-out", "Выезд"),
      value: L("do 10:00", "by 10:00", "до 10:00"),
    },
    {
      label: L("Noćenje", "Overnight", "С ночёвкой"),
      value: L("do 10 gostiju", "up to 10 guests", "до 10 гостей"),
    },
    {
      label: L("Dnevni boravak", "Day use", "Дневное пребывание"),
      value: L("do 30 osoba", "up to 30 people", "до 30 человек"),
    },
    {
      label: L("Ljubimci", "Pets", "Питомцы"),
      value: L("dozvoljeni", "allowed", "разрешены"),
    },
  ],
};

const unitVilla: Unit = {
  id: "villa-charm",
  name: L("Villa Charm", "Villa Charm", "Villa Charm"),
  shortLabel: L("Vila", "Villa", "Вилла"),
  initials: "",
  region: L(
    "Barajevo · 25 minuta od centra Beograda",
    "Barajevo · 25 minutes from central Belgrade",
    "Бараево · 25 минут от центра Белграда"
  ),
  hook: L(
    "Privatno imanje sa grejanim bazenom, vrtovima i rustičnim šarmom — mir, privatnost i prostor za okupljanja.",
    "A private estate with a heated pool, gardens, and rustic charm — quiet, private, and made for gathering.",
    "Частное имение с подогреваемым бассейном, садами и деревенским шармом — тишина, приватность и простор для встреч."
  ),
  badges: LL(
    ["10 noćenje", "30 dnevni boravak", "Grejani bazen", "2.000 m² imanje"],
    ["10 overnight", "30 day guests", "Heated pool", "2,000 m² estate"],
    [
      "10 с ночёвкой",
      "30 гостей днём",
      "Подогреваемый бассейн",
      "Имение 2 000 m²",
    ]
  ),
  specs: {
    capacity: 10,
    dayCapacity: 30,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 2000,
    beds: L("6 kreveta", "6 beds", "6 спальных мест"),
    summary: L(
      "Cela vila na privatnom imanju od 2.000 m² — grejani bazen 8×4 m, terase, bašta i prostor za porodice, proslave i timove.",
      "The full villa on a private 2,000 m² estate — heated 8×4 m pool, terraces, gardens, and space for families, celebrations, and teams.",
      "Вилла целиком на частном участке 2 000 m² — подогреваемый бассейн 8×4 м, террасы, сад и простор для семей, праздников и команд."
    ),
  },
  price: {
    amount: L("od 300 €", "from €300", "от 300 €"),
    note: L(
      "pon–čet · vikend 500 € · popusti za duži boravak",
      "Mon–Thu · weekend €500 · longer-stay discounts",
      "пн–чт · выходные 500 € · скидки на длительное проживание"
    ),
    perNightEur: 300,
  },
  intro: {
    heading: L(
      "Dobro došli u Villa Charm",
      "Welcome to Villa Charm",
      "Добро пожаловать в Villa Charm"
    ),
    lead: L(
      "Oaza mira i privatnosti na prostranom privatnom imanju — rustični karakter uz savremen komfor.",
      "An oasis of calm and privacy on a spacious private estate — rustic character with modern comfort.",
      "Оазис тишины и уединения на просторном частном участке — деревенский характер и современный комфорт."
    ),
    body: LL(
      [
        "Villa Charm nije samo vikendica, već prostor gde se autentičan rustični šarm skladno prepliće sa modernim komforom. Imanje od 2.000 m² nalazi se na oko 25 minuta vožnje od centra Beograda.",
        "Unutrašnjost odiše toplinom: rustični detalji, antika i peć od majolike, vintage elementi, umetničke slike i veliki stakleni otvori ka zelenilu. Drvenim stepenicama se penje do spavaćeg dela i mansarde sa panoramskim pogledom na vrtove.",
        "Spolja, grejani bazen 8×4 m, pokrivene terase, letnja trpezarija sa ciglenim roštiljem i zelenilo — od četinara i breza do jablanova i stare lipe — čine nastavak dnevnog boravka na otvorenom.",
      ],
      [
        "Villa Charm is more than a weekend house — a place where authentic rustic charm meets modern comfort. The 2,000 m² estate sits about a 25-minute drive from central Belgrade.",
        "Inside, the villa feels warm and lived-in: rustic details, antiques and a majolica clay stove, vintage pieces, art, and large glass openings toward the greenery. A wooden staircase leads to the sleeping area and attic mansard with panoramic garden views.",
        "Outside, the heated 8×4 m pool, covered terraces, a summer dining room with a brick grill, and layered gardens — conifers, birches, weeping willows, and an old linden — extend the living room outdoors.",
      ],
      [
        "Villa Charm — это больше, чем загородный дом: здесь подлинный деревенский шарм гармонично сочетается с современным комфортом. Имение площадью 2 000 m² находится примерно в 25 минутах езды от центра Белграда.",
        "Внутри дом дышит теплом: деревенские детали, антиквариат и печь из майолики, винтажные предметы, картины и большие стеклянные проёмы, открытые к зелени. Деревянная лестница ведёт в спальную зону и мансарду с панорамным видом на сады.",
        "Снаружи подогреваемый бассейн 8×4 м, крытые террасы, летняя столовая с кирпичным грилем и многослойная зелень — хвойные деревья и берёзы, ивы и старая липа — продолжают гостиную под открытым небом.",
      ]
    ),
  },
  features: {
    heading: L(
      "Šta čini boravak posebnim",
      "What makes a stay here special",
      "Что делает отдых здесь особенным"
    ),
    items: [
      {
        title: L(
          "Grejani bazen u srcu bašte",
          "Heated pool at the heart of the garden",
          "Подогреваемый бассейн в сердце сада"
        ),
        body: L(
          "Bazen 8×4 m sa ležaljkama i mestom za opuštanje — danju za kupanje i društvo, uveče sa diskretnim svetlima gotovo filmske atmosfere.",
          "An 8×4 m pool with loungers and space to unwind — swimming and gathering by day, and after sunset a quietly lit, almost cinematic mood.",
          "Бассейн 8×4 м с шезлонгами и местом для отдыха — днём для купания и общения, а после заката — мягкая подсветка и почти кинематографичная атмосфера."
        ),
      },
      {
        title: L(
          "Vrtovi kao produžetak kuće",
          "Gardens as a continuation of the house",
          "Сады как продолжение дома"
        ),
        body: L(
          "Gornja i donja bašta, pokrivene terase, letnja trpezarija i roštilj — mesta za doručak napolju, večere pod krošnjama i duža druženja.",
          "Upper and lower gardens, covered terraces, a summer dining room and barbecue — for breakfast outside, dinners under the trees, and longer gatherings.",
          "Верхний и нижний сад, крытые террасы, летняя столовая и гриль — для завтрака на воздухе, ужинов под кронами деревьев и долгих посиделок."
        ),
      },
      {
        title: L(
          "Za porodice, proslave i timove",
          "For families, celebrations, and teams",
          "Для семей, праздников и команд"
        ),
        body: L(
          "Noćenje do 10 gostiju, a tokom dana imanje može da primi do 30 osoba — pogodno za porodične odmore, proslave, team building i manje retreat programe.",
          "Overnight stays for up to 10 guests; during the day the estate can host up to 30 — suited to family holidays, celebrations, team building, and smaller retreats.",
          "С ночёвкой — до 10 гостей, а днём имение принимает до 30 человек: подходит для семейного отдыха, праздников, тимбилдинга и небольших ретритов."
        ),
      },
    ],
  },
  amenities: {
    heading: L("Sadržaji", "Amenities", "Удобства"),
    lead: L(
      "Najvažnije za ugodan boravak — od bazena i bašte do kuhinje i parkinga.",
      "What matters most for an easy stay — from the pool and garden to the kitchen and parking.",
      "Всё самое важное для комфортного отдыха — от бассейна и сада до кухни и парковки."
    ),
    items: [
      amenity(
        "pool",
        "Grejani bazen 8×4 m",
        "Heated 8×4 m pool",
        "Подогреваемый бассейн 8×4 м"
      ),
      amenity(
        "garden",
        "Veliko dvorište / bašta",
        "Large yard / garden",
        "Большой двор / сад"
      ),
      amenity(
        "bbq",
        "Roštilj / cigleni grill",
        "Barbecue / brick grill",
        "Барбекю / кирпичный гриль"
      ),
      amenity("terrace", "Pokrivene terase", "Covered terraces", "Крытые террасы"),
      amenity(
        "kitchen",
        "Potpuno opremljena kuhinja",
        "Fully equipped kitchen",
        "Полностью оборудованная кухня"
      ),
      amenity("ac", "Klima uređaji", "Air conditioning", "Кондиционеры"),
      amenity(
        "wifi",
        "Wi-Fi na imanju",
        "Wi-Fi throughout the property",
        "Wi-Fi на всей территории"
      ),
      amenity("parking", "Privatni parking", "Private parking", "Частная парковка"),
      amenity("tv", "Televizori", "TVs", "Телевизоры"),
      amenity("washer", "Veš mašina", "Washing machine", "Стиральная машина"),
      amenity("linen", "Čisti peškiri", "Clean towels", "Свежие полотенца"),
      amenity("pets", "Pet-friendly", "Pet-friendly", "Можно с питомцами"),
      amenity(
        "tips",
        "Biblioteka i društvene igre",
        "Library and board games",
        "Библиотека и настольные игры"
      ),
      amenity(
        "balcony",
        "Veliki balkon / terasa",
        "Large balcony / terrace",
        "Большой балкон / терраса"
      ),
      amenity(
        "fridge",
        "Kuhinjski uređaji",
        "Kitchen appliances",
        "Кухонная техника"
      ),
      amenity(
        "shower",
        "2 kupatila + WC",
        "2 bathrooms + toilet",
        "2 санузла + туалет"
      ),
    ],
  },
  photos: [
    photo(
      "exterior-1.jpg",
      L(
        "Eksterijer vile među zelenilom",
        "Villa exterior among greenery",
        "Внешний вид виллы среди зелени"
      ),
      L("Kuća spolja", "House exterior", "Дом снаружи")
    ),
    photo(
      "pool-1.jpg",
      L(
        "Grejani bazen sa ležaljkama i kišobranom",
        "Heated pool with loungers and umbrella",
        "Подогреваемый бассейн с шезлонгами и зонтом"
      ),
      L("Bazen", "Pool", "Бассейн")
    ),
    photo(
      "pool-night-1.jpg",
      L(
        "Bazen noću sa osvetljenjem",
        "Pool at night with lighting",
        "Бассейн ночью с подсветкой"
      ),
      L("Bazen uveče", "Pool in the evening", "Бассейн вечером")
    ),
    photo(
      "living-1.jpg",
      L(
        "Dnevni boravak sa sofama i lustrom",
        "Living room with sofas and chandelier",
        "Гостиная с диванами и люстрой"
      ),
      L("Dnevna soba", "Living room", "Гостиная")
    ),
    photo(
      "living-2.jpg",
      L(
        "Dnevni boravak — drugi ugao",
        "Living room — another angle",
        "Гостиная — другой ракурс"
      ),
      L("Dnevna soba", "Living room", "Гостиная")
    ),
    photo(
      "kitchen-1.jpg",
      L(
        "Kompletno opremljena kuhinja",
        "Fully equipped kitchen",
        "Полностью оборудованная кухня"
      ),
      L("Kuhinja", "Kitchen", "Кухня")
    ),
    photo(
      "dining-1.jpg",
      L("Trpezarija", "Dining room", "Столовая"),
      L("Trpezarija", "Dining", "Столовая")
    ),
    photo(
      "arch-dining.jpg",
      L("Luk prema trpezariji", "Arch toward the dining area", "Арка в столовую"),
      L("Enterijer", "Interior", "Интерьер")
    ),
    photo(
      "hallway-1.jpg",
      L("Predsoblje", "Entrance hallway", "Прихожая"),
      L("Predsoblje", "Hallway", "Прихожая")
    ),
    photo(
      "bedroom-1.jpg",
      L("Spavaća soba", "Bedroom", "Спальня"),
      L("Spavaća soba", "Bedroom", "Спальня")
    ),
    photo(
      "bedroom-2a.jpg",
      L("Druga spavaća soba", "Second bedroom", "Вторая спальня"),
      L("Spavaća soba", "Bedroom", "Спальня")
    ),
    photo(
      "canopy-bed.jpg",
      L("Krevet sa baldahinom", "Canopy bed", "Кровать с балдахином"),
      L("Baldahin", "Canopy bed", "Балдахин")
    ),
    photo(
      "attic-bedroom.jpg",
      L(
        "Bračni krevet u potkrovlju",
        "Double bed in the attic",
        "Двуспальная кровать в мансарде"
      ),
      L("Potkrovlje", "Attic", "Мансарда")
    ),
    photo(
      "attic-lounge.jpg",
      L("Salon u potkrovlju", "Attic lounge", "Салон в мансарде"),
      L("Potkrovlje — salon", "Attic lounge", "Мансарда — салон")
    ),
    photo(
      "attic-beds.jpg",
      L("Kreveti u potkrovlju", "Beds in the attic", "Кровати в мансарде"),
      L("Potkrovlje", "Attic", "Мансарда")
    ),
    photo(
      "bathroom-1.jpg",
      L("Kupatilo", "Bathroom", "Санузел"),
      L("Kupatilo", "Bathroom", "Санузел")
    ),
    photo(
      "bathroom-2.jpg",
      L("Drugo kupatilo", "Second bathroom", "Второй санузел"),
      L("Kupatilo", "Bathroom", "Санузел")
    ),
    photo(
      "library-1.jpg",
      L("Biblioteka", "Library", "Библиотека"),
      L("Biblioteka", "Library", "Библиотека")
    ),
    photo(
      "terrace-upper.jpg",
      L("Gornja terasa", "Upper terrace", "Верхняя терраса"),
      L("Gornja terasa", "Upper terrace", "Верхняя терраса")
    ),
    photo(
      "terrace-lower-1.jpg",
      L("Donja terasa", "Lower terrace", "Нижняя терраса"),
      L("Donja terasa", "Lower terrace", "Нижняя терраса")
    ),
    photo(
      "garden-bbq.jpg",
      L(
        "Roštilj u donjoj bašti",
        "Barbecue in the lower garden",
        "Гриль в нижнем саду"
      ),
      L("Roštilj", "Barbecue", "Барбекю")
    ),
    photo(
      "bbq-1.jpg",
      L("Prostor za roštilj", "Barbecue area", "Зона барбекю"),
      L("Roštilj", "Barbecue", "Барбекю")
    ),
    photo(
      "garden-lower-1.jpg",
      L("Donja bašta", "Lower garden", "Нижний сад"),
      L("Bašta", "Garden", "Сад")
    ),
    photo(
      "garden-upper-path.jpg",
      L("Staza u gornjoj bašti", "Path in the upper garden", "Дорожка в верхнем саду"),
      L("Gornja bašta", "Upper garden", "Верхний сад")
    ),
    photo(
      "garden-fountain.jpg",
      L("Česma u bašti", "Garden fountain", "Фонтанчик в саду"),
      L("Bašta", "Garden", "Сад")
    ),
    photo(
      "pool-gathering.jpg",
      L("Druženje oko bazena", "Gathering by the pool", "Встреча у бассейна"),
      L("Bazen — druženje", "Pool gathering", "Бассейн — встречи")
    ),
    photo(
      "pool-night-2.jpg",
      L("Bazen noću", "Pool at night", "Бассейн ночью"),
      L("Noćni bazen", "Night pool", "Ночной бассейн")
    ),
    photo(
      "entrance.jpg",
      L("Ulaz na imanje", "Estate entrance", "Въезд на территорию"),
      L("Ulaz", "Entrance", "Вход")
    ),
    photo(
      "statue-1.jpg",
      L("Detalj u vrtu", "Garden detail", "Деталь в саду"),
      L("Vrt", "Garden", "Сад")
    ),
    photo(
      "well.jpg",
      L("Bunar na imanju", "Well on the estate", "Колодец на территории"),
      L("Bunar", "Well", "Колодец")
    ),
  ],
  availability: {
    first: { year: 2026, month: 7 },
    last: { year: 2027, month: 6 },
    booked: {
      "2026-7": [15, 16, 17],
      "2026-8": [1, 2, 20, 21, 22],
      "2026-11": [28, 29],
      "2026-12": [24, 25, 26, 31],
    },
    ...availabilityNotes,
  },
};

export const property: PropertySiteData = {
  seo: {
    title: L(
      "Villa Charm Barajevo — vila sa bazenom kod Beograda",
      "Villa Charm Barajevo — villa with pool near Belgrade",
      "Villa Charm Бараево — вилла с бассейном рядом с Белградом"
    ),
    description: L(
      "Privatna vila na 2.000 m² u Barajevu, 25 minuta od Beograda. Grejani bazen, bašte, terase i smeštaj za do 10 gostiju (do 30 dnevno). Rezervišite direktno.",
      "Private villa on 2,000 m² in Barajevo, 25 minutes from Belgrade. Heated pool, gardens, terraces, and stays for up to 10 overnight guests (up to 30 by day). Book directly.",
      "Частная вилла на участке 2 000 m² в Бараево, 25 минут от Белграда. Подогреваемый бассейн, сады, террасы и размещение до 10 гостей с ночёвкой (до 30 днём). Бронируйте напрямую."
    ),
  },
  story: {
    heading: L("Život na imanju", "Life on the estate", "Жизнь в имении"),
    lead: L(
      "Dan ovde teče od senke jablanova do večeri uz osvetljeni bazen — unutra toplo, napolju prostrano.",
      "A day here moves from willow shade to an evening by the lit pool — warm indoors, spacious outside.",
      "День здесь начинается в тени ив и заканчивается вечером у подсвеченного бассейна — тепло внутри, просторно снаружи."
    ),
    moments: [
      {
        title: L("Toplina enterijera", "Warm interiors", "Тепло интерьера"),
        body: L(
          "Prostran dnevni boravak sa sofama, lustrom i izlazom ka bašti — mesto za lagana jutra i večeri u krugu porodice.",
          "A spacious living room with sofas, a chandelier, and access to the garden — made for easy mornings and evenings together.",
          "Просторная гостиная с диванами, люстрой и выходом в сад — для неспешных утр и вечеров в кругу семьи."
        ),
        image: photo(
          "living-1.jpg",
          L(
            "Dnevni boravak Villa Charm",
            "Villa Charm living room",
            "Гостиная Villa Charm"
          ),
          L("Dnevna soba", "Living room", "Гостиная")
        ),
      },
      {
        title: L("Zajednički stolovi", "Shared tables", "Общий стол"),
        body: L(
          "Trpezarija za duže stolove i porodična okupljanja — unutra toplo, napolju prostrano.",
          "A dining room for longer tables and family gatherings — warm indoors, spacious outside.",
          "Столовая для больших столов и семейных застолий — тепло внутри, просторно снаружи."
        ),
        image: photo(
          "dining-1.jpg",
          L(
            "Trpezarija Villa Charm",
            "Villa Charm dining room",
            "Столовая Villa Charm"
          ),
          L("Trpezarija", "Dining", "Столовая")
        ),
      },
      {
        title: L("Veče u bašti", "Evening in the garden", "Вечер в саду"),
        body: L(
          "Stara lipa, jablanovi i uređeni travnjaci. Kada padne mrak, bašta i bazen dobijaju tišu, gotovo filmsku atmosferu.",
          "An old linden, weeping willows, and tended lawns. After dark, the garden and pool take on a quieter, almost cinematic mood.",
          "Старая липа, ивы и ухоженные газоны. С наступлением темноты сад и бассейн обретают тихую, почти кинематографичную атмосферу."
        ),
        image: photo(
          "pool-night-1.jpg",
          L("Bazen noću", "Pool at night", "Бассейн ночью"),
          L("Noćna atmosfera", "Night atmosphere", "Ночная атмосфера")
        ),
      },
    ],
  },
  host: {
    heading: L("Rezervacije", "Reservations", "Бронирование"),
    name: "Villa Charm",
    initials: "",
    body: LL(
      [
        "Za dostupnost, cene za veća okupljanja i posebne događaje javite nam se direktno — odgovaramo u najkraćem roku.",
      ],
      [
        "For availability, larger gathering rates, and special events, contact us directly — we reply as soon as we can.",
      ],
      [
        "По вопросам свободных дат, цен для больших компаний и особых событий свяжитесь с нами напрямую — ответим в кратчайший срок.",
      ]
    ),
  },
  booking: {
    heading: L("Kako rezervisati?", "How to book?", "Как забронировать?"),
    body: LL(
      [
        "Izaberite datume i broj gostiju, pošaljite upit — potvrdićemo dostupnost i konačnu cenu pre rezervacije.",
        "Cene zavise od dana u nedelji, broja gostiju i trajanja boravka. Za 7+ noći −15%, za 30+ noći −25%.",
      ],
      [
        "Choose your dates and guest count, send an inquiry — we’ll confirm availability and the final price before booking.",
        "Rates depend on the day of the week, guest count, and length of stay. 7+ nights −15%, 30+ nights −25%.",
      ],
      [
        "Выберите даты и количество гостей, отправьте запрос — мы подтвердим свободные даты и итоговую стоимость до бронирования.",
        "Цена зависит от дня недели, числа гостей и длительности проживания. От 7 ночей −15%, от 30 ночей −25%.",
      ]
    ),
  },
  reviews: {
    heading: L("Utisci gostiju", "Guest reviews", "Отзывы гостей"),
    lead: L(
      "Utisci će se pojaviti ovde.",
      "Reviews will appear here.",
      "Отзывы появятся здесь."
    ),
    google: {
      score: 0,
      count: 0,
      source: L("Gostujući utisci", "Guest feedback", "Мнения гостей"),
    },
    items: [],
  },
  contact: {
    heading: L(
      "Rezervišite boravak u Villa Charm",
      "Book your stay at Villa Charm",
      "Забронируйте отдых в Villa Charm"
    ),
    lead: L(
      "Pošaljite upit za datume, broj gostiju ili proslavu — javljamo se ubrzo.",
      "Send an inquiry for dates, guest count, or a celebration — we’ll get back shortly.",
      "Отправьте запрос по датам, числу гостей или празднику — ответим в ближайшее время."
    ),
    phone: "+381 60 434 6644",
    whatsapp: "381604346644",
    email: "rezervacije@weekendica.com",
    footnote: L(
      "Adresa se šalje nakon potvrde rezervacije. Svetosavska, Barajevo.",
      "The exact address is shared after booking confirmation. Svetosavska, Barajevo.",
      "Точный адрес отправляем после подтверждения бронирования. Светосавска, Бараево."
    ),
  },
  map: {
    lat: 44.5808,
    lng: 20.4156,
    zoom: 13,
    heading: L(
      "Blizu grada, daleko od gužve.",
      "Close to the city, away from the noise.",
      "Близко к городу, далеко от суеты."
    ),
    lead: L(
      "Villa Charm je u Barajevu — mirno, zeleno, a i dalje na dohvat Beograda.",
      "Villa Charm sits in Barajevo — quiet and green, still within easy reach of Belgrade.",
      "Villa Charm расположена в Бараево — тихо и зелено, но Белград по-прежнему рядом."
    ),
    facts: [
      {
        label: L("Beograd centar", "Central Belgrade", "Центр Белграда"),
        value: L(
          "oko 25 min vožnje",
          "about 25 min by car",
          "около 25 минут на машине"
        ),
      },
      {
        label: L(
          "Jezero Duboki Potok",
          "Lake Duboki Potok",
          "Озеро Дубоки Поток"
        ),
        value: L("kratka vožnja", "a short drive away", "недалеко на машине"),
      },
      {
        label: L("Lipovička šuma", "Lipovica Forest", "Липовицкий лес"),
        value: L("šetnje i staze", "walks and trails", "прогулки и тропы"),
      },
      {
        label: L(
          "MBM konjički klub",
          "MBM Equestrian Club",
          "Конный клуб MBM"
        ),
        value: L("jahanje u blizini", "horse riding nearby", "конные прогулки рядом"),
      },
      {
        label: L("Restorani", "Restaurants", "Рестораны"),
        value: L(
          "lokalna kuhinja i dostava",
          "local food and delivery",
          "местная кухня и доставка"
        ),
      },
      {
        label: L("Prodavnice", "Shops", "Магазины"),
        value: L(
          "apoteka i namirnice u blizini",
          "pharmacy and groceries nearby",
          "аптека и продукты рядом"
        ),
      },
    ],
  },
  rules: {
    heading: L(
      "Kućni red i važno",
      "House rules & essentials",
      "Правила дома и важное"
    ),
    lead: L(
      "Jasna pravila pomažu da boravak bude prijatan svima na imanju.",
      "Clear rules help everyone enjoy the estate.",
      "Понятные правила помогают, чтобы отдых был приятным для всех в имении."
    ),
    items: [
      {
        label: L("Prijava", "Check-in", "Заезд"),
        value: L("od 12:00", "from 12:00", "с 12:00"),
      },
      {
        label: L("Odjava", "Check-out", "Выезд"),
        value: L("do 10:00", "by 10:00", "до 10:00"),
      },
      {
        label: L("Deca", "Children", "Дети"),
        value: L(
          "Mlađi od 25 godina ne mogu boraviti bez roditelja.",
          "Guests under 25 may not stay without their parents.",
          "Гости младше 25 лет не могут проживать без родителей."
        ),
      },
      {
        label: L("Muzika", "Music", "Музыка"),
        value: L(
          "Glasna i živa muzika dozvoljena do 23:30.",
          "Loud and live music allowed until 23:30.",
          "Громкая и живая музыка разрешена до 23:30."
        ),
      },
      {
        label: L("Vatromet", "Fireworks", "Фейерверки"),
        value: L(
          "Pirotehnika i vatromet nisu dozvoljeni.",
          "Pyrotechnics and fireworks are not allowed.",
          "Пиротехника и фейерверки не разрешены."
        ),
      },
      {
        label: L("Okupljanja", "Gatherings", "Мероприятия"),
        value: L(
          "Veća okupljanja i proslave su dozvoljeni (uz dogovor).",
          "Larger gatherings and celebrations are allowed (by arrangement).",
          "Большие встречи и праздники разрешены (по договорённости)."
        ),
      },
      {
        label: L("Ljubimci", "Pets", "Питомцы"),
        value: L("Pet-friendly", "Pet-friendly", "Можно с питомцами"),
      },
      {
        label: L("Parking", "Parking", "Парковка"),
        value: L(
          "Veliki privatni parking na imanju",
          "Large private parking on site",
          "Большая частная парковка на территории"
        ),
      },
    ],
  },
  videos: [
    {
      src: "/videos/pool-season.mp4",
      poster: "/images/pool-1.jpg",
      title: L("Sezona kupanja", "Pool season", "Сезон купания"),
      caption: L(
        "Bazen, bašta i ritam leta na imanju.",
        "The pool, garden, and summer rhythm on the estate.",
        "Бассейн, сад и летний ритм имения."
      ),
    },
    {
      src: "/videos/property-tour-1.mp4",
      poster: "/images/exterior-1.jpg",
      title: L("Obilazak imanja", "Property tour", "Обзор имения"),
      caption: L(
        "Kratak pogled na kuću, terase i vrtove.",
        "A short look at the house, terraces, and gardens.",
        "Краткий взгляд на дом, террасы и сады."
      ),
    },
    {
      src: "/videos/celebrations.mp4",
      poster: "/images/pool-gathering.jpg",
      title: L(
        "Proslave i druženja",
        "Celebrations & gatherings",
        "Праздники и встречи"
      ),
      caption: L(
        "Prostor za veća okupljanja tokom dana.",
        "Space for larger daytime gatherings.",
        "Простор для больших дневных мероприятий."
      ),
    },
  ],
  units: [unitVilla],
};
