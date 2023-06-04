export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventary: inventary[]
}

type inventary = {
  model: string;
  sizes: sizes[];
}

type sizes = {
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

export type category = {
  name: string,
  available: boolean
}