import { api } from "./axios"
import type { Product } from "../types/product"

export const addProduct = (data: Product) =>
  api.post("/createProduct", data)

export const getProducts = () =>
  api.get<{ products: Product[] }>("/getProducts")

export const getProductById = (id: string) =>
  api.get<{ product: Product }>(`/getProduct`, { params: { id } })

export const updateProduct = ( data: Product) =>
  api.put(`/updateProduct`, data)

export const deleteProduct = () =>
  api.delete(`/deleteProduct`)

export interface FilterParams {
  keyword?: string
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
}

export const filterProducts = (params: FilterParams) =>
  api.get<{ products: Product[]; total: number; page: number; totalPages: number }>(
    "/filterProducts",
    { params }
  )