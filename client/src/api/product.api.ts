import { api } from "./axios"
import type { Product } from "../types/product"

// Add product
export const addProduct = (data: Product) =>
  api.post<Product>("/creataProduct", data)

// Get all products
export const getProducts = () =>
  api.get<Product[]>("/getProducts")

// Get single product
export const getProductById = (id: string) =>
  api.get<Product>(`/products/${id}`)

// Update product
export const updateProduct = (id: string, data: Product) =>
  api.put<Product>(`/updateProduct/${id}`, data)

// Delete product
export const deleteProduct = (id: string) =>
  api.delete(`/deleteProduct/${id}`)