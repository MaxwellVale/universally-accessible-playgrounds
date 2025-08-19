const playgrounds = [
  {
    id: 'HermonPark',
    place_id: 'ChIJLSJcpaLDwoARuc6czwagtws',
    name: 'Hermon Park (Arroyo Seco Park)',
    address: '5566 Via Marisol, Los Angeles, CA 90042',
    lat: 34.1001,
    lng: -118.1803,
    description: 'An accessible playground in Hermon Park...',
    images: ['/src/assets/Hermon.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Accessible ramp',
        'Inclusive swings'
    ]
  },
  {
    id: 'GriffithPark',
    place_id: 'ChIJ9590IY3AwoARquS6ie60MUc',
    name: 'Griffith Park',
    lat: 34.1367,
    lng: -118.2942,
    description: 'A large park with accessible features???...',
    images: ['/src/assets/Griffith1.jpg', ],
    reviews: [
        {author: 'Mark T.', content: 'Clear walkways. Plenty of shade and seating', review: 4},
        {author: 'Simon S.', content: 'Kid friendly turf and plenty of areas to choose from', review: 5}
    ],
    features: [
        'Accessible ramp',
        'Easily navigable by wheelchair'
    ]
  },
  {
    id: 'AidansPlace',
    place_id: 'ChIJ0fVghny7woARiQ-rsrUqMWU',
    name: 'Aidan\'s Place at Westwood Recreation Center',
    address: '1350S> Sepulveda, Los Angeles, CA 90024',
    lat: 34.053129,
    lng: -118.448111, 
    description: 'A large playground in West Los Angeles with several accessibility features.',
    images: ['/src/assets/AidansPlace1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Accessible ramp',
        'Inclusive swings'
    ]
  },
  {
    id: 'HowardFinn',
    place_id: 'ChIJS44_oaqUwoARjlEdYUVOzfE',
    name: 'Howard Finn Park',
    address: '7747 Foothill Boulevard, Sunland, CA 91402',
    lat: 34.257833,
    lng: -118.300917, 
    description: 'A large playground in West Los Angeles with several accessibility features.',
    images: ['/src/assets/Howard1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Childrens Play Area',
        'Picnic Tables',
        'Volleyball Courts (Unlit)'
    ]
  },
  {
    id: 'Hazard',
    place_id: 'ChIJ63p5ON7FwoARfbbdWG0wWRw',
    name: 'Hazard Recreation Center',
    address: '2230 Norfolk St., Los Angeles, CA 91402',
    lat: 34.060855,
    lng: -118.202570, 
    description: 'A large playground in West Los Angeles with several accessibility features.',
    images: [
        '/src/assets/HazardParkSign.jpg',
        '/src/assets/HazardPlaygroundClose.jpg',
        '/src/assets/HazardSwings.jpg'
     ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Childrens Play Area',
        'Multipurpose Sports Field',
        'Universally Accessible Playground (UAP)'
    ]
  },
  {
    id: 'HansenDam',
    place_id: 'ChIJ129EQTmTwoARqpPW-D8Xdfc',
    name: 'Hansen Dam Recreation Area',
    address: '11770 Foothill Blvd., Lake View Terrace, CA 91342',
    lat: 34.270672,
    lng: -118.390190, 
    description: 'A playground near a dam??',
    images: ['/src/assets/HansenDam1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'None listed'
    ]
  },
  {
    id: 'Dearborn',
    place_id: 'ChIJxZVuw2eawoARQt9SzLYrfDI',
    name: 'Dearborn Park',
    address: '17141 Nordhoff St., Northridge, CA 91325',
    lat: 34.236556,
    lng: -118.507927, 
    description: 'A playground near a dam??',
    images: ['/src/assets/HansenDam1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Basketball Courts (Lighted / Outdoor)', 
        'Childrens Play Area'
    ]
  },
  {
    id: 'DeGarmo',
    place_id: 'ChIJ1-Hls9_YgoAROTVQl8M3QJI',
    name: 'De Garmo Park',
    address: '10145 Arminta St., Sun Valley, CA 91352',
    lat: 34.215039,
    lng: -118.353476, 
    description: 'Do not know much.',
    images: ['/src/assets/HansenDam1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Picnic Tables'
    ]
  },
  {
    id: 'BillRosendahl',
    place_id: 'ChIJYfs2cnm6woARFTl55j5MCJM',
    name: 'Bill Rosendahl Del Rey Park',
    address: '4601 Alla Rd., Los Angeles, CA 90292',
    lat: 33.984613,
    lng: -118.431051, 
    description: 'A playground near a dam??',
    images: ['/src/assets/HansenDam1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Paddle Tennis', 
        'Childrens Play Area',
        'Off-Leash Dog Park'
    ]
  },
  {
    id: 'BennyHPotter',
    place_id: 'ChIJpyi3amm4woARSkx6OdEnQis',
    name: 'Benny H Potter West Adams Avenues Memoral Park',
    address: '2413 Second Ave, Los Angeles, CA 90018',
    lat: 34.034386,
    lng: -118.319397, 
    description: 'A memorial park that hosts several after school and summer programas for kids.',
    images: ['/src/assets/HansenDam1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Basketball Courts (Lighted / Outdoor)', 
        'Childrens Play Area'
    ]
  },
  {
    id: 'BaldwinHills',
    place_id: 'ChIJdbq4ery5woARIivTg_76ZMM',
    name: 'Baldwin Hills Recreation Center',
    address: '5401 Highlight Pl., Los Angeles, CA 90016',
    lat: 34.023511,
    lng: -118.364202, 
    description: 'A playground near a dam??',
    images: ['/src/assets/HansenDam1.jpg', ],
    reviews: [
        {author: 'Jane D.', content: 'Great accessible swings!', review: 5},
        {author: 'Darwin, C.', content: 'Could use more accessible walkways...', review: 3}
    ],
    features: [
        'Basketball Courts (Lighted / Outdoor)', 
        'Childrens Play Area'
    ]
  },
  {
    id: 'HarvardPark',
    place_id: 'ChIJnZUvdtm3woARDE7LsazdD2Q',
    name: 'Harvard Park',
    lat: 33.983511, 
    lng: -118.303790,
  },
  {
    id: 'JaimeBethSlavinPark',
    place_id: 'ChIJaWpUjbyWwoARCfs6tQK6YfQ',
    name: 'Jaime Beth Slavin Park',
    lat: 34.215323,
    lng: -118.4066346,
  },
  {
    "id": "KenMalloyHarborPark",
    "place_id": "ChIJo_gGIPI13YARvx0X7t3i5nU",
    "name": "Ken Malloy Harbor Regional Park",
    "lat": 33.783516,
    "lng": -118.29487599999999,
    "address": "25820 Vermont Ave, Harbor City, CA 90710, USA"
  },
  {
    id: 'AnthonyBeilensonPark',
    place_id: 'ChIJY2aJIduZwoAR0L-BBNrkvBs',
    lat: 34.181399899999995,
    lng: -118.49847079999999,
    address: "6300 Balboa Blvd, Van Nuys, CA 91406, USA",
    name: "Lake Balboa/Anthony C. Beilenson Park"
  },
  {
    id: 'LakeStreetPark',
    place_id: 'ChIJv3680w3HwoAR0w8c_g6f9qc',
    lat: 34.0689383,
    lng: -118.2704805,
    address: "227 N Lake St, Los Angeles, CA 90026, USA",
    name: "Lake Street Community Center"
  },
  {
    id: 'LincolnPark',
    place_id: 'ChIJlVrAt9nFwoARsIhCc_AGd4c',
    "lat": 34.066548,
    "lng": -118.20076230000001,
    "address": "3501 Valley Blvd, Los Angeles, CA 90031, USA",
    "name": "Lincoln Park"
  },
  {
    "id": "MasonRecCenter",
    "place_id": "",
    "name": "Mason Recreation Center",
    features: [
        "Rubber floor play area",
        "Inclusive swing seats",
        "Inclusive see-saw seats"
    ]
  },
{
    "id": "PanPacific",
    "place_id": "",
    "address": "",
    "name": "Pan Pacific Park / Renee's Place",
    features: [
        "Rubber floor play area",
        "Accessible ramp",
        "Inclusive swing seats"
    ]
  },
  {
    "id": "RioDeLA",
    "place_id": "",
    "address": "",
    "name": "Rio De Los Angeles State Park (AKA Taylor's Yard)",
    features: [
        "Rubber floor play area",
        "Sand play area",
        "Accessible ramp",
        "Inclusive swing seats",
        "Water play area",
        "Round swing"
    ]
  },
  {
    "id": "RitchieValens",
    "place_id": "",
    "address": "",
    "name": "Ritchie Valens Park",
    features: [
        "Rubber floor play area",
        "Sand play area",
        "Accessible ramp",
        "Inclusive swing seats",
        "Standalone sensory play options",
        "Round swing",
        "Inclusive seat merry-go-round"
    ]
  },
  {
    "id": "RosecransRecCenter",
    "place_id": "ChIJUa9293zKwoAR38mEUT-hDiw",
    "lat": 33.896389,
    "lng": -118.2904586,
    "address": "840 W 149th St, Gardena, CA 90247, USA",
    "name": "Rosecrans Recreation Center",
      features: [
        "Rubber floor play area",
        "Sand play area",
        "Accessible ramp",
        "Inclusive swing seats",
        "Standalone sensory play options",
    ]
  },
  {
    "id": "SepulvedaRecCenter",
    "place_id": "ChIJLSJ5FMaQwoARyf2ZwTEn3GM",
    "lat": 34.23,
    "lng": -118.45777779999999,
    "address": "8825 Kester Ave, Panorama City, CA 91402, USA",
    "name": "Sepulveda Recreation Center",
    features: [
        "Rubber floor play area",
        "Sand play area",
        "Accessible ramp",
        "Inclusive swing seats",
        "Large round swing",
        "Inclusive seat merry-go-round",
        "Standalone sensory play options",
        "Inclusive seat zip-line"
    ]
  },
  {
    "id": "ShadowRanchRecCenter",
    "place_id": "ChIJxQKvmTacwoARJ01LjELLd1E",
    "lat": 34.1945663,
    "lng": -118.6199798,
    "address": "22633 Vanowen St, West Hills, CA 91307, USA",
    "name": "Shadow Ranch Recreation Center",
    features: [
        "Rubber floor play area",
        "Sand play area",
        "Accessible ramp",
        "Inclusive swing seats"
    ]
  },
  {
    "id": "Shane'sInspiration",
    "place_id": "ChIJ7WrIKInAwoARe6ZeklLQqfA",
    "lat": 34.135184699999996,
    "lng": -118.2842313,
    "address": "4800 Crystal Springs Dr, Los Angeles, CA 90027, USA",
    "name": "Griffith park Playground 🛝",
    features: [
      "Inclusive seat merry-go-round",
      "Inclusive seat see-saws",
      "Standalone sensory play options",
      "Accessible ramp",
      "Rubber floor play area",
      "Sand play area",
      "Inclusive seat zip-line"
    ]
  },
  {
    "id": "SouthParkRecCenter",
    "place_id": "ChIJUZtOqEPIwoAR2lGfM8zHvTE",
    "lat": 33.9965623,
    "lng": -118.26860590000001,
    "address": "345 E 51st St, Los Angeles, CA 90011, USA",
    "name": "South Park Recreation Center",
    features: [
      "Sand play area",
      "Rubber floor play area",
      "Accessible ramp",
      "Standalone sensory play options"
    ]
  },
  {
    "id": "StonerRecCenter",
    "place_id": "ChIJu0cPAW27woARHCJ70ge3j18",
    "lat": 34.0384774,
    "lng": -118.4534898,
    "address": "1835 Stoner Ave, Los Angeles, CA 90025, USA",
    "name": "Stoner Recreation Center",
    features: [
      "Rubber floor play area",
      "Inclusive swing seats",
      "Accessible ramp",
      "Sand play area"
    ]
  },
  {
    "id": "StudioCityRecCenter",
    "place_id": "ChIJXcieTRyWwoARMKOrb-d18Xs",
    "lat": 34.151424899999995,
    "lng": -118.4076908,
    "address": "12621 Rye St, Studio City, CA 91604, USA",
    "name": "Studio City Recreation Center",
    features: [
      "Rubber floor play area",
      "Inclusive seat merry-go-round",
      "Inclusive swing seats"
    ]
  },
  {
    "id": "SycamoreGrovePark",
    "place_id": "ChIJr9T5oB_EwoARrvgeZxvPoVM",
    "lat": 34.1000935,
    "lng": -118.20331789999999,
    "address": "4702 N Figueroa St, Los Angeles, CA 90042, USA",
    "name": "Sycamore Grove Park",
    features: [
      "Rubber floor play area",
      "Sand play area",
      "Accessible ramp",
      "Inclusive swing seats"
    ]
  },
  {
    "id": "TobiasAvenuePark",
    "place_id": "ChIJx1iXrtyQwoARB-xfCojE-H0",
    "lat": 34.2363864,
    "lng": -118.45098859999999,
    "address": "9122 Tobias Ave, Panorama City, CA 91402, USA",
    "name": "Tobias Avenue Park",
    features: [
      "Rubber floor play area",
      "Accessible ramp"
    ]
  },
  {
    "id": "ValleyGlenCommunityPark",
    "place_id": "ChIJH20sK1yWwoARGuC_MyQjh7g",
    "lat": 34.1824486,
    "lng": -118.4192733,
    "address": "6150 Atoll Ave, Van Nuys, CA 91436, USA",
    "name": "Valley Glen Community Park",
    features: [
      "Rubber floor play area",
      "Accessible ramp",
      "Sand play area",
      "Inclusive swing seats"
    ]
  },
  {
    "id": "VanNuysShermanOaksRecCenter",
    "place_id": "ChIJjaY46rWXwoARMhb-0osOSD0",
    "lat": 34.1600154,
    "lng": -118.44202370000001,
    "address": "14201 Huston St, Sherman Oaks, CA 91423, USA",
    "name": "Van Nuys/Sherman Oaks Recreation Center",
    features: [ 
      "Rubber floor play area",
      "Sand play area",
      "Standalone sensory play options",
      "Accessible ramp",
      "Wheelchair Accessible see-saw (SwayFun)"
    ]
  },
  {
    "id": "VermontGagePark",
    "place_id": "ChIJr6raBS_IwoARAc79mTIrYQU",
    "lat": 33.9823501,
    "lng": -118.291077,
    "address": "963-999 W Gage Ave, Los Angeles, CA 90044, USA",
    "name": "Vermont Gage Pocket Park",
    features: [
      "Rubber floor play area",
      "Inclusive seat see-saws",
      "Inclusive seat swings",
      "Standalone sensory play options",
      "Large round swing",
      "Accessible ramp"
    ]
  },
  {
    "id": "WestchesterRecCenter",
    "place_id": "ChIJt9QC6cGwwoARpC1LClsb0QA",
    "lat": 33.9594131,
    "lng": -118.4140147,
    "address": "7000 W Manchester Ave, Los Angeles, CA 90045, USA",
    "name": "Westchester Recreation Center",
    features: [
      "Rubber floor play area",
      "Sand play area",
      "Accessible ramp",
      "Standalone sensory play options"
    ]
  },
  {
    "id": "WestsideNeighborhoodPark",
    "place_id": "ChIJP2yCkJi5woAR0cmkulkmhEI",
    "lat": 34.029506999999995,
    "lng": -118.37019900000001,
    "address": "3085 Clyde Ave, Los Angeles, CA 90016, USA",
    "name": "Westside Neighborhood Park",
    features: [
      "Rubber floor play area",
      "Standalone sensory play options",
      "Accessible ramp",
      "Inclusive Swing Seats",
      "Sand play area",
      "Wheelchair Accessible see-saw (SwayFun)"
    ]
  }
  // add more...
];

export default playgrounds;