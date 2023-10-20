import { NewProduct } from "../types";

export async function postProduct(
  product: NewProduct,
  image: File,
  token: string
) {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(productId: string, token: string) {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      "https://dinokids.site/products/" + productId,
      options
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
