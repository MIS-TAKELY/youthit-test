import { api } from "./axios"
import type { Product } from "../types/product"

export const addProduct = (data: Product) =>
  api.post("/products", data)

export const getProducts = () =>
  api.get<Product[]>("/products")

export const getProductById = (id: string) =>
  api.get<Product>(`/products/${id}`)

export const updateProduct = (id: string, data: Product) =>
  api.put(`/products/${id}`, data)

export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`)