export const EVENT = {
  title: "Sri Krishna Janmashtami",
  year: "2026",
  organiser: "ISKCON",
  founder: "His Divine Grace A.C. Bhaktivedanta Swami Prabhupada",
  dateLabel: "Saturday, 5th September 2026",
  timeLabel: "10:00 AM – 9:00 PM",
  venueName: "SLS International Gurukul",
  venueAddress: "K Channasandra, Horamavu, Bengaluru",
  phone: "9483510338",
  phoneIntl: "919483510338",
  phoneAlt: "9900170338",
  phoneAltIntl: "919900170338",
  email: "iskconhbrlayout@gmail.com",
  deadline: "2nd September 2026",
  fee: "₹150 per competition",
  cashPrizes: "Cash prizes worth ₹30,000",
  freeBadges: ["Free Entry", "Free Darshan", "Free Prasad"],
  targetDate: "2026-09-05T10:00:00+05:30",
} as const;

export const MAPS_QUERY = encodeURIComponent(
  "SLS International Gurukul, K Channasandra, Horamavu, Bengaluru",
);
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const WHATSAPP_LINK = `https://wa.me/${EVENT.phoneIntl}?text=${encodeURIComponent(
  "Hare Krishna! I would like to know more about Sri Krishna Janmashtami 2026 at ISKCON.",
)}`;
export const INSTAGRAM_LINK =
  "https://www.instagram.com/slsinternationalgurukul?igsh=azhneG54Mmttd3h6&igsi=azhneG54Mmttd3h6";
export const YOUTUBE_LINK = "https://www.youtube.com/@gitatoday108";

export const HIGHLIGHTS = [
  {
    icon: "🎶",
    title: "Bhajan Clubbing",
    text: "Ecstatic kirtan to close the day.",
    time: "8:00 PM onwards",
  },
  {
    icon: "🛕",
    title: "Darshan",
    text: "Free darshan of the Lord from 10:00 AM.",
    time: "10:00 AM",
  },
  {
    icon: "🎨",
    title: "Kids Competitions",
    text: "Shloka, drawing, singing, dance and more.",
    time: "10:00 AM – 2:00 PM",
  },
  {
    icon: "🎭",
    title: "Cultural Program",
    text: "Devotional performances from 4:30 PM.",
    time: "4:30 PM",
  },
  {
    icon: "💃",
    title: "Group Dance Contest",
    text: "Krishna themed team performances.",
    time: "5:00 PM – 7:00 PM",
  },
  {
    icon: "🎁",
    title: "Exciting Prizes",
    text: "Cash prizes worth ₹30,000, trophies and certificates.",
    time: "7:30 PM",
  },
  {
    icon: "🍴",
    title: "Food Court",
    text: "Delicious festive prasadam and snacks.",
    time: "All day",
  },
  {
    icon: "🎮",
    title: "Games & Fun",
    text: "Activities for children and families.",
    time: "All day",
  },
  { icon: "🛍️", title: "Flea Market", text: "Festive shopping stalls all day.", time: "All day" },
  {
    icon: "🪔",
    title: "Palaki Utsava",
    text: "Divine procession of the Lord with kirtan.",
    time: "8:00 PM",
  },
];

export const SCHEDULE = [
  {
    time: "10:00 AM",
    title: "Darshan Start",
    note: "Free darshan and free prasad through the day",
  },
  {
    time: "10:00 AM – 2:00 PM",
    title: "Competitions",
    note: "Balgopal, Nandgopal & Nandkishore categories",
  },
  { time: "4:30 PM", title: "Cultural Program", note: "Devotional and cultural performances" },
  { time: "5:00 PM – 7:00 PM", title: "Group Dance Contest", note: "Theme based on Lord Krishna" },
  {
    time: "7:30 PM",
    title: "Prize Distribution",
    note: "Cash prizes worth ₹30,000, trophies & certificates",
  },
  { time: "8:00 PM", title: "Palaki Utsava", note: "Divine procession of the Lord" },
  { time: "8:00 PM onwards", title: "Bhajan Clubbing", note: "Chant. Dance. Connect. Transform." },
];

export const CATEGORIES = [
  {
    key: "Balgopal",
    age: "Up to 5 Years",
    competitions: ["BG Shloka Recitation – 3 Shlokas", "Colouring", "Fancy Dress", "Singing"],
  },
  {
    key: "Nandgopal",
    age: "6 – 11 Years",
    competitions: ["BG Shloka Recitation – 5 Shlokas", "Drawing", "Singing", "Dancing"],
  },
  {
    key: "Nandkishore",
    age: "12 Years+",
    competitions: [
      "BG Shloka Recitation – 5 Shlokas with meaning",
      "Painting",
      "Singing",
      "Dancing",
      "Musical Instrument",
    ],
  },
] as const;

export const INSTRUCTIONS = [
  "Theme should be strictly based on Lord Krishna.",
  "Participants should reach the venue 30 minutes early.",
  "Bring your own colours and stationery where applicable.",
  "Participation certificates will be given.",
  "Competition registration deadline is 2nd September 2026.",
  "Participants can register for multiple competitions.",
  "Competition participation fee is ₹150 per competition and is payable on the spot.",
  "Participants should follow the instructions provided by event coordinators.",
  "Parents/guardians are responsible for children outside competition areas.",
];

export const FAQS = [
  { q: "What is the date of the event?", a: "Saturday, 5th September 2026." },
  {
    q: "Where is the event being held?",
    a: "SLS International Gurukul, K Channasandra, Horamavu, Bengaluru.",
  },
  { q: "What time does the event start?", a: "The main event runs from 10:00 AM to 9:00 PM." },
  {
    q: "Is the event suitable for children?",
    a: "Yes. There are kids competitions, games, activities and family celebrations all day.",
  },
  {
    q: "How can I register for competitions?",
    a: "Use the Register for Competitions form on this website, or contact us on 9483510338.",
  },
  {
    q: "What is the competition registration fee?",
    a: "₹150 per competition, to be paid on the spot at the venue.",
  },
  { q: "What is the registration deadline?", a: "2nd September 2026." },
  {
    q: "What are the age categories?",
    a: "Balgopal (up to 5 years), Nandgopal (6–11 years) and Nandkishore (12 years and above).",
  },
  {
    q: "What is the Group Dance Contest timing?",
    a: "5:00 PM to 7:00 PM on 5th September 2026, open to all age groups.",
  },
  {
    q: "What are the prizes?",
    a: "Cash prizes worth ₹30,000 along with trophies, exciting prizes and participation certificates.",
  },
  {
    q: "Whom do I contact for general or business enquiries?",
    a: "Call 9483510338 or 9900170338.",
  },
  {
    q: "Are participation certificates provided?",
    a: "Yes, participation certificates will be given to participants.",
  },
  {
    q: "How can I join the WhatsApp group?",
    a: "Scan the QR code in the WhatsApp section or message us on 9483510338.",
  },
  {
    q: "What is Sri Krishna Janmashtami?",
    a: "Janmashtami celebrates the divine appearance of Lord Sri Krishna, who appeared at midnight in Mathura on the eighth day (Ashtami) of the dark fortnight of the month of Bhadra.",
  },
  {
    q: "Why is Janmashtami celebrated at midnight?",
    a: "Lord Krishna appeared at midnight, so devotees observe kirtan, abhishekam and arati at that sacred hour to welcome the Lord.",
  },
  {
    q: "Do devotees fast on Janmashtami?",
    a: "Many devotees fast until midnight, chant the holy names through the day and then honour prasadam after the midnight arati. Fasting is a personal choice and is not required to attend.",
  },
  {
    q: "What is Palaki Utsava?",
    a: "Palaki Utsava is the beautiful procession in which the Deities are carried on a decorated palanquin amidst kirtan, flowers and lamps.",
  },
  {
    q: "Is prasadam available at the event?",
    a: "Yes. A festive food court serves pure vegetarian prasadam and snacks throughout the day.",
  },
  {
    q: "Is there an entry fee for the festival?",
    a: "Entry to the festival is free for everyone. Only competition participation carries a fee of ₹150 per competition.",
  },
  {
    q: "What should I wear to the celebration?",
    a: "Traditional Indian attire is encouraged and adds to the festive mood, but everyone is welcome in modest, comfortable clothing.",
  },
  {
    q: "Is parking available at the venue?",
    a: "Yes, parking is available near SLS International Gurukul, K Channasandra, Horamavu. Please follow the volunteers' directions on arrival.",
  },
];

export type Guest = {
  name: string;
  role: string;
  note?: string;
  announced: boolean;
};

export const CHIEF_GUESTS: Guest[] = [
  {
    name: "To be announced",
    role: "Chief Guest",
    note: "The chief guest for Sri Krishna Janmashtami 2026 will be announced closer to the festival.",
    announced: false,
  },
  {
    name: "To be announced",
    role: "Guest of Honour",
    note: "Felicitation of winners at 7:30 PM.",
    announced: false,
  },
];

export type Sponsor = { name: string; detail?: string; url?: string };

export const SPONSOR_BENEFITS = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "5,000+ Expected Footfall",
    text: "Reach thousands of families in a single joyful day.",
  },
  {
    icon: "🖼️",
    title: "Logo on All Marketing",
    text: "Your brand across banners, flyers and digital promotions.",
  },
  {
    icon: "✨",
    title: "Featured in Event Highlights",
    text: "Complete visibility throughout the celebration.",
  },
  {
    icon: "🏪",
    title: "On-Ground Stall Space",
    text: "Engage directly with visitors at the venue.",
  },
  { icon: "📱", title: "Social Media Mentions", text: "Featured across our social channels." },
  {
    icon: "🎈",
    title: "Family & Kids Audience",
    text: "Connect with an engaged community audience.",
  },
];

export const SPONSOR_TIERS: {
  tier: string;
  badge: string;
  icon: string;
  amount: string;
  featured?: boolean;
  perks: string[];
  sponsors: Sponsor[];
}[] = [
  {
    tier: "Title Sponsor",
    badge: "Presenting Partner",
    icon: "👑",
    amount: "Contact us for pricing",
    featured: true,
    perks: [
      "Prime logo on stage backdrop & all banners",
      "Top billing on every marketing material",
      "Premium on-ground stall space",
      "Repeated stage announcements",
      "Featured social media campaign",
    ],
    sponsors: [],
  },
  {
    tier: "Gold Sponsor",
    badge: "Premium",
    icon: "🪔",
    amount: "Contact us for pricing",
    perks: [
      "Logo on banners & marketing collateral",
      "On-ground stall space",
      "Stage announcements",
      "Social media mentions",
    ],
    sponsors: [],
  },
  {
    tier: "Silver Sponsor",
    badge: "Supporter",
    icon: "🌸",
    amount: "Contact us for pricing",
    perks: ["Logo on select banners & website", "Social media mention", "Event acknowledgement"],
    sponsors: [],
  },
  {
    tier: "Stall Partner",
    badge: "Flea Market / Food",
    icon: "🏪",
    amount: "Contact us for pricing",
    perks: [
      "Dedicated stall at the venue",
      "Direct engagement with visitors",
      "Listing on the event website",
    ],
    sponsors: [],
  },
];

export const SPONSOR_LOGO_SLOTS = 4;

export const EVENT_PARTNERS: { name: string; role: string }[] = [
  { name: "SLS International Gurukul", role: "Venue Partner" },
  { name: "ISKCON Bengaluru", role: "Organiser" },
];

export const WINNER_CATEGORIES: { key: string; age: string }[] = [
  { key: "Balgopal", age: "Up to 5 Years" },
  { key: "Nandgopal", age: "6 – 11 Years" },
  { key: "Nandkishore", age: "12 Years+" },
  { key: "Group Dance", age: "Team Contest" },
];

export const SPONSOR_WHATSAPP = `https://wa.me/${EVENT.phoneIntl}?text=${encodeURIComponent(
  "Hare Krishna! I am interested in sponsoring / partnering for Sri Krishna Janmashtami 2026 at ISKCON.",
)}`;
export const SPONSOR_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSeFE4L3gHRLn1OhOM-NdTooVnasxibzcgYw3JB5RI080BpBzg/viewform";
export const DONATION_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdAa6kOF1SujAp8T2EXeRiITXQLWZsGgMV1pPUzuZNFcZSOMA/viewform";

export const LAST_YEAR_STATS: { value: string; label: string }[] = [
  { value: "3,000+", label: "Devotees & guests" },
  { value: "250+", label: "Kids participants" },
  { value: "20+", label: "Dance teams" },
  { value: "5,000+", label: "Prasadam plates" },
];

export const LAST_YEAR_HIGHLIGHTS: string[] = [
  "Little Krishnas and Radhas filled the hall for the fancy dress and shloka rounds.",
  "A grand Palaki Utsava procession with kirtan that went on past midnight.",
  "Free prasadam, food stalls, games and a flea market for the whole family.",
];

export const WHY_WE_DO_THIS: { title: string; text: string }[] = [
  {
    title: "Culture for children",
    text: "Competitions and stage time that connect kids to Bhagavad Gita, shlokas and Krishna's pastimes.",
  },
  {
    title: "Families together",
    text: "One joyful day where parents, grandparents and children celebrate side by side.",
  },
  {
    title: "Community service",
    text: "Prasadam distribution and volunteering that bring the neighbourhood together.",
  },
  {
    title: "Devotion made joyful",
    text: "Kirtan, dance, music and Palaki Utsava — devotion experienced, not just explained.",
  },
];

/** Official Google Forms for registration. */
export const REGISTRATION_FORMS = {
  kids: {
    short: "https://forms.gle/c4suFdVq16SW6TTGA",
    embed:
      "https://docs.google.com/forms/d/e/1FAIpQLSfy4Sowww-__sA0re_vU8XNgqaFcNm-8e8U6WMGjig8l4eM2Q/viewform?embedded=true",
    title: "SLS Janmashtami Competitions Registration Form - 2026",
  },
  dance: {
    short: "https://forms.gle/VY9V5CQNybrxuadZ6",
    embed:
      "https://docs.google.com/forms/d/e/1FAIpQLSc3BX7jETvCJD8L52tPQxN3PE_Cbm7B5wogQY0PlNIgsi008Q/viewform?embedded=true",
    title: "Group Dance Contest Registration - SLS SKJ26",
  },
} as const;
