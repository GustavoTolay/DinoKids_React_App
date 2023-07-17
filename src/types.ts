export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventary: Inventary[]
}

export type Inventary = {
  model: string;
  sizes: Sizes[];
}

type Sizes = {
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

  