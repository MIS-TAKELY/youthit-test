import { api } from "./axios"
import type { Product } from "../types/product"

export const getProducts = () => api.get<Product[]>("/products")
export const deleteProduct = (id: string) => api.delete(`/products/${id}`)
export const addProduct = (data: Product) => api.post("/products", data)
export const updateProduct = (id: string, data: Product) =>
  api.put(`/products/${id}`, data)