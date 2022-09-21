import * as dotenv from "dotenv";
dotenv.config();

const {
  NODE_PORT,
  TILELAYER_BASE_URL,
  REVERSE_GEOCODING_URL,
  GEODATA_API_URL,
  COUNTRYAPI_KEY,
  OCEAN_REVERSE_GEOCODING_URL,
} = process.env;

console.log({ NODE_PORT });

export { NODE_PORT };
export { TILELAYER_BASE_URL };
export { REVERSE_GEOCODING_URL };
export { GEODATA_API_URL };
export { COUNTRYAPI_KEY };
export { OCEAN_REVERSE_GEOCODING_URL };
export const COUNTRYAPI_URL: string = "https://countryapi.io/api/name/";
export const sampleGeoData = {
  country: "Libya",
  state: "Kufra",
  ISO_country: "LY",
  ISO_state: "KF",
  display_name: "Kufra, Libya",
  about:
    "Libya (/ˈlɪbiə/ (listen); Arabic: ليبيا, romanized: Lībiyā), officially the State of Libya (Arabic: دولة ليبيا, romanized: Dawlat Lībiyā, Italian: Stato della Libia), is a country in the Maghreb region in North Africa. It is bordered by the Mediterranean Sea to the north, Egypt to the east, Sudan to the southeast, Chad to the south, Niger to the southwest, Algeria to the west, and Tunisia to the northwest. Libya is made of three historical regions: Tripolitania, Fezzan, and Cyrenaica. With an area of almost 700,000 square miles (1.8 million km2), it is the fourth-largest country in Africa and the Arab world, and the 16th-largest in the world. Libya has the 10th-largest proven oil reserves in the world. The largest city and capital, Tripoli, is located in western Libya and contains over three million of Libya's seven million people.Libya has been inhabited by Berbers since the late Bronze Age as descendants from Iberomaurusian and Capsian cultures. In ancient times, the Phoenicians established city-states and trading posts in western Libya, while more recently the Ottoman Empire controlled the northern coastline of Libya. Parts of Libya were variously ruled by Carthaginians, Persians, Egyptians and Macedonians before the entire region becoming a part of the Roman Empire. Libya was an early center of Christianity. After the fall of the Western Roman Empire, the area of Libya was mostly occupied by the Vandals until the 7th century when invasions brought Islam to the region. In the 16th century, the Spanish Empire and the Knights of St John occupied Tripoli until Ottoman rule began in 1551. Libya was involved in the Barbary Wars of the 18th and 19th centuries. Ottoman rule continued until the Italo-Turkish War, which resulted in the Italian occupation of Libya and the establishment of two colonies, Italian Tripolitania and Italian Cyrenaica (1911–1934), later unified in the Italian Libya colony from 1934 to 1943.During the Second World War, Libya was an area of warfare in the North African Campaign. The Italian population then went into decline. Libya became independent as a kingdom in 1951. A bloodless military coup in 1969, initiated by a coalition led by Colonel Muammar Gaddafi, overthrew King Idris I and created a republic. Gaddafi was often described by critics as a dictator, and was one of the world's longest serving non-royal leaders, ruling for 42 years. He ruled until being overthrown and killed in the 2011 Libyan Civil War during the wider Arab Spring, with authority transferred to the National Transitional Council then to the elected General National Congress. By 2014 two rival authorities claimed to govern Libya, which led to a second civil war, with parts of Libya split between the Tobruk and Tripoli-based governments as well as various tribal and Islamist militias. The two main warring sides signed a permanent ceasefire in 2020, and a unity government took authority to plan for democratic elections, however political rivalries continue to delay this.Libya is a member of the United Nations, the Non-Aligned Movement, the African Union, the Arab League, the OIC and OPEC. The country's official religion is Islam, with 96.6% of the Libyan population being Sunni Muslims.",
  flag_url:
    "//upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Libya.svg/125px-Flag_of_Libya.svg.png",
  official_name: "State of Libya",
  top_level_domain: [".ly"],
  calling_code: "+218",
  capital: "Tripoli",
  population: 6871287,
  area: 1759540,
  timezones: ["UTC+01:00"],
  currencies: [
    {
      code: "LYD",
      name: "Libyan dinar",
      symbol: "ل.د",
    },
  ],
  type: "country",
};
