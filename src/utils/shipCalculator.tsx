type Zone = "zone1" | "zone2" | "zone3" | "zone4";
export type Weight = 0.5 | 1 | 2 | 3 | 5;
type Destination = "shipping";

export type State =
  | "Buenos Aires"
  | "Catamarca"
  | "Chaco"
  | "Chubut"
  | "Córdoba"
  | "Corrientes"
  | "Entre Ríos"
  | "Formosa"
  | "Jujuy"
  | "La Pampa"
  | "La Rioja"
  | "Mendoza"
  | "Misiones"
  | "Neuquén"
  | "Río Negro"
  | "Salta"
  | "San Juan"
  | "San Luis"
  | "Santa Cruz"
  | "Santa Fe"
  | "Santiago del Estero"
  | "Tierra del Fuego"
  | "Tucumán"
  | "San Salvador de Jujuy";

const zoneList: { [state in State]: Zone } = {
  "San Salvador de Jujuy": "zone1",
  "Buenos Aires": "zone4",
  Catamarca: "zone2",
  Chaco: "zone3",
  Chubut: "zone4",
  Córdoba: "zone3",
  Corrientes: "zone3",
  "Entre Ríos": "zone3",
  Formosa: "zone3",
  Jujuy: "zone2",
  "La Pampa": "zone4",
  "La Rioja": "zone3",
  Mendoza: "zone4",
  Misiones: "zone3",
  Neuquén: "zone4",
  "Río Negro": "zone4",
  Salta: "zone2",
  "San Juan": "zone4",
  "San Luis": "zone4",
  "Santa Cruz": "zone4",
  "Santa Fe": "zone3",
  "Santiago del Estero": "zone2",
  "Tierra del Fuego": "zone4",
  Tucumán: "zone2",
};

export const stateList = Object.keys(zoneList);

const priceList: {
  [zone in Zone]: {
    [destination in Destination]: { [weight in Weight]: number };
  };
} = {
  zone1: {
    shipping: { "0.5": 1071, "1": 1154, "2": 1267, "3": 1274, "5": 1288 },
    // Sucursal: { "0.5": 651, "1": 662, "2": 719, "3": 729, "5": 754 },
  },
  zone2: {
    shipping: { "0.5": 1186, "1": 1384, "2": 1425, "3": 1505, "5": 1784 },
    // Sucursal: { "0.5": 770, "1": 834, "2": 980, "3": 1084, "5": 1355 },
  },
  zone3: {
    shipping: { "0.5": 1290, "1": 1508, "2": 1557, "3": 1697, "5": 1999 },
    // Sucursal: { "0.5": 843, "1": 917, "2": 1068, "3": 1230, "5": 1496 },
  },
  zone4: {
    shipping: { "0.5": 1296, "1": 1519, "2": 1646, "3": 1811, "5": 2206 },
    // Sucursal: { "0.5": 862, "1": 958, "2": 1152, "3": 1347, "5": 1530 },
  },
};

const roundWeight = (weight: number) => {
  const weightList: Weight[] = [5, 3, 2, 1, 0.5];
  let rounded: Weight = 0.5;
  weightList.forEach(e => {
    if(e >= weight) rounded = e;
  });
  return rounded
}

export const shipCalculator = (
  weight: number,
  state?: State | "default",
  type?: "shipping" | "withdraw"
) => {
  const discount = 0.9;
  const roundedWeight = roundWeight(weight);
  if (type == "withdraw") return 0;
  console.log({ weight, state, type })
  if (state && weight && type && state != "default") {
    return Math.round(priceList[zoneList[state]][type][roundedWeight] * discount);
  }
  return 0;
};
