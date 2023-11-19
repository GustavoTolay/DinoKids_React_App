// Product types
export type NewProduct = {
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventory: NewInventory[];
};

export type Product = NewProduct & {
  _id: string;
  inventory: Inventory[]
};

export type BasicProduct = Product & {
  inventory: { _id: string }[];
};

// Inventory types
export type NewInventory = {
  model: string;
  sizes: NewSize[];
};

export type Inventory = NewInventory & {
  _id: string;
  sizes: Size[]
};

// Size types
export type NewSize = {
  size: string;
  stock: number;
  weight: number;
};

export type Size = NewSize & {
  _id: string;
};

// User type
export interface User {
  email: string;
  password: string;
  role: string;
}

// Category types
export type NewCategory = {
  name: string;
  available: boolean;
};

export type Category = NewCategory & {
  _id: string;
};

// selling info ?
export type Shipment = {
  ship_mode: "shipping" | "withdraw";
  fullname: string;
  state?: string;
  locality?: string;
  street?: string;
  number?: number;
  email?: string;
  phone?: number;
  apartment?: number;
  floor?: number;
  postal_code?: number;
  observations?: string;
};
