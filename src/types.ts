export type Product = {
  _id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventory: Inventory[]
}

export type Inventory = {
  model: string;
  sizes: Sizes[];
}

type Sizes = {
  _id?: string;
  size: string;
  stock: number;
  weight: number
}

// type category = "category1" | "category2" | "category3" | "category4"

export interface User {
  email: string,
  password: string,
  role: string
}

export type Category = {
  name: string,
  available: boolean
}

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

  