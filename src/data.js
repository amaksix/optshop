import { marks } from './brandMarks';

function logo(key, color) {
  return color ? { icon: marks[key], color } : { icon: marks[key] };
}

export const categories = [
  { id: 'phones', icon: 'Smartphone', photo: 'category-phones' },
  { id: 'computers', icon: 'Laptop', photo: 'category-computers' },
  { id: 'tv', icon: 'Tv', photo: 'category-tv' },
  { id: 'appliances', icon: 'Refrigerator', photo: 'category-appliances' },
  { id: 'beauty', icon: 'Sparkles', photo: 'category-beauty' },
  { id: 'home', icon: 'Microwave', photo: 'category-home' },
  { id: 'smarthome', icon: 'HouseWifi', photo: 'category-smarthome' },
  { id: 'accessories', icon: 'Cable', photo: 'category-accessories' },
];

export const values = [
  { id: 'brands', icon: 'Package' },
  { id: 'delivery', icon: 'Truck' },
  { id: 'terms', icon: 'BadgePercent' },
  { id: 'b2b', icon: 'Handshake' },
  { id: 'support', icon: 'Headset' },
  { id: 'europe', icon: 'Globe' },
];

export const steps = ['apply', 'offer', 'order', 'delivery'];

export const clients = [
  { id: 'retail', icon: 'Store' },
  { id: 'shops', icon: 'ShoppingBag' },
  { id: 'institutions', icon: 'Building2' },
  { id: 'service', icon: 'Wrench' },
  { id: 'integrators', icon: 'Network' },
  { id: 'other', icon: 'Handshake' },
];

export const partnerPoints = ['prices', 'catalogue', 'delivery', 'manager'];

export const topics = ['client', 'quote', 'general', 'career'];

export const newsItems = [
  { id: 'range', icon: 'Boxes' },
  { id: 'delivery', icon: 'Truck' },
  { id: 'b2b', icon: 'Handshake' },
];

export const techBrands = [
  { name: 'Samsung', ...logo('siSamsung') },
  { name: 'Apple', ...logo('siApple') },
  { name: 'Xiaomi', ...logo('siXiaomi') },
  { name: 'Lenovo', ...logo('siLenovo') },
  { name: 'ASUS', ...logo('siAsus') },
  { name: 'HP', ...logo('siHp') },
  { name: 'Dell', ...logo('siDell') },
  { name: 'LG', ...logo('siLg') },
  { name: 'Sony', ...logo('siSony', '#111111') },
  { name: 'Huawei', ...logo('siHuawei') },
  { name: 'Microsoft', color: '#111111' },
  { name: 'Google', ...logo('siGoogle') },
  { name: 'Nokia', ...logo('siNokia') },
  { name: 'Acer', ...logo('siAcer') },
  { name: 'MSI', ...logo('siMsi') },
  { name: 'Intel', ...logo('siIntel') },
  { name: 'NVIDIA', ...logo('siNvidia') },
  { name: 'Logitech', ...logo('siLogitech') },
  { name: 'JBL', ...logo('siJbl') },
  { name: 'Bose', ...logo('siBose') },
  { name: 'DJI', ...logo('siDji') },
  { name: 'OPPO', ...logo('siOppo') },
  { name: 'Honor', ...logo('siHonor') },
  { name: 'OnePlus', ...logo('siOneplus') },
  { name: 'Motorola', ...logo('siMotorola') },
];

export const homeBrands = [
  { name: 'Bosch', ...logo('siBosch') },
  { name: 'Siemens', ...logo('siSiemens') },
  { name: 'Panasonic', ...logo('siPanasonic') },
  { name: 'Sharp', ...logo('siSharp') },
  { name: 'Hitachi', ...logo('siHitachi') },
  { name: "De'Longhi", ...logo('siDelonghi') },
  { name: 'Yamaha', ...logo('siYamahacorporation') },
  { name: 'Sonos', ...logo('siSonos') },
  { name: 'Philips', color: '#0B5ED7' },
  { name: 'Dyson', color: '#111111' },
  { name: 'Braun', color: '#111111' },
  { name: 'Electrolux', color: '#041E42' },
  { name: 'Tefal', color: '#E30613' },
  { name: 'Rowenta', color: '#111111' },
];

export const allBrands = [...techBrands, ...homeBrands];

export const countries = [
  ['LV', 'Latvija', 'Latvia'],
  ['LT', 'Lietuva', 'Lithuania'],
  ['EE', 'Igaunija', 'Estonia'],
  ['PL', 'Polija', 'Poland'],
  ['DE', 'Vācija', 'Germany'],
  ['FI', 'Somija', 'Finland'],
  ['SE', 'Zviedrija', 'Sweden'],
  ['NO', 'Norvēģija', 'Norway'],
  ['DK', 'Dānija', 'Denmark'],
  ['NL', 'Nīderlande', 'Netherlands'],
  ['BE', 'Beļģija', 'Belgium'],
  ['FR', 'Francija', 'France'],
  ['ES', 'Spānija', 'Spain'],
  ['IT', 'Itālija', 'Italy'],
  ['AT', 'Austrija', 'Austria'],
  ['CZ', 'Čehija', 'Czechia'],
  ['SK', 'Slovākija', 'Slovakia'],
  ['HU', 'Ungārija', 'Hungary'],
  ['RO', 'Rumānija', 'Romania'],
  ['BG', 'Bulgārija', 'Bulgaria'],
  ['GR', 'Grieķija', 'Greece'],
  ['PT', 'Portugāle', 'Portugal'],
  ['IE', 'Īrija', 'Ireland'],
  ['HR', 'Horvātija', 'Croatia'],
  ['SI', 'Slovēnija', 'Slovenia'],
  ['LU', 'Luksemburga', 'Luxembourg'],
  ['CH', 'Šveice', 'Switzerland'],
  ['GB', 'Apvienotā Karaliste', 'United Kingdom'],
  ['OTHER', 'Cita valsts', 'Other country'],
];
