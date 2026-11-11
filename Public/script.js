const MQ = {};

MQ.util = {
  $: (s, r = document) => r.querySelector(s),
  $$: (s, r = document) => Array.from(r.querySelectorAll(s)),
  esc: s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  inr: n => '₹' + Math.round(n).toLocaleString('en-IN'),
  hash: str => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; },
  rng: seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; },
  clamp: (v, a, b) => Math.min(b, Math.max(a, v)),
  delay: ms => new Promise(r => setTimeout(r, ms)),
  store: {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  },
  iso: d => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); },
  addDays: (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
};

MQ.data = (() => {
  const { addDays } = MQ.util;
  const LANGS = ['Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Hindi'];
  const today = new Date(); today.setHours(0, 0, 0, 0);

  // off = release offset in days from today (negative = already released)
  const RAW = [
    {
    id: 'jigarthanda-doublex',
    title: 'Jigarthanda DoubleX',
    native: 'ஜிகர்தண்டா டபுள் எக்ஸ்',
    lang: 'Tamil',
    langs: ['Tamil', 'Telugu', 'Hindi'],
    genres: ['Action', 'Crime', 'Drama'],
    dur: 172, rating: 8.1, votes: 18000,
    cert: 'UA', off: -15,
    crew: {
      Director: 'Karthik Subbaraj',
      Music: 'Santhosh Narayanan',
      Cinematography: 'S. Thirunavukkarasu',
      Writer: 'Karthik Subbaraj',
      Producer: 'Stone Bench Films'
    },
    cast: [
      ['Raghava Lawrence', 'Alliyus Caesar'],
      ['S. J. Suryah', 'Ray Das'],
      ['Nimisha Sajayan', 'Malaiarasi'],
      ['Shine Tom Chacko', 'Jeyakodi']
    ],
    syn: 'A filmmaker enters the dangerous world of a notorious gangster in 1970s Tamil Nadu, hoping to create a revolutionary cinema experience.',
    tag: [
      'Cinema meets chaos.',
      'A gangster. A filmmaker.',
      'History will remember.'
    ],
    pal: ['#170e0b', '#8b3e22', '#e7a65a'],
    motif: 'city',
    trend: 91,
    rev: [],
    poster: 'https://img.youtube.com/vi/PvoUJejn1e4/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/1200x/1f/2c/87/1f2c87c56ef0e00030d6a91fa2e2fc63.jpg',
    trailer: 'Trailer/Jigarthanda.mp4'
  },

  {
    id: 'maharaja',
    title: 'Maharaja',
    native: 'மகாராஜா',
    lang: 'Tamil',
    langs: ['Tamil', 'Telugu', 'Hindi'],
    genres: ['Thriller', 'Action', 'Crime'],
    dur: 141, rating: 8.4, votes: 25000,
    cert: 'A', off: -20,
    crew: {
      Director: 'Nithilan Saminathan',
      Music: 'B. Ajaneesh Loknath',
      Cinematography: 'Dinesh Purushothaman',
      Writer: 'Nithilan Saminathan',
      Producer: 'Passion Studios'
    },
    cast: [
      ['Vijay Sethupathi', 'Maharaja'],
      ['Anurag Kashyap', 'Selvam'],
      ['Mamta Mohandas', 'Aasifa'],
      ['Natty', 'Inspector S. Varadharajan']
    ],
    syn: 'A quiet barber approaches the police with an unusual complaint about his missing dustbin. What follows is a disturbing mystery filled with unexpected connections.',
    tag: [
      'Nothing is what it seems.',
      'Every detail matters.',
      'The truth cuts deep.'
    ],
    pal: ['#11151d', '#384b63', '#d8a45d'],
    motif: 'rain',
    trend: 98,
    rev: [],
    poster: 'https://img.youtube.com/vi/z37hCm4eges/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/b6/e0/74/b6e07458c796c999af9156c541686522.jpg',
    trailer: 'https://youtu.be/Otcr-vRuaQs'
  },

  // ==================== TELUGU ====================
  {
    id: 'hanuman',
    title: 'Hanu-Man',
    native: 'హను-మాన్',
    lang: 'Telugu',
    langs: ['Telugu', 'Tamil', 'Hindi', 'Kannada', 'Malayalam'],
    genres: ['Action', 'Fantasy', 'Adventure'],
    dur: 158, rating: 8.0, votes: 28000,
    cert: 'UA', off: -18,
    crew: {
      Director: 'Prasanth Varma',
      Music: 'GowraHari',
      Cinematography: 'Shivendra',
      Writer: 'Prasanth Varma',
      Producer: 'PrimeShow Entertainment'
    },
    cast: [
      ['Teja Sajja', 'Hanumanthu'],
      ['Amritha Aiyer', 'Meenakshi'],
      ['Varalaxmi Sarathkumar', 'Anjamma'],
      ['Vinay Rai', 'Michael']
    ],
    syn: 'A young man from a quiet village discovers a mysterious gemstone that grants him extraordinary powers. He must protect his people from a powerful enemy.',
    tag: [
      'A hero rises.',
      'Power has a purpose.',
      'The legend begins.'
    ],
    pal: ['#180c08', '#a93616', '#ffc34a'],
    motif: 'temple',
    trend: 97,
    rev: [],
    poster: 'https://img.youtube.com/vi/Oqvly3MvlXA/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/f3/28/00/f32800e0620cf2e95ac3e2fae6aab967.jpg',
    trailer: 'https://youtu.be/vT0vzlo0jG0'
  },

  {
    id: 'salaar',
    title: 'Salaar: Part 1 – Ceasefire',
    native: 'సలార్',
    lang: 'Telugu',
    langs: ['Telugu', 'Tamil', 'Hindi', 'Kannada', 'Malayalam'],
    genres: ['Action', 'Crime', 'Thriller'],
    dur: 175, rating: 7.8, votes: 32000,
    cert: 'A', off: -12,
    crew: {
      Director: 'Prashanth Neel',
      Music: 'Ravi Basrur',
      Cinematography: 'Bhuvan Gowda',
      Writer: 'Prashanth Neel',
      Producer: 'Hombale Films'
    },
    cast: [
      ['Prabhas', 'Deva'],
      ['Prithviraj Sukumaran', 'Vardha'],
      ['Shruti Haasan', 'Aadhya'],
      ['Jagapathi Babu', 'Raja Mannar']
    ],
    syn: 'Two childhood friends are separated by fate and reunited in a violent kingdom where loyalty, power and friendship determine who survives.',
    tag: [
      'Friendship has no limits.',
      'A kingdom awaits.',
      'The ceasefire ends.'
    ],
    pal: ['#101018', '#38445b', '#c18b52'],
    motif: 'mountain',
    trend: 96,
    rev: [],
    poster: 'https://img.youtube.com/vi/4GPvYMKtrtI/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/c3/16/ec/c316eca7fa61d127d612e7a6af56a3a6.jpg',
    trailer: 'https://youtu.be/efrYtSEnJFc'
  },

  // ==================== KANNADA ====================
  {
    id: 'kantara',
    title: 'Kantara',
    native: 'ಕಾಂತಾರ',
    lang: 'Kannada',
    langs: ['Kannada', 'Tamil', 'Telugu', 'Hindi', 'Malayalam'],
    genres: ['Action', 'Thriller', 'Drama'],
    dur: 148, rating: 8.2, votes: 22000,
    cert: 'A', off: -16,
    crew: {
      Director: 'Rishab Shetty',
      Music: 'B. Ajaneesh Loknath',
      Cinematography: 'Arvind S. Kashyap',
      Writer: 'Rishab Shetty',
      Producer: 'Hombale Films'
    },
    cast: [
      ['Rishab Shetty', 'Shiva'],
      ['Sapthami Gowda', 'Leela'],
      ['Kishore', 'Murali'],
      ['Achyuth Kumar', 'Devendra Suttooru']
    ],
    syn: 'A village surrounded by forest traditions and ancient beliefs faces a conflict between its people, the authorities and the forces protecting their land.',
    tag: [
      'The forest has a voice.',
      'Faith meets fury.',
      'The legend awakens.'
    ],
    pal: ['#101a0d', '#52672c', '#d6a14b'],
    motif: 'forest',
    trend: 99,
    rev: [],
    poster: 'https://img.youtube.com/vi/8mrVmf239GU/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/e4/be/a1/e4bea11b766f0a9c91d8c6217c16fff4.jpg',
    trailer: 'https://www.youtube.com/watch?v=gKJMgeEvSyE&pp=ygUPa2FudGFyYSB0cmFpbGVy'
  },

  {
    id: 'kgf-chapter-2',
    title: 'K.G.F: Chapter 2',
    native: 'ಕೆ.ಜಿ.ಎಫ್ ಅಧ್ಯಾಯ ೨',
    lang: 'Kannada',
    langs: ['Kannada', 'Tamil', 'Telugu', 'Hindi', 'Malayalam'],
    genres: ['Action', 'Crime', 'Drama'],
    dur: 168, rating: 8.3, votes: 35000,
    cert: 'UA', off: -22,
    crew: {
      Director: 'Prashanth Neel',
      Music: 'Ravi Basrur',
      Cinematography: 'Bhuvan Gowda',
      Writer: 'Prashanth Neel',
      Producer: 'Hombale Films'
    },
    cast: [
      ['Yash', 'Rocky'],
      ['Sanjay Dutt', 'Adheera'],
      ['Srinidhi Shetty', 'Reena'],
      ['Raveena Tandon', 'Ramika Sen']
    ],
    syn: 'Rocky rises to become the ruler of the Kolar Gold Fields, but powerful enemies and political forces threaten his empire.',
    tag: [
      'Power has a new name.',
      'The empire strikes back.',
      'The world remembers.'
    ],
    pal: ['#11100d', '#7b542b', '#e4b96a'],
    motif: 'city',
    trend: 99,
    rev: [],
    poster: 'https://img.youtube.com/vi/jQsE85cI384/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/9c/a2/91/9ca291ac23b69ed5580cdf6e73fd913d.jpg',
    trailer: 'https://youtu.be/tLeTx5OdjZs'
  },

  // ==================== MALAYALAM ====================
  {
    id: 'dhoomam',
    title: 'Dhoomam',
    native: 'ധൂമം',
    lang: 'Malayalam',
    langs: ['Malayalam', 'Kannada', 'Tamil', 'Telugu'],
    genres: ['Thriller', 'Mystery', 'Drama'],
    dur: 143, rating: 6.0, votes: 4500,
    cert: 'A', off: -8,
    crew: {
      Director: 'Pawan Kumar',
      Music: 'Poornachandra Tejaswi',
      Cinematography: 'Preetha Jayaraman',
      Writer: 'Pawan Kumar',
      Producer: 'Hombale Films'
    },
    cast: [
      ['Fahadh Faasil', 'Avinash'],
      ['Aparna Balamurali', 'Diya'],
      ['Roshan Mathew', 'Sid'],
      ['Vineeth', '']
    ],
    syn: 'A marketing professional working for a tobacco company finds himself trapped in a dangerous situation that challenges his choices and exposes hidden truths.',
    tag: [
      'Every choice has a price.',
      'The smoke hides secrets.',
      'Nothing stays buried.'
    ],
    pal: ['#101418', '#52636a', '#d6a45e'],
    motif: 'city',
    trend: 67,
    rev: [],
    poster: 'https://img.youtube.com/vi/Eeh1YUnJjko/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/1200x/80/d7/d8/80d7d8d7073bb0921a4f50b144e8b697.jpg',
    trailer: 'https://youtu.be/FRGTaaxD-o0'
  },

  {
    id: 'manjummel-boys',
    title: 'Manjummel Boys',
    native: 'മഞ്ഞുമ്മൽ ബോയ്സ്',
    lang: 'Malayalam',
    langs: ['Malayalam', 'Tamil', 'Telugu', 'Hindi'],
    genres: ['Adventure', 'Survival', 'Drama'],
    dur: 135, rating: 8.2, votes: 26000,
    cert: 'U', off: -14,
    crew: {
      Director: 'Chidambaram',
      Music: 'Sushin Shyam',
      Cinematography: 'Shyju Khalid',
      Writer: 'Chidambaram',
      Producer: 'Parava Films'
    },
    cast: [
      ['Soubin Shahir', 'Siju'],
      ['Sreenath Bhasi', 'Subhash'],
      ['Balu Varghese', 'Sixen'],
      ['Ganapathy', 'Kuttan'],
      ['Jean Paul Lal', 'Sudhi']
    ],
    syn: 'A group of friends travel from Kerala to Kodaikanal for a holiday. Their trip becomes a desperate rescue mission when one of them falls into the dangerous Guna Caves.',
    tag: [
      'Friendship beyond limits.',
      'One impossible rescue.',
      'Never leave a friend.'
    ],
    pal: ['#07151c', '#15556b', '#e0a65c'],
    motif: 'hills',
    trend: 98,
    rev: [],
    poster: 'https://img.youtube.com/vi/id848Ww1YLo/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/dc/2d/9e/dc2d9e6aa21196f18ee0b9af802cd2e0.jpg',
    trailer: 'https://youtu.be/99f_P3uU0YM?list=RD99f_P3uU0YM'
  },

  // ==================== HINDI ====================
  {
    id: 'laapataa-ladies',
    title: 'Laapataa Ladies',
    native: 'लापता लेडीज़',
    lang: 'Hindi',
    langs: ['Hindi', 'Tamil', 'Telugu', 'Malayalam'],
    genres: ['Comedy', 'Drama', 'Family'],
    dur: 122, rating: 8.1, votes: 19000,
    cert: 'U', off: -10,
    crew: {
      Director: 'Kiran Rao',
      Music: 'Ram Sampath',
      Cinematography: 'Vikash Nowlakha',
      Writer: 'Sneha Desai',
      Producer: 'Aamir Khan Productions'
    },
    cast: [
      ['Nitanshi Goel', 'Phool'],
      ['Pratibha Ranta', 'Jaya'],
      ['Sparsh Shrivastava', 'Deepak'],
      ['Ravi Kishan', 'Inspector Shyam Manohar']
    ],
    syn: 'Two newly married brides accidentally get exchanged during a train journey. Their unexpected journeys lead to discoveries about identity, independence and life.',
    tag: [
      'Lost, but not forgotten.',
      'Two brides. One journey.',
      'Finding themselves.'
    ],
    pal: ['#291b13', '#bd7542', '#f4d28c'],
    motif: 'hills',
    trend: 90,
    rev: [],
    poster: 'https://img.youtube.com/vi/hGM87LCJxRc/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/ac/5b/b2/ac5bb26a203ec7f1dc50e549d633d91b.jpg',
    trailer: 'https://www.youtube.com/watch?v=hGM87LCJxRc'
  },

  {
    id: '12th-fail',
    title: '12th Fail',
    native: '12वीं फेल',
    lang: 'Hindi',
    langs: ['Hindi', 'Tamil', 'Telugu', 'Malayalam'],
    genres: ['Drama', 'Biography'],
    dur: 147, rating: 8.7, votes: 30000,
    cert: 'U', off: -18,
    crew: {
      Director: 'Vidhu Vinod Chopra',
      Music: 'Shantanu Moitra',
      Cinematography: 'Rangarajan Ramabadran',
      Writer: 'Vidhu Vinod Chopra, Jaskunwar Kohli',
      Producer: 'Vinod Chopra Films'
    },
    cast: [
      ['Vikrant Massey', 'Manoj Kumar Sharma'],
      ['Medha Shankar', 'Shraddha Joshi'],
      ['Anant V Joshi', 'Pritam Pandey'],
      ['Anshumaan Pushkar', 'Gauri Bhaiya']
    ],
    syn: 'Inspired by a true story, a young man from Chambal refuses to give up after failing his examinations and pursues his dream of becoming an IPS officer.',
    tag: [
      'Restart your journey.',
      'Failure is not the end.',
      'Never stop believing.'
    ],
    pal: ['#15251d', '#54755b', '#e2c18a'],
    motif: 'city',
    trend: 96,
    rev: [],
    poster: 'https://img.youtube.com/vi/WW_oAEdiUnY/hqdefault.jpg',
    cardPoster: 'https://i.pinimg.com/736x/96/fe/fb/96fefbe3fdad93251fe8574cd06979ad.jpg',
    trailer: 'https://youtu.be/8XhGC9VxNu0'
  }
];

  // Normalize the editable movie records before the rest of the app uses them.
  const emptyCrew = () => Object.defineProperty({}, 'Director', { value: '', enumerable: false });
  const EMPTY = () => ({
    native: '', genres: [], dur: 0, rating: 0, votes: 0, cert: '',
    off: -9999, crew: emptyCrew(), cast: [], syn: '',
    tag: ['', '', ''], pal: ['#15171c', '#3a3f4a', '#c9ccd3'], trend: 0, rev: []
  });
  const movies = RAW.map(raw => {
    const m = Object.assign(EMPTY(), raw);
    const release = addDays(today, m.off);
    return Object.assign({}, m, {
      release,
      upcoming: m.off > 0,
      palette: m.pal,
      cast: m.cast.map(c => ({ name: c[0], role: c[1] })),
      reviews: m.rev.map(r => ({ who: r[0], score: r[1], text: r[2] }))
    });
  });

  const CITIES = {
    Bengaluru: [['Lumière Grand', 'Indiranagar', 'IMAX-style Laser', 1.15, 3.2], ['Aurum Screens', 'Koramangala', 'Recliners', 1.0, 5.1], ['The Reel Hall', 'Whitefield', 'Dolby Atmos', 0.9, 11.4]],
    Hyderabad: [['Lumière Grand', 'Banjara Hills', 'IMAX-style Laser', 1.15, 2.6], ['Aurum Screens', 'Gachibowli', 'Recliners', 1.0, 7.8], ['Chandni Talkies', 'Secunderabad', 'Dolby Atmos', 0.9, 9.3]],
    Chennai: [['Lumière Grand', 'Anna Nagar', 'IMAX-style Laser', 1.15, 4.0], ['Aurum Screens', 'Velachery', 'Recliners', 1.0, 6.5], ['Palace Cinemas', 'Adyar', 'Dolby Atmos', 1.0, 8.2]],
    Kochi: [['Lumière Grand', 'Edappally', 'IMAX-style Laser', 1.1, 3.5], ['Aurum Screens', 'Kakkanad', 'Recliners', 1.0, 8.9], ['Marine Drive Talkies', 'Ernakulam', 'Dolby Atmos', 0.9, 2.1]],
    Mumbai: [['Lumière Grand', 'Lower Parel', 'IMAX-style Laser', 1.25, 4.4], ['Aurum Screens', 'Andheri West', 'Recliners', 1.1, 7.0], ['Juhu Picture Palace', 'Juhu', 'Dolby Atmos', 1.0, 9.9]]
  };
  const theatres = [];
  Object.keys(CITIES).forEach(city => CITIES[city].forEach((t, i) => theatres.push({
    id: (city.slice(0, 3) + '-' + t[0].split(' ')[0] + '-' + i).toLowerCase().replace(/[^a-z0-9-]/g, ''),
    name: t[0], area: t[1], city, amen: [t[2], i === 1 ? 'Premium Recliners' : 'Balcony', 'Food Court'], mult: t[3], dist: t[4], hall: 'Audi ' + (i + 1)
  })));

  const snacks = [
    { id: 'pop-salt-r', cat: 'Popcorn', name: 'Salted Popcorn', size: 'Regular', price: 220, veg: true, kind: 'popcorn', v: 'salt', desc: 'Hand-tossed in sea salt. About 85 g.' },
    { id: 'pop-salt-l', cat: 'Popcorn', name: 'Salted Popcorn', size: 'Large', price: 320, veg: true, kind: 'popcorn', v: 'salt', desc: 'The big tub. About 130 g.' },
    { id: 'pop-caramel', cat: 'Popcorn', name: 'Caramel Popcorn', size: 'Regular', price: 280, veg: true, kind: 'popcorn', v: 'caramel', desc: 'Slow-cooked caramel, light crunch.' },
    { id: 'pop-cheese', cat: 'Popcorn', name: 'Cheese Popcorn', size: 'Regular', price: 270, veg: true, kind: 'popcorn', v: 'cheese', desc: 'Aged cheddar dusting.' },
    { id: 'drink-cola', cat: 'Drinks', name: 'Cola', size: '500 ml', price: 160, veg: true, kind: 'cup', v: 'cola', desc: 'Chilled, with ice.' },
    { id: 'drink-lime', cat: 'Drinks', name: 'Fresh Lime Soda', size: '400 ml', price: 150, veg: true, kind: 'cup', v: 'lime', desc: 'Sweet, salted or mixed.' },
    { id: 'drink-tea', cat: 'Drinks', name: 'Iced Tea', size: '450 ml', price: 170, veg: true, kind: 'cup', v: 'tea', desc: 'Peach and black tea.' },
    { id: 'nacho-salsa', cat: 'Nachos', name: 'Nachos with Salsa', size: 'Regular', price: 240, veg: true, kind: 'nachos', v: 'salsa', desc: 'Corn chips, house salsa.' },
    { id: 'nacho-cheesy', cat: 'Nachos', name: 'Loaded Cheesy Nachos', size: 'Regular', price: 310, veg: true, kind: 'nachos', v: 'cheesy', desc: 'Warm cheese sauce and jalapeños.' },
    { id: 'burger-veg', cat: 'Burgers', name: 'Crispy Veg Burger', size: '1 pc', price: 230, veg: true, kind: 'burger', v: 'veg', desc: 'Potato and pea patty, tangy mayo.' },
    { id: 'burger-chicken', cat: 'Burgers', name: 'Crispy Chicken Burger', size: '1 pc', price: 290, veg: false, kind: 'burger', v: 'chicken', desc: 'Buttermilk fried chicken, slaw.' },
    { id: 'sand-paneer', cat: 'Sandwiches', name: 'Paneer Tikka Sandwich', size: '1 pc', price: 240, veg: true, kind: 'sandwich', v: 'paneer', desc: 'Grilled, mint chutney.' },
    { id: 'sand-chicken', cat: 'Sandwiches', name: 'Grilled Chicken Sandwich', size: '1 pc', price: 280, veg: false, kind: 'sandwich', v: 'chicken', desc: 'Peri-peri chicken, lettuce.' },
    { id: 'combo-solo', cat: 'Combos', name: 'Solo Combo', size: 'Popcorn + Cola', price: 330, was: 380, veg: true, kind: 'combo', v: 'solo', desc: 'Regular salted popcorn and a cola.' },
    { id: 'combo-date', cat: 'Combos', name: 'Date Night Combo', size: 'For 2', price: 560, was: 700, veg: true, kind: 'combo', v: 'date', desc: 'Large popcorn, nachos and two drinks.' },
    { id: 'combo-family', cat: 'Combos', name: 'Family Combo', size: 'For 4', price: 890, was: 1120, veg: false, kind: 'combo', v: 'family', desc: 'Two large popcorn, burger, sandwich, four drinks.' }
  ];

  const times = ['09:30', '11:00', '13:15', '15:45', '18:20', '21:00', '23:30'];
  const fmts = ['2D', 'Dolby Atmos', 'Laser 4K'];

  function fetchMovies() {
    // Simulated network call so that loading states are real.
    return new Promise((res) => setTimeout(() => res(movies), 520));
  }
  function movie(id) { return movies.find(m => m.id === id); }
  function theatre(id) { return theatres.find(t => t.id === id); }
  function snack(id) { return snacks.find(s => s.id === id); }
  function theatresIn(city) { return theatres.filter(t => t.city === city); }

  function showsFor(m, t, dateISO) {
    const { rng, hash } = MQ.util;
    const r = rng(hash(m.id + t.id + dateISO));
    const n = 4 + Math.floor(r() * 2);
    const pool = times.slice();
    const picked = [];
    while (picked.length < n && pool.length) picked.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
    picked.sort();
    return picked.map(time => ({
      time, lang: m.langs[Math.floor(r() * m.langs.length)], fmt: fmts[Math.floor(r() * fmts.length)], fill: r()
    }));
  }
  function isPast(dateISO, time) {
    const now = new Date();
    if (dateISO !== MQ.util.iso(now)) return dateISO < MQ.util.iso(now);
    const [h, mi] = time.split(':').map(Number);
    const t = new Date(now); t.setHours(h, mi, 0, 0);
    return t.getTime() < now.getTime() + 10 * 60000;
  }
  function fmtDate(d, o) { return d.toLocaleDateString('en-IN', o || { day: 'numeric', month: 'short' }); }
  function fmtTime(t) { const [h, m] = t.split(':').map(Number); return ((h % 12) || 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM'); }
  function dur(min) { return Math.floor(min / 60) + 'h ' + (min % 60) + 'm'; }

  return { LANGS, movies, theatres, snacks, CITIES: Object.keys(CITIES), fetchMovies, movie, theatre, snack, theatresIn, showsFor, isPast, fmtDate, fmtTime, dur, today };
})();

/* ============================================================
   MODULE: art  (procedural posters, banners, food illustrations, QR-style code)
   No external images are used. Everything is drawn on canvas and cached.
   ============================================================ */
MQ.art = (() => {
  const { rng, hash } = MQ.util;

  const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgba = (h, a) => { const [r, g, b] = hex2rgb(h); return `rgba(${r},${g},${b},${a})`; };
  const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };

  /* ---------- scene (no text) ---------- */
  function scene(ctx, w, h, m) {
    const [c0, c1, c2] = m.palette; const r = rng(hash(m.id)); const mn = Math.min(w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, c0); g.addColorStop(0.55, c1); g.addColorStop(1, mix(c1, c2, 0.55));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const sx = w * (0.28 + r() * 0.44), sy = h * (0.26 + r() * 0.16), sr = mn * (0.11 + r() * 0.07);
    const glow = ctx.createRadialGradient(sx, sy, sr * 0.2, sx, sy, sr * 4.2);
    glow.addColorStop(0, rgba(c2, 0.55)); glow.addColorStop(1, rgba(c2, 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 7); ctx.fill();

    const dark = (t) => mix(c0, '#000000', t);
    const hills = (base, amp, freq, color, off) => {
      ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += w / 48) ctx.lineTo(x, base + Math.sin(x / w * freq + off) * amp + Math.sin(x / w * freq * 2.3 + off * 2) * amp * 0.4);
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
    };
    const M = m.motif;
    if (M === 'hills' || M === 'dunes') {
      hills(h * 0.62, h * 0.05, 7, dark(0.25), 1); hills(h * 0.72, h * 0.05, 6, dark(0.5), 2.4); hills(h * 0.84, h * 0.04, 8, dark(0.75), 4);
    } else if (M === 'sea') {
      const hz = h * 0.62; const sg = ctx.createLinearGradient(0, hz, 0, h); sg.addColorStop(0, mix(c1, c2, 0.3)); sg.addColorStop(1, dark(0.7));
      ctx.fillStyle = sg; ctx.fillRect(0, hz, w, h - hz);
      for (let i = 0; i < 60; i++) { const y = hz + (i / 60) * (h - hz); ctx.strokeStyle = rgba(c2, 0.35 * (1 - i / 60)); ctx.lineWidth = 1 + i / 20; const len = (w * 0.08) * (1 + r() * 2.5) * (1 - Math.abs(0.5 - ((sx / w))) * 0.5); ctx.beginPath(); ctx.moveTo(sx - len / 2 + (r() - 0.5) * 40, y); ctx.lineTo(sx + len / 2 + (r() - 0.5) * 40, y); ctx.stroke(); }
      ctx.fillStyle = dark(0.85); ctx.beginPath(); const bx = w * (0.15 + r() * 0.6), by = hz + h * 0.07; ctx.moveTo(bx - mn * 0.1, by); ctx.lineTo(bx + mn * 0.1, by); ctx.lineTo(bx + mn * 0.06, by + mn * 0.04); ctx.lineTo(bx - mn * 0.07, by + mn * 0.04); ctx.fill();
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by - mn * 0.18); ctx.lineTo(bx + mn * 0.08, by - mn * 0.02); ctx.fill();
    } else if (M === 'city' || M === 'rain') {
      let x = -10; while (x < w) { const bw = mn * (0.05 + r() * 0.09), bh = h * (0.18 + r() * 0.36); ctx.fillStyle = dark(0.55 + r() * 0.35); ctx.fillRect(x, h - bh, bw, bh);
        for (let wy = h - bh + 10; wy < h - 12; wy += 14) for (let wx = x + 6; wx < x + bw - 6; wx += 11) if (r() > 0.72) { ctx.fillStyle = rgba(c2, 0.55 + r() * 0.4); ctx.fillRect(wx, wy, 4, 6); } x += bw + 2 + r() * 6; }
      if (M === 'rain') { ctx.strokeStyle = 'rgba(210,230,255,0.22)'; ctx.lineWidth = 1; for (let i = 0; i < w * h / 2600; i++) { const x1 = r() * w, y1 = r() * h; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - 6, y1 + 22); ctx.stroke(); } }
    } else if (M === 'forest') {
      for (let row = 0; row < 4; row++) { const base = h * (0.55 + row * 0.12); ctx.fillStyle = dark(0.35 + row * 0.18);
        for (let x = -20; x < w + 20; x += mn * (0.05 + r() * 0.04)) { const th = h * (0.12 + r() * 0.16); const tw = th * 0.38; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x + tw, base); ctx.lineTo(x + tw / 2, base - th); ctx.fill(); }
        const fg = ctx.createLinearGradient(0, base - h * 0.2, 0, base + 10); fg.addColorStop(0, rgba(c2, 0)); fg.addColorStop(1, rgba(c1, 0.35)); ctx.fillStyle = fg; ctx.fillRect(0, base - h * 0.2, w, h * 0.24); }
      ctx.fillStyle = dark(0.9); ctx.fillRect(0, h * 0.95, w, h * 0.05);
    } else if (M === 'temple') {
      const cx = w * (0.4 + r() * 0.2), base = h * 0.86; ctx.fillStyle = dark(0.8);
      for (let i = 0; i < 9; i++) { const tw = mn * (0.46 - i * 0.045), th = h * 0.055; const y = base - i * th; ctx.beginPath(); ctx.moveTo(cx - tw / 2, y); ctx.lineTo(cx + tw / 2, y); ctx.lineTo(cx + tw / 2 - mn * 0.018, y - th); ctx.lineTo(cx - tw / 2 + mn * 0.018, y - th); ctx.fill(); }
      ctx.beginPath(); ctx.arc(cx, base - 9 * h * 0.055, mn * 0.03, Math.PI, 0); ctx.fill(); ctx.fillRect(cx - 1.5, base - 9 * h * 0.055 - mn * 0.07, 3, mn * 0.07);
      hills(h * 0.88, h * 0.015, 9, dark(0.9), 0.4); ctx.fillStyle = dark(0.9); ctx.fillRect(0, h * 0.9, w, h * 0.1);
      for (let i = 0; i < 18; i++) { ctx.fillStyle = rgba('#ffb54a', 0.85); ctx.beginPath(); ctx.arc(w * (0.05 + i * 0.055), h * 0.925, 2.4, 0, 7); ctx.fill(); }
    } else if (M === 'mountain') {
      for (let layer = 0; layer < 3; layer++) { const base = h * (0.55 + layer * 0.12); ctx.fillStyle = dark(0.2 + layer * 0.28); ctx.beginPath(); ctx.moveTo(0, h);
        let x = 0; while (x <= w) { ctx.lineTo(x, base - h * (0.08 + r() * 0.2) * (1 - layer * 0.25)); x += w / (7 - layer); } ctx.lineTo(w, h); ctx.fill(); }
      ctx.fillStyle = rgba('#ffffff', 0.12); ctx.fillRect(0, h * 0.78, w, h * 0.22);
    } else if (M === 'backwater') {
      const hz = h * 0.58; const wg = ctx.createLinearGradient(0, hz, 0, h); wg.addColorStop(0, mix(c1, c2, 0.4)); wg.addColorStop(1, dark(0.8)); ctx.fillStyle = wg; ctx.fillRect(0, hz, w, h - hz);
      ctx.fillStyle = dark(0.85); ctx.fillRect(0, hz - h * 0.025, w, h * 0.03);
      for (let i = 0; i < 5; i++) { const px = w * (0.06 + i * 0.22 + r() * 0.1), ph = h * (0.25 + r() * 0.12); ctx.strokeStyle = dark(0.9); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, hz); ctx.quadraticCurveTo(px + 20, hz - ph * 0.6, px + 8, hz - ph); ctx.stroke();
        for (let f = 0; f < 6; f++) { const a = -2.6 + f * 0.55; ctx.beginPath(); ctx.moveTo(px + 8, hz - ph); ctx.quadraticCurveTo(px + 8 + Math.cos(a) * 35, hz - ph + Math.sin(a) * 25 - 10, px + 8 + Math.cos(a) * 70, hz - ph + Math.sin(a) * 40 + 25); ctx.lineWidth = 3; ctx.stroke(); } }
      const bx = w * 0.55, by = hz + h * 0.1; ctx.fillStyle = dark(0.95); ctx.beginPath(); ctx.moveTo(bx - mn * 0.28, by); ctx.quadraticCurveTo(bx, by + mn * 0.1, bx + mn * 0.28, by); ctx.lineTo(bx + mn * 0.2, by - mn * 0.03); ctx.lineTo(bx - mn * 0.2, by - mn * 0.03); ctx.fill(); ctx.fillRect(bx - mn * 0.1, by - mn * 0.09, mn * 0.2, mn * 0.06);
      ctx.fillStyle = rgba('#ffb04a', 0.9); ctx.fillRect(bx - mn * 0.05, by - mn * 0.075, mn * 0.025, mn * 0.025);
    } else if (M === 'stage') {
      for (let i = 0; i < 4; i++) { const lx = w * (0.15 + i * 0.23), sg = ctx.createLinearGradient(lx, 0, lx, h * 0.85); sg.addColorStop(0, rgba(c2, 0.5)); sg.addColorStop(1, rgba(c2, 0)); ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(lx - 6, 0); ctx.lineTo(lx + 6, 0); ctx.lineTo(w * (0.5 + (i - 1.5) * 0.12) + mn * 0.2, h * 0.85); ctx.lineTo(w * (0.5 + (i - 1.5) * 0.12) - mn * 0.2, h * 0.85); ctx.fill(); }
      ctx.fillStyle = dark(0.8); ctx.fillRect(0, h * 0.84, w, h * 0.16);
      for (let row = 0; row < 3; row++) for (let x = -10; x < w + 10; x += mn * 0.07) { const yy = h * (0.88 + row * 0.05) + r() * 6; ctx.fillStyle = dark(0.9 + row * 0.03); ctx.beginPath(); ctx.arc(x + r() * 8, yy - mn * 0.03, mn * 0.026, 0, 7); ctx.fill(); ctx.fillRect(x - mn * 0.02, yy - mn * 0.01, mn * 0.05, mn * 0.07); }
    }
  }

  function finish(ctx, w, h, strength) {
    const v = ctx.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,' + (strength || 0.6) + ')'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
    const r = rng(7); const n = Math.floor(w * h / 1800);
    for (let i = 0; i < n; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)'; ctx.fillRect(r() * w, r() * h, 1.4, 1.4); }
  }

  function fit(ctx, text, maxW, size, font) {
    let s = size; ctx.font = font(s);
    while (ctx.measureText(text).width > maxW && s > 10) { s -= 2; ctx.font = font(s); }
    return s;
  }
  const DISPLAY = s => `900 ${s}px "Big Shoulders Display","Oswald","Arial Narrow",Impact,sans-serif`;
  const BODY = (s, w) => `${w || 500} ${s}px "Hanken Grotesk",system-ui,"Noto Sans Tamil","Noto Sans Devanagari",sans-serif`;
  const MONO = s => `500 ${s}px "IBM Plex Mono",ui-monospace,Menlo,monospace`;

  function splitTitle(t) {
    const words = t.toUpperCase().split(' ');
    if (words.length === 1 || t.length < 11) return [t.toUpperCase()];
    let best = 1, bd = 1e9; for (let i = 1; i < words.length; i++) { const d = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length); if (d < bd) { bd = d; best = i; } }
    return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
  }

  /* ---------- poster 600x900 ---------- */
  function poster(canvas, m) {
    const w = canvas.width = 600, h = canvas.height = 900; const ctx = canvas.getContext('2d');
    scene(ctx, w, h, m);
    const bg = ctx.createLinearGradient(0, h * 0.5, 0, h); bg.addColorStop(0, 'rgba(0,0,0,0)'); bg.addColorStop(1, 'rgba(0,0,0,0.82)'); ctx.fillStyle = bg; ctx.fillRect(0, h * 0.5, w, h * 0.5);
    finish(ctx, w, h, 0.55);
    ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,0.78)'; ctx.font = MONO(15); ctx.fillText('M A R Q U E E   P R E S E N T S', w / 2, 52);
    const lines = splitTitle(m.title); let size = 150; lines.forEach(l => { size = Math.min(size, fit(ctx, l, w - 80, 150, DISPLAY)); });
    ctx.font = DISPLAY(size); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 18;
    const baseY = h - 190 - (lines.length - 1) * size * 0.86; lines.forEach((l, i) => ctx.fillText(l, w / 2, baseY + i * size * 0.86)); ctx.shadowBlur = 0;
    ctx.font = BODY(26, 600); ctx.fillStyle = m.palette[2]; ctx.fillText(m.native, w / 2, h - 126);
    ctx.font = MONO(14); ctx.fillStyle = 'rgba(255,255,255,0.62)'; ctx.fillText(m.tag[0].toUpperCase(), w / 2, h - 90);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = MONO(12); ctx.fillText(`${m.crew.Director.toUpperCase()}  ·  ${m.lang.toUpperCase()}  ·  ${m.cert}`, w / 2, h - 52);
    return canvas;
  }

  /* ---------- banner 1024x640 ---------- */
  function banner(canvas, m, opts) {
    const w = canvas.width = (opts && opts.w) || 1024, h = canvas.height = (opts && opts.h) || 640; const ctx = canvas.getContext('2d'); const k = w / 1024;
    scene(ctx, w, h, m);
    const bg = ctx.createLinearGradient(0, 0, w, 0); bg.addColorStop(0, 'rgba(0,0,0,0.7)'); bg.addColorStop(0.65, 'rgba(0,0,0,0)'); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    finish(ctx, w, h, 0.5);
    ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.font = MONO(16 * k); ctx.fillText(m.lang.toUpperCase() + '  ·  ' + m.genres.join(' / ').toUpperCase(), 56 * k, h - 190 * k);
    const lines = splitTitle(m.title); let size = 170 * k; lines.forEach(l => { size = Math.min(size, fit(ctx, l, w * 0.62, 170 * k, DISPLAY)); });
    ctx.font = DISPLAY(size); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 20;
    lines.forEach((l, i) => ctx.fillText(l, 52 * k, h - 100 * k - (lines.length - 1 - i) * size * 0.84)); ctx.shadowBlur = 0;
    ctx.font = BODY(26 * k, 600); ctx.fillStyle = m.palette[2]; ctx.fillText(m.native, 56 * k, h - 52 * k);
    return canvas;
  }

  /* ---------- poster URL cache (WebP where supported) ---------- */
  const cache = {};
  function posterURL(m) {
    if (cache[m.id]) return cache[m.id];
    const configured = window.MQ_MEDIA && window.MQ_MEDIA.posters && window.MQ_MEDIA.posters[m.id];
    if (configured) { cache[m.id] = Promise.resolve(configured); return cache[m.id]; }
    if (m.poster) { cache[m.id] = Promise.resolve(m.poster); return cache[m.id]; }
    cache[m.id] = (async () => {
      await MQ.fontsReady;
      const c = document.createElement('canvas'); poster(c, m);
      const url = await new Promise(res => c.toBlob(b => res(b ? URL.createObjectURL(b) : c.toDataURL('image/jpeg', 0.8)), 'image/webp', 0.8));
      return url;
    })();
    return cache[m.id];
  }
  let io;
  function lazyPosters(root) {
    const imgs = Array.from((root || document).querySelectorAll('img[data-poster]:not([src])'));
    if (!('IntersectionObserver' in window)) { imgs.forEach(load); return; }
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); load(e.target); } }), { rootMargin: '300px' });
    imgs.forEach(i => io.observe(i));
  }
  function load(img) {
    const m = MQ.data.movie(img.dataset.poster); if (!m) return;
    const source = img.dataset.posterUrl ? Promise.resolve(img.dataset.posterUrl) : posterURL(m);
    source.then(u => { img.src = u; img.classList.add('in'); });
  }

  /* ---------- food illustrations ---------- */
  function bucket(ctx, cx, cy, s, kind) {
    const colors = { salt: ['#fff3c4', '#f3d576', '#ffffff'], caramel: ['#e0a95a', '#b9742c', '#8a5320'], cheese: ['#ffd36b', '#f5a623', '#ffe9a8'] }[kind || 'salt'];
    const r = rng(hash('pop' + kind)); const tw = 150 * s, bw = 108 * s, bh = 130 * s;
    ctx.fillStyle = '#f2ead8';
    for (let i = 0; i < 26; i++) { const a = r() * 6.28, d = r() * tw * 0.5; const x = cx + Math.cos(a) * d, y = cy - bh * 0.5 - Math.abs(Math.sin(a)) * d * 0.55 - 6 * s; for (let j = 0; j < 3; j++) { ctx.fillStyle = colors[j % 3]; ctx.beginPath(); ctx.arc(x + (j - 1) * 9 * s, y + (j % 2) * 6 * s, (13 + r() * 5) * s, 0, 7); ctx.fill(); } }
    ctx.beginPath(); ctx.moveTo(cx - tw / 2, cy - bh / 2); ctx.lineTo(cx + tw / 2, cy - bh / 2); ctx.lineTo(cx + bw / 2, cy + bh / 2); ctx.lineTo(cx - bw / 2, cy + bh / 2); ctx.closePath(); ctx.save(); ctx.clip();
    for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#fbf7ee' : '#d72638'; ctx.fillRect(cx - tw / 2 + i * (tw / 8), cy - bh / 2, tw / 8, bh); }
    const sh = ctx.createLinearGradient(cx - tw / 2, 0, cx + tw / 2, 0); sh.addColorStop(0, 'rgba(0,0,0,0.25)'); sh.addColorStop(0.4, 'rgba(255,255,255,0.12)'); sh.addColorStop(1, 'rgba(0,0,0,0.3)'); ctx.fillStyle = sh; ctx.fillRect(cx - tw / 2, cy - bh / 2, tw, bh); ctx.restore();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(cx, cy + 6 * s, 30 * s, 17 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#d72638'; ctx.font = `900 ${20 * s}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText('M', cx, cy + 14 * s);
  }
  function cup(ctx, cx, cy, s, v) {
    const col = { cola: ['#7a1f12', '#ff3b30'], lime: ['#7ed957', '#d7ff9e'], tea: ['#d2791a', '#ffc268'] }[v]; const tw = 92 * s, bw = 70 * s, hh = 160 * s;
    ctx.strokeStyle = '#2b2b30'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(cx + 6 * s, cy - hh / 2 - 8 * s); ctx.lineTo(cx + 30 * s, cy - hh / 2 - 62 * s); ctx.lineTo(cx + 50 * s, cy - hh / 2 - 62 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - tw / 2, cy - hh / 2); ctx.lineTo(cx + tw / 2, cy - hh / 2); ctx.lineTo(cx + bw / 2, cy + hh / 2); ctx.lineTo(cx - bw / 2, cy + hh / 2); ctx.closePath(); ctx.save(); ctx.clip();
    ctx.fillStyle = '#fafafa'; ctx.fillRect(cx - tw, cy - hh / 2, tw * 2, hh); const lg = ctx.createLinearGradient(0, cy - hh * 0.1, 0, cy + hh / 2); lg.addColorStop(0, col[1]); lg.addColorStop(1, col[0]); ctx.fillStyle = lg; ctx.fillRect(cx - tw, cy - hh * 0.1, tw * 2, hh);
    ctx.fillStyle = '#d72638'; ctx.fillRect(cx - tw, cy - hh * 0.38, tw * 2, hh * 0.16); const r = rng(5); ctx.fillStyle = 'rgba(255,255,255,0.45)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(cx + (r() - 0.5) * bw * 0.8, cy + hh * (0.05 + r() * 0.4), (2 + r() * 3) * s, 0, 7); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(cx - tw / 2 + 8 * s, cy - hh / 2, 12 * s, hh); ctx.restore();
    ctx.fillStyle = '#2b2b30'; ctx.beginPath(); ctx.ellipse(cx, cy - hh / 2, tw / 2 + 5 * s, 9 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#3a3a42'; ctx.fillRect(cx - tw / 2 + 4 * s, cy - hh / 2 - 12 * s, tw - 8 * s, 12 * s);
  }
  function nachos(ctx, cx, cy, s, v) {
    const r = rng(hash('nach' + v)); ctx.fillStyle = '#f4f1ea'; ctx.beginPath(); ctx.ellipse(cx, cy + 24 * s, 150 * s, 62 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#e2ddd0'; ctx.beginPath(); ctx.ellipse(cx, cy + 24 * s, 124 * s, 46 * s, 0, 0, 7); ctx.fill();
    for (let i = 0; i < 24; i++) { const a = r() * 6.28, d = r() * 100 * s, x = cx + Math.cos(a) * d, y = cy + 10 * s + Math.sin(a) * d * 0.4 - (i / 24) * 36 * s; ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 6.28); ctx.fillStyle = i % 3 ? '#e8a93a' : '#d98f22'; ctx.beginPath(); ctx.moveTo(-26 * s, 18 * s); ctx.lineTo(26 * s, 18 * s); ctx.lineTo(0, -28 * s); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(120,70,10,0.4)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
    if (v === 'cheesy') { ctx.strokeStyle = '#ffd24a'; ctx.lineWidth = 9 * s; ctx.lineCap = 'round'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(cx - 90 * s, cy - 10 * s + k * 10 * s); for (let x = -90; x <= 90; x += 20) ctx.lineTo(cx + x * s, cy - 14 * s + k * 10 * s + (x % 40 ? 7 : -7) * s); ctx.stroke(); } ctx.fillStyle = '#3f9c3a'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(cx + (r() - 0.5) * 150 * s, cy - 16 * s + r() * 30 * s, 7 * s, 0, 7); ctx.fill(); } }
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx + 120 * s, cy + 40 * s, 34 * s, 0, 7); ctx.fill(); ctx.fillStyle = '#c0261b'; ctx.beginPath(); ctx.arc(cx + 120 * s, cy + 38 * s, 26 * s, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.arc(cx + 112 * s, cy + 30 * s, 8 * s, 0, 7); ctx.fill();
  }
  function burger(ctx, cx, cy, s, v) {
    const w = 190 * s; ctx.fillStyle = '#c98a3c'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cx - w / 2, cy + 38 * s, w, 34 * s, 16 * s) : ctx.rect(cx - w / 2, cy + 38 * s, w, 34 * s); ctx.fill();
    ctx.fillStyle = v === 'veg' ? '#7a5a2a' : '#d99a2b'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cx - w / 2 - 6 * s, cy + 10 * s, w + 12 * s, 34 * s, 16 * s) : ctx.rect(cx - w / 2, cy + 10 * s, w, 34 * s); ctx.fill();
    if (v === 'chicken') { ctx.fillStyle = 'rgba(120,70,10,0.5)'; const r = rng(3); for (let i = 0; i < 40; i++) { ctx.fillRect(cx - w / 2 + r() * w, cy + 14 * s + r() * 26 * s, 3, 3); } }
    ctx.fillStyle = '#ffc928'; ctx.beginPath(); ctx.moveTo(cx - w / 2, cy + 6 * s); ctx.lineTo(cx + w / 2, cy + 6 * s); ctx.lineTo(cx + w / 2 - 14 * s, cy + 24 * s); ctx.lineTo(cx + w / 4, cy + 12 * s); ctx.lineTo(cx, cy + 26 * s); ctx.lineTo(cx - w / 4, cy + 12 * s); ctx.lineTo(cx - w / 2 + 14 * s, cy + 24 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c4382a'; ctx.beginPath(); ctx.ellipse(cx, cy + 2 * s, w / 2 - 6 * s, 9 * s, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = '#5cb83a'; ctx.lineWidth = 12 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - w / 2 - 4 * s, cy - 8 * s); for (let x = -w / 2; x <= w / 2; x += 18 * s) ctx.lineTo(cx + x, cy - 8 * s + ((x / (18 * s)) % 2 ? 6 : -4) * s); ctx.stroke();
    const tg = ctx.createLinearGradient(0, cy - 90 * s, 0, cy - 10 * s); tg.addColorStop(0, '#e8a64a'); tg.addColorStop(1, '#c47a26'); ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(cx - w / 2, cy - 14 * s); ctx.bezierCurveTo(cx - w / 2, cy - 100 * s, cx + w / 2, cy - 100 * s, cx + w / 2, cy - 14 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff3d6'; const r2 = rng(9); for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.ellipse(cx - 60 * s + r2() * 120 * s, cy - 78 * s + r2() * 44 * s, 4 * s, 2.4 * s, r2() * 3, 0, 7); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.ellipse(cx - 40 * s, cy - 58 * s, 36 * s, 12 * s, -0.3, 0, 7); ctx.fill();
  }
  function sandwich(ctx, cx, cy, s, v) {
    const half = (ox, rot) => { ctx.save(); ctx.translate(cx + ox * s, cy); ctx.rotate(rot); const fill = v === 'paneer' ? '#e98a2e' : '#d6a27a';
      ctx.fillStyle = '#d9a95a'; ctx.beginPath(); ctx.moveTo(-70 * s, 56 * s); ctx.lineTo(70 * s, 56 * s); ctx.lineTo(70 * s, 20 * s); ctx.lineTo(-70 * s, 20 * s); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#5cb83a'; ctx.fillRect(-70 * s, 10 * s, 140 * s, 12 * s); ctx.fillStyle = fill; ctx.fillRect(-70 * s, -2 * s, 140 * s, 14 * s); ctx.fillStyle = '#d23a2b'; ctx.fillRect(-70 * s, -10 * s, 140 * s, 9 * s);
      ctx.fillStyle = '#d9a95a'; ctx.beginPath(); ctx.moveTo(-70 * s, -10 * s); ctx.lineTo(70 * s, -10 * s); ctx.lineTo(70 * s, -44 * s); ctx.lineTo(-70 * s, -44 * s); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(110,60,10,0.45)'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = -50; i <= 50; i += 25) { ctx.moveTo(i * s, -42 * s); ctx.lineTo((i + 10) * s, -14 * s); } ctx.stroke(); ctx.restore(); };
    half(-52, -0.08); half(62, 0.1);
  }
  const FOOD = { popcorn: (c, s, v) => bucket(c, 240, 190, 1.35 * s, v), cup: (c, s, v) => cup(c, 240, 190, 1.2 * s, v), nachos: (c, s, v) => nachos(c, 240, 170, 1.2 * s, v), burger: (c, s, v) => burger(c, 240, 190, 1.25 * s, v), sandwich: (c, s, v) => sandwich(c, 240, 190, 1.25 * s, v) };
  function food(canvas, item) {
    const w = canvas.width = 480, h = canvas.height = 360; const ctx = canvas.getContext('2d'); const warm = { Popcorn: '#3a2a1a', Drinks: '#1b2a36', Nachos: '#3a2417', Burgers: '#2f2418', Sandwiches: '#25301c', Combos: '#31202b' }[item.cat];
    const bg = ctx.createRadialGradient(w / 2, h * 0.45, 20, w / 2, h / 2, w * 0.7); bg.addColorStop(0, mix(warm, '#ffffff', 0.18)); bg.addColorStop(1, mix(warm, '#000000', 0.5)); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(w / 2, h * 0.86, 150, 18, 0, 0, 7); ctx.fill();
    if (item.kind === 'combo') {
      if (item.v === 'solo') { bucket(ctx, 190, 200, 1.0, 'salt'); cup(ctx, 330, 205, 0.95, 'cola'); }
      else if (item.v === 'date') { nachos(ctx, 150, 220, 0.62, 'cheesy'); bucket(ctx, 270, 190, 1.0, 'caramel'); cup(ctx, 372, 210, 0.78, 'cola'); cup(ctx, 424, 214, 0.74, 'lime'); }
      else { bucket(ctx, 110, 205, 0.85, 'salt'); bucket(ctx, 215, 195, 0.9, 'cheese'); burger(ctx, 320, 220, 0.55, 'chicken'); cup(ctx, 396, 215, 0.62, 'cola'); cup(ctx, 440, 218, 0.6, 'tea'); }
    } else FOOD[item.kind](ctx, 1, item.v);
    const sheen = ctx.createLinearGradient(0, 0, w, h); sheen.addColorStop(0, 'rgba(255,255,255,0.07)'); sheen.addColorStop(0.5, 'rgba(255,255,255,0)'); ctx.fillStyle = sheen; ctx.fillRect(0, 0, w, h);
    const r = rng(11); for (let i = 0; i < 260; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'; ctx.fillRect(r() * w, r() * h, 1.3, 1.3); }
    return canvas;
  }
  const fcache = {};
  function foodURL(item) {
    const configured = window.MQ_MEDIA && window.MQ_MEDIA.food && window.MQ_MEDIA.food[item.id];
    if (configured) { fcache[item.id] = Promise.resolve(configured); return fcache[item.id]; }
    if (!fcache[item.id]) fcache[item.id] = new Promise(res => { const c = document.createElement('canvas'); food(c, item); c.toBlob(b => res(b ? URL.createObjectURL(b) : c.toDataURL('image/jpeg', 0.8)), 'image/webp', 0.78); });
    return fcache[item.id];
  }
  let fio;
  function lazyFood(root) {
    const imgs = Array.from((root || document).querySelectorAll('img[data-food]:not([src])'));
    const go = el => MQ.data.snack(el.dataset.food) && foodURL(MQ.data.snack(el.dataset.food)).then(u => { el.src = u; el.classList.add('in'); });
    if (!('IntersectionObserver' in window)) { imgs.forEach(go); return; }
    fio = fio || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fio.unobserve(e.target); go(e.target); } }), { rootMargin: '240px' });
    imgs.forEach(i => fio.observe(i));
  }

  /* ---------- QR-style visual (decorative, not a scannable code) ---------- */
  function qr(text) {
    const N = 29, r = rng(hash(text)); const g = Array.from({ length: N }, () => Array(N).fill(0));
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) g[y][x] = r() > 0.52 ? 1 : 0;
    const finder = (ox, oy) => { for (let y = -1; y <= 7; y++) for (let x = -1; x <= 7; x++) { const X = ox + x, Y = oy + y; if (X < 0 || Y < 0 || X >= N || Y >= N) continue; const edge = x === 0 || x === 6 || y === 0 || y === 6, core = x >= 2 && x <= 4 && y >= 2 && y <= 4; g[Y][X] = (x >= 0 && x <= 6 && y >= 0 && y <= 6 && (edge || core)) ? 1 : 0; } };
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
    for (let i = 8; i < N - 8; i++) { g[6][i] = i % 2 ? 0 : 1; g[i][6] = i % 2 ? 0 : 1; }
    let d = ''; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (g[y][x]) d += `M${x} ${y}h1v1h-1z`;
    return `<svg class="qr" viewBox="-2 -2 ${N + 4} ${N + 4}" role="img" aria-label="Demo QR code" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${N + 4}" height="${N + 4}" fill="#fff"/><path d="${d}" fill="#0c0c0f"/></svg>`;
  }

  function initials(name) { return name.split(' ').map(w => w[0]).slice(0, 2).join(''); }
  function avatarGradient(name) { const h = hash(name) % 360; return `linear-gradient(135deg,hsl(${h} 38% 32%),hsl(${(h + 40) % 360} 42% 20%))`; }

  return { scene, poster, banner, posterURL, lazyPosters, foodURL, lazyFood, food, qr, initials, avatarGradient, rgba, mix };
})();
MQ.fontsReady = (async () => { try { await Promise.race([Promise.all([document.fonts.load('900 40px "Big Shoulders Display"'), document.fonts.load('500 16px "Hanken Grotesk"'), document.fonts.load('500 14px "IBM Plex Mono"')]), MQ.util.delay(1800)]); } catch (e) { /* fall back to system fonts */ } })();

/* ============================================================
   MODULE: state + seats + booking logic
   ============================================================ */
MQ.state = (() => {
  const { store } = MQ.util;
  const S = {
    city: store.get('mq_city', 'Bengaluru'),
    lang: 'All', q: '',
    draft: store.get('mq_draft', null),      // {movieId, theatreId, date, time, lang, fmt, seats:[]}
    cart: store.get('mq_cart', {}),          // {snackId: qty}
    promo: store.get('mq_promo', ''),
    bookings: store.get('mq_bookings', []),
    taken: store.get('mq_taken', {}),        // {showKey: [seatId]} seats booked in this demo
    notify: store.get('mq_notify', []),
    view: store.get('mq_view', null),        // '3d' | '2d' | null (auto)
    dateISO: null, fmtFilter: 'All', langFilter: 'All'
  };
  const save = () => {
    store.set('mq_city', S.city); store.set('mq_draft', S.draft); store.set('mq_cart', S.cart); store.set('mq_promo', S.promo);
    store.set('mq_bookings', S.bookings); store.set('mq_taken', S.taken); store.set('mq_notify', S.notify); store.set('mq_view', S.view);
  };
  return Object.assign(S, { save });
})();

MQ.seats = (() => {
  const { rng, hash } = MQ.util;
  const TIERS = {
    standard: { label: 'Standard', base: 190, color: '#7b88a3' },
    premium: { label: 'Premium', base: 290, color: '#d8a74f' },
    recliner: { label: 'Recliner', base: 590, color: '#a984e0' },
    balcony: { label: 'Balcony', base: 340, color: '#e48b6c' }
  };
  const STATE_COLORS = { selected: '#52f0a8', occupied: '#2c2d34' };

  const rows = [];
  function build() {
    rows.length = 0;
    const def = [];
    'ABCD'.split('').forEach(id => def.push([id, 'standard']));
    'EFGH'.split('').forEach(id => def.push([id, 'premium']));
    'IJ'.split('').forEach(id => def.push([id, 'recliner']));
    let idx = 0;
    def.forEach(([id, tier]) => {
      const rec = tier === 'recliner';
      const z = rec ? (id === 'I' ? 3.375 : 5.275) : -6.2 + idx * 1.15;
      const y = 0.22 * idx; const dz = rec ? 1.9 : 1.15;
      mk(id, tier, z, y, dz, rec ? [2, 4, 2] : [4, 6, 4], rec ? 1.2 : 0.74, rec ? 1.5 : 1.3, rec ? 1.55 : 1);
      idx++;
    });
    [['K', 10.6, 5.0], ['L', 11.85, 5.35], ['M', 13.1, 5.7]].forEach(([id, z, y]) => mk(id, 'balcony', z, y, 1.25, [4, 6, 4], 0.78, 1.3, 1.05));
  }
  function mk(id, tier, z, y, dz, blocks, pitch, gap, sw) {
    const total = blocks.reduce((a, b) => a + b, 0) * pitch + (blocks.length - 1) * gap;
    let cursor = -total / 2; let n = 0; const seats = []; const aisles = [];
    blocks.forEach((b, bi) => {
      for (let i = 0; i < b; i++) { n++; seats.push({ id: id + n, row: id, num: n, tier, x: cursor + pitch / 2, y, z, sw, block: bi }); cursor += pitch; }
      if (bi < blocks.length - 1) { aisles.push(cursor + gap / 2); cursor += gap; }
    });
    rows.push({ id, tier, z, y, dz, seats, width: total, aisles, sw });
  }
  build();
  const all = rows.flatMap(r => r.seats); all.forEach((s, i) => { s.i = i; });
  const byId = {}; all.forEach(s => { byId[s.id] = s; });

  // Floor height for the main (ground) level and the balcony level.
  const mainRows = rows.filter(r => r.tier !== 'balcony'), balRows = rows.filter(r => r.tier === 'balcony');
  function floorY(z) {
    if (z < -14.6) return 0.6;
    if (z < mainRows[0].z - mainRows[0].dz / 2) return 0;
    for (const r of mainRows) if (Math.abs(z - r.z) <= r.dz / 2 + 0.001) return r.y;
    const last = mainRows[mainRows.length - 1];
    if (z > last.z) return last.y;
    for (let i = 0; i < mainRows.length - 1; i++) { if (z > mainRows[i].z && z < mainRows[i + 1].z) return mainRows[i].y; }
    return 0;
  }
  function balconyY(z) {
    for (const r of balRows) if (Math.abs(z - r.z) <= r.dz / 2 + 0.001) return r.y;
    if (z < balRows[0].z) return 5.0;
    return balRows[balRows.length - 1].y;
  }

  function showKey(d) { return [d.movieId, d.theatreId, d.date, d.time].join('|'); }
  function occupiedFor(d) {
    const r = rng(hash(showKey(d)));
    const p = { standard: 0.5, premium: 0.38, recliner: 0.3, balcony: 0.32 };
    const set = new Set();
    all.forEach(s => { if (r() < p[s.tier]) set.add(s.id); });
    (MQ.state.taken[showKey(d)] || []).forEach(id => set.add(id));
    return set;
  }
  function price(tier, theatre, show) {
    const sur = show && show.fmt === 'Dolby Atmos' ? 30 : show && show.fmt === 'Laser 4K' ? 40 : 0;
    return Math.round((TIERS[tier].base * theatre.mult + sur) / 10) * 10;
  }
  return { TIERS, STATE_COLORS, rows, all, byId, floorY, balconyY, showKey, occupiedFor, price };
})();

MQ.booking = (() => {
  const S = MQ.state, D = MQ.data, SE = MQ.seats;
  const FEE = 30;
  const PROMOS = {
    MARVEL10: { label: '10% off tickets (max ₹150)', calc: (t) => Math.min(150, Math.round(t.tickets * 0.1)) },
    FIRSTSHOW: { label: '₹100 off on tickets above ₹400', calc: (t) => t.tickets >= 400 ? 100 : 0 }
  };
  function currentShow() {
    const d = S.draft; if (!d) return null;
    return { movie: D.movie(d.movieId), theatre: D.theatre(d.theatreId), date: d.date, time: d.time, fmt: d.fmt, lang: d.lang };
  }
  function seatLines() {
    const d = S.draft; if (!d) return []; const th = D.theatre(d.theatreId);
    return (d.seats || []).map(id => { const s = SE.byId[id]; return { id, tier: s.tier, label: SE.TIERS[s.tier].label, price: SE.price(s.tier, th, d) }; });
  }
  function snackLines() {
    return Object.entries(S.cart).filter(([, q]) => q > 0).map(([id, q]) => { const it = D.snack(id); return it ? { id, name: it.name, size: it.size, qty: q, price: it.price, total: it.price * q } : null; }).filter(Boolean);
  }
  function totals() {
    const seats = seatLines(), snacks = snackLines();
    const t = { tickets: seats.reduce((a, s) => a + s.price, 0), snacks: snacks.reduce((a, s) => a + s.total, 0), fee: seats.length * FEE, discount: 0 };
    const p = PROMOS[(S.promo || '').toUpperCase()]; if (p) t.discount = Math.min(p.calc(t), t.tickets);
    t.total = t.tickets + t.snacks + t.fee - t.discount; t.count = seats.length; t.snackCount = snacks.reduce((a, s) => a + s.qty, 0);
    return t;
  }
  function newId() {
    const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = 'MQ'; for (let i = 0; i < 7; i++) s += A[Math.floor(Math.random() * A.length)]; return s;
  }
  function confirm(payMethod) {
    const d = S.draft, t = totals();
    const b = { id: newId(), movieId: d.movieId, theatreId: d.theatreId, date: d.date, time: d.time, fmt: d.fmt, lang: d.lang, seats: seatLines(), snacks: snackLines(), totals: t, promo: PROMOS[(S.promo || '').toUpperCase()] ? S.promo.toUpperCase() : '', pay: payMethod, at: Date.now() };
    S.bookings.unshift(b);
    const key = SE.showKey(d); S.taken[key] = (S.taken[key] || []).concat(d.seats);
    S.draft = null; S.cart = {}; S.promo = ''; S.save();
    return b;
  }
  return { FEE, PROMOS, currentShow, seatLines, snackLines, totals, confirm };
})();

/* ============================================================
   MODULE: hero ring  (draggable ring of concave cinema screens, Three.js)
   Viewer stands inside the ring. Drag to rotate, tap a screen to focus it,
   tap the focused screen to open the movie.
   ============================================================ */
MQ.ring = (() => {
  const THREE = window.THREE;
  const { clamp } = MQ.util;

  function create(host, opts) {
    if (!THREE) return null;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      if (!renderer.getContext()) throw new Error('no gl');
    } catch (e) { return null; }
    const mobile = matchMedia('(pointer:coarse)').matches || innerWidth < 760;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement; canvas.className = 'ring-canvas'; canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'Ring of movie screens. Drag or use arrow keys to rotate, Enter to open.');
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    const group = new THREE.Group(); scene.add(group);

    let list = [], panels = [], N = 0, R = 8, step = 1;
    let rot = 0, vel = 0, targetRot = null, dragging = false, lastInteract = 0, focus = -1, dirty = true, raf = 0, disposed = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Floor glow disc + light ring
    function discTexture() {
      const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
      const g = x.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, 'rgba(255,255,255,0.22)'); g.addColorStop(0.6, 'rgba(255,255,255,0.05)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); return t;
    }
    const floorTex = discTexture();
    const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.MeshBasicMaterial({ map: floorTex, transparent: true, depthWrite: false }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -1.9; scene.add(floor);
    const ringLine = new THREE.Mesh(new THREE.RingGeometry(7.6, 7.66, 96), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }));
    ringLine.rotation.x = -Math.PI / 2; ringLine.position.y = -1.88; scene.add(ringLine);

    // Dust
    const dustN = mobile ? 60 : 130; const pos = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) { const a = Math.random() * 6.283, d = Math.random() * 9; pos[i * 3] = Math.cos(a) * d; pos[i * 3 + 1] = -1.8 + Math.random() * 6; pos[i * 3 + 2] = Math.sin(a) * d; }
    const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.35, depthWrite: false })); scene.add(dust);

    function disposePanels() {
      panels.forEach(p => { group.remove(p.mesh); group.remove(p.frame); p.mesh.geometry.dispose(); p.frame.geometry.dispose(); p.mesh.material.map.dispose(); p.mesh.material.dispose(); p.frame.material.dispose(); });
      panels = [];
    }

    function setMovies(movies) {
      disposePanels(); list = movies.slice(); N = list.length; if (!N) { focus = -1; dirty = true; return; }
      step = Math.PI * 2 / N; R = Math.max(7.2, N * 0.74);
      const h = 2.9, w = 0.9 * step, texW = mobile ? 640 : 1024, texH = Math.round(texW * 0.625);
      list.forEach((m, i) => {
        const c = document.createElement('canvas'); MQ.art.banner(c, m, { w: texW, h: texH });
        const tex = new THREE.CanvasTexture(c); tex.wrapS = THREE.RepeatWrapping; tex.repeat.x = -1; tex.offset.x = 1; tex.anisotropy = 4;
        const th = Math.PI + i * step - w / 2;
        const geo = new THREE.CylinderGeometry(R, R, h, 20, 1, true, th, w);
        const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, toneMapped: false, color: 0x777777 });
        const mesh = new THREE.Mesh(geo, mat); mesh.userData.i = i;
        const fgeo = new THREE.CylinderGeometry(R + 0.03, R + 0.03, h + 0.22, 20, 1, true, th - 0.012, w + 0.024);
        const frame = new THREE.Mesh(fgeo, new THREE.MeshBasicMaterial({ color: 0x1a1a20, side: THREE.BackSide }));
        const panel = { mesh, frame, bright: 0.45 };
        group.add(frame); group.add(mesh); panels.push(panel);
        if (m.poster) {
          const loader = new THREE.TextureLoader();
          loader.load(m.poster, posterTex => {
            if (disposed || !panels.includes(panel)) { posterTex.dispose(); return; }
            posterTex.wrapS = THREE.RepeatWrapping; posterTex.repeat.x = -1; posterTex.offset.x = 1; posterTex.anisotropy = 4;
            mesh.material.map = posterTex; mesh.material.needsUpdate = true; tex.dispose();
          }, undefined, () => {});
        }
      });
      ringLine.scale.setScalar(R / 7.63);
      rot = 0; targetRot = null; focus = -1; fit(); update(true);
    }

    function fit() {
      const w = host.clientWidth || 800, h = host.clientHeight || 500; if (!w || !h) return;
      renderer.setSize(w, h, false); canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      const portrait = w / h < 0.9; camera.aspect = w / h; camera.fov = portrait ? 66 : 46;
      camera.position.set(0, portrait ? 0.15 : 0.35, R * (portrait ? 0.5 : 0.18)); camera.lookAt(0, portrait ? -1.0 : -0.65, -R); camera.updateProjectionMatrix(); dirty = true;
    }

    function idxFromRot() { return ((Math.round(-rot / step) % N) + N) % N; }
    function update(force) {
      if (!N) return; const f = idxFromRot();
      if (f !== focus || force) { focus = f; opts.onFocus && opts.onFocus(list[f], f); }
    }

    // ---- input
    const ptr = { id: null, x: 0, y: 0, sx: 0, sy: 0, t: 0, moved: 0 };
    canvas.style.touchAction = 'pan-y';
    canvas.addEventListener('pointerdown', e => {
      ptr.id = e.pointerId; ptr.x = ptr.sx = e.clientX; ptr.y = ptr.sy = e.clientY; ptr.t = performance.now(); ptr.moved = 0; dragging = true; vel = 0; targetRot = null; lastInteract = performance.now();
      try { canvas.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
    });
    canvas.addEventListener('pointermove', e => {
      if (!dragging || e.pointerId !== ptr.id) return;
      const dx = e.clientX - ptr.x; ptr.x = e.clientX; ptr.moved += Math.abs(dx) + Math.abs(e.clientY - ptr.y); ptr.y = e.clientY;
      const k = 2.6 / (host.clientWidth || 800); const d = -dx * k; rot += d; vel = d; lastInteract = performance.now(); dirty = true; update();
    });
    const up = e => {
      if (!dragging || e.pointerId !== ptr.id) return; dragging = false; lastInteract = performance.now();
      if (ptr.moved < 8 && performance.now() - ptr.t < 450) tap(e.clientX, e.clientY);
    };
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); next(-1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (list[focus]) opts.onOpen && opts.onOpen(list[focus]); }
    });
    const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
    function tap(cx, cy) {
      const r = canvas.getBoundingClientRect(); v2.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
      group.updateMatrixWorld(true); ray.setFromCamera(v2, camera);
      const hit = ray.intersectObjects(panels.map(p => p.mesh), false)[0];
      if (!hit) return; const i = hit.object.userData.i;
      if (i === focus) opts.onOpen && opts.onOpen(list[i]); else focusIndex(i);
    }
    function focusIndex(i) { // rotate along the shortest way
      let k = Math.round(-rot / step); let cur = ((k % N) + N) % N; let diff = i - cur; if (diff > N / 2) diff -= N; if (diff < -N / 2) diff += N;
      targetRot = -(k + diff) * step; dirty = true;
    }
    function next(d) { lastInteract = performance.now(); const k = Math.round(-rot / step) + d; targetRot = -k * step; dirty = true; }

    let last = performance.now(), autoT = 0;
    function frame(now) {
      raf = requestAnimationFrame(frame); if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!N) { if (dirty) { renderer.render(scene, camera); dirty = false; } return; }
      if (!dragging) {
        if (targetRot !== null) { rot += (targetRot - rot) * (1 - Math.exp(-dt * 7)); if (Math.abs(targetRot - rot) < 0.0004) { rot = targetRot; targetRot = null; } dirty = true; update(); }
        else if (Math.abs(vel) > 0.0006) { rot += vel; vel *= Math.pow(0.04, dt); dirty = true; update(); if (Math.abs(vel) <= 0.0006) { vel = 0; targetRot = -Math.round(-rot / step) * step; } }
        else if (!reduce && !document.hidden && now - lastInteract > 6000) { autoT += dt; if (autoT > 4.2) { autoT = 0; next(1); lastInteract = now - 6000; } }
      }
      group.rotation.y = rot;
      // brighten the focused panel, dim the rest
      const f = focus; panels.forEach((p, i) => {
        const want = i === f ? 1 : 0.42; if (Math.abs(p.bright - want) > 0.004) { p.bright += (want - p.bright) * (1 - Math.exp(-dt * 8)); const c = p.mesh.material.color; c.setScalar(p.bright); dirty = true; }
        const fc = p.frame.material.color; const wf = i === f ? 0xe0384f : 0x1a1a20; if (fc.getHex() !== wf) { fc.setHex(wf); dirty = true; }
      });
      if (!reduce) { dust.rotation.y += dt * 0.02; dirty = true; }
      if (dirty) { renderer.render(scene, camera); dirty = false; }
    }

    const ro = new ResizeObserver(fit); ro.observe(host);
    function onVis() { dirty = true; } document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(frame);

    function destroy() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener('visibilitychange', onVis);
      disposePanels(); floorTex.dispose(); floor.geometry.dispose(); floor.material.dispose(); ringLine.geometry.dispose(); ringLine.material.dispose(); dustGeo.dispose(); dust.material.dispose();
      renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) { /* ignore */ } canvas.remove();
    }
    return { setMovies, next, focusIndex, destroy, get focus() { return focus; }, get list() { return list; }, redraw() { dirty = true; } };
  }
  return { create };
})();

/* ============================================================
   MODULE: 3D cinema hall (Three.js)
   - instanced seats (3 draw calls for 170 seats), no real-time shadows
   - 4 camera modes, bounded inside the hall with floor / slab / wall collision
   - drag to rotate, pinch / wheel to zoom, two-finger drag to pan, tap to select
   ============================================================ */
MQ.hall3d = (() => {
  const THREE = window.THREE;
  const { clamp } = MQ.util;
  const SE = MQ.seats;
  const HW = 11, CEIL = 16, SCREEN_Z = -17.2, BACK_Z = 19.6, BAL_Z0 = 9.3, SLAB_BOT = 4.5;

  const MODES = {
    overview: { type: 'orbit', target: [0, 2.8, -4], yaw: 0.6, pitch: 0.55, r: 16, rMin: 6, rMax: 26, pMin: 0.05, pMax: 1.35, fov: 58 },
    stage: { type: 'look', pos: [0, 2.6, -15.2], yaw: Math.PI, pitch: 0.0, yawRange: 1.05, pMin: -0.6, pMax: 0.45, fov: 64, fMin: 32, fMax: 84 },
    balcony: { type: 'look', pos: [0, 7.1, 12.9], yaw: 0, pitch: -0.04, yawRange: 0.95, pMin: -0.55, pMax: 0.4, fov: 60, fMin: 32, fMax: 84 },
    bird: { type: 'orbit', target: [0, 1.5, 3.6], yaw: 0, pitch: 1.28, r: 14.2, rMin: 5, rMax: 15, pMin: 0.55, pMax: 1.5, fov: 70 }
  };

  /** Keeps a camera position strictly inside the hall and out of floor / seats / balcony slab. */
  function resolve(p) {
    p.x = clamp(p.x, -HW + 0.55, HW - 0.55);
    p.z = clamp(p.z, SCREEN_Z + 2.0, BACK_Z - 0.55);
    p.y = Math.min(p.y, CEIL - 0.7);
    const seatBand = Math.abs(p.x) < 7.6;
    if (p.z < -14.6) { p.y = Math.max(p.y, 0.6 + 1.4); return p; }
    if (p.z < BAL_Z0 - 0.35) { p.y = Math.max(p.y, SE.floorY(p.z) + (seatBand && p.z > -7.2 ? 1.55 : 1.1)); return p; }
    // Under or over the balcony
    const balY = SE.balconyY(p.z), underMax = SLAB_BOT - 0.55, overMin = balY + (seatBand && p.z > 10 ? 1.35 : 1.1);
    const lowFloor = SE.floorY(Math.min(p.z, 6)) + 1.2;
    if (p.z < BAL_Z0 + 0.35) { // front lip and rail: stay clear of the rail volume
      if (p.y > (underMax + overMin) / 2) p.y = Math.max(p.y, 6.4); else p.y = clamp(p.y, lowFloor, underMax);
      return p;
    }
    if (p.y < (underMax + overMin) / 2) p.y = clamp(p.y, lowFloor, underMax); else p.y = Math.max(p.y, overMin);
    return p;
  }

  function create(host, opts) {
    if (!THREE) return null;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      if (!renderer.getContext()) throw new Error('no gl');
    } catch (e) { return null; }
    const mobile = matchMedia('(pointer:coarse)').matches || innerWidth < 820;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    const canvas = renderer.domElement; canvas.className = 'hall-canvas'; canvas.style.touchAction = 'none';
    canvas.setAttribute('aria-label', '3D cinema hall. Drag to look around, pinch or scroll to zoom, tap a seat to select it.');
    host.appendChild(canvas);

    const scene = new THREE.Scene(); scene.background = new THREE.Color(0x07070a); scene.fog = new THREE.Fog(0x07070a, 30, 72);
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 140);

    const L = (c, o) => new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {}));
    const B = (c, o) => new THREE.MeshBasicMaterial(Object.assign({ color: c }, o || {}));
    const box = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); scene.add(m); return m; };
    const movie = opts.movie;

    /* ---- lights (no shadow maps: cheaper on phones) ---- */
    scene.add(new THREE.HemisphereLight(0x9aa0c0, 0x1b1216, 0.85));
    const wl1 = new THREE.PointLight(0xffd9a0, 0.55, 40); wl1.position.set(-6, 13, -2); scene.add(wl1);
    const wl2 = new THREE.PointLight(0xffd9a0, 0.55, 40); wl2.position.set(6, 13, 8); scene.add(wl2);
    const screenLight = new THREE.PointLight(new THREE.Color(movie.palette[2]), 1.1, 34); screenLight.position.set(0, 5.5, -13); scene.add(screenLight);

    /* ---- shell: floor, walls, ceiling ---- */
    const wallMat = L(0x17171d), woodMat = L(0x3a2a22), carpet = L(0x2b1519), carpet2 = L(0x33191e);
    box(HW * 2, 0.6, 40, L(0x120b0d), 0, -0.3, 1.2);                          // base floor
    box(HW * 2, 0.4, 40, L(0x0e0e12), 0, CEIL + 0.2, 1.2);                     // ceiling
    box(0.5, CEIL, 40, wallMat, -HW - 0.25, CEIL / 2, 1.2); box(0.5, CEIL, 40, wallMat, HW + 0.25, CEIL / 2, 1.2);
    box(HW * 2 + 1, CEIL, 0.5, L(0x101014), 0, CEIL / 2, SCREEN_Z - 0.9);       // screen wall
    box(HW * 2 + 1, CEIL, 0.5, L(0x14141a), 0, CEIL / 2, BACK_Z + 0.25);       // back wall
    box(HW * 2, 0.9, 0.1, L(0x0b0b0e), 0, 0.45, SCREEN_Z + 0.1);               // dado behind stage
    // acoustic wall ribs
    const ribGeo = new THREE.BoxGeometry(0.3, CEIL - 4, 0.55); const ribN = 26;
    const ribs = new THREE.InstancedMesh(ribGeo, woodMat, ribN * 2); const dm = new THREE.Object3D();
    for (let i = 0; i < ribN; i++) for (let s = 0; s < 2; s++) { dm.position.set((s ? 1 : -1) * (HW - 0.2), 2.2 + (CEIL - 4) / 2, -15 + i * 1.32); dm.updateMatrix(); ribs.setMatrixAt(i * 2 + s, dm.matrix); }
    scene.add(ribs);
    // ceiling coffers + downlights
    const coffer = new THREE.InstancedMesh(new THREE.BoxGeometry(HW * 2, 0.35, 0.35), L(0x1b1b22), 13);
    for (let i = 0; i < 13; i++) { dm.position.set(0, CEIL - 0.1, -15 + i * 2.9); dm.updateMatrix(); coffer.setMatrixAt(i, dm.matrix); } scene.add(coffer);
    const dl = new THREE.InstancedMesh(new THREE.CircleGeometry(0.2, 10), B(0xfff1cf), 5 * 13); let di = 0;
    for (let i = 0; i < 13; i++) for (let j = 0; j < 5; j++) { dm.position.set(-8 + j * 4, CEIL - 0.28, -13.5 + i * 2.9); dm.rotation.set(Math.PI / 2, 0, 0); dm.updateMatrix(); dl.setMatrixAt(di++, dm.matrix); }
    dm.rotation.set(0, 0, 0); scene.add(dl);

    /* ---- rake: stepped floor under rows ---- */
    SE.rows.filter(r => r.tier !== 'balcony').forEach((r, i) => box(HW * 2 - 0.4, r.y + 0.3, r.dz, i % 2 ? carpet : carpet2, 0, (r.y - 0.3) / 2, r.z));
    const lastMain = SE.rows.filter(r => r.tier !== 'balcony').slice(-1)[0], zBackStart = lastMain.z + lastMain.dz / 2;
    box(HW * 2 - 0.4, lastMain.y + 0.3, BACK_Z - zBackStart, carpet, 0, (lastMain.y - 0.3) / 2, (zBackStart + BACK_Z) / 2);
    // stage, speakers, curtains, screen
    box(18, 0.6, 3.4, L(0x2b1d16), 0, 0.3, -15.9); box(18, 0.05, 0.05, B(0xffb04a), 0, 0.62, -14.18);
    box(1.4, 4.2, 1.2, L(0x0a0a0c), -9.6, 2.7, -16.4); box(1.4, 4.2, 1.2, L(0x0a0a0c), 9.6, 2.7, -16.4);
    const cc = document.createElement('canvas'); cc.width = 128; cc.height = 8; const cx = cc.getContext('2d');
    for (let i = 0; i < 128; i++) { const v = 0.5 + 0.5 * Math.sin(i / 128 * Math.PI * 2 * 9); cx.fillStyle = `rgb(${Math.round(70 + v * 90)},${Math.round(10 + v * 14)},${Math.round(22 + v * 20)})`; cx.fillRect(i, 0, 1, 8); }
    const curTex = new THREE.CanvasTexture(cc); curTex.wrapS = THREE.RepeatWrapping;
    const curMat = new THREE.MeshLambertMaterial({ map: curTex });
    box(3.4, 10.5, 0.5, curMat, -9.5, 5.55, -16.7); box(3.4, 10.5, 0.5, curMat, 9.5, 5.55, -16.7); box(22, 1.2, 0.6, curMat, 0, 11.1, -16.6);
    const SW = 15.2, SH = 6.4, SR = 46;
    const sc = document.createElement('canvas'); MQ.art.banner(sc, movie, { w: 1024, h: Math.round(1024 * SH / SW) });
    const sTex = new THREE.CanvasTexture(sc); sTex.wrapS = THREE.RepeatWrapping; sTex.repeat.x = -1; sTex.offset.x = 1;
    const sGeo = new THREE.CylinderGeometry(SR, SR, SH, 32, 1, true, Math.PI - SW / SR / 2, SW / SR);
    const screen = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({ map: sTex, side: THREE.BackSide, toneMapped: false })); screen.position.set(0, 5.2, SCREEN_Z + SR); scene.add(screen);
    const screenVideoUrl = window.MQ_MEDIA && window.MQ_MEDIA.screenVideos && (window.MQ_MEDIA.screenVideos[movie.id] || window.MQ_MEDIA.screenVideos.default);
    let screenVideo = null, screenVideoTexture = null;
    if (screenVideoUrl) {
      screenVideo = document.createElement('video'); screenVideo.src = screenVideoUrl; screenVideo.crossOrigin = 'anonymous'; screenVideo.loop = true; screenVideo.autoplay = true; screenVideo.muted = false; screenVideo.playsInline = true; screenVideo.preload = 'auto';
      screenVideo.addEventListener('error', () => { opts.onVideoError && opts.onVideoError(screenVideoUrl); });
      screenVideoTexture = new THREE.VideoTexture(screenVideo); screenVideoTexture.wrapS = THREE.RepeatWrapping; screenVideoTexture.repeat.x = -1; screenVideoTexture.offset.x = 1;
      screen.material.map = screenVideoTexture; screen.material.needsUpdate = true;
    }
    box(SW + 0.6, SH + 0.6, 0.15, B(0x050507), 0, 5.2, SCREEN_Z - 0.2);

    /* ---- balcony ---- */
    box(HW * 2 - 0.4, 0.45, BACK_Z - BAL_Z0, L(0x1a1a20), 0, SLAB_BOT + 0.225, (BAL_Z0 + BACK_Z) / 2);
    { const k0 = SE.rows.filter(r => r.tier === 'balcony')[0], zf = k0.z - k0.dz / 2; box(HW * 2 - 0.4, 0.5, zf - BAL_Z0, carpet, 0, SLAB_BOT + 0.25, (BAL_Z0 + zf) / 2); }
    SE.rows.filter(r => r.tier === 'balcony').forEach((r, i) => box(HW * 2 - 0.4, r.y - SLAB_BOT, r.dz, i % 2 ? carpet : carpet2, 0, SLAB_BOT + (r.y - SLAB_BOT) / 2, r.z));
    const bl = SE.rows.filter(r => r.tier === 'balcony').slice(-1)[0], bz = bl.z + bl.dz / 2; box(HW * 2 - 0.4, bl.y - SLAB_BOT, BACK_Z - bz, carpet, 0, SLAB_BOT + (bl.y - SLAB_BOT) / 2, (bz + BACK_Z) / 2);
    box(HW * 2 - 0.8, 1.0, 0.06, new THREE.MeshLambertMaterial({ color: 0x9fd0ff, transparent: true, opacity: 0.22, depthWrite: false }), 0, 5.5, BAL_Z0 + 0.05);
    box(HW * 2 - 0.8, 0.07, 0.14, L(0xb08a4a), 0, 6.02, BAL_Z0 + 0.05); box(HW * 2 - 0.4, 0.12, 0.12, B(0xffb04a), 0, SLAB_BOT + 0.05, BAL_Z0 - 0.04);
    for (let i = 0; i < 3; i++) box(2.4, 1.1, 0.1, B(0x2a3a4a), -5 + i * 5, 9.2, BACK_Z - 0.05);   // projection windows
    box(1.1, 0.35, 0.08, B(0x3ddc97), -HW + 0.1, 7.2, -13.5); box(1.1, 0.35, 0.08, B(0x3ddc97), HW - 0.1, 7.2, -13.5);

    /* ---- aisle lights (instanced) ---- */
    const aisleXs = []; SE.rows.forEach(r => r.aisles.forEach(ax => aisleXs.push([ax, r])));
    const al = new THREE.InstancedMesh(new THREE.BoxGeometry(0.1, 0.04, 0.5), B(0xffb04a), aisleXs.length + SE.rows.length * 2);
    let ai = 0; aisleXs.forEach(([ax, r]) => { dm.position.set(ax, r.y + 0.03, r.z); dm.updateMatrix(); al.setMatrixAt(ai++, dm.matrix); });
    SE.rows.forEach(r => [-1, 1].forEach(s => { dm.position.set(s * (r.width / 2 + 0.5), r.y + 0.03, r.z); dm.updateMatrix(); al.setMatrixAt(ai++, dm.matrix); }));
    scene.add(al);

    /* ---- seats: instanced cushion, back, arm, and an invisible larger hit mesh ---- */
    const seats = SE.all, n = seats.length;
    const cushion = new THREE.InstancedMesh(new THREE.BoxGeometry(0.58, 0.16, 0.54), new THREE.MeshLambertMaterial({ color: 0xffffff }), n);
    const back = new THREE.InstancedMesh(new THREE.BoxGeometry(0.58, 0.7, 0.12), new THREE.MeshLambertMaterial({ color: 0xffffff }), n);
    const arm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.28, 0.5), L(0x16161b), n);
    const hit = new THREE.InstancedMesh(new THREE.BoxGeometry(0.78, 1.3, 0.9), new THREE.MeshBasicMaterial({ visible: false }), n);
    [cushion, back, arm, hit].forEach(m => { m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(m); });
    const col = {}; Object.keys(SE.TIERS).forEach(k => { col[k] = new THREE.Color(SE.TIERS[k].color); });
    const cSel = new THREE.Color(SE.STATE_COLORS.selected), cOcc = new THREE.Color(SE.STATE_COLORS.occupied), cTmp = new THREE.Color(), cWhite = new THREE.Color(0xffffff);
    let occupied = opts.occupied || new Set(), selected = opts.selected || new Set(), hover = -1;
    const eul = new THREE.Euler(), q = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3(), mt = new THREE.Matrix4();
    function place(mesh, i, x, y, z, sx, sy, sz, rx) { eul.set(rx || 0, 0, 0); q.setFromEuler(eul); mt.compose(pv.set(x, y, z), q, sv.set(sx, sy, sz)); mesh.setMatrixAt(i, mt); }
    function paintSeat(i) {
      const s = seats[i], isOcc = occupied.has(s.id), isSel = selected.has(s.id), lift = isSel ? 0.05 : 0, w = s.sw, d = s.tier === 'recliner' ? 1.3 : 1, hh = s.tier === 'recliner' ? 1.18 : 1;
      place(cushion, i, s.x, s.y + 0.44 + lift, s.z - 0.02 * d, w, 1, d);
      place(back, i, s.x, s.y + (0.8 * hh) + lift, s.z + 0.25 * d, w, hh, 1, -0.1);
      place(arm, i, s.x + 0.31 * w, s.y + 0.55, s.z, 1, 1, d); place(hit, i, s.x, s.y + 0.7, s.z + 0.1, w, 1, d);
      if (isOcc) cTmp.copy(cOcc); else if (isSel) cTmp.copy(cSel); else cTmp.copy(col[s.tier]);
      if (hover === i && !isOcc) cTmp.lerp(cWhite, 0.32);
      cushion.setColorAt(i, cTmp); back.setColorAt(i, cTmp);
    }
    function refreshAll() { for (let i = 0; i < n; i++) paintSeat(i); [cushion, back, arm, hit].forEach(m => { m.instanceMatrix.needsUpdate = true; }); cushion.instanceColor.needsUpdate = true; back.instanceColor.needsUpdate = true; hit.computeBoundingSphere && hit.computeBoundingSphere(); dirty = true; }

    /* ---- row numbers on seat backs + row letter badges ---- */
    const labelTex = [];
    SE.rows.forEach(r => {
      const xs = r.seats.map(s => s.x), x0 = Math.min.apply(null, xs) - 0.4, x1 = Math.max.apply(null, xs) + 0.4, W = x1 - x0, ppm = 90;
      [false, true].forEach(front => {
        const c = document.createElement('canvas'); c.width = Math.ceil(W * ppm); c.height = 40; const x = c.getContext('2d'); x.font = '600 22px "IBM Plex Mono",ui-monospace,monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(255,255,255,0.78)';
        r.seats.forEach(s => { const u = front ? (x1 - s.x) : (s.x - x0); x.fillText(String(s.num), u * ppm, 22); });
        const t = new THREE.CanvasTexture(c); t.anisotropy = 4; labelTex.push(t);
        const p = new THREE.Mesh(new THREE.PlaneGeometry(W, 0.28), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }));
        const d = r.tier === 'recliner' ? 1.3 : 1, zb = r.z + 0.25 * d, hh = r.tier === 'recliner' ? 1.18 : 1;
        p.position.set((x0 + x1) / 2, r.y + 0.8 * hh + 0.17, zb + (front ? -0.075 : 0.075)); if (front) p.rotation.y = Math.PI; scene.add(p);
      });
      [-1, 1].forEach(sd => {
        const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.fillStyle = 'rgba(14,14,18,0.92)'; x.beginPath(); x.arc(32, 32, 29, 0, 7); x.fill(); x.lineWidth = 3; x.strokeStyle = SE.TIERS[r.tier].color; x.stroke(); x.fillStyle = '#fff'; x.font = '700 34px "Hanken Grotesk",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(r.id, 32, 34);
        const t = new THREE.CanvasTexture(c); labelTex.push(t); const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); sp.scale.set(0.62, 0.62, 1); sp.position.set(sd * (r.width / 2 + 0.95), r.y + 0.55, r.z); scene.add(sp);
      });
    });

    /* ---- camera rig ---- */
    let mode = opts.mode || 'overview', M = MODES[mode];
    const st = { yaw: M.yaw, pitch: M.pitch, r: M.r || 0, target: new THREE.Vector3(...(M.target || [0, 0, 0])), fov: M.fov };
    const curPos = new THREE.Vector3(), curLook = new THREE.Vector3(), goalPos = new THREE.Vector3(), goalLook = new THREE.Vector3(), dirv = new THREE.Vector3();
    let curFov = M.fov, dirty = true, disposed = false, raf = 0, ready = false;
    function fovAdjust(f) { // in portrait the horizontal view gets narrow, so widen the vertical fov (capped to limit distortion)
      const a = camera.aspect; if (a >= 1) return f; const k = 1 + (1 - a) * 1.8, t = Math.min(0.9, Math.tan(f * Math.PI / 360) * k); return Math.max(f, 2 * Math.atan(t) * 180 / Math.PI);
    }
    function goals() {
      if (M.type === 'orbit') {
        const cp = Math.cos(st.pitch); goalPos.set(st.target.x + st.r * Math.sin(st.yaw) * cp, st.target.y + st.r * Math.sin(st.pitch), st.target.z + st.r * Math.cos(st.yaw) * cp); goalLook.copy(st.target);
      } else {
        goalPos.set(...M.pos); const cp = Math.cos(st.pitch); dirv.set(Math.sin(st.yaw) * cp, Math.sin(st.pitch), -Math.cos(st.yaw) * cp); goalLook.copy(goalPos).addScaledVector(dirv, 10);
      }
      resolve(goalPos);
    }
    function setMode(name, instant) {
      if (!MODES[name]) return; mode = name; M = MODES[name]; st.yaw = M.yaw; st.pitch = M.pitch; st.r = M.r || 0; st.fov = M.fov; if (M.target) st.target.set(...M.target);
      goals(); if (instant) { curPos.copy(goalPos); curLook.copy(goalLook); curFov = fovAdjust(st.fov); } dirty = true;
    }
    function zoom(f) { // f > 1 zooms in
      if (M.type === 'orbit') st.r = clamp(st.r / f, M.rMin, M.rMax); else st.fov = clamp(st.fov / f, M.fMin, M.fMax); dirty = true;
    }
    function rotate(dx, dy) {
      const k = M.type === 'orbit' ? 0.0062 : 0.0042 * (st.fov / 60);
      st.yaw -= dx * k; st.pitch += dy * k * (M.type === 'orbit' ? 0.85 : 1);
      if (M.type === 'look') st.yaw = clamp(st.yaw, M.yaw - M.yawRange, M.yaw + M.yawRange);
      st.pitch = clamp(st.pitch, M.pMin, M.pMax); dirty = true;
    }
    function pan(dx, dy) {
      if (M.type !== 'orbit') return; const s = st.r * 0.0016;
      st.target.x -= Math.cos(st.yaw) * dx * s; st.target.z += Math.sin(st.yaw) * dx * s; st.target.x += -Math.sin(st.yaw) * dy * s * 1.0; st.target.z += -Math.cos(st.yaw) * dy * s * 1.0;
      st.target.x = clamp(st.target.x, -8, 8); st.target.z = clamp(st.target.z, -12, 16); dirty = true;
    }

    /* ---- picking ---- */
    const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
    function pick(cx, cy) {
      const r = canvas.getBoundingClientRect(); v2.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
      camera.updateMatrixWorld(true); ray.setFromCamera(v2, camera);
      const h = ray.intersectObject(hit, false); return h.length ? seats[h[0].instanceId] : null;
    }

    /* ---- input ---- */
    const ptrs = new Map(); let down = null, lastDist = 0, lastMid = null;
    canvas.addEventListener('pointerdown', e => {
      try { canvas.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 1) down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 }; else { down = null; const [a, b] = [...ptrs.values()]; lastDist = Math.hypot(a.x - b.x, a.y - b.y); lastMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
      opts.onHover && opts.onHover(null);
    });
    canvas.addEventListener('pointermove', e => {
      const p = ptrs.get(e.pointerId);
      if (!p) { if (e.pointerType === 'mouse') { const s = pick(e.clientX, e.clientY); const i = s ? s.i : -1; if (i !== hover) { const o = hover; hover = i; if (o >= 0) paintSeat(o); if (i >= 0) paintSeat(i); refreshHover(); } opts.onHover && opts.onHover(s, e.clientX, e.clientY); canvas.style.cursor = s && !occupied.has(s.id) ? 'pointer' : 'grab'; } return; }
      const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
      if (ptrs.size === 1) { if (down) down.moved += Math.abs(dx) + Math.abs(dy); rotate(dx, dy); }
      else if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        if (lastDist) zoom(d / lastDist); pan(mid.x - lastMid.x, mid.y - lastMid.y); lastDist = d; lastMid = mid;
      }
    });
    const end = e => {
      if (!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId);
      if (down && ptrs.size === 0 && down.moved < 9 && performance.now() - down.t < 500) { const s = pick(e.clientX, e.clientY); if (s) opts.onSeat && opts.onSeat(s, e.clientX, e.clientY, e.pointerType); }
      if (ptrs.size === 0) down = null; lastDist = 0;
    };
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('pointerleave', () => { if (hover !== -1) { const o = hover; hover = -1; paintSeat(o); refreshHover(); } opts.onHover && opts.onHover(null); });
    canvas.addEventListener('wheel', e => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1); }, { passive: false });
    canvas.addEventListener('keydown', e => { const k = { ArrowLeft: [-30, 0], ArrowRight: [30, 0], ArrowUp: [0, -30], ArrowDown: [0, 30] }[e.key]; if (k) { e.preventDefault(); rotate(k[0], k[1]); } else if (e.key === '+') zoom(1.15); else if (e.key === '-') zoom(1 / 1.15); });
    canvas.tabIndex = 0;
    function refreshHover() { cushion.instanceColor.needsUpdate = true; back.instanceColor.needsUpdate = true; hit.instanceMatrix.needsUpdate = true; dirty = true; }

    /* ---- sizing, loop ---- */
    function fit() { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); canvas.style.width = '100%'; canvas.style.height = '100%'; camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true; }
    const ro = new ResizeObserver(fit); ro.observe(host); fit();

    let last = performance.now(), slowFrames = 0, frames = 0, tStart = performance.now(), slowReported = false;
    function frame(now) {
      raf = requestAnimationFrame(frame); if (disposed) return;
      const dt = Math.min(0.06, (now - last) / 1000); last = now;
      goals(); const k = 1 - Math.exp(-dt * 8.5);
      const dp = curPos.distanceToSquared(goalPos), dl = curLook.distanceToSquared(goalLook), tf = fovAdjust(st.fov), df = Math.abs(curFov - tf);
      if (dp > 1e-6 || dl > 1e-6 || df > 0.01) {
        curPos.lerp(goalPos, k); curLook.lerp(goalLook, k); curFov += (tf - curFov) * k; dirty = true;
        if (dp < 1e-5 && dl < 1e-5 && df < 0.02) { curPos.copy(goalPos); curLook.copy(goalLook); curFov = tf; }
      }
      if (screenVideo && !screenVideo.paused && !screenVideo.ended) {
        dirty = true;
        if (screenVideoTexture) screenVideoTexture.needsUpdate = true;
      }
      if (dirty) {
        camera.position.copy(curPos); resolve(camera.position); camera.fov = curFov; camera.updateProjectionMatrix(); camera.lookAt(curLook);
        renderer.render(scene, camera); dirty = false;
        if (!ready) { ready = true; opts.onReady && opts.onReady(); }
        frames++; if (!window.__noSlowCheck && !slowReported && now - tStart < 6000 && dt > 0.05) { slowFrames++; if (slowFrames > 14) { slowReported = true; opts.onSlow && opts.onSlow(); } }
      }
    }
    refreshAll(); setMode(mode, true); raf = requestAnimationFrame(frame);

    function setSeats(occ, sel) { if (occ) occupied = occ; if (sel) selected = sel; refreshAll(); }
    function destroy() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect();
      if (screenVideo) { screenVideo.pause(); screenVideo.removeAttribute('src'); screenVideo.load(); }
      const geos = new Set(), mats = new Set(), texs = new Set(labelTex);
      scene.traverse(o => { if (o.geometry) geos.add(o.geometry); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { mats.add(m); if (m.map) texs.add(m.map); }); });
      geos.forEach(g => g.dispose()); texs.forEach(t => t.dispose()); mats.forEach(m => m.dispose());
      [cushion, back, arm, hit, ribs, coffer, dl, al].forEach(m => m.dispose && m.dispose());
      renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) { /* ignore */ } canvas.remove();
    }
    function playScreenVideo() {
      if (!screenVideo) return;
      if (!screenVideo.paused && !screenVideo.ended) return;
      const result = screenVideo.play();
      if (result && result.catch) result.catch(() => { opts.onVideoBlocked && opts.onVideoBlocked(); });
    }
    return { setMode, zoom, setSeats, playScreenVideo, destroy, reset: () => setMode(mode), get mode() { return mode; }, debugCamera: () => ({ pos: camera.position.toArray(), mode }), resolve };
  }
  return { create, MODES, resolve };
})();

/* ============================================================
   MODULE: trailer  (procedural cinematic trailer on a 2D canvas)
   There is no video file. The trailer is a 34 second timeline of title cards,
   camera moves over the film's art, a cut montage, cast reveal and title card.
   ============================================================ */
MQ.trailer = (() => {
  const { rng, hash, clamp } = MQ.util;
  const DUR = 34, CUTS = [12, 13.4, 14.6, 15.6, 16.4, 17.2, 18.4], HITS = [3, 12, 17.2, 27];

  function create(canvas, movie, hooks) {
    const ctx = canvas.getContext('2d');
    const art = document.createElement('canvas'); art.width = 1280; art.height = 720; MQ.art.scene(art.getContext('2d'), 1280, 720, movie);
    const grain = document.createElement('canvas'); grain.width = grain.height = 200; { const g = grain.getContext('2d'), r = rng(3), id = g.createImageData(200, 200); for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 26; } g.putImageData(id, 0, 0); }
    const crops = CUTS.map((_, i) => { const r = rng(hash(movie.id + 'c' + i)); return { z: 1.3 + r() * 0.7, x: r(), y: r() }; });
    let w = 0, h = 0, dpr = 1, t = 0, playing = false, ended = false, last = 0, raf = 0, muted = true, audio = null, lastT = 0, disposed = false, visible = true;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let grainPat = null;
    function resize() { dpr = Math.min(window.devicePixelRatio || 1, 1.5); w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = Math.max(2, Math.round(w * dpr)); canvas.height = Math.max(2, Math.round(h * dpr)); grainPat = ctx.createPattern(grain, 'repeat'); draw(); }
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const ease = x => x * x * (3 - 2 * x), fade = (t0, t1, t2, t3) => t < t0 || t > t3 ? 0 : t < t1 ? ease((t - t0) / (t1 - t0)) : t < t2 ? 1 : ease(1 - (t - t2) / (t3 - t2));
    function drawArt(zoom, ox, oy, alpha, bright) {
      const s = Math.max(w / 1280, h / 720) * zoom, dw = 1280 * s, dh = 720 * s;
      ctx.globalAlpha = alpha; ctx.drawImage(art, (w - dw) / 2 + ox * (dw - w) / 2, (h - dh) / 2 + oy * (dh - h) / 2, dw, dh);
      if (bright < 1) { ctx.fillStyle = `rgba(0,0,0,${1 - bright})`; ctx.fillRect(0, 0, w, h); } ctx.globalAlpha = 1;
    }
    const display = s => `900 ${s}px "Big Shoulders Display","Oswald","Arial Narrow",Impact,sans-serif`;
    const mono = s => `500 ${s}px "IBM Plex Mono",ui-monospace,Menlo,monospace`;
    function text(str, y, size, alpha, color, font) {
      if (alpha <= 0) return; ctx.globalAlpha = alpha; ctx.fillStyle = color || '#fff'; ctx.font = (font || display)(size);
      let s = size; while (ctx.measureText(str).width > w * 0.86 && s > 12) { s -= 2; ctx.font = (font || display)(s); } ctx.fillText(str, w / 2, y); ctx.globalAlpha = 1;
    }
    function draw() {
      if (!w || !h) return; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const big = Math.min(w * 0.11, h * 0.2), mid = Math.min(w * 0.05, h * 0.09);
      if (t < 3) { text('MARVEL CINEMAS PRESENTS', h / 2, Math.min(18, w * 0.04), fade(0.2, 1.2, 2.2, 3), 'rgba(255,255,255,0.8)', mono); }
      else if (t < 12) { const p = (t - 3) / 9; drawArt(1.08 + p * 0.22, -0.5 + p, 0.2 - p * 0.3, 1, 0.35 + 0.65 * ease(clamp((t - 3) / 1.6, 0, 1)) * 0.82); text(movie.tag[0].toUpperCase(), h / 2, big * 0.8, fade(5, 5.8, 7.6, 8.6)); text(movie.tag[1].toUpperCase(), h / 2, big * 0.8, fade(9, 9.8, 11, 11.9)); }
      else if (t < 20) {
        let ci = -1; for (let i = 0; i < CUTS.length; i++) if (t >= CUTS[i]) ci = i; const c = crops[Math.max(0, ci)], p = ci >= 0 ? (t - CUTS[ci]) : 0;
        drawArt(c.z + p * 0.06, c.x * 2 - 1, c.y * 2 - 1, 1, 0.8);
        if (ci >= 0 && p < 0.1) { ctx.fillStyle = `rgba(255,255,255,${0.55 * (1 - p / 0.1)})`; ctx.fillRect(0, 0, w, h); }
        text(movie.tag[2].toUpperCase(), h / 2, big, fade(18.4, 18.9, 19.4, 19.9), '#fff');
        text(movie.genres.join('  ·  ').toUpperCase(), h * 0.78, Math.min(16, w * 0.036), fade(13, 13.5, 17, 17.8), 'rgba(255,255,255,0.7)', mono);
      }
      else if (t < 27) {
        drawArt(1.1 - ((t - 20) / 7) * 0.05, 0.2, -0.1, 1, 0.4);
        movie.cast.slice(0, 4).forEach((c, i) => { const a = 20 + i * 1.7; const al = fade(a, a + 0.5, a + 1.3, a + 1.7); text(c.name.toUpperCase(), h / 2 - mid * 0.2, mid * 1.5, al); text(c.role.toUpperCase(), h / 2 + mid * 0.9, Math.min(15, w * 0.034), al * 0.8, movie.palette[2], mono); });
        text('DIRECTED BY ' + movie.crew.Director.toUpperCase(), h / 2 - mid * 0.2, mid * 1.2, fade(26.6, 26.8, 26.95, 27));
      }
      else {
        drawArt(1.05 + ((t - 27) / 7) * 0.03, 0, 0, 1, 0.28 + 0.1 * Math.sin(t * 2));
        const al = ease(clamp((t - 27.2) / 1.2, 0, 1)) * (t > 33.2 ? clamp(34 - t, 0, 1) / 0.8 : 1), words = movie.title.toUpperCase();
        text(words, h * 0.46, big * 1.6, al); text(movie.native, h * 0.46 + big * 1.15, mid, al * 0.85, movie.palette[2], s => `600 ${s}px "Hanken Grotesk",system-ui,"Noto Sans Tamil","Noto Sans Devanagari",sans-serif`);
        text(movie.upcoming ? 'IN CINEMAS ' + MQ.data.fmtDate(movie.release, { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : 'NOW SHOWING IN CINEMAS', h * 0.8, Math.min(16, w * 0.036), al * 0.85, 'rgba(255,255,255,0.85)', mono);
      }
      // letterbox, vignette, grain, flicker
      const bar = Math.max(0, (h - w / 2.39) / 2, h * 0.06); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, bar); ctx.fillRect(0, h - bar, w, bar);
      const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
      if (!reduce && grainPat) { const gx = Math.floor(Math.random() * 200), gy = Math.floor(Math.random() * 200); ctx.save(); ctx.globalAlpha = 0.7; ctx.translate(-gx, -gy); ctx.fillStyle = grainPat; ctx.fillRect(0, 0, w + 200, h + 200); ctx.restore(); }
    }

    function ensureAudio() {
      if (audio) return audio; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      try { const a = new AC(), master = a.createGain(); master.gain.value = 0; master.connect(a.destination); const o = a.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 46; const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 170; const g = a.createGain(); g.gain.value = 0.6; o.connect(f); f.connect(g); g.connect(master); o.start(); audio = { a, master }; } catch (e) { audio = null; }
      return audio;
    }
    function hit() { if (!audio || muted) return; const { a, master } = audio, o = a.createOscillator(), g = a.createGain(); o.frequency.setValueAtTime(120, a.currentTime); o.frequency.exponentialRampToValueAtTime(36, a.currentTime + 0.7); g.gain.setValueAtTime(0.9, a.currentTime); g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 1); o.connect(g); g.connect(master); o.start(); o.stop(a.currentTime + 1.1); }

    function loop(now) {
      raf = requestAnimationFrame(loop); if (disposed) return; const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (!visible || document.hidden) return;
      if (playing) {
        lastT = t; t += dt; HITS.concat(CUTS.slice(1)).forEach(c => { if (lastT < c && t >= c) hit(); });
        if (t >= DUR) { t = DUR; playing = false; ended = true; }
        hooks.onTime && hooks.onTime(t, DUR, playing, ended);
      }
      draw();
    }
    function play() { if (ended) { t = 0; ended = false; } playing = true; hooks.onTime && hooks.onTime(t, DUR, true, false); }
    function pause() { playing = false; hooks.onTime && hooks.onTime(t, DUR, false, ended); }
    function seek(x) { t = clamp(x, 0, DUR - 0.001); ended = false; hooks.onTime && hooks.onTime(t, DUR, playing, false); draw(); }
    function setMuted(m) { muted = m; if (!m) { const A = ensureAudio(); if (A) { A.a.resume && A.a.resume(); } } if (audio) audio.master.gain.setTargetAtTime(m ? 0 : 0.35, audio.a.currentTime, 0.08); }
    function setVisible(v) { visible = v; if (!v && playing) pause(); }
    function destroy() { disposed = true; cancelAnimationFrame(raf); ro.disconnect(); if (audio) { try { audio.a.close(); } catch (e) { /* ignore */ } } }
    raf = requestAnimationFrame(loop); resize();
    return { play, pause, seek, setMuted, setVisible, destroy, get playing() { return playing; }, get time() { return t; }, DUR, get muted() { return muted; } };
  }
  return { create, DUR };
})();

/* ============================================================
   MODULE: UI pages + router
   Routes (hash): home, movie-<id>, theatres, hall, snacks, review, ticket-<id>, tickets
   ============================================================ */
MQ.app = (() => {
  const { $, $$, esc, inr, iso, addDays, clamp, delay } = MQ.util;
  const S = MQ.state, D = MQ.data, SE = MQ.seats, B = MQ.booking, A = MQ.art;
  const STEPS = ['Showtime', 'Seats', 'Snacks', 'Payment', 'Ticket'];
  const ICON = {
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4.5" height="15" rx="1"/><rect x="13.5" y="4.5" width="4.5" height="15" rx="1"/></svg>',
    replay: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    mute: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6m0-6-5 6"/></svg>',
    sound: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    full: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    star: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.5 1.5-6.8L2.2 9.5l6.9-.7z"/></svg>',
    x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
    ticket: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a3 3 0 0 0 0 6v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a3 3 0 0 0 0-6z"/><path d="M14 5v14" stroke-dasharray="2 3"/></svg>',
    reset: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>'
  };
  const view = () => $('#view');
  let cleanups = [], routeTok = 0, movies = D.movies;
  const onLeave = fn => cleanups.push(fn);
  const go = (h) => { if (location.hash === '#' + h) route(); else location.hash = h; };
  // Only the device-memory hint is trusted: iOS Safari reports few CPU cores even on fast phones.
  const lowEnd = () => !!(navigator.deviceMemory && navigator.deviceMemory <= 2);
  const dateOf = s => new Date(s + 'T00:00:00');
  const longDate = s => D.fmtDate(dateOf(s), { weekday: 'short', day: 'numeric', month: 'short' });

  function toast(msg, kind) {
    const t = document.createElement('div'); t.className = 'toast ' + (kind || ''); t.setAttribute('role', 'status'); t.textContent = msg; $('#toasts').append(t);
    setTimeout(() => t.classList.add('out'), 2600); setTimeout(() => t.remove(), 3100);
  }

  /* ---------------- shared fragments ---------------- */
  function posterBox(m, cls, cardPoster) {
    const [a, b] = m.palette;
    const url = cardPoster && m.cardPoster ? ` data-poster-url="${esc(m.cardPoster)}"` : '';
    return `<div class="poster ${cls || ''}" style="background:linear-gradient(160deg,${a},${b})"><img data-poster="${m.id}"${url} alt="Poster of ${esc(m.title)}" width="300" height="450" decoding="async"></div>`;
  }
  function card(m, opts) {
    const o = opts || {};
    return `<article class="mcard">
      <a class="mc-link" href="#movie-${m.id}" aria-label="${esc(m.title)}, ${esc(m.lang)}, rated ${m.rating}">
        ${posterBox(m, '', true)}
        <span class="rate">${ICON.star}${m.rating.toFixed(1)}</span>
        ${m.upcoming ? `<span class="soon">${D.fmtDate(m.release)}</span>` : ''}
        <div class="mc-meta"><h3>${esc(m.title)}</h3><p>${esc(m.lang)} · ${esc(m.genres[0])}</p></div>
      </a>
      ${o.notify && m.upcoming ? `<button class="btn ghost sm block notify ${S.notify.includes(m.id) ? 'on' : ''}" data-act="notify" data-id="${m.id}" aria-pressed="${S.notify.includes(m.id)}">${S.notify.includes(m.id) ? 'We will notify you' : 'Notify me'}</button>` : ''}
    </article>`;
  }
  const rail = (list, o) => `<div class="rail" tabindex="0">${list.map(m => card(m, o)).join('')}</div>`;
  function sec(title, sub, inner, id) { return `<section class="band wrap" ${id ? `id="${id}"` : ''}><div class="sec-head"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${inner}</section>`; }
  function stepper(active) {
    return `<ol class="stepper" aria-label="Booking progress">${STEPS.map((s, i) => `<li class="${i < active ? 'done' : i === active ? 'now' : ''}" ${i === active ? 'aria-current="step"' : ''}><span class="sn">${i < active ? ICON.check : i + 1}</span><span class="sl">${s}</span></li>`).join('')}</ol>`;
  }
  function emptyState(title, text, btn) { return `<div class="empty"><div class="empty-ic" aria-hidden="true">▢</div><h3>${title}</h3><p>${text}</p>${btn || ''}</div>`; }
  function errorState(title, text, retry) { return `<div class="empty err" role="alert"><div class="empty-ic" aria-hidden="true">!</div><h3>${title}</h3><p>${text}</p>${retry ? `<button class="btn primary" data-act="retry">Try again</button>` : ''}</div>`; }
  function setView(html) { view().innerHTML = html; }
  function trailerSource(m) {
    const localVideo = window.MQ_MEDIA && window.MQ_MEDIA.screenVideos && window.MQ_MEDIA.screenVideos[m.id];
    if (localVideo) return { type: 'video', url: localVideo };
    if (!m.trailer) return null;
    try {
      const u = new URL(m.trailer);
      if (u.hostname === 'youtu.be' || u.hostname.endsWith('youtube.com')) {
        const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') || (u.pathname.match(/^\/embed\/([^/]+)/) || [])[1];
        if (id) return { type: location.protocol === 'file:' ? 'youtube-link' : 'youtube', url: `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}&rel=0&playsinline=1`, original: m.trailer };
      }
    } catch (e) {
      return null;
    }
    return { type: 'video', url: m.trailer };
  }

  /* ---------------- shell ---------------- */
  function shell() {
    $('#shell').innerHTML = `
      <header class="top" id="top"><div class="wrap top-in">
        <a class="brand" href="#home" aria-label="Marvel Cinemas, home"><span class="brand-bulbs" aria-hidden="true"></span><span class="brand-t">MARVEL</span></a>
        <label class="search"><span class="sr">Search movies</span>${ICON.search}<input id="q" type="search" placeholder="Search movies, cast, language" autocomplete="off" value="${esc(S.q)}"></label>
        <label class="city"><span class="sr">City</span><select id="city">${D.CITIES.map(c => `<option ${c === S.city ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
        <a class="btn ghost sm tix" href="#tickets" aria-label="My tickets">${ICON.ticket}<span class="tl">My tickets</span> <span class="count" id="tixCount">${S.bookings.length}</span></a>
      </div></header>
      <main id="view" tabindex="-1"></main>
      <footer class="foot wrap"><p>Marvel Cinemas is a demo. Movies, theatres and people are fictional, and no real payment is taken.</p></footer>`;
    let qt; $('#q').addEventListener('input', e => { clearTimeout(qt); qt = setTimeout(() => { S.q = e.target.value.trim(); if ((location.hash.slice(1) || 'home') !== 'home') go('home'); else renderHomeBody(); }, 160); });
    $('#city').addEventListener('change', e => { S.city = e.target.value; S.save(); const h = location.hash.slice(1) || 'home'; if (h === 'theatres' || h.startsWith('movie-')) route(); toast('City set to ' + S.city); });
  }
  const updateTixCount = () => { const e = $('#tixCount'); if (e) e.textContent = S.bookings.length; };

  /* ---------------- HOME ---------------- */
  let ring = null, heroList = [];
  function matches(m, q) { q = q.toLowerCase(); return [m.title, m.native, m.lang, m.genres.join(' '), m.crew.Director, m.cast.map(c => c.name).join(' ')].join(' ').toLowerCase().includes(q); }
  function langFiltered() { return movies.filter(m => S.lang === 'All' || m.lang === S.lang); }
  function recommended(list) {
    const last = S.bookings[0] && D.movie(S.bookings[0].movieId);
    const sc = m => m.rating * 10 + m.trend * 0.2 + (last ? (m.lang === last.lang ? 12 : 0) + m.genres.filter(g => last.genres.includes(g)).length * 8 : 0);
    return { list: list.filter(m => !last || m.id !== last.id).sort((a, b) => sc(b) - sc(a)).slice(0, 8), why: last ? `Because you booked ${esc(last.title)}` : 'Highest rated right now' };
  }
  async function home() {
    const tok = ++routeTok; document.body.classList.remove('immersive');
    setView(`<section class="hero skel-hero"><div class="skel-ring"><span class="spin" aria-hidden="true"></span><p>Loading today’s screenings</p></div></section><div class="wrap band"><div class="rail">${Array(7).fill('<div class="mcard"><div class="poster skel"></div><div class="skel line"></div></div>').join('')}</div></div>`);
    try { movies = await D.fetchMovies(); } catch (e) { setView(errorState('Could not load movies', 'Check your connection and try again.', true)); return; }
    if (tok !== routeTok) return;
    setView(`
      <section class="hero" id="hero" aria-label="Featured movies">
        <div class="hero-bg" id="heroBg"></div>
        <div class="ring-host" id="ringHost"></div>
        <div class="hero-info wrap"><div class="hero-card" id="heroInfo" aria-live="polite"></div></div>
        <div class="ring-ctl"><button class="rbtn" data-act="ring-prev" aria-label="Previous movie">${ICON.back}</button><button class="rbtn r" data-act="ring-next" aria-label="Next movie">${ICON.back}</button></div>
        <p class="ring-hint" id="ringHint"><span>Drag to rotate</span><i></i><span>Tap a screen to focus</span></p>
      </section>
      <div class="chipbar"><div class="wrap chips" id="langChips" role="group" aria-label="Filter by language"></div></div>
      <div id="homeBody"></div>`);
    renderChips(); mountRing(); renderHomeBody();
    onLeave(() => { if (ring) { ring.destroy(); ring = null; } });
  }
  function renderChips() {
    const counts = {}; movies.forEach(m => { counts[m.lang] = (counts[m.lang] || 0) + 1; });
    $('#langChips').innerHTML = ['All'].concat(D.LANGS).map(l => `<button class="chip ${S.lang === l ? 'on' : ''}" data-act="lang" data-lang="${l}" aria-pressed="${S.lang === l}">${l}<span>${l === 'All' ? movies.length : counts[l] || 0}</span></button>`).join('');
  }
  function ringMovies() {
    let base = langFiltered().filter(m => !m.upcoming); if (!base.length) base = langFiltered(); if (!base.length) base = movies;
    base = base.slice().sort((a, b) => b.trend - a.trend); const out = []; let i = 0; while (out.length < Math.min(12, Math.max(8, base.length))) { out.push(base[i % base.length]); i++; } return out;
  }
  function mountRing() {
    const host = $('#ringHost'); heroList = ringMovies();
    ring = MQ.ring.create(host, { onFocus: setHero, onOpen: m => go('movie-' + m.id) });
    if (!ring) { // WebGL not available: simple snap carousel
      host.innerHTML = `<div class="ring-fallback" tabindex="0">${heroList.slice(0, 8).map(m => `<a href="#movie-${m.id}">${posterBox(m)}<span>${esc(m.title)}</span></a>`).join('')}</div>`; A.lazyPosters(host);
      $('#ringHint').hidden = true; $$('.ring-ctl').forEach(e => { e.hidden = true; }); setHero(heroList[0]); return;
    }
    MQ.fontsReady.then(() => { if (ring) ring.setMovies(heroList); });
  }
  function setHero(m) {
    const el = $('#heroInfo'); if (!el || !m) return; const [a, b, c] = m.palette;
    $('#heroBg').style.background = `radial-gradient(80% 70% at 50% 28%, ${A.rgba(b, 0.55)}, transparent 70%), radial-gradient(60% 50% at 80% 90%, ${A.rgba(c, 0.18)}, transparent 70%), ${a}`;
    el.classList.remove('in'); void el.offsetWidth;
    el.innerHTML = `<img class="hero-poster" data-poster="${m.id}" alt="Poster of ${esc(m.title)}" width="160" height="240" decoding="async">
      <p class="eyebrow">${esc(m.lang)} · ${m.upcoming ? 'Releasing ' + D.fmtDate(m.release) : 'In cinemas'}</p>
      <h1>${esc(m.title)}</h1>
      <p class="hero-meta"><span class="rate inline">${ICON.star}${m.rating.toFixed(1)}</span><span>${m.cert}</span><span>${D.dur(m.dur)}</span><span>${m.genres.map(esc).join(' / ')}</span></p>
      <p class="hero-syn">${esc(m.syn)}</p>
      <div class="hero-act">${m.upcoming ? `<a class="btn primary" href="#movie-${m.id}">Watch trailer</a>` : `<button class="btn primary" data-act="book" data-id="${m.id}">Book tickets</button><a class="btn ghost" href="#movie-${m.id}">${ICON.play} Trailer &amp; details</a>`}</div>`;
    A.lazyPosters(el);
    el.classList.add('in');
  }
  function renderHomeBody() {
    const body = $('#homeBody'); if (!body) return; const lf = langFiltered(), q = S.q;
    if (q) {
      const res = movies.filter(m => matches(m, q) && (S.lang === 'All' || m.lang === S.lang));
      body.innerHTML = res.length ? sec(`Results for “${esc(q)}”`, `${res.length} ${res.length === 1 ? 'movie' : 'movies'}${S.lang !== 'All' ? ' in ' + S.lang : ''}`, `<div class="grid">${res.map(m => card(m, { notify: true })).join('')}</div>`) : `<div class="wrap band">${emptyState('No movies match “' + esc(q) + '”', 'Try a movie name, an actor, a genre or a language.', `<button class="btn ghost" data-act="clear-search">Clear search</button>`)}</div>`;
      A.lazyPosters(body); return;
    }
    const now = lf.filter(m => !m.upcoming), up = lf.filter(m => m.upcoming).sort((a, b) => a.release - b.release);
    const trend = now.slice().sort((a, b) => b.trend - a.trend).slice(0, 8), rec = recommended(now);
    let h = '';
    if (!lf.length) h = `<div class="wrap band">${emptyState('Nothing in ' + S.lang + ' yet', 'New releases are added every Friday.', `<button class="btn ghost" data-act="lang" data-lang="All">Show all languages</button>`)}</div>`;
    else {
      if (trend.length) h += sec('Trending now', `Most booked this week${S.lang !== 'All' ? ' in ' + S.lang : ''}`, rail(trend));
      if (rec.list.length) h += sec('Recommended for you', rec.why, rail(rec.list));
      if (now.length) h += sec('Now showing', `${now.length} ${now.length === 1 ? 'movie' : 'movies'} in cinemas`, `<div class="grid">${now.sort((a, b) => b.release - a.release).map(m => card(m)).join('')}</div>`);
      h += up.length ? sec('Upcoming releases', 'Get a reminder the day tickets open', rail(up, { notify: true })) : '';
    }
    body.innerHTML = h; A.lazyPosters(body);
  }

  /* ---------------- MOVIE (trailer + details) ---------------- */
  function startBooking(m) {
    if (m.upcoming) { toast('Bookings open closer to release. Tap Notify me.', 'warn'); return; }
    S.draft = { movieId: m.id, theatreId: null, date: iso(new Date()), time: null, lang: m.langs[0], fmt: null, seats: [] }; S.dateISO = S.draft.date; S.langFilter = 'All'; S.fmtFilter = 'All'; S.save(); go('theatres');
  }
  function showChips(m, th, dateISO, max, lim) {
    const shows = D.showsFor(m, th, dateISO).filter(s => !D.isPast(dateISO, s.time)).slice(0, max || 99);
    return shows.map(s => `<button class="show" data-act="pick-show" data-th="${th.id}" data-time="${s.time}" data-lang="${s.lang}" data-fmt="${s.fmt}" data-date="${dateISO}" title="${esc(s.lang)} · ${s.fmt}"><b>${D.fmtTime(s.time)}</b><span>${s.fmt}</span><i class="fill f${s.fill > 0.78 ? 'hot' : s.fill > 0.5 ? 'mid' : 'low'}" aria-label="${s.fill > 0.78 ? 'Filling fast' : s.fill > 0.5 ? 'Selling' : 'Seats available'}"></i></button>`).join('') || '<span class="muted">No more shows today</span>';
  }
  function moviePage(id) {
    const m = D.movie(id); if (!m) { setView(`<div class="wrap band">${emptyState('Movie not found', 'It may have left cinemas.', '<a class="btn primary" href="#home">Back to home</a>')}</div>`); return; }
    document.body.classList.add('immersive'); const [c0, c1, c2] = m.palette; const th = D.theatresIn(S.city); const today = iso(new Date()); const externalTrailer = trailerSource(m);
    const more = movies.filter(x => x.id !== m.id && (x.lang === m.lang || x.genres.some(g => m.genres.includes(g)))).slice(0, 8);
    const rv = m.reviews.length ? m.reviews : [];
    setView(`
    <div class="mv" id="mv" style="--c0:${c0};--c1:${c1};--c2:${c2}">
      <button class="trailer-back btn ghost sm" data-act="back" type="button">${ICON.back} Back</button>
      <section class="stage" id="stage" aria-label="Trailer">
        ${externalTrailer ? externalTrailer.type === 'youtube-link'
          ? `<a class="external-trailer external-trailer-link" href="${esc(externalTrailer.original)}" target="_blank" rel="noopener noreferrer">${ICON.play}<span>Watch trailer on YouTube</span></a>`
          : externalTrailer.type === 'youtube'
          ? `<div class="external-trailer-frame"><iframe class="external-trailer" id="externalTrailer" src="${esc(externalTrailer.url)}" title="Trailer for ${esc(m.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><button class="trailer-sound" data-act="trailer-sound" type="button">Enable sound</button></div>`
          : `<div class="external-trailer-frame"><video class="external-trailer" id="externalTrailer" src="${esc(externalTrailer.url)}" ${m.poster ? `poster="${esc(m.poster)}"` : ''} autoplay loop playsinline controls preload="auto"></video><button class="trailer-sound" data-act="trailer-sound" type="button">Enable sound</button></div>`
          : `<canvas class="tcv" id="tcv" aria-label="Trailer for ${esc(m.title)}"></canvas>`}
        <div class="stage-ui${externalTrailer ? ' external-stage-ui' : ''}">
          <div class="stage-top wrap">
            <div class="stage-ttl"><span class="eyebrow">${esc(m.lang)} · Official trailer</span><strong>${esc(m.title)}</strong></div>
            ${m.upcoming ? `<button class="btn ghost" data-act="notify" data-id="${m.id}">${S.notify.includes(m.id) ? 'Reminder set' : 'Notify me'}</button>` : `<button class="btn primary" data-act="book" data-id="${m.id}">Book tickets</button>`}
          </div>
          ${externalTrailer ? '' : `<div class="stage-bot wrap">
            <div class="tctl">
              <button class="ibtn" id="tPlay" data-act="t-play" aria-label="Play trailer">${ICON.play}</button>
              <div class="scrub" id="scrub" role="slider" tabindex="0" aria-label="Trailer position" aria-valuemin="0" aria-valuemax="${MQ.trailer.DUR}" aria-valuenow="0"><i id="scrubFill"></i></div>
              <span class="tt" id="tTime">0:00</span>
              <button class="ibtn" id="tMute" data-act="t-mute" aria-label="Turn sound on" aria-pressed="false">${ICON.mute}</button>
              <button class="ibtn" data-act="t-full" aria-label="Full screen">${ICON.full}</button>
            </div>
            <button class="cue" data-act="down">Scroll for details <span aria-hidden="true">↓</span></button>
          </div>`}
        </div>
      </section>
      <section class="details" id="details">
        <div class="wrap det-grid">
          ${posterBox(m, 'det-poster')}
          <div class="det-main">
            <p class="eyebrow">${m.upcoming ? 'Releasing ' + D.fmtDate(m.release, { day: 'numeric', month: 'long', year: 'numeric' }) : 'Now showing'}</p>
            <h1>${esc(m.title)}</h1><p class="native">${esc(m.native)}</p>
            <p class="det-meta"><span class="rate inline big">${ICON.star}${m.rating.toFixed(1)}<small>/10 · ${(m.votes / 1000).toFixed(1)}K votes</small></span><span class="pill">${m.cert}</span><span>${D.dur(m.dur)}</span><span>${D.fmtDate(m.release, { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>
            <div class="tags">${m.genres.map(g => `<span class="tag">${esc(g)}</span>`).join('')}</div>
            <p class="syn">${esc(m.syn)}</p>
            <div class="lang-row"><span class="lbl">Available in</span>${m.langs.map(l => `<span class="tag ${l === m.lang ? 'hi' : ''}">${l}${l === m.lang ? ' (original)' : ''}</span>`).join('')}</div>
            <div class="det-act">${m.upcoming ? `<button class="btn primary lg" data-act="notify" data-id="${m.id}">${S.notify.includes(m.id) ? 'We will notify you' : 'Notify me when bookings open'}</button>` : `<button class="btn primary lg" data-act="book" data-id="${m.id}">Book tickets</button>`}${externalTrailer ? '' : `<button class="btn ghost lg" data-act="t-replay">${ICON.replay} Watch trailer again</button>`}</div>
          </div>
        </div>
        <div class="wrap two">
          <div class="blk"><h2>Cast</h2><div class="cast">${m.cast.map(c => `<div class="person"><span class="av" style="background:${A.avatarGradient(c.name)}">${A.initials(c.name)}</span><b>${esc(c.name)}</b><small>${esc(c.role)}</small></div>`).join('')}</div></div>
          <div class="blk"><h2>Crew</h2><dl class="crew">${Object.entries(m.crew).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>
        </div>
        <div class="wrap blk"><h2>Reviews</h2>${rv.length ? `<div class="reviews">${rv.map(r => `<figure class="rev"><div class="rev-h"><span class="pill ${r.who === 'Critic' ? 'crit' : ''}">${r.who}</span><span class="rate inline">${ICON.star}${r.score}</span></div><blockquote>${esc(r.text)}</blockquote></figure>`).join('')}</div>` : emptyState('No reviews yet', 'Reviews open after the first screenings.')}</div>
        <div class="wrap blk" id="theatreList"><div class="sec-head"><h2>Available theatres in ${esc(S.city)}</h2><p>${m.upcoming ? 'Show timings appear once bookings open' : 'Today’s next shows. Tap a time to pick seats.'}</p></div>
          ${m.upcoming ? emptyState('Bookings are not open yet', 'Tap Notify me and we will remind you when tickets go on sale.') : `<div class="th-list">${th.map(t => `<div class="th"><div class="th-i"><h3>${esc(t.name)}</h3><p>${esc(t.area)} · ${t.dist} km · ${t.amen.slice(0, 2).join(', ')}</p></div><div class="shows">${showChips(m, t, today, 4)}</div></div>`).join('')}</div><div class="center"><button class="btn ghost" data-act="book" data-id="${m.id}">See all dates and showtimes</button></div>`}
        </div>
        ${more.length ? sec('More like this', '', rail(more)) : ''}
      </section>
      <div class="mv-bar" id="mvBar" aria-hidden="true"><div class="wrap mv-bar-in"><a class="brand sm" href="#home" aria-label="Marvel home"><span class="brand-t">MARVEL</span></a><strong>${esc(m.title)}</strong>${m.upcoming ? '' : `<button class="btn primary sm" data-act="book" data-id="${m.id}" tabindex="-1">Book tickets</button>`}<button class="ibtn" data-act="back" aria-label="Back to home" tabindex="-1">${ICON.x}</button></div></div>
    </div>`);
    A.lazyPosters(view());
    // trailer
    const cv = $('#tcv'); const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tr = externalTrailer ? null : MQ.trailer.create(cv, m, { onTime: (t, dur, playing, ended) => {
      const pb = $('#tPlay'); if (!pb) return; pb.innerHTML = ended ? ICON.replay : playing ? ICON.pause : ICON.play; pb.setAttribute('aria-label', ended ? 'Replay trailer' : playing ? 'Pause trailer' : 'Play trailer');
      $('#scrubFill').style.width = (t / dur * 100) + '%'; const mm = Math.floor(t / 60), ss = Math.floor(t % 60); $('#tTime').textContent = mm + ':' + String(ss).padStart(2, '0'); $('#scrub').setAttribute('aria-valuenow', Math.round(t));
    } });
    MQ.currentTrailer = tr;
    if (tr) {
      MQ.fontsReady.then(() => { if (!reduce && MQ.currentTrailer === tr) tr.play(); else tr.seek(5); });
      const scrub = $('#scrub'); const seekAt = e => { const r = scrub.getBoundingClientRect(); tr.seek(clamp((e.clientX - r.left) / r.width, 0, 1) * tr.DUR); };
      let sd = false; scrub.addEventListener('pointerdown', e => { sd = true; scrub.setPointerCapture(e.pointerId); seekAt(e); }); scrub.addEventListener('pointermove', e => { if (sd) seekAt(e); }); scrub.addEventListener('pointerup', () => { sd = false; });
      scrub.addEventListener('keydown', e => { if (e.key === 'ArrowRight') tr.seek(tr.time + 3); else if (e.key === 'ArrowLeft') tr.seek(tr.time - 3); });
    }
    // scroll transition from trailer to details
    const stage = $('#stage'), bar = $('#mvBar'); let ticking = false;
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; const H = stage.offsetHeight || innerHeight, p = clamp(scrollY / (H * 0.85), 0, 1); stage.style.setProperty('--p', p.toFixed(3)); bar.classList.toggle('on', scrollY > H * 0.7); bar.setAttribute('aria-hidden', scrollY > H * 0.7 ? 'false' : 'true'); if (tr) tr.setVisible(p < 0.92); }); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    onLeave(() => { removeEventListener('scroll', onScroll); if (tr) tr.destroy(); MQ.currentTrailer = null; });
  }

  /* ---------------- THEATRES & SHOWTIMES ---------------- */
  function theatresPage() {
    const d = S.draft; if (!d) { go('home'); return; } const m = D.movie(d.movieId); document.body.classList.remove('immersive');
    if (!S.dateISO || S.dateISO < iso(new Date())) S.dateISO = iso(new Date());
    const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
    const th = D.theatresIn(S.city);
    const rows = th.map(t => {
      const shows = D.showsFor(m, t, S.dateISO).filter(s => (S.langFilter === 'All' || s.lang === S.langFilter) && (S.fmtFilter === 'All' || s.fmt === S.fmtFilter));
      return { t, shows };
    }).filter(r => r.shows.length);
    const priceFrom = t => SE.price('standard', t);
    setView(`<div class="wrap page">
      ${stepper(0)}
      <div class="pg-head"><button class="btn ghost sm" data-act="back-movie" data-id="${m.id}">${ICON.back} Movie</button>
        <div class="pg-t">${posterBox(m, 'mini')}<div><h1>${esc(m.title)}</h1><p class="muted">${esc(m.lang)} · ${m.genres.join(' / ')} · ${D.dur(m.dur)} · ${m.cert}</p></div></div></div>
      <div class="datebar" role="group" aria-label="Choose date">${days.map((dt, i) => { const v = iso(dt); return `<button class="day ${v === S.dateISO ? 'on' : ''}" data-act="date" data-date="${v}" aria-pressed="${v === S.dateISO}"><small>${i === 0 ? 'Today' : i === 1 ? 'Tmrw' : dt.toLocaleDateString('en-IN', { weekday: 'short' })}</small><b>${dt.getDate()}</b><small>${dt.toLocaleDateString('en-IN', { month: 'short' })}</small></button>`; }).join('')}</div>
      <div class="filters-row">
        <div class="chips" role="group" aria-label="Language">${['All'].concat(m.langs).map(l => `<button class="chip ${S.langFilter === l ? 'on' : ''}" data-act="sl" data-v="${l}" aria-pressed="${S.langFilter === l}">${l}</button>`).join('')}</div>
        <div class="chips" role="group" aria-label="Format">${['All', '2D', 'Dolby Atmos', 'Laser 4K'].map(l => `<button class="chip ${S.fmtFilter === l ? 'on' : ''}" data-act="sf" data-v="${l}" aria-pressed="${S.fmtFilter === l}">${l === 'All' ? 'Any format' : l}</button>`).join('')}</div>
      </div>
      <div class="th-list">${rows.length ? rows.map(({ t, shows }) => `<div class="th"><div class="th-i"><h3>${esc(t.name)} <span class="muted">· ${esc(t.area)}</span></h3><p>${t.dist} km · ${t.amen.join(' · ')} · from ${inr(priceFrom(t))}</p></div>
        <div class="shows">${shows.map(s => { const past = D.isPast(S.dateISO, s.time); return `<button class="show" ${past ? 'disabled' : ''} data-act="pick-show" data-th="${t.id}" data-time="${s.time}" data-lang="${s.lang}" data-fmt="${s.fmt}" data-date="${S.dateISO}"><b>${D.fmtTime(s.time)}</b><span>${s.lang} · ${s.fmt}</span><i class="fill f${s.fill > 0.78 ? 'hot' : s.fill > 0.5 ? 'mid' : 'low'}" aria-label="${s.fill > 0.78 ? 'Filling fast' : s.fill > 0.5 ? 'Selling' : 'Seats available'}"></i></button>`; }).join('')}</div></div>`).join('') : emptyState('No shows match these filters', 'Try another date, language or format.', `<button class="btn ghost" data-act="reset-filters">Reset filters</button>`)}</div>
      <p class="legend-line"><i class="fill flow"></i> Available <i class="fill fmid"></i> Selling <i class="fill fhot"></i> Filling fast</p>
    </div>`);
    A.lazyPosters(view());
  }

  /* ---------------- 3D HALL + SEATS ---------------- */
  let hall = null;
  function hallPage() {
    const d = S.draft; if (!d || !d.theatreId || !d.time) { go(d ? 'theatres' : 'home'); return; }
    document.body.classList.remove('immersive');
    const m = D.movie(d.movieId), th = D.theatre(d.theatreId); const occupied = SE.occupiedFor(d); d.seats = (d.seats || []).filter(id => !occupied.has(id));
    const show = { fmt: d.fmt, lang: d.lang }; const pr = tier => SE.price(tier, th, show);
    let mode = '3d', tipTimer;
    const want = S.view || (lowEnd() ? '2d' : '3d');
    setView(`<div class="wrap page hallpage">
      ${stepper(1)}
      <div class="hall-head">
        <a class="btn ghost sm" href="#theatres">${ICON.back} Showtimes</a>
        <div class="show-id"><strong>${esc(m.title)}</strong><span>${esc(th.name)}, ${esc(th.area)} · ${longDate(d.date)} · ${D.fmtTime(d.time)} · ${esc(d.lang)} · ${d.fmt}</span></div>
        <div class="seg" id="viewSeg" role="group" aria-label="Seat view"><button data-act="hv" data-v="3d">3D hall</button><button data-act="hv" data-v="2d">2D map</button></div>
      </div>
      <div class="hall-body">
        <div class="hall-main">
          <div class="seg cam" id="camSeg" role="group" aria-label="Camera view">${[['overview', 'Overview'], ['stage', 'From stage'], ['balcony', 'Balcony'], ['bird', 'Bird’s eye']].map(([k, l]) => `<button data-act="cam" data-v="${k}" aria-pressed="${k === 'overview'}">${l}</button>`).join('')}</div>
          <div class="stage3d" id="stage3d"><div class="loading" id="hallLoad"><span class="spin"></span><p>Building the hall…</p></div>
            <div class="zoom"><button class="ibtn" data-act="zin" aria-label="Zoom in">${ICON.plus}</button><button class="ibtn" data-act="zout" aria-label="Zoom out">${ICON.minus}</button><button class="ibtn" data-act="zreset" aria-label="Reset view">${ICON.reset}</button></div>
            <div class="tip" id="tip" hidden></div>
            <p class="hint" id="hint">Drag to look around · pinch or scroll to zoom · tap a seat</p></div>
          <div class="map2d" id="map2d" hidden></div>
          <div class="legend" aria-label="Seat legend">${Object.entries(SE.TIERS).map(([k, t]) => `<span><i style="background:${t.color}"></i>${t.label} ${inr(pr(k))}</span>`).join('')}<span><i style="background:${SE.STATE_COLORS.selected}"></i>Selected</span><span><i class="occ"></i>Booked</span></div>
        </div>
        <aside class="summary" id="sum" aria-label="Booking summary"></aside>
      </div></div>`);

    const sel = () => new Set(d.seats);
    function updateSummary() {
      const lines = B.seatLines(), t = B.totals(); const open = $('#sum').classList.contains('open');
      $('#sum').innerHTML = `<button class="sum-bar" data-act="sum-toggle" aria-expanded="${open}"><span><b>${t.count}</b> ${t.count === 1 ? 'seat' : 'seats'}</span><span class="sum-p">${t.count ? inr(t.tickets + t.fee) : 'Select seats'}</span><span class="car" aria-hidden="true">▴</span></button>
        <div class="sum-detail"><div class="sum-mv">${posterBox(m, 'mini')}<div><strong>${esc(m.title)}</strong><span>${esc(th.name)} · ${esc(th.hall)}</span><span>${longDate(d.date)}, ${D.fmtTime(d.time)}</span></div></div>
        <h2>Your seats <small>Up to 8</small></h2>
        ${lines.length ? `<ul class="sum-seats">${lines.map(l => `<li><span class="dot" style="background:${SE.TIERS[l.tier].color}"></span><b>${l.id}</b><span class="muted">${l.label}</span><span class="pr">${inr(l.price)}</span><button class="ibtn sm" data-act="rm-seat" data-id="${l.id}" aria-label="Remove seat ${l.id}">${ICON.x}</button></li>`).join('')}</ul>` : `<p class="muted pad">Tap seats in the hall or on the map. Gold is Premium, violet is Recliner.</p>`}
        <dl class="sum-t"><div><dt>Tickets (${t.count})</dt><dd>${inr(t.tickets)}</dd></div><div><dt>Convenience fee</dt><dd>${inr(t.fee)}</dd></div></dl></div>
        <div class="sum-go"><div class="grand"><span>Total</span><strong>${inr(t.tickets + t.fee)}</strong></div><button class="btn primary block" data-act="to-snacks" ${t.count ? '' : 'disabled'}>${t.count ? 'Continue to snacks' : 'Select at least 1 seat'}</button></div>`;
      $('#sum').classList.toggle('open', open); A.lazyPosters($('#sum'));
    }
    function sync() { if (hall) hall.setSeats(null, sel()); if (mode === '2d') paint2D(); updateSummary(); }
    function toggleSeat(id) {
      if (occupied.has(id)) { toast('Seat ' + id + ' is already booked', 'warn'); return; }
      const i = d.seats.indexOf(id); if (i >= 0) d.seats.splice(i, 1); else { if (d.seats.length >= 8) { toast('You can select up to 8 seats', 'warn'); return; } d.seats.push(id); }
      S.save(); sync();
    }
    function tip(s, x, y, hold) {
      const el = $('#tip'); if (!el) return; if (!s) { el.hidden = true; return; }
      const st = occupied.has(s.id) ? 'Booked' : d.seats.includes(s.id) ? 'Selected' : 'Available';
      el.innerHTML = `<b>${s.id}</b> · ${SE.TIERS[s.tier].label} · ${inr(pr(s.tier))} · <em class="${st.toLowerCase()}">${st}</em>`; el.hidden = false;
      const r = $('#stage3d').getBoundingClientRect(); el.style.left = clamp(x - r.left, 70, r.width - 70) + 'px'; el.style.top = Math.max(8, y - r.top - 44) + 'px';
      clearTimeout(tipTimer); if (hold) tipTimer = setTimeout(() => { el.hidden = true; }, 1700);
    }
    /* 2D map */
    function map2d() {
      const seatBtn = s => { const o = occupied.has(s.id), on = d.seats.includes(s.id); return `<button class="s ${s.tier}${o ? ' occ' : ''}${on ? ' sel' : ''}" data-seat="${s.id}" aria-label="Seat ${s.id}, ${SE.TIERS[s.tier].label}, ${inr(pr(s.tier))}, ${o ? 'booked' : on ? 'selected' : 'available'}" aria-pressed="${on}" ${o ? 'aria-disabled="true"' : ''}>${s.num}</button>`; };
      const rowHTML = r => { const blocks = []; r.seats.forEach(s => { (blocks[s.block] = blocks[s.block] || []).push(s); }); return `<div class="mrow ${r.tier}"><span class="rl">${r.id}</span>${blocks.map(b => `<div class="mblk">${b.map(seatBtn).join('')}</div>`).join('<span class="aisle"></span>')}<span class="rl">${r.id}</span></div>`; };
      const group = (tier, label) => `<div class="mgrp"><p class="mlab"><i style="background:${SE.TIERS[tier].color}"></i>${label} · ${inr(pr(tier))}</p>${SE.rows.filter(r => r.tier === tier).map(rowHTML).join('')}</div>`;
      return `<div class="mscreen" aria-hidden="true"><span>SCREEN THIS WAY</span></div>${group('standard', 'Standard')}${group('premium', 'Premium')}${group('recliner', 'Recliner')}<div class="mdiv"><span>Balcony</span></div>${group('balcony', 'Balcony Premium')}`;
    }
    function paint2D() { $$('#map2d .s').forEach(b => { const id = b.dataset.seat, on = d.seats.includes(id); b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); }); }
    function showMode(next) {
      mode = next; S.view = next; S.save(); $$('#viewSeg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === next)); $('#camSeg').hidden = next === '2d';
      if (next === '2d') { if (hall) { hall.destroy(); hall = null; } $('#stage3d').hidden = true; const mp = $('#map2d'); mp.hidden = false; mp.innerHTML = map2d(); }
      else { $('#map2d').hidden = true; $('#stage3d').hidden = false; $('#hallLoad').hidden = false; mount3D(); }
    }
    function mount3D() {
      if (hall) return; const host = $('#stage3d');
      MQ.fontsReady.then(() => {
        if (!$('#stage3d') || mode !== '3d' || hall) return;
        hall = MQ.hall3d.create(host, { movie: m, occupied, selected: sel(), mode: 'overview',
          onReady: () => { const l = $('#hallLoad'); if (l) l.hidden = true; if (hall) hall.playScreenVideo(); },
          onSeat: (s, x, y, pt) => { toggleSeat(s.id); if (d.seats.includes(s.id) && hall) hall.playScreenVideo(); if (pt !== 'mouse') tip(s, x, y, true); },
          onVideoError: url => toast('The cinema video could not be loaded. Check the direct MP4 URL.', 'warn'),
          onVideoBlocked: () => toast('Tap a seat to start the trailer with sound.', 'warn'),
          onHover: (s, x, y) => tip(s, x, y, false),
          onSlow: () => { toast('3D is running slowly here. Switched to the simple seat map.', 'warn'); showMode('2d'); } });
        if (!hall) { $('#hallLoad').hidden = true; toast('3D is not available on this device. Using the seat map.', 'warn'); showMode('2d'); return; }
        $$('#camSeg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === 'overview'));
      });
    }
    // handlers local to this page
    hallHandlers = {
      hv: v => showMode(v), cam: (v, btn) => { if (!hall) return; hall.setMode(v); $$('#camSeg button').forEach(b => b.setAttribute('aria-pressed', b === btn)); const hints = { overview: 'Drag to orbit · pinch or scroll to zoom · two fingers to pan', stage: 'You are on the stage. Drag to look around the audience', balcony: 'You are in the balcony. Drag to look at the screen', bird: 'Top-down view. Drag to rotate · pinch to zoom' }; $('#hint').textContent = hints[v]; },
      zin: () => hall && hall.zoom(1.25), zout: () => hall && hall.zoom(1 / 1.25), zreset: () => hall && hall.reset(),
      'rm-seat': id => { const i = d.seats.indexOf(id); if (i >= 0) { d.seats.splice(i, 1); S.save(); sync(); } },
      'sum-toggle': () => { $('#sum').classList.toggle('open'); updateSummary(); },
      'to-snacks': () => { if (!d.seats.length) return; S.save(); go('snacks'); },
      seat: id => toggleSeat(id)
    };
    $('#map2d').addEventListener('click', e => { const b = e.target.closest('.s'); if (b) toggleSeat(b.dataset.seat); });
    updateSummary(); A.lazyPosters(view());
    showMode(want);
    if (matchMedia('(max-width: 980px)').matches) requestAnimationFrame(() => { const hm = $('.hall-main'); if (!hm) return; const top = hm.getBoundingClientRect().top + scrollY - ($('#top').offsetHeight + 8) - parseFloat(getComputedStyle(document.documentElement).paddingTop || 0); window.scrollTo(0, Math.max(0, top)); });
    onLeave(() => { if (hall) { hall.destroy(); hall = null; } hallHandlers = {}; clearTimeout(tipTimer); });
  }
  let hallHandlers = {};

  /* ---------------- SNACKS ---------------- */
  let snackCat = 'All';
  function snackCtl(it) {
    const q = S.cart[it.id] || 0;
    return q ? `<div class="stepq" role="group" aria-label="Quantity of ${esc(it.name)}"><button class="ibtn sm" data-act="s-dec" data-id="${it.id}" aria-label="Remove one ${esc(it.name)}">${ICON.minus}</button><output aria-live="polite">${q}</output><button class="ibtn sm" data-act="s-inc" data-id="${it.id}" aria-label="Add one ${esc(it.name)}">${ICON.plus}</button></div>` : `<button class="btn ghost sm" data-act="s-inc" data-id="${it.id}">Add</button>`;
  }
  function snackCard(it) {
    return `<article class="snack" data-snack="${it.id}"><div class="simg"><img data-food="${it.id}" alt="${esc(it.name)}" width="480" height="360" decoding="async">${it.was ? `<span class="save">Save ${inr(it.was - it.price)}</span>` : ''}</div>
      <div class="sbody"><div class="sh"><span class="vd ${it.veg ? 'v' : 'n'}" title="${it.veg ? 'Vegetarian' : 'Non-vegetarian'}"><i></i></span><h3>${esc(it.name)}</h3></div><p class="muted">${esc(it.size)} · ${esc(it.desc)}</p>
      <div class="sf"><span class="price">${inr(it.price)}${it.was ? `<s>${inr(it.was)}</s>` : ''}</span><span class="ctl">${snackCtl(it)}</span></div></div></article>`;
  }
  function cartHTML() {
    const lines = B.snackLines(), t = B.totals();
    return `<h2>Your order</h2>
      <div class="c-tix"><span>${t.count} ${t.count === 1 ? 'ticket' : 'tickets'} · ${B.seatLines().map(s => s.id).join(', ')}</span><b>${inr(t.tickets)}</b></div>
      ${lines.length ? `<ul class="c-list">${lines.map(l => `<li><div><b>${esc(l.name)}</b><small>${esc(l.size)} · ${inr(l.price)} each</small></div><div class="stepq"><button class="ibtn sm" data-act="s-dec" data-id="${l.id}" aria-label="Remove one ${esc(l.name)}">${ICON.minus}</button><output>${l.qty}</output><button class="ibtn sm" data-act="s-inc" data-id="${l.id}" aria-label="Add one ${esc(l.name)}">${ICON.plus}</button></div><span class="lt">${inr(l.total)}</span><button class="ibtn sm" data-act="s-rm" data-id="${l.id}" aria-label="Remove ${esc(l.name)} from order">${ICON.x}</button></li>`).join('')}</ul>` : `<p class="muted pad">Your snack order is empty. Add a combo and it will be ready at the counter before the show.</p>`}
      <dl class="sum-t"><div><dt>Snacks (${t.snackCount})</dt><dd>${inr(t.snacks)}</dd></div><div><dt>Tickets and fees</dt><dd>${inr(t.tickets + t.fee)}</dd></div></dl>
      <div class="sum-go"><div class="grand"><span>Total</span><strong>${inr(t.tickets + t.fee + t.snacks)}</strong></div><button class="btn primary block" data-act="to-review">Continue to payment</button><button class="btn ghost block" data-act="skip-snacks">Skip snacks</button></div>`;
  }
  function snacksPage() {
    const d = S.draft; if (!d || !d.seats || !d.seats.length) { go(d && d.theatreId ? 'hall' : 'home'); return; } document.body.classList.remove('immersive');
    const cats = ['All'].concat([...new Set(D.snacks.map(s => s.cat))]);
    setView(`<div class="wrap page">${stepper(2)}
      <div class="pg-head"><a class="btn ghost sm" href="#hall">${ICON.back} Seats</a><div><h1>Snacks &amp; drinks</h1><p class="muted">Pre-order and skip the queue. Pick up at the counter before the show.</p></div></div>
      <div class="snack-layout"><div><div class="chips cats" role="group" aria-label="Menu category">${cats.map(c => `<button class="chip ${snackCat === c ? 'on' : ''}" data-act="cat" data-v="${c}" aria-pressed="${snackCat === c}">${c}</button>`).join('')}</div>
        <div class="snack-grid" id="snackGrid"></div></div>
        <aside class="cart" id="cart" aria-label="Order summary"></aside></div></div>`);
    renderSnackGrid(); $('#cart').innerHTML = cartHTML();
  }
  function renderSnackGrid() { const g = $('#snackGrid'); if (!g) return; const list = D.snacks.filter(s => snackCat === 'All' || s.cat === snackCat); g.innerHTML = list.length ? list.map(snackCard).join('') : emptyState('Nothing here', 'Pick another category.'); A.lazyFood(g); }
  function refreshSnacks(id) { const card = $(`[data-snack="${id}"] .ctl`); if (card) card.innerHTML = snackCtl(D.snack(id)); const c = $('#cart'); if (c) c.innerHTML = cartHTML(); S.save(); }

  /* ---------------- REVIEW + DUMMY PAYMENT ---------------- */
  let payMethod = 'upi', paying = false;
  function reviewPage() {
    const d = S.draft; if (!d || !d.seats || !d.seats.length) { go(d && d.theatreId ? 'hall' : 'home'); return; } document.body.classList.remove('immersive');
    const m = D.movie(d.movieId), th = D.theatre(d.theatreId), t = B.totals(), seats = B.seatLines(), snacks = B.snackLines(); const promo = B.PROMOS[(S.promo || '').toUpperCase()];
    setView(`<div class="wrap page">${stepper(3)}
      <div class="pg-head"><a class="btn ghost sm" href="#snacks">${ICON.back} Snacks</a><div><h1>Review and pay</h1><p class="muted">Demo checkout. No real payment is taken.</p></div></div>
      <div class="review-layout">
        <section class="rv-card"><div class="rv-mv">${posterBox(m, 'mini lg')}<div><h2>${esc(m.title)}</h2><p>${esc(d.lang)} · ${d.fmt}</p><p>${esc(th.name)}, ${esc(th.area)} · ${esc(th.hall)}</p><p><b>${longDate(d.date)}, ${D.fmtTime(d.time)}</b></p></div></div>
          <h3>Seats</h3><ul class="rv-list">${seats.map(s => `<li><span><b>${s.id}</b> <small class="muted">${s.label}</small></span><span>${inr(s.price)}</span></li>`).join('')}</ul>
          <h3>Snacks</h3>${snacks.length ? `<ul class="rv-list">${snacks.map(s => `<li><span>${s.qty} × ${esc(s.name)} <small class="muted">${esc(s.size)}</small></span><span>${inr(s.total)}</span></li>`).join('')}</ul>` : '<p class="muted">No snacks added.</p>'}
          <form class="promo" id="promoForm" autocomplete="off"><label for="promo">Promo code</label><div><input id="promo" placeholder="Try MARVEL10" value="${esc(S.promo)}" maxlength="14"><button class="btn ghost" type="submit">Apply</button></div><p class="pm ${promo ? 'ok' : ''}" id="promoMsg">${promo ? esc((S.promo || '').toUpperCase()) + ' applied: ' + promo.label : ''}</p></form>
          <dl class="sum-t big"><div><dt>Tickets (${t.count})</dt><dd>${inr(t.tickets)}</dd></div><div><dt>Snacks</dt><dd>${inr(t.snacks)}</dd></div><div><dt>Convenience fee</dt><dd>${inr(t.fee)}</dd></div>${t.discount ? `<div class="disc"><dt>Discount</dt><dd>−${inr(t.discount)}</dd></div>` : ''}<div class="tot"><dt>Amount payable</dt><dd>${inr(t.total)}</dd></div></dl></section>
        <section class="rv-card pay" aria-label="Payment"><h2>Payment</h2>
          <div class="seg wide" id="paySeg" role="tablist" aria-label="Payment method">${[['upi', 'UPI'], ['card', 'Card'], ['wallet', 'Wallet']].map(([k, l]) => `<button role="tab" data-act="pay-m" data-v="${k}" aria-selected="${k === payMethod}" aria-pressed="${k === payMethod}">${l}</button>`).join('')}</div>
          <form id="payForm" novalidate autocomplete="off"><div id="payFields"></div><p class="form-err" id="payErr" role="alert" hidden></p>
            <button class="btn primary block lg" type="submit" id="payBtn">Pay ${inr(t.total)}</button>
            <p class="muted small center">Demo only. Enter any details. A card ending in 0000 simulates a declined payment.</p></form></section>
      </div></div>`);
    A.lazyPosters(view()); renderPayFields();
    $('#promoForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#promo').value.trim().toUpperCase(); if (!v) { S.promo = ''; S.save(); reviewPage(); return; } if (!B.PROMOS[v]) { $('#promoMsg').textContent = 'That code is not valid. Try MARVEL10 or FIRSTSHOW.'; $('#promoMsg').className = 'pm bad'; return; } S.promo = v; S.save(); toast('Promo applied'); reviewPage(); });
    $('#payForm').addEventListener('submit', e => { e.preventDefault(); pay(); });
    $('#payForm').addEventListener('input', e => { if (e.target.id === 'cardNo') { const v = e.target.value.replace(/\D/g, '').slice(0, 16); e.target.value = v.replace(/(.{4})/g, '$1 ').trim(); } if (e.target.id === 'exp') { let v = e.target.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); e.target.value = v; } $('#payErr').hidden = true; });
  }
  function renderPayFields() {
    const f = $('#payFields'); if (!f) return;
    f.innerHTML = payMethod === 'upi' ? `<label for="upi">UPI ID</label><input id="upi" placeholder="name@bank" inputmode="email" autocapitalize="off" spellcheck="false"><div class="upi-apps"><span>Google Pay</span><span>PhonePe</span><span>Paytm</span><span>BHIM</span></div>`
      : payMethod === 'card' ? `<label for="cardNo">Card number</label><input id="cardNo" inputmode="numeric" placeholder="4111 1111 1111 1111" maxlength="19"><div class="two-f"><div><label for="exp">Expiry</label><input id="exp" inputmode="numeric" placeholder="MM/YY" maxlength="5"></div><div><label for="cvv">CVV</label><input id="cvv" inputmode="numeric" placeholder="123" maxlength="4" type="password"></div></div><label for="cname">Name on card</label><input id="cname" placeholder="As printed on card" autocomplete="off">`
        : `<fieldset class="wallets"><legend class="sr">Choose a wallet</legend>${['Paytm Wallet', 'Amazon Pay', 'Mobikwik'].map((w, i) => `<label class="wal"><input type="radio" name="wal" value="${w}" ${i === 0 ? 'checked' : ''}><span>${w}</span></label>`).join('')}</fieldset>`;
  }
  function validatePay() {
    if (payMethod === 'upi') { return /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test($('#upi').value.trim()) ? '' : 'Enter a valid UPI ID, like name@bank.'; }
    if (payMethod === 'card') {
      const n = $('#cardNo').value.replace(/\s/g, ''); if (n.length !== 16) return 'Card number must be 16 digits.';
      const m = $('#exp').value.match(/^(\d{2})\/(\d{2})$/); if (!m || +m[1] < 1 || +m[1] > 12) return 'Enter expiry as MM/YY.';
      const now = new Date(), y = 2000 + +m[2]; if (y < now.getFullYear() || (y === now.getFullYear() && +m[1] < now.getMonth() + 1)) return 'This card has expired.';
      if (!/^\d{3,4}$/.test($('#cvv').value)) return 'Enter the 3 digit CVV.'; if ($('#cname').value.trim().length < 2) return 'Enter the name on the card.';
    }
    return '';
  }
  async function pay() {
    if (paying) return; const err = validatePay(); const eb = $('#payErr');
    if (err) { eb.textContent = err; eb.hidden = false; const first = $('#payFields input'); first && first.focus(); return; }
    const d = S.draft, taken = (S.taken[SE.showKey(d)] || []); if (d.seats.some(id => taken.includes(id))) { toast('Some seats were just booked. Please pick again.', 'warn'); go('hall'); return; }
    paying = true; const btn = $('#payBtn'); btn.disabled = true; btn.innerHTML = '<span class="spin sm"></span> Processing…'; eb.hidden = true;
    await delay(1900);
    if (payMethod === 'card' && $('#cardNo').value.replace(/\s/g, '').endsWith('0000')) { paying = false; btn.disabled = false; btn.textContent = 'Pay ' + inr(B.totals().total); eb.textContent = 'The demo bank declined this card. Try another card or pay with UPI.'; eb.hidden = false; return; }
    const b = B.confirm(payMethod === 'upi' ? 'UPI' : payMethod === 'card' ? 'Card' : $('input[name=wal]:checked').value); paying = false; updateTixCount(); go('ticket-' + b.id);
  }

  /* ---------------- TICKET ---------------- */
  function usableBooking(b) {
    return !!(b && b.id && D.movie(b.movieId) && D.theatre(b.theatreId) &&
      b.date && b.time && Array.isArray(b.seats) && Array.isArray(b.snacks) && b.totals);
  }
  function imageData(url, width, height) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        const canvas = document.createElement('canvas'), scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        canvas.width = width * 4; canvas.height = height * 4;
        const ctx = canvas.getContext('2d'), sw = width / scale, sh = height / scale;
        ctx.drawImage(image, (image.naturalWidth - sw) / 2, (image.naturalHeight - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      image.onerror = () => reject(new Error('Image could not be loaded'));
      image.src = url;
    });
  }
  function qrImageData(value) {
    const size = 116, canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
    canvas.width = canvas.height = size; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#0c0c0f';
    const cells = /M(\d+) (\d+)h1v1h-1z/g, svg = A.qr(value);
    let cell;
    while ((cell = cells.exec(svg))) ctx.fillRect((Number(cell[1]) + 2) * 4, (Number(cell[2]) + 2) * 4, 4, 4);
    return canvas.toDataURL('image/jpeg', 0.92);
  }
  async function downloadPDF(id) {
    const b = S.bookings.find(x => x.id === id);
    if (!usableBooking(b)) { toast('Ticket data is unavailable.', 'warn'); return; }
    if (!window.jspdf || !window.jspdf.jsPDF) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => downloadPDF(id);
      script.onerror = () => toast('PDF download is unavailable. Check your connection and try again.', 'warn');
      document.head.appendChild(script);
      toast('Preparing your ticket PDF…');
      return;
    }
    const m = D.movie(b.movieId), th = D.theatre(b.theatreId), pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    const text = value => String(value).replace(/[₹–—]/g, c => c === '₹' ? 'Rs. ' : '-');
    const line = (label, value, x, y, width = 78) => {
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(112, 118, 128); pdf.text(label.toUpperCase(), x, y);
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11); pdf.setTextColor(23, 27, 35);
      pdf.text(pdf.splitTextToSize(text(value), width), x, y + 6);
    };
    let posterData = null;
    try { posterData = await imageData(m.poster || m.cardPoster, 48, 72); } catch (e) { toast('Poster could not be embedded; the PDF will still be created.', 'warn'); }
    const qrData = qrImageData(b.id + b.seats.map(s => s.id).join(''));
    pdf.setFillColor(18, 22, 30); pdf.roundedRect(14, 14, 182, 38, 4, 4, 'F');
    pdf.setFillColor(231, 166, 90); pdf.rect(14, 14, 182, 3, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(24); pdf.text('MARQUEE', 23, 32);
    pdf.setFontSize(10); pdf.setTextColor(180, 188, 198); pdf.text('CINEMAS  |  E-TICKET', 23, 42);
    pdf.setFillColor(83, 211, 157); pdf.circle(178, 30, 7, 'F'); pdf.setTextColor(7, 18, 12); pdf.setFontSize(10); pdf.text('OK', 174, 33);
    if (posterData) pdf.addImage(posterData, 'JPEG', 14, 62, 48, 72, undefined, 'FAST');
    else { pdf.setFillColor(38, 65, 77); pdf.roundedRect(14, 62, 48, 72, 3, 3, 'F'); }
    pdf.setTextColor(23, 27, 35); pdf.setFontSize(24); pdf.text(pdf.splitTextToSize(text(m.title), 122), 70, 70);
    pdf.setFontSize(10); pdf.setTextColor(112, 118, 128); pdf.text(text(`${m.lang}  |  ${b.fmt}  |  Certificate ${m.cert}`), 70, 86);
    line('Date', longDate(b.date), 70, 101, 55); line('Show time', D.fmtTime(b.time), 132, 101, 48);
    line('Theatre', `${th.name}, ${th.area}`, 70, 126, 55); line('Screen', th.hall, 132, 126, 48);
    line('Seats', b.seats.map(s => s.id).join(', '), 70, 151, 55); line('Booking ID', b.id, 132, 151, 48);
    pdf.setDrawColor(225, 228, 233); pdf.line(14, 159, 196, 159);
    if (b.snacks.length) line('Snacks', b.snacks.map(s => `${s.qty} x ${s.name}`).join(', '), 14, 173, 112);
    pdf.addImage(qrData, 'JPEG', 150, 164, 42, 42, undefined, 'FAST');
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(112, 118, 128); pdf.text('TICKET CODE  |  DEMO', 151, 211);
    pdf.setFillColor(247, 248, 250); pdf.roundedRect(14, 220, 182, 34, 3, 3, 'F');
    pdf.setTextColor(112, 118, 128); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(10); pdf.text(`PAID VIA ${text(b.pay).toUpperCase()}`, 23, 233);
    pdf.setTextColor(23, 27, 35); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(21); pdf.text(text(inr(b.totals.total)), 23, 246);
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(112, 118, 128); pdf.text('Please carry this e-ticket and a valid ID to the theatre.', 14, 274);
    pdf.setDrawColor(225, 228, 233); pdf.line(14, 280, 196, 280); pdf.setFontSize(8); pdf.text(`Generated ${new Date().toLocaleDateString('en-IN')}  |  Booking ${b.id}`, 14, 288);
    const blob = pdf.output('blob'), url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = `marquee-ticket-${b.id}.pdf`; link.style.display = 'none';
    document.body.appendChild(link); link.click();
    setTimeout(() => { URL.revokeObjectURL(url); link.remove(); }, 1000);
    toast('Ticket PDF downloaded', 'ok');
  }
  function ticketHTML(b, big) {
    if (!usableBooking(b)) {
      return `<div class="empty err" role="alert"><div class="empty-ic" aria-hidden="true">!</div><h3>Ticket data unavailable</h3><p>This saved ticket was created with older or incomplete data.</p><a class="btn primary" href="#tickets">Back to my tickets</a></div>`;
    }
    const m = D.movie(b.movieId), th = D.theatre(b.theatreId);
    const [c0, c1, c2] = m.palette;
    return `<article class="ticket" style="--c0:${c0};--c1:${c1};--c2:${c2}">
      <div class="tk-art">${posterBox(m)}<div class="tk-st"><span>${ICON.check} Confirmed</span></div></div>
      <div class="tk-main"><p class="eyebrow">${esc(m.lang)} · ${esc(b.fmt)} · ${m.cert}</p><h2>${esc(m.title)}</h2>
        <dl class="tk-grid"><div><dt>Date</dt><dd>${longDate(b.date)}</dd></div><div><dt>Time</dt><dd>${D.fmtTime(b.time)}</dd></div><div><dt>Theatre</dt><dd>${esc(th.name)}<small>${esc(th.area)} · ${esc(th.hall)}</small></dd></div><div><dt>Seats</dt><dd class="mono">${b.seats.map(s => s.id).join(', ')}<small>${[...new Set(b.seats.map(s => s.label))].join(', ')}</small></dd></div>
        ${b.snacks.length ? `<div class="wide"><dt>Snacks (collect at the counter)</dt><dd>${b.snacks.map(s => `${s.qty} × ${esc(s.name)}`).join(', ')}</dd></div>` : ''}</dl>
        <div class="tk-foot"><div><dt>Paid</dt><dd>${inr(b.totals.total)} <small>via ${esc(b.pay)}</small></dd></div><div><dt>Booking ID</dt><dd class="mono">${b.id}</dd></div></div></div>
      <div class="tk-stub"><div class="qr-wrap">${A.qr(b.id + b.seats.map(s => s.id).join(''))}</div><p class="mono">${b.id}</p><small>Demo ticket. Not scannable.</small></div></article>`;
  }
  function ticketPage(id) {
    document.body.classList.remove('immersive'); const b = S.bookings.find(x => x.id === id);
    if (!b) { setView(`<div class="wrap page">${emptyState('Ticket not found', 'This booking is not saved in this browser.', '<a class="btn primary" href="#tickets">My tickets</a>')}</div>`); return; }
    const fresh = Date.now() - b.at < 20000;
    setView(`<div class="wrap page">${fresh ? stepper(5) : ''}<div class="tk-head">${fresh ? `<div class="okmark" aria-hidden="true">${ICON.check}</div><h1>Booking confirmed</h1><p class="muted">Your seats are reserved. Show this ticket at the entrance.</p>` : '<h1>Your ticket</h1>'}</div>
      ${ticketHTML(b)}
      <div class="tk-act"><button class="btn primary" data-act="download-pdf" data-id="${b.id}">Download PDF</button><button class="btn ghost" data-act="copy-id" data-id="${b.id}">Copy booking ID</button><a class="btn ghost" href="#tickets">All tickets</a><a class="btn primary" href="#home">Book another movie</a></div></div>`);
    A.lazyPosters(view());
  }
  function ticketsPage() {
    document.body.classList.remove('immersive');
    setView(`<div class="wrap page"><div class="pg-head"><a class="btn ghost sm" href="#home">${ICON.back} Home</a><div><h1>My tickets</h1><p class="muted">Saved in this browser only.</p></div></div>
      ${S.bookings.length ? `<div class="tk-list">${S.bookings.map(b => {
        const m = D.movie(b && b.movieId), th = D.theatre(b && b.theatreId);
        if (!usableBooking(b)) {
          return `<div class="tk-row" role="status"><div><strong>Ticket unavailable</strong><span>This saved ticket is from older or incomplete data.</span><span class="mono">${esc((b && b.id) || 'Unknown booking')}</span></div></div>`;
        }
        return `<a class="tk-row" href="#ticket-${b.id}">${posterBox(m, 'mini')}<div><strong>${esc(m.title)}</strong><span>${longDate(b.date)}, ${D.fmtTime(b.time)} · ${esc(th.name)}</span><span class="mono">${b.seats.map(s => s.id).join(', ')} · ${b.id}</span></div><b>${inr(b.totals.total)}</b></a>`;
      }).join('')}</div><div class="center"><button class="btn ghost sm" data-act="clear-data">Clear demo data</button></div>` : emptyState('No tickets yet', 'Book a movie and your ticket will show up here.', '<a class="btn primary" href="#home">Browse movies</a>')}</div>`);
    A.lazyPosters(view());
  }

  /* ---------------- events ---------------- */
  const actions = {
    lang: el => { S.lang = el.dataset.lang; renderChips(); renderHomeBody(); if (ring) { heroList = ringMovies(); ring.setMovies(heroList); } },
    'clear-search': () => { S.q = ''; $('#q').value = ''; renderHomeBody(); },
    book: el => { const m = D.movie(el.dataset.id); if (m) startBooking(m); },
    notify: el => { const id = el.dataset.id; const i = S.notify.indexOf(id); if (i >= 0) { S.notify.splice(i, 1); toast('Reminder removed'); } else { S.notify.push(id); toast('We will remind you when bookings open', 'ok'); } S.save(); const h = location.hash.slice(1) || 'home'; if (h === 'home') renderHomeBody(); else route(); },
    'ring-prev': () => ring && ring.next(-1), 'ring-next': () => ring && ring.next(1),
    back: () => { const prev = history.length > 1 ? -1 : 0; if (document.referrer || prev) { go('home'); } else go('home'); },
    'back-movie': el => go('movie-' + el.dataset.id),
    down: () => { const dt = $('#details'); dt && dt.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); },
    't-play': () => { const t = MQ.currentTrailer; if (t) { t.playing ? t.pause() : t.play(); } },
    't-replay': () => { const t = MQ.currentTrailer; if (t) { scrollTo({ top: 0, behavior: 'smooth' }); t.seek(0); t.play(); } },
    'trailer-sound': el => {
      const media = $('#externalTrailer');
      if (!media) return;
      if (media.tagName === 'VIDEO') {
        media.muted = false;
        media.volume = 1;
        media.play().catch(() => toast('Tap the video controls to enable sound', 'warn'));
      } else {
        media.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), 'https://www.youtube.com');
        media.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), 'https://www.youtube.com');
      }
      el.remove();
    },
    't-mute': el => { const t = MQ.currentTrailer; if (!t) return; t.setMuted(!t.muted); el.innerHTML = t.muted ? ICON.mute : ICON.sound; el.setAttribute('aria-pressed', !t.muted); el.setAttribute('aria-label', t.muted ? 'Turn sound on' : 'Turn sound off'); },
    't-full': () => { const s = $('#stage'); try { if (document.fullscreenElement) document.exitFullscreen(); else if (s.requestFullscreen) s.requestFullscreen().catch(() => toast('Full screen is not available here', 'warn')); else toast('Full screen is not available here', 'warn'); } catch (e) { toast('Full screen is not available here', 'warn'); } },
    date: el => { S.dateISO = el.dataset.date; theatresPage(); },
    sl: el => { S.langFilter = el.dataset.v; theatresPage(); }, sf: el => { S.fmtFilter = el.dataset.v; theatresPage(); },
    'reset-filters': () => { S.langFilter = 'All'; S.fmtFilter = 'All'; theatresPage(); },
    'pick-show': el => {
      const m = S.draft ? D.movie(S.draft.movieId) : null; const h = location.hash.slice(1);
      const movieId = h.startsWith('movie-') ? h.slice(6) : (m && m.id); if (!movieId) return;
      S.draft = { movieId, theatreId: el.dataset.th, date: el.dataset.date, time: el.dataset.time, lang: el.dataset.lang, fmt: el.dataset.fmt, seats: [] }; S.save(); go('hall');
    },
    hv: (el) => hallHandlers.hv && hallHandlers.hv(el.dataset.v), cam: el => hallHandlers.cam && hallHandlers.cam(el.dataset.v, el),
    zin: () => hallHandlers.zin && hallHandlers.zin(), zout: () => hallHandlers.zout && hallHandlers.zout(), zreset: () => hallHandlers.zreset && hallHandlers.zreset(),
    'rm-seat': el => hallHandlers['rm-seat'] && hallHandlers['rm-seat'](el.dataset.id), 'sum-toggle': () => hallHandlers['sum-toggle'] && hallHandlers['sum-toggle'](), 'to-snacks': () => hallHandlers['to-snacks'] && hallHandlers['to-snacks'](),
    cat: el => { snackCat = el.dataset.v; $$('.cats .chip').forEach(c => { const on = c.dataset.v === snackCat; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); }); renderSnackGrid(); },
    's-inc': el => { const id = el.dataset.id; S.cart[id] = Math.min(10, (S.cart[id] || 0) + 1); refreshSnacks(id); },
    's-dec': el => { const id = el.dataset.id; S.cart[id] = Math.max(0, (S.cart[id] || 0) - 1); if (!S.cart[id]) delete S.cart[id]; refreshSnacks(id); },
    's-rm': el => { const id = el.dataset.id; delete S.cart[id]; refreshSnacks(id); toast('Removed from your order'); },
    'skip-snacks': () => { S.cart = {}; S.save(); go('review'); }, 'to-review': () => { S.save(); go('review'); },
    'pay-m': el => { payMethod = el.dataset.v; $$('#paySeg button').forEach(b => { b.setAttribute('aria-selected', b === el); b.setAttribute('aria-pressed', b === el); }); renderPayFields(); $('#payErr').hidden = true; },
    'copy-id': el => { const id = el.dataset.id; const done = () => toast('Booking ID copied', 'ok'); try { navigator.clipboard.writeText(id).then(done, () => toast('Booking ID: ' + id)); } catch (e) { toast('Booking ID: ' + id); } },
    'download-pdf': el => downloadPDF(el.dataset.id),
    'clear-data': el => { if (el.dataset.sure) { ['mq_draft', 'mq_cart', 'mq_promo', 'mq_bookings', 'mq_taken', 'mq_notify'].forEach(MQ.util.store.del); S.draft = null; S.cart = {}; S.promo = ''; S.bookings = []; S.taken = {}; S.notify = []; updateTixCount(); toast('Demo data cleared'); ticketsPage(); } else { el.dataset.sure = '1'; el.textContent = 'Tap again to clear all demo bookings'; } },
    retry: () => route()
  };
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]'); if (!el) return; const fn = actions[el.dataset.act]; if (fn) { if (el.tagName === 'A') e.preventDefault(); fn(el); }
  });

  /* ---------------- router ---------------- */
  function route() {
    cleanups.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } }); cleanups = []; routeTok++;
    const raw = (location.hash.slice(1) || 'home'), i = raw.indexOf('-'), name = i < 0 ? raw : raw.slice(0, i), arg = i < 0 ? '' : raw.slice(i + 1);
    window.scrollTo(0, 0); paying = false; document.body.dataset.route = name || 'home';
    switch (name) {
      case 'movie': moviePage(arg); break; case 'theatres': theatresPage(); break; case 'hall': hallPage(); break;
      case 'snacks': snacksPage(); break; case 'review': reviewPage(); break; case 'ticket': ticketPage(arg); break; case 'tickets': ticketsPage(); break;
      default: home();
    }
    const v = view(); v && v.focus({ preventScroll: true });
  }
  function init() { shell(); addEventListener('hashchange', route); route(); }
  return { init, route, go };
})();

(function () {
  function start() { MQ.app.init(); }
  if (window.claude && window.claude.hot && window.claude.hot.ready) window.claude.hot.ready(start); else start();
})();