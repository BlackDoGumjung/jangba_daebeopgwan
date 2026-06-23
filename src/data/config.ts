export const CATEGORY_WEIGHTS = {
  COMMON: [
    { type: "BUY", weight: 35 },
    { type: "WAIT", weight: 20 },
    { type: "USED", weight: 35 },
    { type: "DONT_BUY", weight: 9 },
    { type: "SPECIAL", weight: 1 },
  ],

  STOCK: [
    { type: "BUY", weight: 30 },
    { type: "WAIT", weight: 19 },
    { type: "USED", weight: 10 },
    { type: "DONT_BUY", weight: 40 },
    { type: "SPECIAL", weight: 1 },
  ],

  OTAKU: [
    { type: "BUY", weight: 20 },
    { type: "WAIT", weight: 10 },
    { type: "USED", weight: 5 },
    { type: "DONT_BUY", weight: 60 },
    { type: "SPECIAL", weight: 5 },
  ],

  FOOD: [
    { type: "BUY", weight: 59 },
    { type: "WAIT", weight: 20 },
    { type: "USED", weight: 5 },
    { type: "DONT_BUY", weight: 15 },
    { type: "SPECIAL", weight: 1 },
  ],
};

export const VERDICT_LABELS = {
  BUY: "사라",
  WAIT: "존버",
  DONT_BUY: "하지 마라",
  USED: "자만추 추구",
  SPECIAL: "특별재판부",
};

export const conversions = [
  {
    name: "치킨",
    unitPrice: 20000,
    formatter: (count: number) => `치킨 ${count.toFixed(1)}마리`,
  },
  {
    name: "메가커피 아아",
    unitPrice: 2000,
    formatter: (count: number) => `메가 아아 ${Math.floor(count)}잔`,
  },
  {
    name: "삼각김밥",
    unitPrice: 1500,
    formatter: (count: number) => `삼각김밥 ${Math.floor(count)}개`,
  },
  {
    name: "유툽 프리미엄",
    unitPrice: 14900,
    formatter: (count: number) => `유툽 프리미엄 ${count.toFixed(1)}개월`,
  },
  {
    name: "차은우",
    unitPrice: 20000000000,
    formatter: (count: number) => `${count.toFixed(8).replace(/\.?0+$/, "")} 은우`,
  },
];
