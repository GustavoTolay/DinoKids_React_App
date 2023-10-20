import { NewProduct } from "../types";

export async function postProduct(
  product: NewProduct,
  image: File,
  token: string
): Promise<Response> {
  const formData = new FormData();
  formData.append("image", image as Blob);
  formData.append("product", JSON.stringify(product));
  const options: RequestInit = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch("https://dinokids.site/products", options);
  return response;
}
