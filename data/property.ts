import type {
  AmenityItem,
  Photo,
  PropertySiteData,
  Unit,
} from "@/types/property";
import type { LocalizedString, LocalizedStringList } from "@/types/locale";

const L = (sr: string, en: string): LocalizedString => ({ sr, en });
const LL = (sr: string[], en: string[]): LocalizedStringList => ({ sr, en });

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
  en: string
): AmenityItem => ({
  icon,
  label: L(sr, en),
});

const availabilityNotes = {
  sideHeading: L("Detalji boravka", "Stay details"),
  sideFacts: [
    {
      label: L("Prijava", "Check-in"),
      value: L("od 12:00", "from 12:00"),
    },
    {
      label: L("Odjava", "Check-out"),
      value: L("do 10:00", "by 10:00"),
    },
    {
      label: L("Noćenje", "Overnight"),
      value: L("do 10 gostiju", "up to 10 guests"),
    },
    {
      label: L("Dnevni boravak", "Day use"),
      value: L("do 30 osoba", "up to 30 people"),
    },
    {
      label: L("Ljubimci", "Pets"),
      value: L("dozvoljeni", "allowed"),
    },
  ],
};

const unitVilla: Unit = {
  id: "villa-charm",
  name: L("Villa Charm", "Villa Charm"),
  shortLabel: L("Vila", "Villa"),
  initials: "",
  region: L(
    "Barajevo · 25 minuta od centra Beograda",
    "Barajevo · 25 minutes from central Belgrade"
  ),
  hook: L(
    "Privatno imanje sa grejanim bazenom, vrtovima i rustičnim šarmom — mir, privatnost i prostor za okupljanja.",
    "A private estate with a heated pool, gardens, and rustic charm — quiet, private, and made for gathering."
  ),
  badges: LL(
    ["10 noćenje", "30 dnevni boravak", "Grejani bazen", "2.000 m² imanje"],
    ["10 overnight", "30 day guests", "Heated pool", "2,000 m² estate"]
  ),
  specs: {
    capacity: 10,
    dayCapacity: 30,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 2000,
    beds: L("6 kreveta", "6 beds"),
    summary: L(
      "Cela vila na privatnom imanju od 2.000 m² — grejani bazen 8×4 m, terase, bašta i prostor za porodice, proslave i timove.",
      "The full villa on a private 2,000 m² estate — heated 8×4 m pool, terraces, gardens, and space for families, celebrations, and teams."
    ),
  },
  price: {
    amount: L("od 300 €", "from €300"),
    note: L(
      "pon–čet · vikend 500 € · popusti za duži boravak",
      "Mon–Thu · weekend €500 · longer-stay discounts"
    ),
    perNightEur: 300,
  },
  intro: {
    heading: L("Dobro došli u Villa Charm", "Welcome to Villa Charm"),
    lead: L(
      "Oaza mira i privatnosti na prostranom privatnom imanju — rustični karakter uz savremen komfor.",
      "An oasis of calm and privacy on a spacious private estate — rustic character with modern comfort."
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
      ]
    ),
  },
  features: {
    heading: L(
      "Šta čini boravak posebnim",
      "What makes a stay here special"
    ),
    items: [
      {
        title: L("Grejani bazen u srcu bašte", "Heated pool at the heart of the garden"),
        body: L(
          "Bazen 8×4 m sa ležaljkama i mestom za opuštanje — danju za kupanje i društvo, uveče sa diskretnim svetlima gotovo filmske atmosfere.",
          "An 8×4 m pool with loungers and space to unwind — swimming and gathering by day, and after sunset a quietly lit, almost cinematic mood."
        ),
      },
      {
        title: L("Vrtovi kao produžetak kuće", "Gardens as a continuation of the house"),
        body: L(
          "Gornja i donja bašta, pokrivene terase, letnja trpezarija i roštilj — mesta za doručak napolju, večere pod krošnjama i duža druženja.",
          "Upper and lower gardens, covered terraces, a summer dining room and barbecue — for breakfast outside, dinners under the trees, and longer gatherings."
        ),
      },
      {
        title: L("Za porodice, proslave i timove", "For families, celebrations, and teams"),
        body: L(
          "Noćenje do 10 gostiju, a tokom dana imanje može da primi do 30 osoba — pogodno za porodične odmore, proslave, team building i manje retreat programe.",
          "Overnight stays for up to 10 guests; during the day the estate can host up to 30 — suited to family holidays, celebrations, team building, and smaller retreats."
        ),
      },
    ],
  },
  amenities: {
    heading: L("Sadržaji", "Amenities"),
    lead: L(
      "Najvažnije za ugodan boravak — od bazena i bašte do kuhinje i parkinga.",
      "What matters most for an easy stay — from the pool and garden to the kitchen and parking."
    ),
    items: [
      amenity("pool", "Grejani bazen 8×4 m", "Heated 8×4 m pool"),
      amenity("garden", "Veliko dvorište / bašta", "Large yard / garden"),
      amenity("bbq", "Roštilj / cigleni grill", "Barbecue / brick grill"),
      amenity("terrace", "Pokrivene terase", "Covered terraces"),
      amenity("kitchen", "Potpuno opremljena kuhinja", "Fully equipped kitchen"),
      amenity("ac", "Klima uređaji", "Air conditioning"),
      amenity("wifi", "Wi-Fi na imanju", "Wi-Fi throughout the property"),
      amenity("parking", "Privatni parking", "Private parking"),
      amenity("tv", "Televizori", "TVs"),
      amenity("washer", "Veš mašina", "Washing machine"),
      amenity("linen", "Čisti peškiri", "Clean towels"),
      amenity("pets", "Pet-friendly", "Pet-friendly"),
      amenity("tips", "Biblioteka i društvene igre", "Library and board games"),
      amenity("balcony", "Veliki balkon / terasa", "Large balcony / terrace"),
      amenity("fridge", "Kuhinjski uređaji", "Kitchen appliances"),
      amenity("shower", "2 kupatila + WC", "2 bathrooms + toilet"),
    ],
  },
  photos: [
    photo(
      "exterior-1.jpg",
      L("Eksterijer vile među zelenilom", "Villa exterior among greenery"),
      L("Kuća spolja", "House exterior")
    ),
    photo(
      "pool-1.jpg",
      L("Grejani bazen sa ležaljkama i kišobranom", "Heated pool with loungers and umbrella"),
      L("Bazen", "Pool")
    ),
    photo(
      "pool-night-1.jpg",
      L("Bazen noću sa osvetljenjem", "Pool at night with lighting"),
      L("Bazen uveče", "Pool in the evening")
    ),
    photo(
      "living-1.jpg",
      L("Dnevni boravak sa sofama i lustrom", "Living room with sofas and chandelier"),
      L("Dnevna soba", "Living room")
    ),
    photo(
      "living-2.jpg",
      L("Dnevni boravak — drugi ugao", "Living room — another angle"),
      L("Dnevna soba", "Living room")
    ),
    photo(
      "kitchen-1.jpg",
      L("Kompletno opremljena kuhinja", "Fully equipped kitchen"),
      L("Kuhinja", "Kitchen")
    ),
    photo(
      "dining-1.jpg",
      L("Trpezarija", "Dining room"),
      L("Trpezarija", "Dining")
    ),
    photo(
      "arch-dining.jpg",
      L("Luk prema trpezariji", "Arch toward the dining area"),
      L("Enterijer", "Interior")
    ),
    photo(
      "hallway-1.jpg",
      L("Predsoblje", "Entrance hallway"),
      L("Predsoblje", "Hallway")
    ),
    photo(
      "bedroom-1.jpg",
      L("Spavaća soba", "Bedroom"),
      L("Spavaća soba", "Bedroom")
    ),
    photo(
      "bedroom-2a.jpg",
      L("Druga spavaća soba", "Second bedroom"),
      L("Spavaća soba", "Bedroom")
    ),
    photo(
      "canopy-bed.jpg",
      L("Krevet sa baldahinom", "Canopy bed"),
      L("Baldahin", "Canopy bed")
    ),
    photo(
      "attic-bedroom.jpg",
      L("Bračni krevet u potkrovlju", "Double bed in the attic"),
      L("Potkrovlje", "Attic")
    ),
    photo(
      "attic-lounge.jpg",
      L("Salon u potkrovlju", "Attic lounge"),
      L("Potkrovlje — salon", "Attic lounge")
    ),
    photo(
      "attic-beds.jpg",
      L("Kreveti u potkrovlju", "Beds in the attic"),
      L("Potkrovlje", "Attic")
    ),
    photo(
      "bathroom-1.jpg",
      L("Kupatilo", "Bathroom"),
      L("Kupatilo", "Bathroom")
    ),
    photo(
      "bathroom-2.jpg",
      L("Drugo kupatilo", "Second bathroom"),
      L("Kupatilo", "Bathroom")
    ),
    photo(
      "library-1.jpg",
      L("Biblioteka", "Library"),
      L("Biblioteka", "Library")
    ),
    photo(
      "terrace-upper.jpg",
      L("Gornja terasa", "Upper terrace"),
      L("Gornja terasa", "Upper terrace")
    ),
    photo(
      "terrace-lower-1.jpg",
      L("Donja terasa", "Lower terrace"),
      L("Donja terasa", "Lower terrace")
    ),
    photo(
      "garden-bbq.jpg",
      L("Roštilj u donjoj bašti", "Barbecue in the lower garden"),
      L("Roštilj", "Barbecue")
    ),
    photo(
      "bbq-1.jpg",
      L("Prostor za roštilj", "Barbecue area"),
      L("Roštilj", "Barbecue")
    ),
    photo(
      "garden-lower-1.jpg",
      L("Donja bašta", "Lower garden"),
      L("Bašta", "Garden")
    ),
    photo(
      "garden-upper-path.jpg",
      L("Staza u gornjoj bašti", "Path in the upper garden"),
      L("Gornja bašta", "Upper garden")
    ),
    photo(
      "garden-fountain.jpg",
      L("Česma u bašti", "Garden fountain"),
      L("Bašta", "Garden")
    ),
    photo(
      "pool-gathering.jpg",
      L("Druženje oko bazena", "Gathering by the pool"),
      L("Bazen — druženje", "Pool gathering")
    ),
    photo(
      "pool-night-2.jpg",
      L("Bazen noću", "Pool at night"),
      L("Noćni bazen", "Night pool")
    ),
    photo(
      "entrance.jpg",
      L("Ulaz na imanje", "Estate entrance"),
      L("Ulaz", "Entrance")
    ),
    photo(
      "statue-1.jpg",
      L("Detalj u vrtu", "Garden detail"),
      L("Vrt", "Garden")
    ),
    photo(
      "well.jpg",
      L("Bunar na imanju", "Well on the estate"),
      L("Bunar", "Well")
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
      "Villa Charm Barajevo — villa with pool near Belgrade"
    ),
    description: L(
      "Privatna vila na 2.000 m² u Barajevu, 25 minuta od Beograda. Grejani bazen, bašte, terase i smeštaj za do 10 gostiju (do 30 dnevno). Rezervišite direktno.",
      "Private villa on 2,000 m² in Barajevo, 25 minutes from Belgrade. Heated pool, gardens, terraces, and stays for up to 10 overnight guests (up to 30 by day). Book directly."
    ),
  },
  story: {
    heading: L("Život na imanju", "Life on the estate"),
    lead: L(
      "Dan ovde teče od senke jablanova do večeri uz osvetljeni bazen — unutra toplo, napolju prostrano.",
      "A day here moves from willow shade to an evening by the lit pool — warm indoors, spacious outside."
    ),
    moments: [
      {
        title: L("Toplina enterijera", "Warm interiors"),
        body: L(
          "Prostran dnevni boravak sa sofama, lustrom i izlazom ka bašti — mesto za lagana jutra i večeri u krugu porodice.",
          "A spacious living room with sofas, a chandelier, and access to the garden — made for easy mornings and evenings together."
        ),
        image: photo(
          "living-1.jpg",
          L("Dnevni boravak Villa Charm", "Villa Charm living room"),
          L("Dnevna soba", "Living room")
        ),
      },
      {
        title: L("Zajednički stolovi", "Shared tables"),
        body: L(
          "Trpezarija za duže stolove i porodična okupljanja — unutra toplo, napolju prostrano.",
          "A dining room for longer tables and family gatherings — warm indoors, spacious outside."
        ),
        image: photo(
          "dining-1.jpg",
          L("Trpezarija Villa Charm", "Villa Charm dining room"),
          L("Trpezarija", "Dining")
        ),
      },
      {
        title: L("Veče u bašti", "Evening in the garden"),
        body: L(
          "Stara lipa, jablanovi i uređeni travnjaci. Kada padne mrak, bašta i bazen dobijaju tišu, gotovo filmsku atmosferu.",
          "An old linden, weeping willows, and tended lawns. After dark, the garden and pool take on a quieter, almost cinematic mood."
        ),
        image: photo(
          "pool-night-1.jpg",
          L("Bazen noću", "Pool at night"),
          L("Noćna atmosfera", "Night atmosphere")
        ),
      },
    ],
  },
  host: {
    heading: L("Rezervacije", "Reservations"),
    name: "Villa Charm",
    initials: "",
    body: LL(
      [
        "Za dostupnost, cene za veća okupljanja i posebne događaje javite nam se direktno — odgovaramo u najkraćem roku.",
      ],
      [
        "For availability, larger gathering rates, and special events, contact us directly — we reply as soon as we can.",
      ]
    ),
  },
  booking: {
    heading: L("Kako rezervisati?", "How to book?"),
    body: LL(
      [
        "Izaberite datume i broj gostiju, pošaljite upit — potvrdićemo dostupnost i konačnu cenu pre rezervacije.",
        "Cene zavise od dana u nedelji, broja gostiju i trajanja boravka. Za 7+ noći −15%, za 30+ noći −25%.",
      ],
      [
        "Choose your dates and guest count, send an inquiry — we’ll confirm availability and the final price before booking.",
        "Rates depend on the day of the week, guest count, and length of stay. 7+ nights −15%, 30+ nights −25%.",
      ]
    ),
  },
  reviews: {
    heading: L("Utisci gostiju", "Guest reviews"),
    lead: L("Utisci će se pojaviti ovde.", "Reviews will appear here."),
    google: {
      score: 0,
      count: 0,
      source: L("Gostujući utisci", "Guest feedback"),
    },
    items: [],
  },
  contact: {
    heading: L(
      "Rezervišite boravak u Villa Charm",
      "Book your stay at Villa Charm"
    ),
    lead: L(
      "Pošaljite upit za datume, broj gostiju ili proslavu — javljamo se ubrzo.",
      "Send an inquiry for dates, guest count, or a celebration — we’ll get back shortly."
    ),
    phone: "+381 60 434 6644",
    whatsapp: "381604346644",
    email: "rezervacije@weekendica.com",
    footnote: L(
      "Adresa se šalje nakon potvrde rezervacije. Svetosavska, Barajevo.",
      "The exact address is shared after booking confirmation. Svetosavska, Barajevo."
    ),
  },
  map: {
    lat: 44.5808,
    lng: 20.4156,
    zoom: 13,
    heading: L(
      "Blizu grada, daleko od gužve.",
      "Close to the city, away from the noise."
    ),
    lead: L(
      "Villa Charm je u Barajevu — mirno, zeleno, a i dalje na dohvat Beograda.",
      "Villa Charm sits in Barajevo — quiet and green, still within easy reach of Belgrade."
    ),
    facts: [
      {
        label: L("Beograd centar", "Central Belgrade"),
        value: L("oko 25 min vožnje", "about 25 min by car"),
      },
      {
        label: L("Jezero Duboki Potok", "Lake Duboki Potok"),
        value: L("kratka vožnja", "a short drive away"),
      },
      {
        label: L("Lipovička šuma", "Lipovica Forest"),
        value: L("šetnje i staze", "walks and trails"),
      },
      {
        label: L("MBM konjički klub", "MBM Equestrian Club"),
        value: L("jahanje u blizini", "horse riding nearby"),
      },
      {
        label: L("Restorani", "Restaurants"),
        value: L("lokalna kuhinja i dostava", "local food and delivery"),
      },
      {
        label: L("Prodavnice", "Shops"),
        value: L("apoteka i namirnice u blizini", "pharmacy and groceries nearby"),
      },
    ],
  },
  rules: {
    heading: L("Kućni red i važno", "House rules & essentials"),
    lead: L(
      "Jasna pravila pomažu da boravak bude prijatan svima na imanju.",
      "Clear rules help everyone enjoy the estate."
    ),
    items: [
      {
        label: L("Prijava", "Check-in"),
        value: L("od 12:00", "from 12:00"),
      },
      {
        label: L("Odjava", "Check-out"),
        value: L("do 10:00", "by 10:00"),
      },
      {
        label: L("Deca", "Children"),
        value: L(
          "Mlađi od 25 godina ne mogu boraviti bez roditelja.",
          "Guests under 25 may not stay without their parents."
        ),
      },
      {
        label: L("Muzika", "Music"),
        value: L(
          "Glasna i živa muzika dozvoljena do 23:30.",
          "Loud and live music allowed until 23:30."
        ),
      },
      {
        label: L("Vatromet", "Fireworks"),
        value: L(
          "Pirotehnika i vatromet nisu dozvoljeni.",
          "Pyrotechnics and fireworks are not allowed."
        ),
      },
      {
        label: L("Okupljanja", "Gatherings"),
        value: L(
          "Veća okupljanja i proslave su dozvoljeni (uz dogovor).",
          "Larger gatherings and celebrations are allowed (by arrangement)."
        ),
      },
      {
        label: L("Ljubimci", "Pets"),
        value: L("Pet-friendly", "Pet-friendly"),
      },
      {
        label: L("Parking", "Parking"),
        value: L("Veliki privatni parking na imanju", "Large private parking on site"),
      },
    ],
  },
  videos: [
    {
      src: "/videos/pool-season.mp4",
      poster: "/images/pool-1.jpg",
      title: L("Sezona kupanja", "Pool season"),
      caption: L(
        "Bazen, bašta i ritam leta na imanju.",
        "The pool, garden, and summer rhythm on the estate."
      ),
    },
    {
      src: "/videos/property-tour-1.mp4",
      poster: "/images/exterior-1.jpg",
      title: L("Obilazak imanja", "Property tour"),
      caption: L(
        "Kratak pogled na kuću, terase i vrtove.",
        "A short look at the house, terraces, and gardens."
      ),
    },
    {
      src: "/videos/celebrations.mp4",
      poster: "/images/pool-gathering.jpg",
      title: L("Proslave i druženja", "Celebrations & gatherings"),
      caption: L(
        "Prostor za veća okupljanja tokom dana.",
        "Space for larger daytime gatherings."
      ),
    },
  ],
  units: [unitVilla],
};
